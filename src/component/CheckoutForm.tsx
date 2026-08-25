"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Lock,
  CreditCard,
  MapPin,
  User,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface CheckoutFormProps {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  itemCount: number;
  onBack: () => void;
  onConfirm: () => void;
}

type Step = "contact" | "shipping" | "payment";

const inputClass =
  "w-full border border-neutral-200 bg-white px-4 py-3 text-[13px] tracking-wide text-black placeholder:text-neutral-300 focus:border-black focus:outline-none transition-colors";

const labelClass =
  "block text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 mb-1.5";

export default function CheckoutForm({
  subtotal,
  shipping,
  discount,
  total,
  currency,
  itemCount,
  onBack,
  onConfirm,
}: CheckoutFormProps) {
  const [step, setStep] = useState<Step>("contact");

  /* ── Contact ── */
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  /* ── Shipping ── */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [apt, setApt] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  /* ── Payment ── */
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCard = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const steps: { id: Step; label: string }[] = [
    { id: "contact", label: "Contact" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <section className="min-h-[calc(100vh-80px)] bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          {/* ── Left panel ── */}
          <div>
            {/* Back button */}
            <button
              onClick={onBack}
              className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-500 hover:text-black transition-colors"
            >
              <ArrowLeft size={14} strokeWidth={2} />
              Back to Bag
            </button>

            {/* Step breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-all duration-300 ${
                        i < stepIndex
                          ? "bg-black text-white"
                          : i === stepIndex
                          ? "bg-black text-white"
                          : "bg-neutral-100 text-neutral-400"
                      }`}
                    >
                      {i < stepIndex ? "✓" : i + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold tracking-[0.16em] uppercase transition-colors duration-300 ${
                        i === stepIndex ? "text-black" : "text-neutral-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight size={12} className="text-neutral-300" />
                  )}
                </div>
              ))}
            </div>

            {/* ── STEP 1: Contact ── */}
            {step === "contact" && (
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5 flex items-center gap-2">
                    <User size={13} strokeWidth={2} />
                    Contact Information
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+49 000 000 0000"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep("shipping")}
                  disabled={!email.trim() || !phone.trim()}
                  className="w-full bg-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase text-white hover:bg-neutral-800 active:scale-[0.99] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {/* ── STEP 2: Shipping ── */}
            {step === "shipping" && (
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5 flex items-center gap-2">
                    <MapPin size={13} strokeWidth={2} />
                    Shipping Address
                  </p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>First Name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Max"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Mustermann"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Street Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Musterstraße 12"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Apartment / Suite (optional)</label>
                      <input
                        type="text"
                        value={apt}
                        onChange={(e) => setApt(e.target.value)}
                        placeholder="Apt 4B"
                        className={inputClass}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>City</label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Berlin"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Postal Code</label>
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          placeholder="10115"
                          className={inputClass}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Country</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className={`${inputClass} cursor-pointer`}
                      >
                        <option value="">Select country…</option>
                        <option>Germany</option>
                        <option>Austria</option>
                        <option>Switzerland</option>
                        <option>Netherlands</option>
                        <option>France</option>
                        <option>Italy</option>
                        <option>Spain</option>
                        <option>United Kingdom</option>
                        <option>United States</option>
                        <option>Pakistan</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Shipping method */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 mb-3">
                    Shipping Method
                  </p>
                  <div className="space-y-2">
                    {[
                      { label: "Standard Delivery", sub: "3–5 business days", price: shipping === 0 ? "Free" : `${currency}${shipping.toFixed(2)}` },
                      { label: "Express Delivery", sub: "1–2 business days", price: `${currency}${(shipping + 9.95).toFixed(2)}` },
                    ].map((opt) => (
                      <label
                        key={opt.label}
                        className="flex items-center justify-between border border-neutral-200 px-4 py-3 cursor-pointer hover:border-black transition-colors has-[:checked]:border-black"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            defaultChecked={opt.label === "Standard Delivery"}
                            className="accent-black"
                          />
                          <div>
                            <p className="text-[12px] font-semibold text-black tracking-wide">
                              {opt.label}
                            </p>
                            <p className="text-[11px] text-neutral-400">{opt.sub}</p>
                          </div>
                        </div>
                        <span className="text-[12px] font-bold text-black">{opt.price}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep("payment")}
                  disabled={!firstName.trim() || !lastName.trim() || !address.trim() || !city.trim() || !postalCode.trim() || !country}
                  className="w-full bg-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase text-white hover:bg-neutral-800 active:scale-[0.99] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* ── STEP 3: Payment ── */}
            {step === "payment" && (
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 mb-5 flex items-center gap-2">
                    <CreditCard size={13} strokeWidth={2} />
                    Payment Details
                  </p>

                  {/* Card preview strip */}
                  <div className="mb-6 bg-black rounded-none p-5 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#fff_0%,_transparent_60%)]" />
                    <div className="flex justify-between items-start mb-8">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/50">
                        Pegador
                      </span>
                      <div className="flex gap-1">
                        <span className="w-6 h-6 rounded-full bg-red-500 opacity-80" />
                        <span className="w-6 h-6 rounded-full bg-yellow-400 opacity-80 -ml-2" />
                      </div>
                    </div>
                    <p className="text-[18px] font-mono tracking-[0.22em] text-white mb-3">
                      {cardNumber || "•••• •••• •••• ••••"}
                    </p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.14em] text-white/40 mb-0.5">Card Holder</p>
                        <p className="text-[12px] font-semibold uppercase tracking-wider text-white">
                          {cardName || "YOUR NAME"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] uppercase tracking-[0.14em] text-white/40 mb-0.5">Expires</p>
                        <p className="text-[12px] font-semibold tracking-wider text-white">{expiry || "MM/YY"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Name on Card</label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="MAX MUSTERMANN"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCard(e.target.value))}
                          placeholder="0000 0000 0000 0000"
                          className={`${inputClass} pr-10`}
                        />
                        <CreditCard
                          size={16}
                          strokeWidth={1.5}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Expiry Date</label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className={labelClass}>CVV</label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="•••"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Security note */}
                  <div className="flex items-center gap-2 mt-4 text-neutral-400">
                    <ShieldCheck size={13} strokeWidth={1.5} />
                    <p className="text-[10px] tracking-wide">
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </div>
                </div>

                <button
                  onClick={onConfirm}
                  disabled={!cardName.trim() || cardNumber.replace(/\s/g, "").length < 16 || expiry.length < 5 || cvv.length < 3}
                  className="w-full bg-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase text-white hover:bg-neutral-800 active:scale-[0.99] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Lock size={12} strokeWidth={2.5} />
                  Place Order — {currency}{total.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* ── Right: Order summary ── */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="border border-neutral-100 bg-neutral-50 p-6 sm:p-8">
              <h2 className="text-[12px] font-bold tracking-[0.22em] uppercase text-black mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 pb-5 border-b border-neutral-200">
                <div className="flex justify-between text-[12px] text-neutral-600">
                  <span>
                    Subtotal{" "}
                    <span className="text-neutral-400">
                      ({itemCount} {itemCount === 1 ? "item" : "items"})
                    </span>
                  </span>
                  <span className="font-medium">
                    {currency}{subtotal.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[12px] text-green-600">
                    <span>Discount (10%)</span>
                    <span className="font-medium">
                      −{currency}{discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[12px] text-neutral-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `${currency}${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-5 mb-6">
                <span className="text-[12px] font-bold tracking-[0.16em] uppercase text-black">
                  Total
                </span>
                <div className="text-right">
                  <span className="text-[20px] font-bold tracking-tight text-black">
                    {currency}{total.toFixed(2)}
                  </span>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Incl. VAT</p>
                </div>
              </div>

              {/* Payment logos */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-2 border-t border-neutral-100">
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
  );
}
