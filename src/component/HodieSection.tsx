import React from "react";
import Image from "next/image";
import Link from "next/link";

const HodieSection = () => {
  return (
    <section className="w-full bg-white pb-12 md:pb-16">
      <div className="grid grid-cols-2 gap-x-0 gap-y-4 md:gap-y-6 w-full">
        <Link
          href="/collections/tees"
          className="relative w-full h-auto block group cursor-pointer"
        >
          <Image
            src="/img8.webp"
            alt="Tees Collection Left"
            width={1000}
            height={1250}
            priority
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-8 left-8 z-10">
            <span className="block text-white text-[9px] font-bold tracking-[0.2em] uppercase mb-2 drop-shadow-sm">
              PEOPLE FOR PEOPLES
            </span>
            <span className="inline-block bg-white text-black px-6 py-3 text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:bg-black hover:text-white shadow-sm">
              Tees
            </span>
          </div>
        </Link>

        <Link
          href="/collections/tees"
          className="relative w-full h-auto block group cursor-pointer"
        >
          <Image
            src="/img9.webp"
            alt="Tees Collection Right"
            width={1000}
            height={1250}
            priority
            className="w-full h-auto object-cover"
          />
        </Link>

        <Link
          href="/collections/hoodies"
          className="relative w-full h-auto block group cursor-pointer"
        >
          <Image
            src="/img10.webp"
            alt="Hoodies Collection Left"
            width={1000}
            height={1250}
            priority
            className="w-full h-auto object-cover"
          />
          <div className="absolute bottom-8 left-8 z-10">
            <span className="block text-white text-[9px] font-bold tracking-[0.2em] uppercase mb-2 drop-shadow-sm">
              LASTING AMBITION
            </span>
            <span className="inline-block bg-white text-black px-6 py-3 text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-300 hover:bg-black hover:text-white shadow-sm">
              Hoodies
            </span>
          </div>
        </Link>

        <Link
          href="/collections/hoodies"
          className="relative w-full h-auto block group cursor-pointer"
        >
          <Image
            src="/img11.webp"
            alt="Hoodies Collection Right"
            width={1000}
            height={1250}
            priority
            className="w-full h-auto object-cover"
          />
        </Link>
      </div>
    </section>
  );
};

export default HodieSection;
