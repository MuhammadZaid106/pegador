"use client";
import React, { useState, use, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import productsDataRaw from "@/data/productsData.json";
import collectionsDataRaw from "@/data/collectionsData.json";
import { Product, Collection } from "@/data";
import { ChevronDown, Plus, Minus, Truck, RefreshCw, Award, ShieldCheck, Heart } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addItem } from "@/lib/redux/cartSlice";

interface ProductPageProps {
  params: Promise<{
    slug: string;
    productSlug: string;
  }>;
}

const productsData: Product[] = productsDataRaw as Product[];
const collectionsData: Collection[] = collectionsDataRaw as Collection[];

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { slug, productSlug } = use(params);
  const dispatch = useAppDispatch();

  // States
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("details");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // 1. Fetch Product
  const product = useMemo(() => {
    return productsData.find((p) => p.slug === productSlug) || productsData[0];
  }, [productSlug]);

  // 2. Fetch Collection Info
  const collection = useMemo(() => {
    return collectionsData.find((c) => c.slug === slug) || {
      name: slug.replace(/-/g, " ").toUpperCase(),
      slug: slug
    };
  }, [slug]);

  // Handle Accordion Toggle
  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // Handle Add To Basket
  const handleAddToBasket = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    
    // Redux insertion
    dispatch(
      addItem({
        product,
        size: selectedSize,
        quantity,
      })
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    // Slide open cart drawer
    window.dispatchEvent(new Event("open-cart"));
  };

  // Image list (main image + fallback/more images)
  const productImages = useMemo(() => {
    const images = [product.image];
    if (product.moreImages && product.moreImages.length > 0) {
      images.push(...product.moreImages);
    }
    return images;
  }, [product]);

  return (
    <div className="bg-white dark:bg-neutral-950 text-black dark:text-white min-h-screen pt-20 md:pt-28 pb-16 px-4 sm:px-8 md:px-12 max-w-[1440px] mx-auto w-full transition-colors duration-300">
      {/* Breadcrumb navigation */}
      <nav className="text-[11px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 flex flex-wrap gap-2">
        <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-black dark:hover:text-white transition-colors">Collections</Link>
        <span>/</span>
        <Link href={`/collections/${collection.slug}`} className="hover:text-black dark:hover:text-white transition-colors">{collection.name}</Link>
        <span>/</span>
        <span className="text-black dark:text-white font-medium">{product.name}</span>
      </nav>

      {/* Main product split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        
        {/* Left Column: Image Grid (8 cols on large screen) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {productImages.map((imgUrl, idx) => (
              <div 
                key={idx} 
                className={`relative bg-[#f4f4f4] aspect-[3/4] w-full overflow-hidden ${
                  idx === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <Image
                  src={imgUrl}
                  alt={`${product.name} view ${idx + 1}`}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, idx === 0 ? 80vw : 40vw"
                  className="object-cover object-center transition-all duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Sticky Product Info (5 cols on large screen) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 h-fit">
          <div className="space-y-6">
            
            {/* Title & Price Header */}
            <div className="space-y-2">
              <h1 className="text-[20px] sm:text-[24px] font-bold text-[#111111] dark:text-white uppercase tracking-wide leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3">
                <span className="text-[18px] font-semibold text-black dark:text-white">
                  {product.currencySymbol}{product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-[14px] text-neutral-400 dark:text-neutral-500 line-through">
                    {product.currencySymbol}{product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <p className="text-[10px] text-neutral-400 dark:text-neutral-500">
                including VAT, excluding shipping costs.
              </p>
            </div>

            <hr className="border-neutral-100 dark:border-neutral-800" />

            {/* Size selection block */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[12px] tracking-wider uppercase font-medium">
                <span>Size</span>
                <span className="text-neutral-400 dark:text-neutral-500 font-light text-[10px] lowercase normal-case">
                  Model is 185cm & wears size L
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-[12px] font-semibold tracking-wider transition-all border rounded-none cursor-pointer ${
                        isSelected
                          ? "bg-black dark:bg-white border-black dark:border-white text-white dark:text-black"
                          : "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 hover:border-neutral-400 dark:hover:border-neutral-600"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <span className="text-[12px] tracking-wider uppercase font-medium">Quantity</span>
              <div className="flex items-center w-32 border border-neutral-200 dark:border-neutral-800">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="px-3 py-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="flex-1 text-center text-[13px] font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)}
                  className="px-3 py-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToBasket}
                className={`flex-1 py-4 text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                  isAdded 
                    ? "bg-green-600 text-white" 
                    : "bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200"
                }`}
              >
                {isAdded ? "Added to Basket" : "Add to Basket"}
              </button>
              
              <button className="p-4 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center justify-center">
                <Heart size={18} className="text-neutral-500 dark:text-neutral-400 hover:text-red-500 transition-colors" />
              </button>
            </div>

            {/* Trust highlights / shipping parameters */}
            <div className="space-y-3 pt-2 text-[12px] text-neutral-600 dark:text-neutral-300 font-light">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>In stock and ready to ship</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck size={16} className="text-neutral-400 dark:text-neutral-500" />
                <span>Free shipping on orders over €99</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw size={14} className="text-neutral-400 dark:text-neutral-500" />
                <span>Free 14-day returns policy</span>
              </div>
              <div className="flex items-center gap-3">
                <Award size={16} className="text-neutral-400 dark:text-neutral-500" />
                <span>Earn up to {Math.round(product.price * 10)} loyalty reward points</span>
              </div>
            </div>

            <hr className="border-neutral-100 dark:border-neutral-800" />

            {/* Accordion Panels */}
            <div className="border-t border-neutral-100 dark:border-neutral-800 divide-y divide-neutral-100 dark:divide-neutral-800">
              
              {/* Accordion 1: Product details */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion("details")}
                  className="w-full flex justify-between items-center text-[12px] uppercase tracking-wider font-semibold py-1 text-left cursor-pointer text-black dark:text-white"
                >
                  <span>Product Details</span>
                  {activeAccordion === "details" ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                
                {activeAccordion === "details" && (
                  <div className="pt-3 pb-2 text-[12px] leading-relaxed text-neutral-600 dark:text-neutral-300 font-light space-y-2 animate-fade-in">
                    <p>{product.details.description}</p>
                    <div className="pt-2 space-y-1">
                      <p><strong>Fit:</strong> {product.details.fit}</p>
                      <p><strong>Color:</strong> {product.color}</p>
                      <ul className="list-disc pl-4 pt-1 space-y-1">
                        {product.details.features.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Material & Care */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion("material")}
                  className="w-full flex justify-between items-center text-[12px] uppercase tracking-wider font-semibold py-1 text-left cursor-pointer text-black dark:text-white"
                >
                  <span>Material & Care</span>
                  {activeAccordion === "material" ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                
                {activeAccordion === "material" && (
                  <div className="pt-3 pb-2 text-[12px] leading-relaxed text-neutral-600 dark:text-neutral-300 font-light space-y-1 animate-fade-in">
                    <p><strong>Fabric:</strong> {product.details.fabric}</p>
                    <p><strong>Care Instructions:</strong> {product.details.care}</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div className="py-3">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex justify-between items-center text-[12px] uppercase tracking-wider font-semibold py-1 text-left cursor-pointer text-black dark:text-white"
                >
                  <span>Shipping & Returns</span>
                  {activeAccordion === "shipping" ? <Minus size={14} /> : <Plus size={14} />}
                </button>
                
                {activeAccordion === "shipping" && (
                  <div className="pt-3 pb-2 text-[12px] leading-relaxed text-neutral-600 dark:text-neutral-300 font-light space-y-2 animate-fade-in">
                    <p>Orders are shipped within 24 hours of placement via premium logistics providers (DHL, UPS, Fedex).</p>
                    <p>Returns are fully free within 14 days of receiving your parcel. A return label is included inside the box.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
