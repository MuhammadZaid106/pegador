"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Logo */}
      <Link href="/" className="mb-16">
        <img
          src="https://pegador.com/cdn/shop/files/3.svg?v=1758194581&width=400"
          alt="PEGADOR"
          className="h-7 w-auto brightness-0 invert"
        />
      </Link>

      {/* Ghost text */}
      <div className="relative select-none mb-2">
        <span
          className="text-[clamp(100px,18vw,220px)] font-black leading-none tracking-tighter text-white/[0.04]"
          aria-hidden="true"
        >
          500
        </span>
        <span className="absolute inset-0 flex items-center justify-center text-[clamp(16px,2.5vw,24px)] font-light tracking-[0.35em] uppercase text-white">
          Something Went Wrong
        </span>
      </div>

      {/* Thin divider */}
      <div className="w-[1px] h-12 bg-white/20 my-8" />

      {/* Message */}
      <p className="text-[13px] text-white/50 tracking-wide text-center max-w-[380px] leading-relaxed mb-10">
        An unexpected error occurred on our end. Our team has been notified. You
        can try again or head back to the homepage.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[340px]">
        <button
          onClick={retry}
          className="flex-1 text-center py-3.5 bg-white text-black text-[12px] font-semibold tracking-[0.2em] uppercase hover:bg-white/90 transition-colors duration-200 cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="flex-1 text-center py-3.5 border border-white/30 text-white text-[12px] font-semibold tracking-[0.2em] uppercase hover:border-white transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>

      {/* Footer note */}
      <p className="mt-16 text-[10px] text-white/20 tracking-[0.2em] uppercase">
        PEGADOR\u00ae &mdash; Progressive Streetwear
      </p>
    </main>
  );
}
