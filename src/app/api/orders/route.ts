import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import defaultOrdersRaw from "@/data/ordersData.json";

const SOURCE_FILE = path.join(process.cwd(), "src", "data", "ordersData.json");
const TMP_FILE = path.join(os.tmpdir(), "ordersData.json");

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
} 

export interface OrderRecord {
  id: string;
  orderNumber: string;
  customer: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  items: OrderItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  paymentMethod?: string;
  status: "paid" | "processing" | "shipped" | "delivered";
  timestamp: number;
  date: string; // YYYY-MM-DD
}

interface OrdersData {
  orders: OrderRecord[];
}

let memoryOrdersCache: OrdersData | null = null;

function getActiveFile(): string {
  try {
    if (fs.existsSync(TMP_FILE)) return TMP_FILE;

    let initialData: OrdersData = defaultOrdersRaw as OrdersData;
    if (fs.existsSync(SOURCE_FILE)) {
      try {
        const raw = fs.readFileSync(SOURCE_FILE, "utf-8");
        initialData = JSON.parse(raw);
      } catch {
        // fallback to default
      }
    }

    fs.writeFileSync(TMP_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return TMP_FILE;
  } catch {
    return SOURCE_FILE;
  }
}

function readOrders(): OrdersData {
  try {
    const file = getActiveFile();
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf-8");
      const parsed = JSON.parse(raw);
      memoryOrdersCache = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn("Could not read orders file:", err);
  }

  if (memoryOrdersCache) return memoryOrdersCache;
  memoryOrdersCache = defaultOrdersRaw as OrdersData;
  return defaultOrdersRaw as OrdersData;
}

function writeOrders(data: OrdersData) {
  memoryOrdersCache = data;

  // 1. Write to /tmp (always writable in Serverless)
  try {
    fs.writeFileSync(TMP_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed writing TMP_FILE for orders:", err);
  }

  // 2. In local dev, also update source file
  try {
    if (process.env.NODE_ENV !== "production" && fs.existsSync(SOURCE_FILE)) {
      fs.writeFileSync(SOURCE_FILE, JSON.stringify(data, null, 2), "utf-8");
    }
  } catch {
    // Ignore EROFS
  }
}

// ─── GET: Fetch Orders & Calculated Stats ─────────────────────────────────────
export async function GET() {
  try {
    const data = readOrders();
    const orders = data.orders || [];

    const totalOrdersCount = orders.length;
    const totalSalesAmount = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    const todayStr = new Date().toISOString().slice(0, 10);
    const todayOrders = orders.filter((o) => o.date === todayStr);
    const todayOrdersCount = todayOrders.length;
    const todaySalesAmount = todayOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    return NextResponse.json({
      orders,
      stats: {
        totalOrdersCount,
        totalSalesAmount,
        todayOrdersCount,
        todaySalesAmount,
        percentChangeOrders: totalOrdersCount > 0 ? "+100%" : "0%",
        percentChangeSales: totalSalesAmount > 0 ? "+100%" : "0%",
        ordersSubText: `+${todayOrdersCount} today`,
        salesSubText: `€${todaySalesAmount.toFixed(2)} today`,
        trendOrders: "up",
        trendSales: "up",
      },
    });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      {
        orders: [],
        stats: {
          totalOrdersCount: 0,
          totalSalesAmount: 0,
          todayOrdersCount: 0,
          todaySalesAmount: 0,
          percentChangeOrders: "0%",
          percentChangeSales: "0%",
          ordersSubText: "+0 today",
          salesSubText: "€0.00 today",
          trendOrders: "up",
          trendSales: "up",
        },
      },
      { status: 500 },
    );
  }
}

// ─── POST: Place / Record a New Order ─────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = readOrders();

    const now = Date.now();
    const todayStr = new Date(now).toISOString().slice(0, 10);
    const orderNumber = body.orderNumber || `PEG-${now.toString().slice(-8).toUpperCase()}`;

    const newOrder: OrderRecord = {
      id: `ord-${now}`,
      orderNumber,
      customer: body.customer || {},
      items: body.items || [],
      itemCount: body.itemCount || (body.items?.reduce((s: number, i: OrderItem) => s + (i.quantity || 1), 0) ?? 1),
      subtotal: parseFloat(body.subtotal) || 0,
      shipping: parseFloat(body.shipping) || 0,
      discount: parseFloat(body.discount) || 0,
      total: parseFloat(body.total) || 0,
      currency: body.currency || "€",
      paymentMethod: body.paymentMethod || "Credit Card",
      status: "paid",
      timestamp: now,
      date: todayStr,
    };

    const updatedOrders = [newOrder, ...(data.orders || [])];
    writeOrders({ orders: updatedOrders });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
