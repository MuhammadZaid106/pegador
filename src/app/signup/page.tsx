"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="flex justify-center pt-10 pb-6">
        <Link href="/">
          <img
            src="https://pegador.com/cdn/shop/files/3.svg?v=1758194581&width=400"
            alt="Pegador Logo"
            className="h-8 w-auto brightness-0"
          />
        </Link>
      </div>

      {/* Card */}
      <div className="flex flex-1 flex-col items-center justify-start px-4 pt-10">
        <div className="w-full max-w-[420px]">
          <h1 className="text-[22px] font-bold tracking-tight mb-1">Register</h1>
          <p className="text-[13px] text-neutral-500 mb-7">
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>{" "}
            or create an account
          </p>

          <Link
            href="/"
            className="flex items-center justify-center w-full py-4 rounded-full bg-[#5147e5] text-white text-[14px] tracking-wide mb-6 hover:bg-[#4138c8] transition-colors duration-200"
          >
            <span className="font-normal">Continue&nbsp;</span><span className="font-bold">shop</span>
          </Link>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1 border-neutral-200" />
            <span className="text-[12px] text-neutral-400">or</span>
            <hr className="flex-1 border-neutral-200" />
          </div>

          {/* Email field */}
          <div className="flex items-center border border-neutral-200 rounded-full px-5 py-3.5 mb-4 focus-within:border-neutral-400 transition-colors">
            <input
              type="email"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 text-[13px] outline-none bg-transparent placeholder-neutral-400"
            />
            <button
              type="button"
              className="ml-2 text-neutral-500 hover:text-black transition-colors"
              aria-label="Continue"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Newsletter checkbox */}
          <label className="flex items-center gap-3 cursor-pointer mb-6">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 accent-[#5147e5]"
            />
            <span className="text-[13px] text-neutral-700">
              Receive news and offers via email
            </span>
          </label>

          {/* Terms */}
          <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="text-blue-600 hover:underline">
              Terms and Conditions
            </Link>
            
          </p>
        </div>
      </div>

      {/* Footer link */}
      <div className="flex justify-center py-10">
        <Link
          href="/privacy"
          className="text-[13px] font-medium text-black hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
