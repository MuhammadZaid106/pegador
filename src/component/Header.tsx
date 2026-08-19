"use client";
import { useEffect, useState } from "react";
import { User, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { LayoutGroup, motion } from "motion/react";
import MegaMenu from "./header/MegaMenu";
import { navLinks } from "./header/menuData";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const useLightTheme = isScrolled || activeMenu !== null;

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      onMouseLeave={() => setActiveMenu(null)}
      className={`inset-x-0 top-0 z-50 px-4 pt-3 pb-4 transition-all duration-300 sm:px-8 ${
        isScrolled
          ? "fixed bg-white/95 shadow-md backdrop-blur-sm"
          : activeMenu
            ? "absolute bg-white"
            : "absolute bg-transparent"
      }`}
    >
      <div className="mx-[0.8rem] my-2 flex w-full max-w-screen-2xl items-center justify-between">
        <LayoutGroup id="header-nav-links">
          <nav className="flex items-center gap-6 sm:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onMouseEnter={() => setActiveMenu(link.label)}
              className={`relative text-[11px] font-medium tracking-[0.16em] transition-opacity hover:opacity-70 sm:text-[13px] ${
                useLightTheme ? "text-black" : "text-white"
              }`}
            >
              {link.label}
              {activeMenu === link.label ? (
                <motion.span
                  layoutId="nav-active-underline"
                  className="absolute left-1/2 top-[2.2rem] h-0.5 w-18 -translate-x-1/2 bg-neutral-500"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              ) : null}
            </Link>
          ))}
          </nav>
        </LayoutGroup>

        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="pointer-events-auto block w-44 sm:w-64 md:w-72">
            <img
              className={`h-8 w-full object-contain transition-all duration-300 ${
                useLightTheme ? "brightness-0" : ""
              }`}
              src="https://pegador.com/cdn/shop/files/3.svg?v=1758194581&width=400"
              alt="Pegador Logo"
              loading="eager"
              
            />
          </Link>
        </div>

        <div className="flex items-center gap-4 sm:gap-5">
          <button
            aria-label="Account"
            className={`transition-opacity hover:opacity-70 ${useLightTheme ? "text-black" : "text-white"}`}
          >
            <User size={26} strokeWidth={1.6} className="cursor-pointer"/>
          </button>
          <button
            aria-label="Search"
            className={`transition-opacity hover:opacity-70 ${useLightTheme ? "text-black" : "text-white"}`}
          >
            <Search size={26} strokeWidth={1.6} className="cursor-pointer" /> 
          </button>
          <button 
            aria-label="Bag"
            className={`transition-opacity hover:opacity-70 ${useLightTheme ? "text-black" : "text-white"}`}
          >
            <ShoppingBag size={26} strokeWidth={1.6} className="cursor-pointer" />
          </button>
        </div>
      </div>

      <MegaMenu activeMenu={activeMenu} onLinkClick={() => setActiveMenu(null)} />
    </header>
  );
};

export default Header;
