"use client";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { removeItem, updateQuantity, clearCart } from "@/lib/redux/cartSlice";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
  ArrowLeft,
  Tag,
  CheckCircle,
  Package,
  Truck,
} from "lucide-react";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { useState } from "react";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderSnapshot, setOrderSnapshot] = useState<{
    orderNumber: string;
    total: string;
    itemCount: number;
    currency: string;
  } | null>(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 150 ? 0 : 9.95;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount + shipping;
  const currencySymbol =
    cartItems.length > 0 ? cartItems[0].product.currencySymbol : "€";

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === "PEGADOR10") {
      setPromoApplied(true);
    }
  };

  const handleCheckout = () => {
    const orderNumber = `PEG-${Date.now().toString().slice(-8).toUpperCase()}`;
    setOrderSnapshot({
      orderNumber,
      total: total.toFixed(2),
      itemCount: cartItems.reduce((s, i) => s + i.quantity, 0),
      currency: currencySymbol,
    });
    dispatch(clearCart());
    setOrderPlaced(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white pt-20">
        {/* ── Order Success Screen ── */}
        {orderPlaced && orderSnapshot && (
          <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-20 text-center">
            {/* Animated checkmark ring */}
            <div className="relative flex items-center justify-center mb-8">
              <span className="absolute inline-block w-28 h-28 rounded-full bg-neutral-50 animate-ping opacity-20" />
              <span className="relative flex items-center justify-center w-24 h-24 rounded-full bg-neutral-50 border border-neutral-100">
                <CheckCircle
                  size={52}
                  strokeWidth={1.4}
                  className="text-black"
                />
              </span>
            </div>

            {/* Heading */}
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-neutral-400 mb-3">
              Order Confirmed
            </p>
            <h1 className="text-[26px] sm:text-[34px] font-bold tracking-[0.04em] uppercase text-black leading-tight mb-2">
              Thank You!
            </h1>
            <p className="text-[13px] text-neutral-500 max-w-sm leading-relaxed mb-8">
              Your order has been placed successfully. You&apos;ll receive a
              confirmation email shortly.
            </p>

            {/* Order info card */}
            <div className="w-full max-w-sm border border-neutral-100 bg-neutral-50 p-6 mb-8 text-left space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                  Order Number
                </span>
                <span className="text-[13px] font-bold tracking-wider text-black">
                  #{orderSnapshot.orderNumber}
                </span>
              </div>
              <div className="h-px bg-neutral-200" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                  Items
                </span>
                <span className="text-[13px] font-medium text-black">
                  {orderSnapshot.itemCount}{" "}
                  {orderSnapshot.itemCount === 1 ? "item" : "items"}
                </span>
              </div>
              <div className="h-px bg-neutral-200" />
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                  Total Paid
                </span>
                <span className="text-[16px] font-bold text-black">
                  {orderSnapshot.currency}
                  {orderSnapshot.total}
                </span>
              </div>
              <div className="h-px bg-neutral-200" />
              {/* Estimated delivery */}
              <div className="flex items-start gap-3 pt-1">
                <Truck
                  size={16}
                  strokeWidth={1.5}
                  className="text-neutral-400 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-black">
                    Estimated Delivery
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    3 – 5 business days
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package
                  size={16}
                  strokeWidth={1.5}
                  className="text-neutral-400 mt-0.5 flex-shrink-0"
                />
                <div>
                  <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-black">
                    Tracking
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    Sent via email once dispatched
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              <Link
                href="/collections"
                className="flex-1 bg-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase text-white text-center hover:bg-neutral-800 transition-all duration-200"
              >
                Shop More
              </Link>
              <Link
                href="/"
                className="flex-1 border border-neutral-200 py-4 text-[11px] font-bold tracking-[0.22em] uppercase text-black text-center hover:border-black transition-all duration-200"
              >
                Back to Home
              </Link>
            </div>
          </section>
        )}

        {/* Page heading */}
        <section className="border-b border-neutral-100 px-4 py-8 sm:px-8">
          <div className="mx-auto max-w-screen-xl">
            {/* Breadcrumb */}
            <nav className="mb-4 flex items-center gap-1.5 text-[11px] tracking-[0.12em] text-neutral-400 uppercase">
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
              <ChevronRight size={12} strokeWidth={1.5} />
              <span className="text-black font-medium">Your Bag</span>
            </nav>

            <h1 className="text-[22px] sm:text-[28px] font-bold tracking-[0.06em] uppercase text-black">
              Your Bag
              <span className="ml-3 text-[14px] font-normal text-neutral-400 tracking-[0.1em] lowercase">
                ({cartItems.length}{" "}
                {cartItems.length === 1 ? "style" : "styles"})
              </span>
            </h1>
            <h1 className="mt-2 font-normal text-neutral-400 tracking-[0.1em]">
              Total Items : {cartItems.reduce((s, i) => s + i.quantity, 0)}
            </h1>
          </div>
        </section>
 
        {cartItems.length === 0 ? (
          /* ── Empty state ── */
          <section className="flex flex-col items-center justify-center gap-6 px-4 py-32 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-50">
              <ShoppingBag
                size={36}
                strokeWidth={1.2}
                className="text-neutral-300"
              />
            </div>
            <div>
              <h2 className="text-[15px] font-bold uppercase tracking-[0.18em] text-black">
                Your bag is empty
              </h2>
              <p className="mt-2 text-[13px] text-neutral-400">
                Looks like you haven&apos;t added anything yet.
              </p>
            </div>
            <Link
              href="/collections"
              className="mt-2 inline-block bg-black px-10 py-4 text-[11px] font-bold tracking-[0.22em] uppercase text-white transition-all duration-300 hover:bg-neutral-800"
            >
              Start Shopping
            </Link>
          </section>
        ) : (
          /* ── Cart with items ── */
          <section className="mx-auto max-w-screen-xl px-4 py-10 sm:px-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
              {/* Left — Cart items */}
              <div>
                {/* Column headers (desktop) */}
                <div className="hidden sm:grid sm:grid-cols-[80px_1fr_auto_auto] gap-4 items-center pb-3 border-b border-neutral-200 mb-2">
                  <span />
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                    Product
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 text-center">
                    Qty
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 text-right">
                    Total
                  </span>
                </div>

                <div className="divide-y divide-neutral-100">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-[80px_1fr] sm:grid-cols-[80px_1fr_auto_auto] gap-4 items-center py-6"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-[3/4] bg-[#f5f5f5] overflow-hidden group">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="80px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col justify-between self-stretch py-1">
                        <div>
                          <h3 className="text-[13px] font-semibold tracking-[0.04em] text-black leading-tight">
                            {item.product.name}
                          </h3>
                          <p className="mt-1 text-[11px] text-neutral-400 tracking-[0.1em] uppercase">
                            Size: {item.size}
                          </p>
                          <p className="mt-0.5 text-[12px] text-neutral-500">
                            {item.product.currencySymbol}
                            {item.product.price.toFixed(2)} / unit
                          </p>
                        </div>

                        {/* Mobile: qty + remove */}
                        <div className="flex items-center justify-between mt-3 sm:hidden">
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
                              className="flex h-8 w-8 items-center justify-center text-neutral-400 hover:text-black transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="w-8 text-center text-[13px] font-medium text-black">
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
                              className="flex h-8 w-8 items-center justify-center text-neutral-400 hover:text-black transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={11} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[13px] font-bold text-black">
                              {item.product.currencySymbol}
                              {(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => dispatch(removeItem(item.id))}
                              aria-label="Remove item"
                              className="text-neutral-300 hover:text-red-500 transition-colors p-1"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Desktop: Quantity stepper */}
                      <div className="hidden sm:flex items-center border border-neutral-200">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.id,
                                quantity: Math.max(1, item.quantity - 1),
                              }),
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center text-neutral-400 hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-9 text-center text-[13px] font-medium text-black">
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
                          className="flex h-9 w-9 items-center justify-center text-neutral-400 hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Desktop: Total + remove */}
                      <div className="hidden sm:flex flex-col items-end gap-2">
                        <span className="text-[14px] font-bold text-black">
                          {item.product.currencySymbol}
                          {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => dispatch(removeItem(item.id))}
                          aria-label="Remove item"
                          className="text-neutral-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue shopping */}
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-500 hover:text-black transition-colors"
                  >
                    <ArrowLeft size={14} strokeWidth={2} />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Right — Order Summary */}
              <div className="lg:sticky lg:top-28 h-fit">
                <div className="border border-neutral-100 bg-neutral-50 p-6 sm:p-8">
                  <h2 className="text-[12px] font-bold tracking-[0.22em] uppercase text-black mb-6">
                    Order Summary
                  </h2>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="mb-2 block text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag
                          size={13}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300"
                        />
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handlePromo()}
                          placeholder="Enter code"
                          disabled={promoApplied}
                          className="w-full border border-neutral-200 bg-white pl-9 pr-3 py-2.5 text-[12px] tracking-wider text-black placeholder:text-neutral-300 focus:border-black focus:outline-none disabled:opacity-50 transition-colors"
                        />
                      </div>
                      <button
                        onClick={handlePromo}
                        disabled={promoApplied || !promoCode.trim()}
                        className="bg-black px-4 py-2.5 text-[10px] font-bold tracking-[0.16em] uppercase text-white hover:bg-neutral-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                    </div>
                    {promoApplied && (
                      <p className="mt-1.5 text-[11px] text-green-600 tracking-wide">
                        ✓ Code applied — 10% discount
                      </p>
                    )}
                    {!promoApplied && promoCode && (
                      <p className="mt-1 text-[10px] text-neutral-400">
                        Try: PEGADOR10
                      </p>
                    )}
                  </div>

                  {/* Line items */}
                  <div className="space-y-3 pb-5 border-b border-neutral-200">
                    <div className="flex justify-between text-[12px] text-neutral-600">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        {currencySymbol}
                        {subtotal.toFixed(2)}
                      </span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-[12px] text-green-600">
                        <span>Discount (10%)</span>
                        <span className="font-medium">
                          −{currencySymbol}
                          {discount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-[12px] text-neutral-600">
                      <span>Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `${currencySymbol}${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <p className="text-[10px] text-neutral-400 leading-relaxed">
                        Free shipping on orders over {currencySymbol}150
                      </p>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-baseline pt-5 mb-6">
                    <span className="text-[12px] font-bold tracking-[0.16em] uppercase text-black">
                      Total
                    </span>
                    <div className="text-right">
                      <span className="text-[20px] font-bold tracking-tight text-black">
                        {currencySymbol}
                        {total.toFixed(2)}
                      </span>
                      <p className="text-[10px] text-neutral-400 mt-0.5">
                        Incl. VAT
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase text-white hover:bg-neutral-800 active:scale-[0.99] transition-all duration-200"
                  >
                    Proceed to Checkout
                  </button>

                  {/* Trust badges */}
                  <div className="mt-5 flex flex-col gap-2 text-center">
                    <p className="text-[10px] text-neutral-400 leading-relaxed">
                      Secure checkout · Free returns · 30-day guarantee
                    </p>
                    <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                      {["Visa", "MC", "PayPal", "Klarna"].map((pm) => (
                        <span
                          key={pm}
                          className="rounded border border-neutral-200 bg-white px-2 py-0.5 text-[9px] font-semibold text-neutral-500 tracking-wider uppercase"
                        >
                          {pm}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
