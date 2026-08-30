"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { User, Search, ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { LayoutGroup, motion } from "motion/react";
import MegaMenu from "./header/MegaMenu";
import { useTheme } from "@/component/ThemeProvider";
import { navLinks, megaMenuByNav } from "@/constants/navigation";
import CartDrawer from "./CartDrawer";
import SearchOverlay from "./SearchOverlay";
import { useAppSelector } from "@/lib/redux/hooks";
import { useScrolled } from "@/hooks/useScrolled";
import { useCartDrawer } from "@/hooks/useCartDrawer";
import { useScrollLock } from "@/hooks/useScrollLock";

const Header = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { theme, toggleTheme } = useTheme();

  const isScrolled = useScrolled(12);
  const { isCartOpen, setIsCartOpen } = useCartDrawer();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileTab, setExpandedMobileTab] = useState<string | null>(
    null,
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const useLightTheme =
    !isHomePage || isScrolled || activeMenu !== null || isMobileMenuOpen;

  // Lock scroll when mobile menu is open
  useScrollLock(isMobileMenuOpen);

  const toggleMobileTab = (label: string) => {
    setExpandedMobileTab(expandedMobileTab === label ? null : label);
  };

  return (
    <>
      <header
        onMouseLeave={() => setActiveMenu(null)}
        className={`inset-x-0 top-0 z-50 px-4 py-2 transition-all duration-300 sm:px-8 ${
          isScrolled || isMobileMenuOpen || !isHomePage
            ? "fixed bg-white/95 dark:bg-neutral-950/95 shadow-sm border-b border-neutral-100 dark:border-neutral-800 backdrop-blur-sm"
            : activeMenu
              ? "absolute bg-white dark:bg-neutral-950"
              : "absolute bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between relative h-12 gap-2">
          {/* Left Side: Mobile Hamburger Menu Button & Desktop Nav */}
          <div className="flex flex-1 items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`block lg:hidden cursor-pointer transition-opacity hover:opacity-70 ${
                useLightTheme ? "text-black dark:text-white" : "text-white"
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X size={22} strokeWidth={1.6} />
              ) : (
                <Menu size={22} strokeWidth={1.6} />
              )}
            </button>

            <div className="hidden lg:block">
              <LayoutGroup id="header-nav-links">
                <nav className="flex items-center gap-6 sm:gap-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onMouseEnter={() => setActiveMenu(link.label)}
                      className={`relative text-[11px] font-medium tracking-[0.16em] transition-opacity hover:opacity-70 sm:text-[13px] ${
                        useLightTheme ? "text-black dark:text-white" : "text-white"
                      }`}
                    >
                      {link.label}
                      {activeMenu === link.label ? (
                        <motion.span
                          layoutId="nav-active-underline"
                          className="absolute left-1/2 top-[2.2rem] h-0.5 w-18 -translate-x-1/2 bg-neutral-500"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      ) : null}
                    </Link>
                  ))}
                </nav>
              </LayoutGroup>
            </div>
          </div>

          {/* Center: Brand Logo */}
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
            <Link
              href="/"
              className="pointer-events-auto block w-24 sm:w-40 lg:w-64"
            >
              <img
                className={`h-5 sm:h-7 lg:h-8 w-full object-contain transition-all duration-300 ${
                  useLightTheme ? "brightness-0 dark:brightness-100" : ""
                }`}
                src="https://pegador.com/cdn/shop/files/3.svg?v=1758194581&width=400"
                alt="Pegador Logo"
                loading="eager"
              />
            </Link>
          </div>

          {/* Right Side: Account, Search, Cart Icons */}
          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`transition-opacity hover:opacity-70 cursor-pointer flex items-center justify-center ${
                useLightTheme ? "text-black dark:text-white" : "text-white"
              }`}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Sun size={20} strokeWidth={1.6} className="lg:w-6 lg:h-6" />
                ) : (
                  <Moon size={20} strokeWidth={1.6} className="lg:w-6 lg:h-6" />
                )}
              </motion.div>
            </button>

            <Link
              href="/login"
              aria-label="Account"
              className={`transition-opacity hover:opacity-70 ${
                useLightTheme ? "text-black dark:text-white" : "text-white"
              }`}
            >
              <User size={20} strokeWidth={1.6} className="lg:w-6 lg:h-6" />
            </Link>

            {/* Search Button - visible on all screens */}
            <button
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              className={`transition-opacity hover:opacity-70 cursor-pointer ${
                useLightTheme ? "text-black dark:text-white" : "text-white"
              }`}
            >
              <Search size={20} strokeWidth={1.6} className="lg:w-6 lg:h-6" />
            </button>

            <button
              aria-label="Bag"
              onClick={() => setIsCartOpen(true)}
              className={`relative transition-opacity hover:opacity-70 ${
                useLightTheme ? "text-black dark:text-white" : "text-white"
              }`}
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.6}
                className="cursor-pointer lg:w-6 lg:h-6"
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#5147e5] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-fade-in">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu */}
        <div className="hidden lg:block">
          <MegaMenu
            activeMenu={activeMenu}
            onLinkClick={() => setActiveMenu(null)}
          />
        </div>

        {/* Mobile Dropdown Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-[60px] z-40 bg-white dark:bg-neutral-950 overflow-y-auto px-6 py-8 flex flex-col lg:hidden border-t border-neutral-100 dark:border-neutral-800 h-[calc(100vh-60px)]">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const subMenu = megaMenuByNav[link.label];
                const isExpanded = expandedMobileTab === link.label;

                return ( 
                  <div
                    key={link.label}
                    className="border-b border-neutral-100 dark:border-neutral-800 pb-3"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-base font-bold tracking-[0.14em] text-black dark:text-white"
                      >
                        {link.label}
                      </Link>
                      {subMenu && (
                        <button
                          onClick={() => toggleMobileTab(link.label)}
                          className="text-neutral-500 dark:text-neutral-400 font-medium text-lg px-3 py-1 cursor-pointer focus:outline-none"
                        >
                          {isExpanded ? "−" : "+"}
                        </button>
                      )}
                    </div>

                    {/* Submenu Accordion */}
                    {subMenu && isExpanded && (
                      <div className="mt-4 pl-3 flex flex-col gap-5 animate-fade-in">
                        {subMenu.columns.map((column) => (
                          <div key={column.title}>
                            <h4 className="text-[10px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase mb-2">
                              {column.title}
                            </h4>
                            <div className="flex flex-col gap-2.5 pl-2">
                              {column.links.map((subLink) => (
                                <Link
                                  key={subLink.label}
                                  href={subLink.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="text-[13px] text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white font-medium transition-colors"
                                >
                                  {subLink.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Account & Info Links */}
            <div className="mt-auto pt-10 flex flex-col gap-4 text-center pb-10">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[12px] text-white dark:text-black font-semibold tracking-[0.15em] uppercase hover:bg-neutral-500 dark:hover:bg-neutral-200 bg-black dark:bg-white px-6 py-3"
              >
                My Account
              </Link>
              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 tracking-wider">
                © 2026 PEGADOR®
              </div>
            </div>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Header;
