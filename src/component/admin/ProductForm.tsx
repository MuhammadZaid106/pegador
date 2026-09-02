"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  X,
  Check,
  AlertCircle,
  ChevronDown,
  Upload,
} from "lucide-react";

export interface ProductFormState {
  name: string;
  category: string;
  subCategory: string;
  collectionSlug: string;
  color: string;
  price: string;
  originalPrice: string;
  stock: string;
  image: string;
  moreImages: string[];
  sizes: string[];
  description: string;
  fit: string;
  fabric: string;
  care: string;
  features: string[];
}

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLLECTIONS = [
  { slug: "men-tshirts", label: "Men Tees" },
  { slug: "men-hoodies", label: "Men Hoodies" },
  { slug: "men-pants-joggers", label: "Men Pants & Joggers" },
  { slug: "men-jackets", label: "Men Jackets" },
  { slug: "women-tshirts", label: "Women Tees & Tops" },
  { slug: "women-hoodies", label: "Women Hoodies" },
  { slug: "here-and-now", label: "Here and Now | FW 26" },
  { slug: "essentials", label: "PEGADOR Essentials" },
];
const CATEGORIES = ["MEN", "WOMEN", "ESSENTIALS", "FIRE"];
const SUBCATEGORIES = ["TOPS", "BOTTOMS", "OUTERWEAR", "FEATURED", "CORE"];

const inputClass =
  "w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3.5 sm:px-4 py-2.5 sm:py-3 text-[13px] tracking-wide text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 focus:border-black dark:focus:border-white focus:outline-none transition-colors rounded-lg";

const labelClass =
  "block text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-700 dark:text-neutral-500 mb-1.5";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4 sm:mb-5">
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
        {children}
      </span>
      <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-800" />
    </div>
  );
}

