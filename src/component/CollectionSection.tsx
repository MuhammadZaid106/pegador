import React from "react";
import Image from "next/image";
import Link from "next/link";

const CollectionSection = () => {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-screen-2xl">
        {/* Mobile: horizontal scrollable row. md+: standard 2-col grid */}
        <div
          className="
          flex flex-row overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-4
          md:grid md:grid-cols-2 md:overflow-visible md:px-8 md:pb-0 md:gap-6
          scrollbar-hide
        "
        >
          {/* Men's Card */}
          <div className="relative shrink-0 w-[80vw] sm:w-[60vw] md:w-full snap-start group cursor-pointer">
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
          <div className="relative shrink-0 w-[80vw] sm:w-[60vw] md:w-full snap-start group cursor-pointer">
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
