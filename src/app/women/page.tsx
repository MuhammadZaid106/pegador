import React from "react";
import AnouncementBar from "@/component/AnouncementBar";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import StickyOffer from "@/component/StickyOffer";
import ProductCard from "@/component/ProductCard";
import productsDataRaw from "@/data/productsData.json";
import { Product } from "@/data";

const productsData: Product[] = productsDataRaw as Product[];

export default function WomenPage() {
  // Filter 12 Women's products
  const womenProducts = productsData
    .filter((p) => p.category === "WOMEN")
    .slice(0, 12);

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex flex-col justify-between transition-colors duration-300">
      <div>
        <AnouncementBar />
        <Header />

        {/* Page Content */}
        <section className="pt-24 sm:pt-32 pb-16 px-4 sm:px-8 md:px-12 max-w-screen-2xl mx-auto w-full">
          {/* Header Title */}
          <div className="text-center mb-10 sm:mb-16">
            <h1 className="text-[20px] sm:text-[26px] md:text-[30px] font-normal tracking-[0.18em] uppercase text-[#111111] dark:text-white">
              WOMEN'S COLLECTION
            </h1>
            <p className="text-[11px] sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-light mt-1">
              Elevated shapes, premium textures, and contemporary streetwear silhouettes
            </p>
          </div>

          {/* Grid: 2 columns on Mobile, 4 columns on Tablet & Laptop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12">
            {womenProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer & Offer Banner */}
      <div>
        <Footer />
        <StickyOffer />
      </div>
    </main>
  );
}
