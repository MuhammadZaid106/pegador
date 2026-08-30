import React from "react";
import Image from "next/image";

const HereAndNowSection = () => {
  return (
    <section className="bg-white dark:bg-neutral-950 py-16 md:py-24 px-4 sm:px-8 transition-colors duration-300">
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Left Text Column */}
          <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left h-full space-y-6 md:space-y-8 md:pr-4">
            <div className="space-y-4">
              <span className="block text-[11px] font-medium tracking-[0.25em] text-[#888] dark:text-neutral-400 uppercase mx-auto md:mx-0">
                NO RUSH. JUST PRESENCE.
              </span>
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#111] dark:text-white leading-none uppercase">
                HERE AND NOW
              </h2>
            </div>

            <p className="text-[13px] text-[#444] dark:text-neutral-300 leading-relaxed font-normal max-w-md md:max-w-none">
              The PEGADOR HERE AND NOW fall collection is made for the moment
              you&apos;re already in. A reminder to look up, breathe and step
              fully into your life.
            </p>
          </div>

          {/* Middle Image Column */}
          <div className="relative w-full h-auto">
            <Image
              src="/img12.webp"
              alt="Here and Now Image 1"
              width={1000}
              height={1250}
              priority
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Image Column */}
          <div className="relative w-full h-auto">
            <Image
              src="/img13.webp"
              alt="Here and Now Image 2"
              width={1000}
              height={1250}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HereAndNowSection;
