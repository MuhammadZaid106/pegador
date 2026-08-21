"use client";
import React, { useState, use, useMemo } from "react";
import ProductCard from "@/component/ProductCard";
import FilterDrawer from "@/component/FilterDrawer";
import collectionsDataRaw from "@/data/collectionsData.json";
import productsDataRaw from "@/data/productsData.json";
import { Product, Collection } from "@/data";
import {
  SlidersHorizontal,
  Grid2X2,
  Grid3X3,
  ChevronDown,
  Check,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const collectionsData: Collection[] = collectionsDataRaw as Collection[];
const productsData: Product[] = productsDataRaw as Product[];

export default function CollectionDetailPage({ params }: PageProps) {
  const { slug } = use(params);

  // States
  const [gridCols, setGridCols] = useState<4 | 6>(4);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">("featured");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter States
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // 1. Identify Collection Info
  const currentCollection = useMemo(() => {
    const found = collectionsData.find((c) => c.slug === slug);
    if (found) return found;

    // Fallback formatted title from slug
    const formattedTitle = slug
      .replace(/-/g, " ")
      .toUpperCase()
      .replace("MEN", "| MEN")
      .replace("WOMEN", "| WOMEN");

    return {
      id: `col-${slug}`,
      name: formattedTitle,
      slug: slug,
      href: `/collections/${slug}`,
      category: slug.includes("women") ? "WOMEN" : "MEN",
      subCategory: "ALL",
      description: "Explore the latest collection pieces.",
      heroImage:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
      itemCount: 34,
      featured: true,
    } as Collection;
  }, [slug]);

  // 2. Filter Base Products for this collection
  const baseProducts = useMemo(() => {
    let list = productsData.filter((p) => p.collectionSlug === slug);

    if (list.length === 0) {
      if (slug.includes("women")) {
        list = productsData.filter((p) => p.category === "WOMEN");
      } else if (slug.includes("men")) {
        list = productsData.filter((p) => p.category === "MEN");
      } else {
        list = productsData.slice(0, 16);
      }
    }
    return list;
  }, [slug]);

  // 3. Apply Filter Drawer & Sort logic
  const filteredProducts = useMemo(() => {
    let result = [...baseProducts];

    // Filter In Stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    // Filter Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((sz) => selectedSizes.includes(sz)),
      );
    }

    // Filter Colors
    if (selectedColors.length > 0) {
      result = result.filter((p) => selectedColors.includes(p.color));
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }

    return result;
  }, [baseProducts, inStockOnly, selectedSizes, selectedColors, sortBy]);

  // Toggle Filters
  const handleToggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const handleToggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const handleResetFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setInStockOnly(false);
  };

  const totalActiveFilters =
    selectedSizes.length + selectedColors.length + (inStockOnly ? 1 : 0);

  // Hide StickyOffer when filter drawer is open
  React.useEffect(() => {
    if (isFilterOpen) {
      document.body.classList.add("filter-open");
    } else {
      document.body.classList.remove("filter-open");
    }
    return () => document.body.classList.remove("filter-open");
  }, [isFilterOpen]);

  return (
    <>
      {/* Collection Page Content */}
      <section className="pt-24 sm:pt-32 pb-12 px-4 sm:px-8 md:px-12 max-w-[1920px] mx-auto w-full">
        {/* Centered Collection Title & Count */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-[18px] sm:text-[24px] md:text-[28px] font-normal tracking-[0.16em] uppercase text-[#111111]">
            {currentCollection.name}
          </h1>
          <p className="text-[11px] sm:text-[13px] text-neutral-500 font-light mt-1">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Controls Bar: Filter (Left) | Grid Switcher & Sort (Right) */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-6 sm:mb-8">
          {/* Left: Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 text-[11px] sm:text-[12px] font-medium tracking-widest uppercase text-[#111] hover:opacity-60 transition-opacity cursor-pointer"
          >
            <SlidersHorizontal size={16} />
            <span>Filter</span>
            {totalActiveFilters > 0 && (
              <span className="ml-1 w-4 h-4 rounded-full bg-black text-white text-[9px] flex items-center justify-center font-bold">
                {totalActiveFilters}
              </span>
            )}
          </button>

          {/* Right: Grid Switcher Icons & Sort Dropdown */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Desktop Grid Switchers (4 columns vs 6 columns) */}
            <div className="hidden lg:flex items-center gap-1.5 border-r border-neutral-200 pr-5">
              {/* 4 Column Icon */}
              <button
                onClick={() => setGridCols(4)}
                aria-label="4 columns per row"
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  gridCols === 4
                    ? "text-black bg-neutral-100"
                    : "text-neutral-400 hover:text-black"
                }`}
                title="4 Columns"
              >
                <Grid2X2 size={18} />
              </button>

              {/* 6 Column Icon */}
              <button
                onClick={() => setGridCols(6)}
                aria-label="6 columns per row"
                className={`p-1.5 rounded transition-all cursor-pointer ${
                  gridCols === 6
                    ? "text-black bg-neutral-100"
                    : "text-neutral-400 hover:text-black"
                }`}
                title="6 Columns"
              >
                <Grid3X3 size={18} />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                className="flex items-center gap-2 text-[11px] sm:text-[12px] font-medium tracking-widest uppercase text-[#111] hover:opacity-60 transition-opacity cursor-pointer"
              >
                <span>
                  {sortBy === "featured"
                    ? "Selected"
                    : sortBy === "price-asc"
                      ? "Price: Low to High"
                      : sortBy === "price-desc"
                        ? "Price: High to Low"
                        : "Newest"}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isSortDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isSortDropdownOpen && (
                <div className="absolute right-0 top-8 z-30 w-48 bg-white border border-neutral-100 shadow-xl rounded-sm py-2 animate-fade-in">
                  <button
                    onClick={() => {
                      setSortBy("featured");
                      setIsSortDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[12px] hover:bg-neutral-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>Selected</span>
                    {sortBy === "featured" && <Check size={14} />}
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("price-asc");
                      setIsSortDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[12px] hover:bg-neutral-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>Price: Low to High</span>
                    {sortBy === "price-asc" && <Check size={14} />}
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("price-desc");
                      setIsSortDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[12px] hover:bg-neutral-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>Price: High to Low</span>
                    {sortBy === "price-desc" && <Check size={14} />}
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("newest");
                      setIsSortDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-[12px] hover:bg-neutral-50 flex items-center justify-between cursor-pointer"
                  >
                    <span>Newest</span>
                    {sortBy === "newest" && <Check size={14} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Grid: 2 cols on mobile, md:grid-cols-3, lg:grid-cols-4 OR lg:grid-cols-6 */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[14px] text-neutral-500 mb-4">
              No products match your selected filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="bg-black text-white px-6 py-3 text-[11px] font-bold tracking-widest uppercase"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:grid-cols-3 ${
              gridCols === 6 ? "lg:grid-cols-6" : "lg:grid-cols-4"
            } transition-all duration-300`}
          >
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </section>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedSizes={selectedSizes}
        onToggleSize={handleToggleSize}
        selectedColors={selectedColors}
        onToggleColor={handleToggleColor}
        inStockOnly={inStockOnly}
        onToggleInStock={() => setInStockOnly(!inStockOnly)}
        onResetFilters={handleResetFilters}
        totalResults={filteredProducts.length}
      />
    </>
  );
}
