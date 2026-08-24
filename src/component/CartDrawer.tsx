"use client";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { removeItem, updateQuantity } from "@/lib/redux/cartSlice";
import { useScrollLock } from "@/hooks/useScrollLock";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  useScrollLock(isOpen);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const currencySymbol =
    cartItems.length > 0 ? cartItems[0].product.currencySymbol : "€";

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <div>
            <span className="text-[13px] font-bold tracking-[0.18em] uppercase">
              Your Bag
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-black font-normal tracking-[0.12em]">
                {cartItems.length} {cartItems.length === 1 ? "style" : "styles"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-black hover:opacity-60 transition-opacity cursor-pointer"
          >
            <X size={22} strokeWidth={1.6} />
          </button>
        </div>

        {/* Cart items list */}
        {cartItems.length === 0 ? (
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
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-neutral-100">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 first:pt-0">
                  {/* Image */}
                  <div className="relative w-20 aspect-[3/4] bg-[#f4f4f4] flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between gap-2">
                        <h3 className="text-[12px] sm:text-[13px] font-normal text-black line-clamp-2">
                          {item.product.name}
                        </h3>
                        <span className="text-[12px] font-semibold text-black flex-shrink-0">
                          {item.product.currencySymbol}
                          {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Size: {item.size}
                      </p>
                    </div>

                    {/* Qty & Remove */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: Math.max(1, item.quantity - 1),
                              }),
                            )
                          }
                          className="px-2.5 py-1 text-neutral-500 hover:text-black transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className="text-[12px] font-medium w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: item.quantity + 1,
                              }),
                            )
                          }
                          className="px-2.5 py-1 text-neutral-500 hover:text-black transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-neutral-100 bg-neutral-50 space-y-4">
              <div className="flex flex-col text-[13px] font-bold uppercase tracking-wider space-y-2">
                <div className="flex items-center justify-between">
                  <span className="tracking-[0.12em]">
                    Total.{" "}
                    {cartItems.reduce((s, i) => s + i.quantity, 0) === 1
                      ? "item"
                      : "items"}
                  </span>
                  <span>
                    {cartItems.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                </div>
                <div className="h-px w-full bg-gray-200" />
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>
                    {currencySymbol}
                    {subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                Shipping, taxes, and discounts will be calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full bg-black text-white text-[11px] font-bold tracking-[0.2em] uppercase py-4 text-center hover:bg-neutral-800 transition-all"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
