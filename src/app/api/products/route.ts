import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import defaultProductsRaw from "@/data/productsData.json";

// In serverless environments (Vercel, AWS Lambda), the root filesystem is read-only.
// We use os.tmpdir() (/tmp) for writable storage with in-memory fallback.
const SOURCE_DATA_FILE = path.join(process.cwd(), "src", "data", "productsData.json");
const TMP_DATA_FILE = path.join(os.tmpdir(), "productsData.json");

// In-memory cache as fallback
let memoryProductsCache: unknown[] | null = null;

function initializeDataFile(): string {
  try {
    // If running in serverless or /tmp already exists, use it
    if (fs.existsSync(TMP_DATA_FILE)) {
      return TMP_DATA_FILE;
    }

    // Initialize /tmp with data from source or bundled JSON
    let initialData: unknown[] = defaultProductsRaw;
    if (fs.existsSync(SOURCE_DATA_FILE)) {
      try {
        const raw = fs.readFileSync(SOURCE_DATA_FILE, "utf-8");
        initialData = JSON.parse(raw);
      } catch {
        // Use defaultProductsRaw fallback
      }
    }

    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(initialData, null, 2), "utf-8");
    return TMP_DATA_FILE;
  } catch (err) {
    console.warn("Could not write to /tmp, falling back to in-memory store:", err);
    return SOURCE_DATA_FILE;
  }
}

function readProducts(): unknown[] {
  try {
    const activeFile = initializeDataFile();

    if (fs.existsSync(activeFile)) {
      const raw = fs.readFileSync(activeFile, "utf-8");
      const parsed = JSON.parse(raw);
      memoryProductsCache = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn("Error reading from filesystem, using cache or default:", err);
  }

  if (memoryProductsCache && Array.isArray(memoryProductsCache)) {
    return memoryProductsCache;
  }

  memoryProductsCache = defaultProductsRaw;
  return defaultProductsRaw;
}

function writeProducts(products: unknown[]) {
  memoryProductsCache = products;

  // 1. Try writing to /tmp (always writable in Serverless / Vercel)
  try {
    fs.writeFileSync(TMP_DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
  } catch (err) {
    console.warn("Failed writing to TMP_DATA_FILE:", err);
  }

  // 2. In local development, also attempt to update source file if writable
  try {
    if (process.env.NODE_ENV !== "production" && fs.existsSync(SOURCE_DATA_FILE)) {
      fs.writeFileSync(SOURCE_DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
    }
  } catch {
    // Silently ignore EROFS on read-only environments
  }
}

export async function GET() {
  try {
    const products = readProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to read products" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "id required" }, { status: 400 });
    }

    const products = readProducts() as { id: string }[];
    const filtered = products.filter((p) => p.id !== id);

    if (filtered.length === products.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    writeProducts(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const products = readProducts() as unknown[];

    const newProduct = {
      id: `prod-${Date.now()}`,
      name: body.name,
      slug:
        body.slug ||
        body.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      collectionSlug: body.collectionSlug,
      category: body.category,
      subCategory: body.subCategory,
      price: parseFloat(body.price),
      originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : null,
      currency: "EUR",
      currencySymbol: "€",
      image: body.image,
      moreImages: body.moreImages || [],
      sizes: body.sizes || [],
      stock: parseInt(body.stock) || 0,
      inStock: parseInt(body.stock) > 0,
      color: body.color,
      rating: 0,
      reviewCount: 0,
      details: {
        description: body.description,
        fit: body.fit || "",
        fabric: body.fabric || "",
        care: body.care || "",
        features: body.features || [],
      },
    };

    products.push(newProduct);
    writeProducts(products);

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}
