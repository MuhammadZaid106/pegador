"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Eye, Edit2, Trash2, ChevronDown, Package } from "lucide-react";
import { Product } from "@/data";

export interface ProductsTableProps {
  products: Product[];
  filteredProducts: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedStock: string;
  onSelectStock: (st: string) => void;
  sortBy: string;
  onSelectSortBy: (sort: string) => void;
  onResetFilters: () => void;
  onDeleteProduct: (product: Product) => void;
  loading: boolean;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  filteredProducts,
  selectedCategory,
  onSelectCategory,
  selectedStock,
  onSelectStock,
  sortBy,
  onSelectSortBy,
  onResetFilters,
  onDeleteProduct,
  loading,
}) => {
  return (
    <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-900 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-0.5">
            Live Inventory
          </p>
          <h2 className="text-[15px] sm:text-[16px] font-bold text-black dark:text-white flex items-center gap-2">
            Recent Products
            <span className="text-[11px] font-normal text-neutral-400">
              ({filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "item" : "items"})
            </span>
          </h2>
        </div>

        {/* Filter Pills & Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="flex items-center overflow-x-auto border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-0.5 max-w-full rounded-lg">
            {["ALL", "MEN", "WOMEN", "ESSENTIALS", "FIRE"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-2.5 py-1 text-[9px] font-bold tracking-[0.14em] uppercase transition-colors cursor-pointer rounded-md shrink-0 ${
                  selectedCategory === cat
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                    : "text-neutral-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Stock Filter */}
          <div className="flex items-center border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-0.5 rounded-lg">
            {[
              { id: "ALL", label: "All" },
              { id: "IN_STOCK", label: "In Stock" },
              { id: "OUT_OF_STOCK", label: "Out" },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectStock(st.id)}
                className={`px-2 py-1 text-[9px] font-bold tracking-[0.12em] uppercase transition-colors cursor-pointer rounded-md ${
                  selectedStock === st.id
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                    : "text-neutral-400 hover:text-black dark:hover:text-white"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSelectSortBy(e.target.value)}
              className="appearance-none bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 pr-7 text-[10px] font-bold tracking-wider uppercase text-neutral-600 dark:text-neutral-300 focus:outline-none focus:border-black rounded-lg cursor-pointer"
            >
              <option value="newest">Sort: Default</option>
              <option value="price-asc">Price: Low → High</option>
              <option value="price-desc">Price: High → Low</option>
              <option value="stock-asc">Stock: Low First</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
            <ChevronDown
              size={11}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Table Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-5 h-5 border-2 border-black dark:border-white border-t-transparent animate-spin rounded-full" />
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">
            Loading Products…
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <Package
            size={36}
            strokeWidth={1}
            className="mb-3 text-neutral-300 dark:text-neutral-700"
          />
          <p className="text-[13px] font-bold text-black dark:text-white tracking-wide">
            No products match your criteria
          </p>
          <p className="text-[11px] text-neutral-400 mt-1">
            Try adjusting your search query or reset the category filters.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-4 px-4 py-2 border border-neutral-300 dark:border-neutral-700 text-[10px] font-bold tracking-[0.15em] uppercase hover:border-black dark:hover:border-white transition-colors cursor-pointer rounded-md"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left min-w-[660px]">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-neutral-900 bg-neutral-50/70 dark:bg-neutral-900/50">
                <th className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 px-4 sm:px-5 py-3.5">
                  Product
                </th>
                <th className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 px-3 sm:px-4 py-3.5">
                  Category
                </th>
                <th className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 px-3 sm:px-4 py-3.5">
                  Price
                </th>
                <th className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 px-3 sm:px-4 py-3.5">
                  Stock
                </th>
                <th className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 px-3 sm:px-4 py-3.5">
                  Rating
                </th>
                <th className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 px-3 sm:px-4 py-3.5">
                  Status
                </th>
                <th className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 px-4 sm:px-5 py-3.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
              {filteredProducts.slice(0, 50).map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-neutral-50/80 dark:hover:bg-neutral-900/60 transition-colors group"
                >
                  {/* Product Name & Image */}
                  <td className="px-4 sm:px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 overflow-hidden shrink-0 rounded-xl">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 max-w-xs sm:max-w-sm">
                        <p className="text-[12px] font-bold text-black dark:text-white truncate leading-snug">
                          {product.name}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-0.5 truncate tracking-wide">
                          {product.color} · SKU: {product.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    <span className="inline-block text-[9px] font-bold tracking-[0.14em] uppercase border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 text-neutral-700 dark:text-neutral-300 rounded-md">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    <p className="text-[12px] font-bold text-black dark:text-white tabular-nums">
                      {product.currencySymbol || "€"}
                      {product.price.toFixed(2)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-[10px] text-neutral-400 line-through tabular-nums">
                        {product.currencySymbol || "€"}
                        {product.originalPrice.toFixed(2)}
                      </p>
                    )}
                  </td>

                  {/* Stock Bar */}
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-12 sm:w-14 bg-neutral-100 dark:bg-neutral-800 h-1 rounded-full overflow-hidden">
                        <div
                          className="h-1 bg-black dark:bg-white transition-all rounded-full"
                          style={{
                            width: `${Math.min(((product.stock || 0) / 50) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-black dark:text-white tabular-nums">
                        {product.stock || 0}
                      </span>
                    </div>
                  </td>

                  {/* Rating */}
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Star
                        size={10}
                        className="text-black dark:text-white fill-black dark:fill-white shrink-0"
                      />
                      <span className="text-[11px] font-bold text-black dark:text-white tabular-nums">
                        {product.rating ? product.rating.toFixed(1) : "—"}
                      </span>
                      {product.reviewCount ? (
                        <span className="text-[10px] text-neutral-400">
                          ({product.reviewCount})
                        </span>
                      ) : null}
                    </div>
                  </td>

                  {/* Stock Status */}
                  <td className="px-3 sm:px-4 py-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-lg text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-1 ${
                        product.inStock
                          ? "bg-black dark:bg-white text-white dark:text-black"
                          : "border border-neutral-300 dark:border-neutral-700 text-neutral-400"
                      }`}
                    >
                      <span
                        className={`w-1 h-1 rounded-full ${
                          product.inStock
                            ? "bg-white dark:bg-black"
                            : "bg-neutral-400"
                        }`}
                      />
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  {/* Action buttons */}
                  <td className="px-4 sm:px-5 py-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      {/* View in Store */}
                      <Link
                        href={`/collections/${product.collectionSlug}/products/${product.slug}`}
                        target="_blank"
                        title="View on store"
                        className="w-7 h-7 rounded-xl border border-neutral-400 dark:border-neutral-600 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center transition-colors"
                      >
                        <Eye size={12} strokeWidth={1.5} />
                      </Link>

                      {/* Edit Link */}
                      <Link
                        href="/admin/AddProduct"
                        title="Add / Edit Product"
                        className="w-7 h-7 rounded-xl border border-neutral-400 dark:border-neutral-600 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center transition-colors"
                      >
                        <Edit2 size={12} strokeWidth={1.5} />
                      </Link>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => onDeleteProduct(product)}
                        title="Delete"
                        className="w-7 h-7 rounded-xl border border-neutral-400 dark:border-neutral-600 hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length > 50 && (
            <div className="p-4 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between">
              <p className="text-[11px] text-neutral-400">
                Showing 50 of {filteredProducts.length} products
              </p>
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-black dark:text-white">
                Use search or category filters to find more
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsTable;
