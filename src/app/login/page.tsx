"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/component/AuthProvider";
import { ADMIN_EMAIL, isAdminEmail } from "@/constants/auth";

function LoginFormContent() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const errorParam = searchParams.get("error");
  const redirectParam = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (loginEmail?: string) => {
    const targetEmail = (loginEmail || email).trim();
    if (!targetEmail) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    setError(null);

    const result = login(targetEmail);
  
    if (result === "ok") {
      if (isAdminEmail(targetEmail)) {
        router.push(redirectParam.startsWith("/admin") ? redirectParam : "/admin/Dashboard");
      } else {
        if (redirectParam.startsWith("/admin")) {
          setError("not_admin_role");
        } else {
          router.push(redirectParam);
        }
      }
    } else if (result === "not_registered") {
      setError("no_account");
    } else if (result === "invalid_email") {
      setError("Please enter a valid email address.");
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="w-full max-w-[420px]">
      {/* Admin Guard Notice Banner */}
      {errorParam === "not_admin" && (
        <div className="mb-6 p-4 border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-[12px] flex items-start gap-3 rounded-lg">
          <ShieldAlert size={18} className="shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
          <div className="flex-1">
            <p className="font-bold tracking-wide uppercase text-[10px] mb-1">
              Admin Access Required
            </p>
            <p className="leading-relaxed">
              Only authorized admin accounts (<strong className="font-mono text-black dark:text-white font-semibold">{ADMIN_EMAIL}</strong>) can access the dashboard.
            </p>
          </div>
        </div>
      )}

      <h1 className="text-[22px] font-bold tracking-tight mb-1 text-black dark:text-white">
        Login
      </h1>
      <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-6">
        Sign in or{" "}
        <Link
          href="/signup"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          create an account
        </Link>
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
        <span className="text-[12px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest text-[10px]">
          or sign in with email
        </span>
        <hr className="flex-1 border-neutral-200 dark:border-neutral-800" />
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
          onClick={() => handleLogin()}
          disabled={loading}
          className="ml-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors disabled:opacity-40 cursor-pointer"
          aria-label="Continue"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 text-[12px] text-red-500 dark:text-red-400 px-1">
          {error === "no_account" ? (
            <>
              No account found for this email.{" "}
              <Link
                href="/signup"
                className="font-semibold underline hover:text-red-600 dark:hover:text-red-300"
              >
                Sign up first →
              </Link>
            </>
          ) : error === "not_admin_role" ? (
            <>
              Access denied: This account is not an admin. Only{" "}
              <strong className="font-semibold">{ADMIN_EMAIL}</strong> has admin privileges.
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
  );
}

export default function LoginPage() {
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

      {/* Card Form */}
      <div className="flex flex-1 flex-col items-center justify-start px-4 pt-4 pb-12">
        <Suspense
          fallback={
            <div className="w-full max-w-[420px] py-12 flex justify-center">
              <div className="w-6 h-6 border-2 border-black dark:border-white border-t-transparent animate-spin rounded-full" />
            </div>
          }
        >
          <LoginFormContent />
        </Suspense>
      </div>

      {/* Footer link */}
      <div className="flex justify-center py-6">
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
