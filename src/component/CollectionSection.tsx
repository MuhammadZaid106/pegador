import React from "react";
import Image from "next/image";
import Link from "next/link";

const CollectionSection = () => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 sm:px-8">
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Men's Card */}
          <div className="relative w-full h-auto group cursor-pointer">
            <Image
              src="/img6.webp"
              alt="New Men's Collection"
              width={1000}
              height={1250}
              priority
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-6 left-6 z-10">
              <Link
                href="/collections/men"
                className="inline-block bg-white text-black px-5 py-3 text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:bg-black hover:text-white shadow-sm"
              >
                New Men&apos;s
              </Link>
            </div>
          </div>

          {/* Women's Card */}
          <div className="relative w-full h-auto group cursor-pointer">
            <Image
              src="/img7.webp"
              alt="New Women's Collection"
              width={1000}
              height={1250}
              priority
              className="w-full h-auto object-cover"
            />
            <div className="absolute top-6 left-6 z-10">
              <Link
                href="/collections/women"
                className="inline-block bg-white text-black px-5 py-3 text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:bg-black hover:text-white shadow-sm"
              >
                New Women&apos;s
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
