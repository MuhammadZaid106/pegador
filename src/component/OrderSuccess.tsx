"use client";

import Link from "next/link";
import { CheckCircle, Truck, Package } from "lucide-react";

interface OrderSuccessProps {
  orderNumber: string;
  total: string;
  itemCount: number;
  currency: string;
}

export default function OrderSuccess({
  orderNumber,
  total,
  itemCount,
  currency,
}: OrderSuccessProps) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] bg-white dark:bg-neutral-950 text-black dark:text-white px-4 py-20 text-center transition-colors duration-300">
      {/* Animated checkmark ring */}
      <div className="relative flex items-center justify-center mb-8">
        <span className="absolute inline-block w-36 h-36 rounded-full border border-neutral-200 dark:border-neutral-800 animate-ping opacity-10" />
        <span className="absolute inline-block w-28 h-28 rounded-full bg-neutral-50 dark:bg-neutral-900 animate-ping opacity-20" />
        <span className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-750 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <CheckCircle size={52} strokeWidth={1.4} className="text-black dark:text-white" />
        </span>
      </div>

      {/* Label */}
      <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-neutral-400 dark:text-neutral-500 mb-3">
        Order Confirmed
      </p>

      {/* Heading */}
      <h1 className="text-[26px] sm:text-[34px] font-bold tracking-[0.04em] uppercase text-black dark:text-white leading-tight mb-2">
        Thank You!
      </h1>

      {/* Subtext */}
      <p className="text-[13px] text-neutral-500 dark:text-neutral-400 max-w-sm leading-relaxed mb-8">
        Your order has been placed successfully. You&apos;ll receive a
        confirmation email shortly.
      </p>

      {/* Order info card */}
      <div className="w-full max-w-sm border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6 mb-8 text-left space-y-4 shadow-[0_2px_16px_rgba(0,0,0,0.04)] text-black dark:text-white transition-colors duration-300">
        {/* Order number */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500">
            Order Number
          </span>
          <span className="text-[13px] font-bold tracking-wider text-black dark:text-white">
            #{orderNumber}
          </span>
        </div>

        <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

        {/* Items */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500">
            Items
          </span>
          <span className="text-[13px] font-medium text-black dark:text-white">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

        {/* Total paid */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500">
            Total Paid
          </span>
          <span className="text-[16px] font-bold text-black dark:text-white">
            {currency}
            {total}
          </span>
        </div>

        <div className="h-px bg-neutral-200 dark:bg-neutral-800" />

        {/* Estimated delivery */}
        <div className="flex items-start gap-3 pt-1">
          <Truck
            size={16}
            strokeWidth={1.5}
            className="text-neutral-400 dark:text-neutral-500 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-black dark:text-white">
              Estimated Delivery
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              3 – 5 business days
            </p>
          </div>
        </div>

        {/* Tracking */}
        <div className="flex items-start gap-3">
          <Package
            size={16}
            strokeWidth={1.5}
            className="text-neutral-400 dark:text-neutral-500 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-black dark:text-white">
              Tracking
            </p>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
              Sent via email once dispatched
            </p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Link
          href="/collections"
          className="flex-1 bg-black dark:bg-white text-white dark:text-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase text-center hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          Shop More
        </Link>
        <Link
          href="/"
          className="flex-1 border border-neutral-200 dark:border-neutral-800 py-4 text-[11px] font-bold tracking-[0.22em] uppercase text-black dark:text-white text-center hover:border-black dark:hover:border-white transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
