import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "src", "data", "productsData.json");

function readProducts() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}

function writeProducts(products: unknown[]) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
}

export async function GET() {
  try {
    return NextResponse.json(readProducts());
  } catch {
    return NextResponse.json(
      { error: "Failed to read products" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id)
      return NextResponse.json({ error: "id required" }, { status: 400 });
    const products = readProducts();
    const filtered = (products as { id: string }[]).filter((p) => p.id !== id);
    if (filtered.length === products.length)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    writeProducts(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const products = JSON.parse(raw);

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
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");

    return NextResponse.json({ success: true, product: newProduct });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 },
    );
  }
}
