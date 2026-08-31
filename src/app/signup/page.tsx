"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/component/AuthProvider";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    setError(null);

    const result = signup(email, name);

    if (result === "ok") {
      // Redirect to login after successful signup
      router.push("/login");
    } else if (result === "already_exists") {
      setError("already_exists");
    } else if (result === "invalid_email") {
      setError("Please enter a valid email address.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSignup();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-black dark:text-white flex flex-col transition-colors duration-300">
      {/* Logo */}
      <div className="flex justify-center pt-10 pb-6">
        <Link href="/">
          <img
            src="https://pegador.com/cdn/shop/files/3.svg?v=1758194581&width=400"
            alt="Pegador Logo"
            className="h-8 w-auto brightness-0 dark:brightness-100"
          />
        </Link>
      </div>

      {/* Card */}
      <div className="flex flex-1 flex-col items-center justify-start px-4 pt-10">
        <div className="w-full max-w-[420px]">
          <h1 className="text-[22px] font-bold tracking-tight mb-1 text-black dark:text-white">
            Register
          </h1>
          <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-7">
            <Link
              href="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Sign in
            </Link>{" "}
            or create an account
          </p>

          <Link
            href="/"
            className="flex items-center justify-center w-full py-4 rounded-full bg-[#5147e5] text-white text-[14px] tracking-wide mb-6 hover:bg-[#4138c8] transition-colors duration-200"
          >
            <span className="font-normal">Continue&nbsp;</span>
            <span className="font-bold">shop</span>
          </Link>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <hr className="flex-1 border-neutral-200 dark:border-neutral-800" />
            <span className="text-[12px] text-neutral-400 dark:text-neutral-500">
              or
            </span>
            <hr className="flex-1 border-neutral-200 dark:border-neutral-800" />
          </div>

          {/* Name field */}
          <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-full px-5 py-3.5 mb-4 focus-within:border-neutral-400 dark:focus-within:border-neutral-500 transition-colors">
            <input
              type="text"
              placeholder="First name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-[13px] outline-none bg-transparent placeholder-neutral-400 dark:placeholder-neutral-500 text-black dark:text-white"
            />
          </div>

          {/* Email field */}
          <div
            className={`flex items-center border rounded-full px-5 py-3.5 mb-3 transition-colors ${
              error
                ? "border-red-400 dark:border-red-500"
                : "border-neutral-200 dark:border-neutral-800 focus-within:border-neutral-400 dark:focus-within:border-neutral-500"
            }`}
          >
            <input
              type="email"
              placeholder="E-mail address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              onKeyDown={handleKeyDown}
              className="flex-1 text-[13px] outline-none bg-transparent placeholder-neutral-400 dark:placeholder-neutral-500 text-black dark:text-white"
            />
            <button
              type="button"
              onClick={handleSignup}
              disabled={loading}
              className="ml-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors disabled:opacity-40"
              aria-label="Continue"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 text-[12px] text-red-500 dark:text-red-400 px-1">
              {error === "already_exists" ? (
                <>
                  An account with this email already exists.{" "}
                  <Link
                    href="/login"
                    className="font-semibold underline hover:text-red-600 dark:hover:text-red-300"
                  >
                    Log in instead →
                  </Link>
                </>
              ) : (
                error
              )}
            </div>
          )}

          {/* Newsletter checkbox */}
          <label className="flex items-center gap-3 cursor-pointer mb-6">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-700 accent-[#5147e5]"
            />
            <span className="text-[13px] text-neutral-700 dark:text-neutral-300">
              Receive news and offers via email
            </span>
          </label>

          {/* Terms */}
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500 text-center leading-relaxed">
            By continuing, you agree to our{" "}
            <Link
              href="/info/terms-and-conditions"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Terms and Conditions
            </Link>
          </p>
        </div>
      </div>

      {/* Footer link */}
      <div className="flex justify-center py-10">
        <Link
          href="/info/privacy-policy"
          className="text-[13px] font-medium text-black dark:text-white hover:underline"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
