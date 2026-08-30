"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Product } from "@/data";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addItem } from "@/lib/redux/cartSlice";

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAdd }) => {
  const dispatch = useAppDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showQuickSize, setShowQuickSize] = useState(false);

  const primaryImage = product.image;
  const hoverImage =
    product.moreImages && product.moreImages[0]
      ? product.moreImages[0]
      : primaryImage;

  return (
    <div
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSize(false);
      }}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] bg-[#f4f4f4] overflow-hidden">
        {/* Sale / New Tag */}
        {product.originalPrice && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-black text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1">
            Sale
          </span>
        )}

        <Link
          href={`/collections/${product.collectionSlug}/products/${product.slug}`}
          className="block w-full h-full"
        >
          <Image
            src={isHovered ? hoverImage : primaryImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover object-center transition-all duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Quick Add / Size Selector Overlay Button at Bottom Right */}
        <div className="absolute bottom-2.5 right-2.5 z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowQuickSize(!showQuickSize);
            }}
            className="w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-800/90 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
            aria-label="Quick Add"
          >
            <Plus size={16} strokeWidth={2} />
          </button>

          {/* Quick Size Popover */}
          {showQuickSize && (
            <div className="absolute bottom-10 right-0 bg-white dark:bg-neutral-900 shadow-xl border border-neutral-100 dark:border-neutral-800 p-2 rounded flex flex-col gap-1 z-30 min-w-[100px] animate-fade-in text-black dark:text-white">
              <span className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2 py-0.5">
                Select Size
              </span>
              <div className="grid grid-cols-3 gap-1">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedSize(sz);
                      dispatch(addItem({ product, size: sz, quantity: 1 }));
                      if (onQuickAdd) onQuickAdd(product);
                      setShowQuickSize(false);
                      window.dispatchEvent(new Event("open-cart"));
                    }}
                    className={`text-[10px] font-medium py-1 px-1.5 rounded border transition-colors ${
                      selectedSize === sz
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                        : "bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-3 flex flex-col gap-0.5">
        <Link
          href={`/collections/${product.collectionSlug}/products/${product.slug}`}
        >
          <h3 className="text-[12px] sm:text-[13px] font-normal text-[#1a1a1a] dark:text-white line-clamp-1 group-hover:underline underline-offset-4 decoration-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-[11px] sm:text-[12px]">
          <span className="text-[#1a1a1a] dark:text-neutral-200 font-normal">
            {product.currencySymbol}
            {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-neutral-400 dark:text-neutral-500 line-through">
              {product.currencySymbol}
              {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
