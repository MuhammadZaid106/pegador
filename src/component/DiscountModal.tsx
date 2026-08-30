"use client";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type DiscountModalProps = {
  onClose: () => void;
};

const DiscountModal = ({ onClose }: DiscountModalProps) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-1000 flex items-center  justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative flex w-full max-w-3xl overflow-hidden bg-white dark:bg-neutral-950 text-black dark:text-white shadow-2xl max-h-[95vh] transition-colors duration-300">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 cursor-pointer right-4 z-10 text-black dark:text-white hover:opacity-60 transition-opacity"
        >
          <X size={20} strokeWidth={1.8} />
        </button>
        <div className="relative hidden md:block w-[45%] shrink-0 ">
          <Image
            src="/img1.webp"
            alt="Here and Now – New Collection"
            fill
            sizes="40vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-end pb-10 px-6 text-center">
            <Image
              src="/img2.svg"
              alt="Here and Now"
              width={220}
              height={80}
              className="brightness-0 invert w-44 h-auto mb-2"
            />
            <p className="text-white text-[11px] font-semibold tracking-[0.22em] uppercase">
              New Collection
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center  px-8 py-10 flex-1">
          <div className="flex items-center justify-center">
            <Image
              src="/img2.svg"
              alt="Here and Now"
              width={200}
              height={60}
              className="brightness-0 dark:invert w-36 h-auto mb-3"
            />
          </div>
          <div className="flex items-center justify-center">
            <h2 className="text-2xl font-black tracking-tight text-black dark:text-white leading-tight mb-3 text-center">
              GET A 10%
              <br />
              DISCOUNT?
            </h2>
          </div>

          <p className="text-[13px] text-[#444] dark:text-neutral-300 leading-relaxed mb-6">
            Sign up now and receive{" "}
            <strong>early access, exclusive offers</strong> &amp; more, as well
            as a <strong>voucher</strong> for your first order.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border border-black/20 dark:border-neutral-800 px-4 py-3 text-[13px] text-black dark:text-white bg-transparent placeholder-black/40 dark:placeholder-neutral-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />
            <input
              type="email"
              placeholder="e-mail address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-black/20 dark:border-neutral-800 px-4 py-3 text-[13px] text-black dark:text-white bg-transparent placeholder-black/40 dark:placeholder-neutral-500 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
            />

            <div>
              <p className="text-[13px] font-bold text-black dark:text-white mb-3">
                Which products are you interested in?
              </p>
              <div className="flex items-center gap-6">
                {["Men", "Women", "Everything"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer text-[13px] text-black dark:text-white select-none"
                  >
                    <input
                      type="checkbox"
                      checked={interests.includes(item)}
                      onChange={() => toggleInterest(item)}
                      className="w-4 h-4 border border-black/30 dark:border-neutral-700 accent-black dark:accent-white cursor-pointer"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-[13px] font-bold tracking-[0.15em] uppercase hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-300 mt-1 cursor-pointer"
            >
              Register now
            </button>
          </form>

          <p className="text-[10px] text-[#888] dark:text-neutral-400 text-center mt-4 leading-relaxed">
            By registering, you agree to receive marketing emails from PEGADOR®.
            Personal data will be used in accordance with PEGADOR®&apos;s{" "}
            <a href="/privacy-policy" className="underline text-blue-600">
              privacy policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscountModal;
