import React from "react";
import Header from "./Header";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div>
      <section className="relative w-full overflow-hidden">
        {/* background image */}
        <Image
          src="/img1.webp"
          alt="Background"
          height={2000}
          width={2000}
          priority
          sizes="100vw"
          className="w-full h-auto"  
        />

      {/* Header */}
        <Header />

      {/* Text  */}
        <div className="absolute top-0 left-0 w-full h-screen z-20 mt-30 flex flex-col items-center justify-center gap-8 px-4 text-center text-white">
          <h1 className="text-sm tracking-widest sm:text-sm md:text-[0.8rem]">
            NEW FW &apos;26 COLLECTION ONLINE NOW
          </h1>
          <Image
            src="/img2.svg"
            alt="Foreground"
            height={220}
            width={500}
            priority
            className="h-16 w-72 sm:w-104 md:w-lg"
          />
          <Link
            href="#"
            className="text-[0.6rem] uppercase tracking-[0.16em] underline underline-offset-4"
          >
            Shop Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
