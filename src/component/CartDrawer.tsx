"use client";
import { useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[400px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <span className="text-[13px] font-bold tracking-[0.18em] uppercase">
            Your Bag
          </span>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-black hover:opacity-60 transition-opacity cursor-pointer"
          >
            <X size={22} strokeWidth={1.6} />
          </button>
        </div>

        {/* Empty state body */}
        <div className="flex flex-col flex-1 items-center justify-center px-8 text-center gap-5">
          <div className="mb-2">
            <ShoppingBag size={56} strokeWidth={1.2} className="text-black" />
          </div>

          <h2 className="text-[15px] font-bold tracking-[0.14em] uppercase">
            Your bag is empty
          </h2>

          <p className="text-[13px] text-neutral-500">Looking for ideas?</p>

          <Link
            href="/collections"
            onClick={onClose}
            className="mt-2 w-full max-w-[280px] bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase py-4 text-center transition-all duration-300 hover:bg-neutral-800"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
