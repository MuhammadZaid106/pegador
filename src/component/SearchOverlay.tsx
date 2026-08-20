"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsDataRaw from "@/data/productsData.json";
import { Product } from "@/data";
import ProductCard from "./ProductCard";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const products: Product[] = productsDataRaw as Product[];

const popularCategories = [
  {
    title: "HOODIES | MEN",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
    href: "/collections/men-hoodies"
  },
  {
    title: "SWEAT JACKETS | MEN",
    image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80",
    href: "/collections/men-hoodies"
  },
  {
    title: "JACKETS | MEN",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
    href: "/collections/men-jackets"
  },
  {
    title: "PANTS & JOGGERS | MEN",
    image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=600&q=80",
    href: "/collections/men-pants-joggers"
  },
  {
    title: "HOODIES | WOMEN",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    href: "/collections/women-hoodies"
  },
  {
    title: "SWEAT JACKETS | WOMEN",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    href: "/collections/women-hoodies"
  },
  {
    title: "JACKETS | WOMEN",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=600&q=80",
    href: "/collections/women-hoodies"
  },
  {
    title: "PANTS & JOGGERS | WOMEN",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80",
    href: "/collections/women-pants-joggers"
  }
];

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Live search filtering
  useEffect(() => {
    if (query.trim().length >= 2) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.color.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto flex flex-col animate-fade-in">
      
      {/* Top Search bar row */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 py-6 flex items-center justify-between gap-4">
        {/* Search input container */}
        <div className="flex-1 max-w-[600px] mx-auto relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search in our store"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#f2f2f2] text-black text-[14px] font-normal px-5 py-3 pr-12 rounded-none outline-none placeholder-neutral-500 focus:bg-[#eaeaea] transition-all"
          />
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="text-black hover:opacity-60 transition-opacity p-2 cursor-pointer flex-shrink-0"
          aria-label="Close search"
        >
          <X size={26} strokeWidth={1.5} />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto px-6 sm:px-12 pb-16">
        
        {query.trim().length < 2 ? (
          /* Popular Categories block */
          <div className="mt-8 space-y-8 animate-fade-in">
            <h3 className="text-center text-[13px] font-bold tracking-[0.18em] uppercase text-neutral-800">
              POPULAR CATEGORIES
            </h3>

            {/* Responsive Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularCategories.map((cat, idx) => (
                <Link 
                  key={idx} 
                  href={cat.href}
                  onClick={onClose}
                  className="group relative w-full aspect-[4/3] bg-[#f4f4f4] overflow-hidden block"
                >
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay text at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                    <h4 className="text-[12px] sm:text-[13px] font-bold text-white tracking-widest uppercase">
                      {cat.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          /* Search Results Block */
          <div className="mt-8 space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <span className="text-[12px] text-neutral-500 uppercase tracking-widest">
                Search Results for &quot;{query}&quot;
              </span>
              <span className="text-[12px] font-semibold text-black uppercase tracking-widest">
                {results.length} {results.length === 1 ? "Result" : "Results"}
              </span>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-20 text-neutral-500 text-[14px]">
                No products found matching your search. Try searching for hoodies, tees, or jackets.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
                {results.map((prod) => (
                  <ProductCard 
                    key={prod.id} 
                    product={prod} 
                    onQuickAdd={() => {
                      // Trigger close search on add
                      onClose();
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchOverlay;
