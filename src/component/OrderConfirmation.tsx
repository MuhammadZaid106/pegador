"use client";

import { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle,
  Package,
  Truck,
  AlertTriangle,
} from "lucide-react";

interface OrderConfirmationProps {
  isOpen: boolean;
  total: string;
  currency: string;
  itemCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

type ModalStep = "confirm" | "success";

export default function OrderConfirmation({
  isOpen,
  total,
  currency,
  itemCount,
  onConfirm,
  onCancel,
}: OrderConfirmationProps) {
  const [step, setStep] = useState<ModalStep>("confirm");
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset to confirm step when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("confirm");
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
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

  if (!isOpen) return null;

  const handleConfirm = () => {
    setStep("success");
    onConfirm();
  };

  const orderNumber = `PEG-${Date.now().toString().slice(-8)}`;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 transition-all duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={step === "confirm" ? onCancel : undefined}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md bg-white dark:bg-neutral-950 text-black dark:text-white shadow-[0_24px_80px_rgba(0,0,0,0.2)] border dark:border-neutral-800 transition-all duration-500 ${
          isAnimating
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        {/* ── Confirmation Step ── */}
        {step === "confirm" && (
          <div>
            {/* Close button */}
            <button
              onClick={onCancel}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-neutral-400 dark:text-neutral-500 hover:text-black dark:hover:text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {/* Header accent bar */}
            <div className="h-1 bg-black dark:bg-white" />

            <div className="px-6 pt-8 pb-6 sm:px-8">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850">
                  <AlertTriangle
                    size={28}
                    strokeWidth={1.5}
                    className="text-black dark:text-white"
                  />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-center text-[14px] sm:text-[16px] font-bold tracking-[0.08em] uppercase text-black dark:text-white mb-2">
                Confirm Your Order
              </h2>
              <p className="text-center text-[12px] sm:text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                Please review your order details before placing.
              </p>

              {/* Order summary card */}
              <div className="border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-5 mb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500">
                    Items
                  </span>
                  <span className="text-[13px] font-medium text-black dark:text-white">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>
                <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500">
                    Total Amount
                  </span>
                  <span className="text-[18px] font-bold tracking-tight text-black dark:text-white">
                    {currency}
                    {total}
                  </span>
                </div>
              </div>

              {/* Security badge */}
              <div className="flex items-center justify-center gap-2 mb-6 text-neutral-400 dark:text-neutral-500">
                <ShieldCheck size={13} strokeWidth={1.5} />
                <p className="text-[10px] tracking-wide">
                  Secured with 256-bit SSL encryption
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleConfirm}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <CheckCircle size={14} strokeWidth={2} />
                  Confirm & Place Order
                </button>
                <button
                  onClick={onCancel}
                  className="w-full border border-neutral-200 dark:border-neutral-800 py-3.5 text-[11px] font-bold tracking-[0.22em] uppercase text-neutral-500 dark:text-neutral-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Success Step ── */}
        {step === "success" && (
          <div>
            {/* Header accent bar */}
            <div className="h-1 bg-black dark:bg-white" />

            <div className="px-6 pt-8 pb-6 sm:px-8">
              {/* Animated checkmark */}
              <div className="relative flex items-center justify-center mb-6">
                <span className="absolute inline-block w-24 h-24 rounded-full border border-neutral-200 dark:border-neutral-800 animate-ping opacity-10" />
                <span className="absolute inline-block w-20 h-20 rounded-full bg-neutral-50 dark:bg-neutral-900 animate-ping opacity-20" />
                <span className="relative flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                  <CheckCircle
                    size={36}
                    strokeWidth={1.4}
                    className="text-black dark:text-white"
                  />
                </span>
              </div>

              {/* Label */}
              <p className="text-center text-[10px] font-bold tracking-[0.26em] uppercase text-neutral-400 dark:text-neutral-500 mb-2">
                Order Placed
              </p>

              {/* Title */}
              <h2 className="text-center text-[20px] sm:text-[24px] font-bold tracking-[0.04em] uppercase text-black dark:text-white leading-tight mb-2">
                Thank You!
              </h2>
              <p className="text-center text-[12px] sm:text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                Your order has been placed successfully. You&apos;ll receive a
                confirmation email shortly.
              </p>

              {/* Order info */}
              <div className="border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-4 sm:p-5 mb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500">
                    Order Number
                  </span>
                  <span className="text-[13px] font-bold tracking-wider text-black dark:text-white">
                    #{orderNumber}
                  </span>
                </div>
                <div className="h-px bg-neutral-200 dark:bg-neutral-800" />
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

                {/* Delivery estimate */}
                <div className="flex items-start gap-3 pt-1">
                  <Truck
                    size={15}
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
                    size={15}
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

              {/* CTA */}
              <button
                onClick={onCancel}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.99] transition-all duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}