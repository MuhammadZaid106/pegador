"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrderConfirmation from "@/component/OrderConfirmation";
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
  "w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 text-[13px] tracking-wide text-black dark:text-white placeholder:text-neutral-300 dark:placeholder:text-neutral-500 focus:border-black dark:focus:border-white focus:outline-none transition-colors";

const labelClass =
  "block text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500 mb-1.5";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email address is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9\s\-()]{7,15}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  address: Yup.string().required("Street address is required"),
  apt: Yup.string().optional(),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string()
    .matches(/^[0-9a-zA-Z\s-]{3,10}$/, "Please enter a valid postal code")
    .required("Postal code is required"),
  country: Yup.string().required("Please select a country"),
  cardName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name on card is required"),
  cardNumber: Yup.string()
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be 16 digits")
    .required("Card number is required"),
  expiry: Yup.string()
    .required("Expiry date is required")
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry must be MM/YY")
    .test("not-expired", "Card is expired", (value) => {
      if (!value || !/^\d{2}\/\d{2}$/.test(value)) return true;
      const [monthStr, yearStr] = value.split("/");
      const month = parseInt(monthStr, 10);
      const year = 2000 + parseInt(yearStr, 10);
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth() + 1;
      if (year < currentYear) return false;
      if (year === currentYear && month < currentMonth) return false;
      return true;
    }),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
    .required("CVV is required"),
});

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
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      address: "",
      apt: "",
      city: "",
      postalCode: "",
      country: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
    validationSchema,
    onSubmit: () => {
      setShowConfirmModal(true);
    },
  });

  const validateStep = async (fields: string[]) => {
    fields.forEach((field) => formik.setFieldTouched(field, true, false));
    const errors = await formik.validateForm();
    const stepHasErrors = fields.some(
      (field) => !!errors[field as keyof typeof errors],
    );
    return !stepHasErrors;
  };

  const getInputClass = (fieldName: keyof typeof formik.values) => {
    const hasError = formik.touched[fieldName] && formik.errors[fieldName];
    return `${inputClass} ${hasError ? "border-red-500 focus:border-red-500" : ""}`;
  };

  const renderError = (fieldName: keyof typeof formik.values) => {
    const hasError = formik.touched[fieldName] && formik.errors[fieldName];
    if (!hasError) return null;
    return (
      <p className="mt-1 text-[11px] font-semibold tracking-wide text-red-500">
        {formik.errors[fieldName]}
      </p>
    );
  };

  const formatCard = (val: string) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  };

  const steps: { id: Step; label: string }[] = [
    { id: "contact", label: "Contact" },
    { id: "shipping", label: "Shipping" },
    { id: "payment", label: "Payment" },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  return (
    <section className="min-h-[calc(100vh-80px)] bg-white dark:bg-neutral-950 text-black dark:text-white transition-colors duration-300">
      <div className="mx-auto max-w-screen-xl px-4 py-10 sm:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          {/* ── Left panel ── */}
          <div>
            {/* Back button */}
            <button
              onClick={onBack}
              className="mb-8 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
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
                          ? "bg-black dark:bg-white text-white dark:text-black"
                          : i === stepIndex
                            ? "bg-black dark:bg-white text-white dark:text-black"
                            : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500"
                      }`}
                    >
                      {i < stepIndex ? "✓" : i + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold tracking-[0.16em] uppercase transition-colors duration-300 ${
                        i === stepIndex ? "text-black dark:text-white" : "text-neutral-400 dark:text-neutral-500"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight size={12} className="text-neutral-300 dark:text-neutral-600" />
                  )}
                </div>
              ))}
            </div>

            {/* ── STEP 1: Contact ── */}
            {step === "contact" && (
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-5 flex items-center gap-2">
                    <User size={13} strokeWidth={2} />
                    Contact Information
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="you@example.com"
                        className={getInputClass("email")}
                      />
                      {renderError("email")}
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="+49 000 000 0000"
                        className={getInputClass("phone")}
                      />
                      {renderError("phone")}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    const isValid = await validateStep(["email", "phone"]);
                    if (isValid) setStep("shipping");
                  }}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.99] transition-all duration-200"
                >
                  Continue to Shipping
                </button>
              </div>
            )}

            {/* ── STEP 2: Shipping ── */}
            {step === "shipping" && (
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-5 flex items-center gap-2">
                    <MapPin size={13} strokeWidth={2} />
                    Shipping Address
                  </p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Max"
                          className={getInputClass("firstName")}
                        />
                        {renderError("firstName")}
                      </div>
                      <div>
                        <label className={labelClass}>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Mustermann"
                          className={getInputClass("lastName")}
                        />
                        {renderError("lastName")}
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Street Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Musterstraße 12"
                        className={getInputClass("address")}
                      />
                      {renderError("address")}
                    </div>
                    <div>
                      <label className={labelClass}>
                        Apartment / Suite (optional)
                      </label>
                      <input
                        type="text"
                        name="apt"
                        value={formik.values.apt}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Apt 4B"
                        className={getInputClass("apt")}
                      />
                      {renderError("apt")}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>City</label>
                        <input
                          type="text"
                          name="city"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="Berlin"
                          className={getInputClass("city")}
                        />
                        {renderError("city")}
                      </div>
                      <div>
                        <label className={labelClass}>Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formik.values.postalCode}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          placeholder="10115"
                          className={getInputClass("postalCode")}
                        />
                        {renderError("postalCode")}
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Country</label>
                      <select
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`${getInputClass("country")} cursor-pointer text-black dark:text-white`}
                      >
                        <option value="" className="bg-white dark:bg-neutral-900 text-neutral-400">Select country…</option>
                        <option className="bg-white dark:bg-neutral-900 text-black dark:text-white">Germany</option>
                        <option className="bg-white dark:bg-neutral-900 text-black dark:text-white">Austria</option>
                        <option className="bg-white dark:bg-neutral-900 text-black dark:text-white">Switzerland</option>
                        <option className="bg-white dark:bg-neutral-900 text-black dark:text-white">Netherlands</option>
                        <option className="bg-white dark:bg-neutral-900 text-black dark:text-white">France</option>
                        <option className="bg-white dark:bg-neutral-900 text-black dark:text-white">Italy</option>
                        <option className="bg-white dark:bg-neutral-900 text-black dark:text-white">Spain</option>
                        <option className="bg-white dark:bg-neutral-900 text-black dark:text-white">United Kingdom</option>
                        <option className="bg-white dark:bg-neutral-900 text-black dark:text-white">United States</option>
                        <option className="bg-white dark:bg-neutral-900 text-black dark:text-white">Pakistan</option>
                      </select>
                      {renderError("country")}
                    </div>
                  </div>
                </div>

                {/* Shipping method */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-neutral-400 dark:text-neutral-500 mb-3">
                    Shipping Method
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        label: "Standard Delivery",
                        sub: "3–5 business days",
                        price:
                          shipping === 0
                            ? "Free"
                            : `${currency}${shipping.toFixed(2)}`,
                      },
                      {
                        label: "Express Delivery",
                        sub: "1–2 business days",
                        price: `${currency}${(shipping + 9.95).toFixed(2)}`,
                      },
                    ].map((opt) => (
                      <label
                        key={opt.label}
                        className="flex items-center justify-between border border-neutral-200 dark:border-neutral-800 px-4 py-3 cursor-pointer hover:border-black dark:hover:border-white transition-colors has-[:checked]:border-black dark:has-[:checked]:border-white text-black dark:text-white"
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            defaultChecked={opt.label === "Standard Delivery"}
                            className="accent-black dark:accent-white"
                          />
                          <div>
                            <p className="text-[12px] font-semibold text-black dark:text-white tracking-wide">
                              {opt.label}
                            </p>
                            <p className="text-[11px] text-neutral-400 dark:text-neutral-500">
                              {opt.sub}
                            </p>
                          </div>
                        </div>
                        <span className="text-[12px] font-bold text-black dark:text-white">
                          {opt.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    const isValid = await validateStep([
                      "firstName",
                      "lastName",
                      "address",
                      "city",
                      "postalCode",
                      "country",
                    ]);
                    if (isValid) setStep("payment");
                  }}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.99] transition-all duration-200"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* ── STEP 3: Payment ── */}
            {step === "payment" && (
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-5 flex items-center gap-2">
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
                      {formik.values.cardNumber || "•••• •••• •••• ••••"}
                    </p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.14em] text-white/40 mb-0.5">
                          Card Holder
                        </p>
                        <p className="text-[12px] font-semibold uppercase tracking-wider text-white">
                          {formik.values.cardName || "YOUR NAME"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] uppercase tracking-[0.14em] text-white/40 mb-0.5">
                          Expires
                        </p>
                        <p className="text-[12px] font-semibold tracking-wider text-white">
                          {formik.values.expiry || "MM/YY"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>Name on Card</label>
                      <input
                        type="text"
                        name="cardName"
                        value={formik.values.cardName}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "cardName",
                            e.target.value.toUpperCase(),
                          )
                        }
                        onBlur={formik.handleBlur}
                        placeholder="MAX MUSTERMANN"
                        className={getInputClass("cardName")}
                      />
                      {renderError("cardName")}
                    </div>
                    <div>
                      <label className={labelClass}>Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formik.values.cardNumber}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "cardNumber",
                              formatCard(e.target.value),
                            )
                          }
                          onBlur={formik.handleBlur}
                          placeholder="0000 0000 0000 0000"
                          className={`${getInputClass("cardNumber")} pr-10`}
                        />
                        <CreditCard
                          size={16}
                          strokeWidth={1.5}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300 dark:text-neutral-600"
                        />
                      </div>
                      {renderError("cardNumber")}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={formik.values.expiry}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "expiry",
                              formatExpiry(e.target.value),
                            )
                          }
                          onBlur={formik.handleBlur}
                          placeholder="MM/YY"
                          className={getInputClass("expiry")}
                        />
                        {renderError("expiry")}
                      </div>
                      <div>
                        <label className={labelClass}>CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formik.values.cvv}
                          onChange={(e) =>
                            formik.setFieldValue(
                              "cvv",
                              e.target.value.replace(/\D/g, "").slice(0, 4),
                            )
                          }
                          onBlur={formik.handleBlur}
                          placeholder="•••"
                          className={getInputClass("cvv")}
                        />
                        {renderError("cvv")}
                      </div>
                    </div>
                  </div>

                  {/* Security note */}
                  <div className="flex items-center gap-2 mt-4 text-neutral-400 dark:text-neutral-500">
                    <ShieldCheck size={13} strokeWidth={1.5} />
                    <p className="text-[10px] tracking-wide">
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => formik.handleSubmit()}
                  disabled={formik.isSubmitting}
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-[0.99] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Lock size={12} strokeWidth={2.5} />
                  Place Order — {currency}
                  {total.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* ── Right: Order summary ── */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6 sm:p-8 text-black dark:text-white transition-colors duration-300">
              <h2 className="text-[12px] font-bold tracking-[0.22em] uppercase text-black dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 pb-5 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex justify-between text-[12px] text-neutral-600 dark:text-neutral-300">
                  <span>
                    Subtotal{" "}
                    <span className="text-neutral-400 dark:text-neutral-500">
                      ({itemCount} {itemCount === 1 ? "item" : "items"})
                    </span>
                  </span>
                  <span className="font-medium text-black dark:text-white">
                    {currency}
                    {subtotal.toFixed(2)}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-[12px] text-green-600 dark:text-green-400">
                    <span>Discount (10%)</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      −{currency}
                      {discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[12px] text-neutral-600 dark:text-neutral-300">
                  <span>Shipping</span>
                  <span className="font-medium text-black dark:text-white">
                    {shipping === 0 ? (
                      <span className="text-green-600 dark:text-green-400">Free</span>
                    ) : (
                      `${currency}${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-5 mb-6">
                <span className="text-[12px] font-bold tracking-[0.16em] uppercase text-black dark:text-white">
                  Total
                </span>
                <div className="text-right">
                  <span className="text-[20px] font-bold tracking-tight text-black dark:text-white">
                    {currency}
                    {total.toFixed(2)}
                  </span>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                    Incl. VAT
                  </p>
                </div>
              </div>

              {/* Payment logos */}
              <div className="flex items-center justify-center gap-2 flex-wrap pt-2 border-t border-neutral-100 dark:border-neutral-800">
                {["Visa", "MC", "PayPal", "Klarna"].map((pm) => (
                  <span
                    key={pm}
                    className="rounded border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-800 px-2 py-0.5 text-[9px] font-semibold text-neutral-500 dark:text-neutral-400 tracking-wider uppercase"
                  >
                    {pm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Order Confirmation Modal */}
      <OrderConfirmation
        isOpen={showConfirmModal}
        total={total.toFixed(2)}
        currency={currency}
        itemCount={itemCount}
        onConfirm={() => {
          setShowConfirmModal(false);
          onConfirm();
        }}
        onCancel={() => setShowConfirmModal(false)}
      />
    </section>
  );
}
