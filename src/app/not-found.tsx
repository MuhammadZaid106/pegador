import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Logo bar */}
      <div className="flex justify-center pt-10">
        <Link href="/">
          <img
            src="https://pegador.com/cdn/shop/files/3.svg?v=1758194581&width=400"
            alt="PEGADOR"
            className="h-7 w-auto brightness-0"
          />
        </Link>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center gap-6 pb-20">

        {/* Large 404 background watermark */}
        <p className="text-[120px] sm:text-[180px] font-black leading-none tracking-tighter text-black/[0.05] select-none">
          404
        </p>

        {/* Text block */}
        <div className="-mt-16 sm:-mt-24 flex flex-col items-center gap-4">
          <h1 className="text-[28px] sm:text-[36px] font-bold tracking-[0.06em] uppercase text-[#1a1a1a]">
            Page Not Found
          </h1>
          <p className="text-[13px] sm:text-[14px] text-neutral-500 max-w-[340px] leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-neutral-200 my-2" />

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs sm:max-w-sm">
          <Link
            href="/"
            className="w-full sm:w-auto flex-1 text-center bg-[#1a1a1a] text-white text-[11px] font-bold tracking-[0.22em] uppercase px-8 py-4 transition-colors duration-200 shadow-sm hover:bg-[#fafafa] hover:text-black border border-neutral-300"
          >
            Back to Home
          </Link>
          <Link
            href="/collections"
            className="w-full sm:w-auto flex-1 text-center border border-neutral-300 text-[#1a1a1a] text-[11px] font-bold tracking-[0.22em] uppercase px-8 py-4 hover:bg-black hover:text-white transition-colors duration-200"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Footer hint */}
      <div className="pb-10 flex justify-center">
        <p className="text-[11px] text-neutral-400 tracking-widest uppercase">
          &copy; PEGADOR&reg;
        </p>
      </div>
    </main>
  );
}