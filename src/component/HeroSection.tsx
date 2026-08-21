import React from "react";
import Header from "./Header";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div>
      <section className="relative w-full h-[calc(100svh-36px)] lg:h-[calc(100vh-36px)] overflow-hidden bg-neutral-150">
        {/* background image */}
        <Image
          src="/img1.webp"
          alt="Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_top]"
        />

        {/* Header */}
        <Header />

        {/* Text  */}
        <div className="absolute inset-0 z-20 sm:mt-[230px] flex flex-col items-center justify-center gap-3 sm:gap-6 md:gap-8 px-4 text-center text-white">
          <h1 className="text-[10px] sm:text-xs md:text-[12px] tracking-[0.18em] font-medium">
            NEW FW &apos;26 COLLECTION ONLINE NOW
          </h1>
          <Image
            src="/img2.svg"
            alt="Here and Now logo"
            height={220}
            width={500}
            priority
            className="brightness-0 invert h-[3.5rem] w-48 sm:w-72 md:w-96 lg:w-[480px]"
          />
          <Link
            href="/collections/here-and-now"
            className="text-[10px] sm:text-xs md:text-[9px] uppercase tracking-[0.18em] font-medium underline underline-offset-8 decoration-1 hover:opacity-80 transition-opacity"
          >
            SHOP COLLECTION
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