export const ProductForm: React.FC = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [newFeature, setNewFeature] = useState("");
  const [newMoreImage, setNewMoreImage] = useState("");

  const [form, setForm] = useState<ProductFormState>({
    name: "",
    category: "MEN",
    subCategory: "TOPS",
    collectionSlug: "men-tshirts",
    color: "",
    price: "",
    originalPrice: "",
    stock: "",
    image: "",
    moreImages: [],
    sizes: [],
    description: "",
    fit: "",
    fabric: "",
    care: "",
    features: [],
  });

  const set = (key: keyof ProductFormState, val: string | string[]) =>
    setForm((p) => ({ ...p, [key]: val }));

  const toggleSize = (size: string) =>
    setForm((p) => ({
      ...p,
      sizes: p.sizes.includes(size)
        ? p.sizes.filter((s) => s !== size)
        : [...p.sizes, size],
    }));

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setForm((p) => ({ ...p, features: [...p.features, newFeature.trim()] }));
    setNewFeature("");
  };

  const addMoreImage = () => {
    if (!newMoreImage.trim()) return;
    setForm((p) => ({
      ...p,
      moreImages: [...p.moreImages, newMoreImage.trim()],
    }));
    setNewMoreImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) return setError("Product name is required.");
    if (!form.price || isNaN(+form.price))
      return setError("A valid price is required.");
    if (!form.image.trim()) return setError("A primary image URL is required.");
    if (form.sizes.length === 0) return setError("Select at least one size.");

    setSubmitting(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to save product. Please try again.");
      setSuccess(true);
      setTimeout(() => router.push("/admin/Dashboard"), 2000);
    } catch {
      setError("Failed to save product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-8 sm:p-10 flex flex-col items-center text-center max-w-sm w-full rounded-2xl shadow-xl">
          <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center mb-6 rounded-full">
            <Check
              size={22}
              strokeWidth={2.5}
              className="text-white dark:text-black"
            />
          </div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-2">
            Success
          </p>
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">
            Product Published
          </h2>
          <p className="text-[12px] text-neutral-400 mb-8 leading-relaxed">
            Your product is now saved in{" "}
            <code className="text-black dark:text-white font-mono">
              productsData.json
            </code>{" "}
            and live on the store.
          </p>
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-px overflow-hidden rounded-full">
            <div className="h-px bg-black dark:bg-white animate-[progress_2s_linear_forwards]" />
          </div>
          <p className="text-[10px] text-neutral-400 mt-3 tracking-wider">
            Redirecting to dashboard…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/admin/Dashboard"
            className="w-9 h-9 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors text-black dark:text-white cursor-pointer rounded-xl shrink-0"
          >
            <ArrowLeft size={15} strokeWidth={1.5} />
          </Link>
          <div>
            <p className="text-[10px] font-bold tracking-[0.22em] uppercase text-neutral-400 mb-0.5">
              PEGADOR® Admin
            </p>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white">
              Add New Product
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Link
            href="/admin/Dashboard"
            className="px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors rounded-md"
          >
            Cancel
          </Link>
          <button
            form="add-product-form"
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2 text-[10px] font-bold tracking-[0.15em] uppercase bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer rounded-md shadow-xs"
          >
            {submitting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white dark:border-black border-t-transparent animate-spin rounded-full" />
                Saving…
              </>
            ) : (
              <>
                <Upload size={13} strokeWidth={2} />
                Publish
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center gap-3 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 px-4 sm:px-5 py-3 mb-6 rounded-lg">
          <AlertCircle
            size={14}
            strokeWidth={1.5}
            className="text-black dark:text-white shrink-0"
          />
          <p className="text-[12px] text-black dark:text-white flex-1 tracking-wide">
            {error}
          </p>
          <button
            type="button"
            onClick={() => setError("")}
            className="text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Form */}
      <form id="add-product-form" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Column — 2/3 width on desktop */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
            {/* Basic Info */}
            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 rounded-2xl shadow-xs">
              <SectionHeading>Basic Information</SectionHeading>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Product Name *</label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Heavyweight Oversized Logo Tee - Washed Grey"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Price (€) *</label>
                    <input
                      className={inputClass}
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="49.95"
                      value={form.price}
                      onChange={(e) => set("price", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Original Price (€)</label>
                    <input
                      className={inputClass}
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Optional (for sale items)"
                      value={form.originalPrice}
                      onChange={(e) => set("originalPrice", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Color</label>
                    <input
                      className={inputClass}
                      placeholder="e.g. Washed Grey"
                      value={form.color}
                      onChange={(e) => set("color", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Stock Quantity *</label>
                    <input
                      className={inputClass}
                      type="number"
                      min="0"
                      placeholder="e.g. 30"
                      value={form.stock}
                      onChange={(e) => set("stock", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 rounded-2xl shadow-xs">
              <SectionHeading>Product Images</SectionHeading>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Primary Image URL *</label>
                  <input
                    className={inputClass}
                    placeholder="https://images.unsplash.com/…"
                    value={form.image}
                    onChange={(e) => set("image", e.target.value)}
                    required
                  />
                  {form.image && (
                    <div className="mt-3 relative w-20 h-20 overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
                      <Image
                        src={form.image}
                        alt="Preview"
                        fill
                        sizes="80px"
                        className="object-cover"
                        onError={() => {}}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className={labelClass}>Additional Images</label>
                  <div className="flex gap-0">
                    <input
                      className={`${inputClass} flex-1 rounded-r-none`}
                      placeholder="Paste image URL and press +"
                      value={newMoreImage}
                      onChange={(e) => setNewMoreImage(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addMoreImage())
                      }
                    />
                    <button
                      type="button"
                      onClick={addMoreImage}
                      className="border border-l-0 border-neutral-200 dark:border-neutral-800 w-12 flex items-center justify-center bg-white dark:bg-neutral-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white transition-colors cursor-pointer rounded-r-lg"
                    >
                      <Plus size={14} strokeWidth={2} />
                    </button>
                  </div>
                  {form.moreImages.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {form.moreImages.map((url, i) => (
                        <div
                          key={i}
                          className="relative group w-14 h-14 border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xl"
                        >
                          <Image
                            src={url}
                            alt={`extra-${i}`}
                            fill
                            sizes="56px"
                            className="object-cover"
                            onError={() => {}}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setForm((p) => ({
                                ...p,
                                moreImages: p.moreImages.filter(
                                  (_, j) => j !== i,
                                ),
                              }))
                            }
                            className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                          >
                            <X size={12} className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 rounded-2xl shadow-xs">
              <SectionHeading>Product Details</SectionHeading>
              <div className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Description *</label>
                  <textarea
                    rows={3}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe the product — materials, style, key features…"
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Fit</label>
                    <input
                      className={inputClass}
                      placeholder="e.g. Oversized Streetwear Cut"
                      value={form.fit}
                      onChange={(e) => set("fit", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Fabric</label>
                    <input
                      className={inputClass}
                      placeholder="e.g. 100% Organic Cotton 280 GSM"
                      value={form.fabric}
                      onChange={(e) => set("fabric", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Care Instructions</label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Machine wash cold at 30°C."
                    value={form.care}
                    onChange={(e) => set("care", e.target.value)}
                  />
                </div>

                {/* Features */}
                <div>
                  <label className={labelClass}>Key Features</label>
                  <div className="flex gap-0">
                    <input
                      className={`${inputClass} flex-1 rounded-r-none`}
                      placeholder="Add a feature and press +"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addFeature())
                      }
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="border border-l-0 border-neutral-200 dark:border-neutral-800 w-12 flex items-center justify-center bg-white dark:bg-neutral-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white transition-colors cursor-pointer rounded-r-lg"
                    >
                      <Plus size={14} strokeWidth={2} />
                    </button>
                  </div>
                  {form.features.length > 0 && (
                    <div className="flex flex-col gap-1.5 mt-2">
                      {form.features.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 border border-neutral-100 dark:border-neutral-800 px-3.5 py-2 bg-neutral-50 dark:bg-neutral-900 rounded-lg"
                        >
                          <span className="text-[11px] tracking-wide text-black dark:text-white flex-1">
                            {f}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setForm((p) => ({
                                ...p,
                                features: p.features.filter((_, j) => j !== i),
                              }))
                            }
                            className="text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — 1/3 width on desktop */}
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Classification */}
            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 rounded-2xl shadow-xs">
              <SectionHeading>Classification</SectionHeading>
              <div className="flex flex-col gap-4">
                {[
                  {
                    label: "Category *",
                    key: "category",
                    options: CATEGORIES.map((c) => ({ value: c, label: c })),
                  },
                  {
                    label: "Sub-Category *",
                    key: "subCategory",
                    options: SUBCATEGORIES.map((s) => ({ value: s, label: s })),
                  },
                  {
                    label: "Collection *",
                    key: "collectionSlug",
                    options: COLLECTIONS.map((c) => ({
                      value: c.slug,
                      label: c.label,
                    })),
                  },
                ].map(({ label, key, options }) => (
                  <div key={key}>
                    <label className={labelClass}>{label}</label>
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none pr-9 cursor-pointer`}
                        value={form[key as keyof ProductFormState] as string}
                        onChange={(e) =>
                          set(key as keyof ProductFormState, e.target.value)
                        }
                      >
                        {options.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={13}
                        strokeWidth={1.5}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Available Sizes */}
            <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 rounded-2xl shadow-xs">
              <SectionHeading>Available Sizes</SectionHeading>
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 gap-1.5">
                {ALL_SIZES.map((size) => {
                  const active = form.sizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`py-2.5 text-[11px] font-bold tracking-[0.14em] uppercase transition-colors cursor-pointer rounded-lg border ${
                        active
                          ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-xs"
                          : "bg-white dark:bg-neutral-950 text-neutral-500 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
              {form.sizes.length > 0 && (
                <p className="text-[10px] text-neutral-400 mt-2.5 tracking-wider">
                  Selected: {form.sizes.join(" · ")}
                </p>
              )}
            </div>

            {/* Live Preview Card */}
            {(form.name || form.image) && (
              <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 rounded-2xl shadow-xs">
                <div className="pb-3 mb-3 border-b border-neutral-100 dark:border-neutral-800">
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                    Live Preview
                  </p>
                </div>
                <div>
                  {form.image && (
                    <div className="relative w-full aspect-[3/4] bg-neutral-100 dark:bg-neutral-800 overflow-hidden mb-3 rounded-xl">
                      <Image
                        src={form.image}
                        alt={form.name || "preview"}
                        fill
                        sizes="300px"
                        className="object-cover object-center"
                        onError={() => {}}
                      />
                    </div>
                  )}
                  {form.name && (
                    <p className="text-[12px] font-medium text-black dark:text-white line-clamp-2 tracking-wide">
                      {form.name}
                    </p>
                  )}
                  {form.price && (
                    <p className="text-[12px] text-black dark:text-white mt-0.5 tabular-nums">
                      €{parseFloat(form.price).toFixed(2)}
                      {form.originalPrice && (
                        <span className="ml-2 line-through text-neutral-300 dark:text-neutral-600">
                          €{parseFloat(form.originalPrice).toFixed(2)}
                        </span>
                      )}
                    </p>
                  )}
                  {form.sizes.length > 0 && (
                    <div className="flex gap-1 mt-2.5 flex-wrap">
                      {form.sizes.map((s) => (
                        <span
                          key={s}
                          className="text-[9px] font-bold tracking-widest uppercase border border-neutral-200 dark:border-neutral-700 px-1.5 py-0.5 text-neutral-500 dark:text-neutral-400 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Publish CTA */}
            <button
              form="add-product-form"
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 sm:py-4 text-[10px] font-bold tracking-[0.2em] uppercase bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer rounded-xl shadow-xs"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white dark:border-black border-t-transparent animate-spin rounded-full" />
                  Saving…
                </>
              ) : (
                <>
                  <Upload size={13} strokeWidth={2} />
                  Publish Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
