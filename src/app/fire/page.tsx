import React from "react";
import AnouncementBar from "@/component/AnouncementBar";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import StickyOffer from "@/component/StickyOffer";
import Image from "next/image";
import Link from "next/link";

export default function FirePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex flex-col justify-between transition-colors duration-300">
      <div>
        <AnouncementBar />
        <Header />
        <div className="relative w-full h-[50vh] sm:h-[65vh] bg-[#f4f4f4] dark:bg-neutral-900 overflow-hidden mt-12 sm:mt-16">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
            alt="Fire Campaign Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%]"
          />
          <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center px-4 text-white">
            <h1 className="text-[24px] sm:text-[36px] md:text-[44px] font-bold tracking-[0.25em] uppercase">
              FIRE CAMPAIGN
            </h1>
            <p className="text-[11px] sm:text-[13px] tracking-[0.2em] uppercase font-light mt-3 text-neutral-200">
              Lookbook FW 26 | Here and Now
            </p>
          </div>
        </div>
        <section className="py-16 sm:py-24 px-6 sm:px-12 max-w-[1000px] mx-auto text-center space-y-6">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#5147e5] uppercase">
            The Philosophy
          </span>
          <h2 className="text-[22px] sm:text-[30px] font-normal tracking-wide text-black dark:text-white uppercase leading-tight">
            PEGADOR is more than apparel. It is an urban statement.
          </h2>
          <p className="text-[13px] sm:text-[15px] text-neutral-500 dark:text-neutral-300 font-light leading-relaxed max-w-[800px] mx-auto">
            Established on the principles of creative freedom and high-street
            luxury, we design garments that bridge structural silhouettes and
            functional sportswear. Every garment tells a story of creative
            ambition and structural geometry.
          </p>
        </section>
        <section className="bg-neutral-50 dark:bg-neutral-900 py-16 sm:py-24 px-6 sm:px-12 transition-colors">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-16">
              <div className="space-y-3.5">
                <span className="text-[12px] font-bold tracking-wider text-[#111] dark:text-white uppercase block">
                  01. Progressive Design
                </span>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                  Oversized fits, custom cropped cuts, dropped shoulders, and
                  washed vintage treatments define our design DNA.
                </p>
              </div>
              <div className="space-y-3.5">
                <span className="text-[12px] font-bold tracking-wider text-[#111] dark:text-white uppercase block">
                  02. Structural Quality
                </span>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                  We use heavy cotton terry (up to 380 GSM), raw seam detailing,
                  and high-density branding prints built to last.
                </p>
              </div>
              <div className="space-y-3.5">
                <span className="text-[12px] font-bold tracking-wider text-[#111] dark:text-white uppercase block">
                  03. High Street Culture
                </span>
                <p className="text-[13px] text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
                  Our collections speak to progressive high-street fashion
                  enthusiasts globally. We represent high street community.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-screen-2xl mx-auto w-full">
          <div className="text-center mb-10 sm:mb-16">
            <h3 className="text-[16px] sm:text-[20px] font-normal tracking-[0.18em] uppercase text-black dark:text-white">
              Campaign Lookbooks
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative w-full aspect-[4/5] bg-[#f4f4f4] dark:bg-neutral-900 overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
                alt="Campaign looks 1"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                <span className="text-white text-[12px] font-bold tracking-widest uppercase">
                  City Ease
                </span>
              </div>
            </div>
            <div className="relative w-full aspect-[4/5] bg-[#f4f4f4] dark:bg-neutral-900 overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
                alt="Campaign looks 2"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                <span className="text-white text-[12px] font-bold tracking-widest uppercase">
                  Summer Dreams
                </span>
              </div>
            </div>
            <div className="relative w-full inherit aspect-[4/5] bg-[#f4f4f4] dark:bg-neutral-900 overflow-hidden group sm:col-span-2 lg:col-span-1">
              <Image
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80"
                alt="Campaign looks 3"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-6">
                <span className="text-white text-[12px] font-bold tracking-widest uppercase">
                  Minimal Essentials
                </span>
              </div>
            </div>

            <div className="col-span-3 flex items-center justify-center">
              <Link
                href="/collections"
                className="text-white dark:text-black text-[14px] font-semibold tracking-widest uppercase bg-black dark:bg-white px-6 py-3 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      </div>
      <div>
        <Footer />
        <StickyOffer />
      </div>
    </main>
  );
}
