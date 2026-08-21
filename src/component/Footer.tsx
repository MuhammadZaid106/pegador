"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa6";

type AccordionSection = "customer" | "more" | "legal" | "socials" | null;

const Footer = () => {
  const [openSection, setOpenSection] = useState<AccordionSection>(null);

  const toggle = (section: AccordionSection) =>
    setOpenSection(openSection === section ? null : section);

  return (
    <footer className="w-full bg-[#232323] text-white pt-8 md:pt-16 pb-12">
      <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
        {/* ── Desktop: 4-col grid ── */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-y-0">
          {/* Col 1 */}
          <div className="md:pr-8 space-y-6">
            <h3 className="text-[16px] font-medium uppercase text-white">
              Customer Service
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/info/shipping"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  Shipping and delivery times
                </Link>
              </li>
              <li>
                <Link
                  href="/info/return"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  Return
                </Link>
              </li>
              <li>
                <Link
                  href="/info/contact"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  contact
                </Link>
              </li>
              <li>
                <Link
                  href="/info/cancellation"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  Cancellation policy
                </Link>
              </li>
            </ul>
          </div>
          {/* Col 2 */}
          <div className="md:px-8 space-y-6">
            <h3 className="text-[16px] font-medium tracking-[0.2em] uppercase text-white">
              More from PEGADOR®
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/info/loyalty"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  Loyalty
                </Link>
              </li>
              <li>
                <Link
                  href="/info/app"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  PEGADOR® App
                </Link>
              </li>
              <li>
                <Link
                  href="/info/career"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  career
                </Link>
              </li>
              <li>
                <Link
                  href="/info/reviews"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          {/* Col 3 */}
          <div className="md:px-8 space-y-6">
            <h3 className="text-[16px] font-medium tracking-[0.2em] uppercase text-white">
              Legal
            </h3>
            <ul className="space-y-3.5">
              <li>
                <Link
                  href="/info/imprint"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  imprint
                </Link>
              </li>
              <li>
                <Link
                  href="/info/privacy"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  Cancellation policy
                </Link>
              </li>
              <li>
                <Link
                  href="/info/terms"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  Accessibility statement
                </Link>
              </li>
              <li>
                <Link
                  href="/info/cookies"
                  className="text-[12px] text-white hover:underline underline-offset-4 decoration-2.2"
                >
                  Cookie settings
                </Link>
              </li>
            </ul>
          </div>
          {/* Col 4 */}
          <div className="md:pl-8 space-y-6">
            <h3 className="text-[16px] font-medium tracking-[0.2em] uppercase text-white">
              Socials
            </h3>
            <div className="flex items-center gap-4 text-white">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <FaYoutube size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://wa.me"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <FaWhatsapp size={18} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-70 transition-opacity duration-300"
              >
                <FaTiktok size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Mobile: accordion ── */}
        <div className="flex flex-col md:hidden divide-y divide-white/10 border-t border-white/10">
          {/* Customer Service */}
          <div>
            <button
              onClick={() => toggle("customer")}
              className="flex items-center justify-between w-full py-5 text-left"
            >
              <span className="text-[13px] font-medium uppercase tracking-[0.12em]">
                Customer Service
              </span>
              <span className="text-xl leading-none">
                {openSection === "customer" ? "−" : "+"}
              </span>
            </button>
            {openSection === "customer" && (
              <ul className="pb-5 space-y-3.5 pl-1">
                <li>
                  <Link
                    href="/info/shipping"
                    className="text-[12px] text-white/80"
                  >
                    Shipping and delivery times
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info/return"
                    className="text-[12px] text-white/80"
                  >
                    Return
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info/contact"
                    className="text-[12px] text-white/80"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info/cancel-contract"
                    className="text-[12px] text-white/80"
                  >
                    Cancel contract
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* More from PEGADOR */}
          <div>
            <button
              onClick={() => toggle("more")}
              className="flex items-center justify-between w-full py-5 text-left"
            >
              <span className="text-[13px] font-medium uppercase tracking-[0.12em]">
                More from PEGADOR®
              </span>
              <span className="text-xl leading-none">
                {openSection === "more" ? "−" : "+"}
              </span>
            </button>
            {openSection === "more" && (
              <ul className="pb-5 space-y-3.5 pl-1">
                <li>
                  <Link
                    href="/info/loyalty"
                    className="text-[12px] text-white/80"
                  >
                    Loyalty
                  </Link>
                </li>
                <li>
                  <Link href="/info/app" className="text-[12px] text-white/80">
                    PEGADOR® App
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info/career"
                    className="text-[12px] text-white/80"
                  >
                    Career
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info/reviews"
                    className="text-[12px] text-white/80"
                  >
                    Reviews
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Legal */}
          <div>
            <button
              onClick={() => toggle("legal")}
              className="flex items-center justify-between w-full py-5 text-left"
            >
              <span className="text-[13px] font-medium uppercase tracking-[0.12em]">
                Legal
              </span>
              <span className="text-xl leading-none">
                {openSection === "legal" ? "−" : "+"}
              </span>
            </button>
            {openSection === "legal" && (
              <ul className="pb-5 space-y-3.5 pl-1">
                <li>
                  <Link
                    href="/info/imprint"
                    className="text-[12px] text-white/80"
                  >
                    Imprint
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info/privacy"
                    className="text-[12px] text-white/80"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info/cancellation"
                    className="text-[12px] text-white/80"
                  >
                    Cancellation policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info/terms"
                    className="text-[12px] text-white/80"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info/accessibility"
                    className="text-[12px] text-white/80"
                  >
                    Accessibility statement
                  </Link>
                </li>
                <li>
                  <Link
                    href="/info/cookies"
                    className="text-[12px] text-white/80"
                  >
                    Cookie settings
                  </Link>
                </li>
              </ul>
            )}
          </div>

          {/* Socials */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggle("socials")}
              className="flex items-center justify-between w-full py-5 text-left"
            >
              <span className="text-[13px] font-medium uppercase tracking-[0.12em]">
                Socials
              </span>
              <span className="text-xl leading-none">
                {openSection === "socials" ? "−" : "+"}
              </span>
            </button>
            {openSection === "socials" && (
              <div className="flex items-center gap-5 pb-5 pl-1">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-70 transition-opacity duration-300"
                >
                  <FaFacebook size={20} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-70 transition-opacity duration-300"
                >
                  <FaYoutube size={20} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-70 transition-opacity duration-300"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-70 transition-opacity duration-300"
                >
                  <FaWhatsapp size={20} />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-70 transition-opacity duration-300"
                >
                  <FaTiktok size={20} />
                </a>
              </div>
            )}
          </div>
        </div>
        {/* ── end accordion ── */}

        <hr className="border-white/10 my-12" />

        <div className="flex flex-col gap-6 mb-4">
          <div className="flex w-full flex-wrap items-center justify-end gap-2">
            {/* American Express */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              fill="none"
              aria-labelledby="pi-american_express"
            >
              <title id="pi-american_express">American Express</title>
              <rect
                x=".5"
                y=".5"
                width="37"
                height="23"
                rx="2.5"
                stroke="#000"
                strokeOpacity=".07"
                fill="none"
              />
              <path
                d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z"
                fill="#0071CE"
              />
              <path
                d="M3 0.5H35C36.3348 0.5 37.5 1.58692 37.5 3V21C37.5 22.4239 36.4239 23.5 35 23.5H3C1.66524 23.5 0.5 22.4131 0.5 21V3C0.5 1.57614 1.57614 0.5 3 0.5Z"
                stroke="black"
                strokeOpacity=".07"
              />
              <path
                d="M25.8662 6.33203V3H31L31.8662 5.5332L32.7334 3H37V14.2002H36.7998L34.8672 16.2656L36.7998 18.3594H37V21.2666H33.5996L31.9336 19.3994L30.2002 21.2666H19.4668V12.666H16L20.2666 3H24.4004L25.8662 6.33203ZM20.5996 20.2656H27V18.5322H22.666V17.3994H26.8662V15.666H22.666V14.5322H27V12.7988H20.5996V20.2656ZM30.5332 16.5322L27 20.2656H29.5996L31.8662 17.8662L34.0664 20.2656H36.7324L33.1992 16.4658L36.7324 12.7988H34.1328L31.8662 15.1992L29.7324 12.7988H27L30.5332 16.5322ZM17.666 11.7324H19.9326L20.5332 10.1992H23.999L24.666 11.7324H26.999L23.666 4.19922H20.999L17.666 11.7324ZM33.5996 4.19922L31.9326 8.86621L30.1992 4.19922H27V11.666H29.0664V6.39941L31 11.666H32.7998L34.7324 6.39941V11.666H36.7324V4.13281L33.5996 4.19922ZM23.2656 8.46582H21.2656L22.2656 5.99902L23.2656 8.46582Z"
                fill="white"
              />
            </svg>

            {/* Apple Pay */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 165.521 105.965"
              width="38"
              height="24"
              aria-labelledby="pi-apple_pay"
            >
              <title id="pi-apple_pay">Apple Pay</title>
              <path
                fill="#000"
                d="M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z"
              />
              <path
                fill="#FFF"
                d="M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875"
              />
              <g>
                <g>
                  <path
                    fill="#000"
                    d="M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858"
                  />
                  <path
                    fill="#000"
                    d="M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048"
                  />
                </g>
                <g>
                  <path
                    fill="#000"
                    d="M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z"
                  />
                  <path
                    fill="#000"
                    d="M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z"
                  />
                  <path
                    fill="#000"
                    d="M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z"
                  />
                </g>
              </g>
            </svg>

            {/* Bancontact */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              aria-labelledby="pi-bancontact"
            >
              <title id="pi-bancontact">Bancontact</title>
              <path
                fill="#000"
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"
              />
              <path
                fill="#fff"
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
              />
              <path
                d="M4.703 3.077h28.594c.139 0 .276.023.405.068.128.045.244.11.343.194a.9.9 0 0 1 .229.29c.053.107.08.223.08.34V20.03a.829.829 0 0 1-.31.631 1.164 1.164 0 0 1-.747.262H4.703a1.23 1.23 0 0 1-.405-.068 1.09 1.09 0 0 1-.343-.194.9.9 0 0 1-.229-.29.773.773 0 0 1-.08-.34V3.97c0-.118.027-.234.08-.342a.899.899 0 0 1 .23-.29c.098-.082.214-.148.342-.193a1.23 1.23 0 0 1 .405-.068Z"
                fill="#fff"
              />
              <path
                d="M6.38 18.562v-3.077h1.125c.818 0 1.344.259 1.344.795 0 .304-.167.515-.401.638.338.132.536.387.536.734 0 .62-.536.91-1.37.91H6.38Zm.724-1.798h.537c.328 0 .468-.136.468-.387 0-.268-.255-.356-.599-.356h-.406v.743Zm0 1.262h.448c.438 0 .693-.093.693-.383 0-.286-.219-.404-.63-.404h-.51v.787Z"
                fill="#1E3764"
              />
              <path
                d="M11.394 13.946c3.803 0 5.705-2.14 7.606-4.28H6.38v4.28h5.014Z"
                fill="url(#pi-bancontact-a)"
              />
              <path
                d="M26.607 5.385c-3.804 0-5.705 2.14-7.607 4.28h12.62v-4.28h-5.013Z"
                fill="url(#pi-bancontact-b)"
              />
              <defs>
                <linearGradient
                  id="pi-bancontact-a"
                  x1="8.933"
                  y1="12.003"
                  x2="17.734"
                  y2="8.13"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#005AB9" />
                  <stop offset="1" stopColor="#1E3764" />
                </linearGradient>
                <linearGradient
                  id="pi-bancontact-b"
                  x1="19.764"
                  y1="10.037"
                  x2="29.171"
                  y2="6.235"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FBA900" />
                  <stop offset="1" stopColor="#FFD800" />
                </linearGradient>
              </defs>
            </svg>

            {/* BLIK */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              aria-labelledby="pi-blik"
            >
              <title id="pi-blik">BLIK</title>
              <path
                fill="#000"
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"
              />
              <path
                fill="#fff"
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
              />
              <path
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2-2-2h32z"
                fill="url(#pi-blik-paint0_linear)"
              />
              <path
                d="M30.343 17.155l-2.785-3.639 2.563-3.236h-2.185l-2.456 3.138V6.78h-1.848v10.375h1.848v-3.532l2.456 3.532h2.407zM18.613 6.78h-1.848v10.366h1.848V6.78zm3.433 3.508h-1.848v6.867h1.848v-6.867z"
                fill="#fff"
              />
              <path
                d="M13.849 9.573a1.651 1.651 0 100-3.302 1.651 1.651 0 000 3.302z"
                fill="url(#pi-blik-paint1_radial)"
              />
              <path
                d="M12.041 10.206c-.574 0-1.138.144-1.642.419V6.82H8.534v6.9a3.516 3.516 0 103.507-3.515zm0 5.175a1.643 1.643 0 110-3.286 1.643 1.643 0 010 3.286z"
                fill="#fff"
              />
              <defs>
                <radialGradient
                  id="pi-blik-paint1_radial"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(12.51 6.18) scale(5.41297)"
                >
                  <stop stopColor="red" />
                  <stop offset=".49" stopColor="#E83E49" />
                  <stop offset="1" stopColor="#F0F" />
                </radialGradient>
                <linearGradient
                  id="pi-blik-paint0_linear"
                  x1="19"
                  y1="4.977"
                  x2="19"
                  y2="55.605"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop />
                  <stop offset=".732" stopColor="#fff" />
                  <stop offset="1" stopColor="#fff" />
                </linearGradient>
              </defs>
            </svg>

            {/* EPS */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              aria-labelledby="pi-eps"
            >
              <title id="pi-eps">EPS</title>
              <path
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"
                opacity=".07"
              />
              <path
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                fill="#fff"
              />
              <path
                fill="#71706f"
                d="M27.745 12.32h-2.322a.465.465 0 01-.468-.464c0-.258.21-.484.468-.484h3.535V9.628h-3.535c-1.233 0-2.237 1.006-2.237 2.236s1.004 2.237 2.237 2.237h2.29c.259 0 .469.205.469.462 0 .258-.21.448-.468.448h-4.912c-.417.796-.822 1.478-1.645 1.82h6.588c1.213-.018 2.205-1.045 2.205-2.265 0-1.22-.992-2.23-2.205-2.247z"
              />
              <path
                fill="#71706f"
                d="M18.845 9.628c-1.968 0-3.571 1.612-3.571 3.594V20.697h1.782V16.83h1.785c1.968 0 3.565-1.634 3.565-3.615 0-1.98-1.593-3.587-3.561-3.587zm0 5.383h-1.79v-1.796c0-1.003.8-1.82 1.79-1.82s1.796.817 1.796 1.82a1.79 1.79 0 01-1.796 1.796z"
              />
              <path
                fill="#c8036f"
                d="M9.634 16.83c-1.685 0-3.101-1.2-3.484-2.768 0 0-.111-.519-.111-.86 0-.342.105-.865.105-.865a3.594 3.594 0 013.482-2.73c1.978 0 3.6 1.608 3.6 3.586v.87H7.973c.31.607.938.948 1.662.948h4.724l.006-5.13c0-.764-.625-1.39-1.39-1.39H6.278c-.764 0-1.39.607-1.39 1.371v6.696c0 .765.626 1.41 1.39 1.41h6.696c.686 0 1.259-.493 1.37-1.138h-4.71z"
              />
              <path
                fill="#c8036f"
                d="M9.626 11.31c-.72 0-1.348.44-1.66 1.01h3.32c-.312-.57-.939-1.01-1.66-1.01zM12.659 6.314c0-1.635-1.359-2.96-3.034-2.96-1.647 0-2.987 1.282-3.031 2.879v.91c0 .106.086.21.195.21h1.116c.11 0 .205-.104.205-.21v-.83c0-.815.68-1.48 1.516-1.48.837 0 1.516.665 1.516 1.48v.83c0 .106.089.21.198.21h1.116c.109 0 .202-.104.202-.21v-.83z"
              />
            </svg>

            {/* Google Pay */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              aria-labelledby="pi-google_pay"
            >
              <title id="pi-google_pay">Google Pay</title>
              <path
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"
                fill="#000"
                opacity=".07"
              />
              <path
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                fill="#FFF"
              />
              <path
                d="M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03z"
                fill="#5F6368"
              />
              <path
                d="M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z"
                fill="#4285F4"
              />
              <path
                d="M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z"
                fill="#34A853"
              />
              <path
                d="M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z"
                fill="#FBBC04"
              />
              <path
                d="M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z"
                fill="#EA4335"
              />
            </svg>

            {/* iDEAL Wero */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              role="img"
              aria-labelledby="pi-spidealwero"
            >
              <title id="pi-spidealwero">iDEAL Wero</title>
              <path
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z"
                fill="black"
              />
              <path
                d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z"
                fill="#FFF48D"
              />
              <path
                d="M3.45001 7.43572V17.0022C3.45001 17.4602 3.82664 17.8347 4.28673 17.8347H10.0301C14.3722 17.8347 16.2539 15.4157 16.2539 12.2063C16.2539 8.99693 14.3715 6.60321 10.0294 6.60321H4.28603C3.82594 6.60321 3.44931 6.97773 3.44931 7.43572H3.45001Z"
                fill="white"
              />
              <path
                d="M7.29413 8.95133V16.0203H10.385C13.1918 16.0203 14.4087 14.4422 14.4087 12.2112C14.4087 9.98022 13.1911 8.41901 10.385 8.41901H7.82926C7.53259 8.41901 7.29413 8.66027 7.29413 8.95204V8.95133Z"
                fill="#CC0066"
              />
              <path
                d="M5.03507 17.073H10.0294C13.539 17.073 15.4754 15.3456 15.4754 12.2105C15.4754 10.4038 14.7685 7.36908 10.0294 7.36908H5.03507C4.59182 7.36908 4.23203 7.72677 4.23203 8.16862V16.2742C4.23203 16.7153 4.59182 17.0737 5.03507 17.0737V17.073Z"
                fill="#232323"
              />
              <path
                d="M31.45 12.2209C31.45 11.1773 32.1926 10.2264 33.4749 10.2264C34.7572 10.2264 35.5053 11.178 35.5053 12.2209C35.5053 13.2638 34.7627 14.2154 33.4749 14.2154C32.1926 14.2154 31.45 13.2638 31.45 12.2209Z"
                fill="#1D1C1C"
              />
            </svg>

            {/* Klarna */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              aria-labelledby="pi-klarna"
              fill="none"
            >
              <title id="pi-klarna">Klarna</title>
              <rect width="38" height="24" rx="2" fill="#FFA8CD" />
              <rect
                x=".5"
                y=".5"
                width="37"
                height="23"
                rx="1.5"
                stroke="#000"
                strokeOpacity=".07"
              />
              <path
                d="M30.62 14.755c-.662 0-1.179-.554-1.179-1.226 0-.673.517-1.226 1.18-1.226.663 0 1.18.553 1.18 1.226 0 .672-.517 1.226-1.18 1.226zm-.33 1.295c.565 0 1.286-.217 1.686-1.068l.04.02c-.176.465-.176.742-.176.81v.11h1.423v-4.786H31.84v.109c0 .069 0 .346.175.81l-.039.02c-.4-.85-1.121-1.068-1.687-1.068-1.355 0-2.31 1.088-2.31 2.522 0 1.433.955 2.521 2.31 2.521z"
                fill="#0B051D"
              />
              <path
                d="M26.42 11.007c-.643 0-1.15.228-1.56 1.068l-.039-.02c.175-.464.175-.741.175-.81v-.11h-1.423v4.787h1.462V13.4c0-.662.38-1.078.995-1.078.614 0 .917.356.917 1.068v2.532h1.462v-3.046c0-1.088-.838-1.869-1.989-1.869z"
                fill="#0B051D"
              />
              <path
                d="M10.136 9H8.644c0 1.236-.751 2.343-1.892 3.134l-.448.317V9h-1.55v6.922h1.55V12.49l2.564 3.43h1.892L8.293 12.64C9.414 11.82 10.145 10.544 10.136 9z"
                fill="#0B051D"
              />
            </svg>

            {/* Maestro */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              role="img"
              aria-labelledby="pi-maestro"
            >
              <title id="pi-maestro">Maestro</title>
              <path
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"
              />
              <path
                fill="#fff"
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
              />
              <circle fill="#EB001B" cx="15" cy="12" r="7" />
              <circle fill="#00A2E5" cx="23" cy="12" r="7" />
              <path
                fill="#7375CF"
                d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
              />
            </svg>

            {/* Mastercard */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              fill="none"
              aria-labelledby="pi-master"
            >
              <title id="pi-master">Mastercard</title>
              <rect
                x=".5"
                y=".5"
                width="37"
                height="23"
                rx="2.5"
                stroke="#000"
                strokeOpacity=".07"
                fill="none"
              />
              <path
                d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z"
                fill="#1C1C1C"
              />
              <path
                d="M14.6364 19.2727C18.8538 19.2727 22.2727 15.8538 22.2727 11.6364C22.2727 7.41892 18.8538 4 14.6364 4C10.4189 4 7 7.41892 7 11.6364C7 15.8538 10.4189 19.2727 14.6364 19.2727Z"
                fill="#EB001B"
              />
              <path
                d="M23.3637 19.2727C27.5811 19.2727 31 15.8538 31 11.6364C31 7.41892 27.5811 4 23.3637 4C19.1462 4 15.7273 7.41892 15.7273 11.6364C15.7273 15.8538 19.1462 19.2727 23.3637 19.2727Z"
                fill="#F79E1B"
              />
              <path
                d="M22.2727 11.6362C22.2727 9.01797 20.9637 6.72706 19 5.41797C17.0364 6.83615 15.7273 9.12706 15.7273 11.6362C15.7273 14.1452 17.0364 16.5452 19 17.8543C20.9637 16.5452 22.2727 14.2543 22.2727 11.6362Z"
                fill="#FF5F00"
              />
            </svg>

            {/* MobilePay */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              role="img"
              aria-labelledby="pi-mobilepay"
            >
              <title id="pi-mobilepay">MobilePay</title>
              <path
                fill="#000"
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"
              />
              <path
                fill="#fff"
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
              />
              <path
                fill="#5A78FF"
                d="M20.05 15.296s2.53-.771 4.282-.776c2.896-.007 4.857 1.15 4.857 1.15V10.06s-1.97-1.02-4.453-1.09c-2.481-.068-4.687 1.012-4.687 1.012v5.313z"
              />
              <path
                fill="#5A78FF"
                d="M17.308 9.19l2.082 4.957V9.396s1.646-.882 3.485-1.13c1.84-.249 4.181.08 4.181.08l-1.133-2.707s-2.461-.159-4.69.794c-2.228.952-3.925 2.756-3.925 2.756z"
              />
              <path
                fill="#5A78FF"
                d="M21.428 5.676l-.82-1.99a1.818 1.818 0 00-2.37-.996l-5.663 2.334a1.818 1.818 0 00-.98 2.376l5.46 13.247a1.818 1.818 0 002.37.995l5.662-2.334a1.817 1.817 0 00.98-2.376l-.677-1.642s-.462-.027-.676-.033c-.226-.006-.644-.001-.644-.001l.88 2.136a.606.606 0 01-.326.793l-5.663 2.333a.606.606 0 01-.79-.331L12.711 6.94a.606.606 0 01.327-.792L18.7 3.814a.606.606 0 01.79.332l.83 2.011s.383-.187.59-.27c.206-.082.518-.211.518-.211z"
              />
            </svg>

            {/* PayPal */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              role="img"
              aria-labelledby="pi-paypal"
            >
              <title id="pi-paypal">PayPal</title>
              <path
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"
              />
              <path
                fill="#fff"
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
              />
              <path
                fill="#003087"
                d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"
              />
              <path
                fill="#3086C8"
                d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"
              />
              <path
                fill="#012169"
                d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"
              />
            </svg>

            {/* Shop Pay */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              aria-labelledby="pi-shopify_pay"
            >
              <title id="pi-shopify_pay">Shop Pay</title>
              <path
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.3-3-3-3z"
                fill="#000"
              />
              <path
                d="M35.889 0C37.05 0 38 .982 38 2.182v19.636c0 1.2-.95 2.182-2.111 2.182H2.11C.95 24 0 23.018 0 21.818V2.182C0 .982.95 0 2.111 0H35.89z"
                fill="#5A31F4"
              />
              <path
                d="M9.35 11.368c-1.017-.223-1.47-.31-1.47-.705 0-.372.306-.558.92-.558.54 0 .934.238 1.225.704a.079.079 0 00.104.03l1.146-.584a.082.082 0 00.032-.114c-.475-.831-1.353-1.286-2.51-1.286-1.52 0-2.464.755-2.464 1.956 0 1.275 1.15 1.597 2.17 1.82 1.02.222 1.474.31 1.474.705 0 .396-.332.582-.993.582-.612 0-1.065-.282-1.34-.83a.08.08 0 00-.107-.035l-1.143.57a.083.083 0 00-.036.111c.454.92 1.384 1.437 2.627 1.437 1.583 0 2.539-.742 2.539-1.98s-1.155-1.598-2.173-1.82v-.003z"
                fill="#fff"
              />
              <path
                d="M15.49 8.855c-.65 0-1.224.232-1.636.646a.04.04 0 01-.069-.03v-2.64a.08.08 0 00-.08-.081H12.27a.08.08 0 00-.08.082v8.194a.08.08 0 00.08.082h1.433a.08.08 0 00.081-.082v-3.594c0-.695.528-1.227 1.239-1.227.71 0 1.226.521 1.226 1.227v3.594a.08.08 0 00.081.082h1.433a.08.08 0 00.081-.082v-3.594c0-1.51-.981-2.577-2.355-2.577z"
                fill="#fff"
              />
              <path
                d="M20.753 8.62c-.778 0-1.507.24-2.03.588a.082.082 0 00-.027.109l.632 1.088a.08.08 0 00.11.03 2.5 2.5 0 011.318-.366c1.25 0 2.17.891 2.17 2.068 0 1.003-.736 1.745-1.669 1.745-.76 0-1.288-.446-1.288-1.077 0-.361.152-.657.548-.866a.08.08 0 00.032-.113l-.596-1.018a.08.08 0 00-.098-.035c-.799.299-1.359 1.018-1.359 1.984 0 1.46 1.152 2.55 2.76 2.55 1.877 0 3.227-1.313 3.227-3.195 0-2.018-1.57-3.492-3.73-3.492z"
                fill="#fff"
              />
              <path
                d="M28.675 8.843c-.724 0-1.373.27-1.845.746-.026.027-.069.007-.069-.029v-.572a.08.08 0 00-.08-.082h-1.397a.08.08 0 00-.08.082v8.182a.08.08 0 00.08.081h1.433a.08.08 0 00.081-.081v-2.683c0-.036.043-.054.069-.03a2.6 2.6 0 001.808.7c1.682 0 2.993-1.373 2.993-3.157s-1.313-3.157-2.993-3.157zm-.271 4.929c-.956 0-1.681-.768-1.681-1.783s.723-1.783 1.681-1.783c.958 0 1.68.755 1.68 1.783 0 1.027-.713 1.783-1.681 1.783h.001z"
                fill="#fff"
              />
            </svg>

            {/* Twint */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              aria-labelledby="pi-twint"
            >
              <title id="pi-twint">Twint</title>
              <path
                d="M3 0h32a3 3 0 0 1 3 3v17.97a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3z"
                fill="#000"
              />
              <path
                fill="#fff"
                d="M11.822 14.477a.49.49 0 0 1-.22.383L7.31 17.337a.49.49 0 0 1-.442 0L2.576 14.86a.49.49 0 0 1-.22-.383V9.522a.49.49 0 0 1 .22-.382l4.292-2.478a.49.49 0 0 1 .442 0l4.291 2.478a.49.49 0 0 1 .221.382v4.955zM35.645 9.88H31.8v.913h1.378v3.923h1.088v-3.923h1.379v-.914.001zm-17.452-.001h-3.845v.913h1.379v3.923h1.088v-3.923h1.378v-.914.001z"
              />
              <path
                fill="#ff4800"
                d="M9.324 12.012l-1.118 1.64-.573-.878.662-.988c.123-.177.385-.66.082-1.321a1.377 1.377 0 0 0-1.248-.796 1.377 1.377 0 0 0-1.247.796 1.27 1.27 0 0 0 .076 1.3l.674.995.495.716.75 1.145a.428.428 0 0 0 .334.19c.2 0 .322-.179.338-.201l1.754-2.597h-.979z"
              />
              <path
                fill="#007ce2"
                d="M6.046 13.6l-1.099-1.544s-.293-.446-.483-.756a.553.553 0 0 1-.074-.276c0-.304.25-.553.553-.553h.004a.582.582 0 0 1 .161.022l.389-.71a1.376 1.376 0 0 0-1.793.681 1.27 1.27 0 0 0 .076 1.301l1.92 2.847c.016.025.139.204.343.204a.427.427 0 0 0 .337-.2l.58-.884-.498-.734-.417.602z"
              />
            </svg>

            {/* UnionPay */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-36 25 38 24"
              width="38"
              height="24"
              role="img"
              aria-labelledby="pi-unionpay"
            >
              <title id="pi-unionpay">Union Pay</title>
              <path
                fill="#005B9A"
                d="M-36 46.8v.7-.7zM-18.3 25v24h-7.2c-1.3 0-2.1-1-1.8-2.3l4.4-19.4c.3-1.3 1.9-2.3 3.2-2.3h1.4zm12.6 0c-1.3 0-2.9 1-3.2 2.3l-4.5 19.4c-.3 1.3.5 2.3 1.8 2.3h-4.9V25h10.8z"
              />
              <path
                fill="#E9292D"
                d="M-19.7 25c-1.3 0-2.9 1.1-3.2 2.3l-4.4 19.4c-.3 1.3.5 2.3 1.8 2.3h-8.9c-.8 0-1.5-.6-1.5-1.4v-21c0-.8.7-1.6 1.5-1.6h14.7z"
              />
              <path
                fill="#0E73B9"
                d="M-5.7 25c-1.3 0-2.9 1.1-3.2 2.3l-4.4 19.4c-.3 1.3.5 2.3 1.8 2.3H-26h.5c-1.3 0-2.1-1-1.8-2.3l4.4-19.4c.3-1.3 1.9-2.3 3.2-2.3h14z"
              />
              <path
                fill="#059DA4"
                d="M2 26.6v21c0 .8-.6 1.4-1.5 1.4h-12.1c-1.3 0-2.1-1.1-1.8-2.3l4.5-19.4C-8.6 26-7 25-5.7 25H.5c.9 0 1.5.7 1.5 1.6z"
              />
              <path
                fill="#fff"
                d="M-21.122 38.645h.14c.14 0 .28-.07.28-.14l.42-.63h1.19l-.21.35h1.4l-.21.63h-1.68c-.21.28-.42.42-.7.42h-.84l.21-.63m-.21.91h3.01l-.21.7h-1.19l-.21.7h1.19l-.21.7h-1.19l-.28 1.05c-.07.14 0 .28.28.21h.98l-.21.7h-1.89c-.35 0-.49-.21-.35-.63l.35-1.33h-.77l.21-.7h.77l.21-.7h-.7l.21-.7z"
              />
            </svg>

            {/* Visa */}
            <svg
              className="h-6 w-[38px] shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 38 24"
              width="38"
              height="24"
              fill="none"
              aria-labelledby="pi-visa"
            >
              <title id="pi-visa">Visa</title>
              <rect
                x=".5"
                y=".5"
                width="37"
                height="23"
                rx="2.5"
                stroke="#000"
                strokeOpacity=".07"
                fill="none"
              />
              <path
                d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z"
                fill="#142FBD"
              />
              <path
                d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z"
                fill="#1532CB"
              />
              <path
                d="M29.5944 10.2167H29.2778C28.8556 11.2722 28.5389 11.8 28.2222 13.3833H30.2278C29.9111 11.8 29.9111 11.0611 29.5944 10.2167V10.2167ZM32.6556 16.4444H30.8611C30.7556 16.4444 30.7556 16.4444 30.65 16.3389L30.4389 15.3889L30.3333 15.1778H27.8C27.6944 15.1778 27.5889 15.1778 27.5889 15.3889L27.2722 16.3389C27.2722 16.4444 27.1667 16.4444 27.1667 16.4444H24.95L25.1611 15.9167L28.2222 8.73889C28.2222 8.21111 28.5389 8 29.0667 8H30.65C30.7556 8 30.8611 8 30.8611 8.21111L32.3389 15.0722C32.4444 15.4944 32.55 15.8111 32.55 16.2333C32.6556 16.3389 32.6556 16.3389 32.6556 16.4444V16.4444Z"
                fill="white"
              />
              <path
                d="M18.5111 16.1278L18.9333 14.2278C19.0389 14.2278 19.1444 14.3333 19.1444 14.3333C19.8833 14.65 20.6222 14.8611 21.3611 14.7556C21.5722 14.7556 21.8889 14.65 22.1 14.5444C22.6278 14.3333 22.6278 13.8056 22.2056 13.3833C21.9944 13.1722 21.6778 13.0667 21.3611 12.8556C20.9389 12.6444 20.5167 12.4333 20.2 12.1167C18.9333 11.0611 19.3556 9.58333 20.0944 8.84444C20.7278 8.42222 21.0444 8 21.8889 8C23.1556 8 24.5278 8 25.1611 8.21111H25.2667C25.1611 8.84444 25.0556 9.37222 24.8444 10.0056C24.3167 9.79444 23.7889 9.58333 23.2611 9.58333C22.9444 9.58333 22.6278 9.58333 22.3111 9.68889C22.1 9.68889 21.9944 9.79444 21.8889 9.9C21.6778 10.1111 21.6778 10.4278 21.8889 10.6389L22.4167 11.0611C22.8389 11.2722 23.2611 11.4833 23.5778 11.6944C24.1056 12.0111 24.6333 12.5389 24.7389 13.1722C24.95 14.1222 24.6333 14.9667 23.7889 15.6C23.2611 16.0222 23.05 16.2333 22.3111 16.2333C20.8333 16.2333 19.6722 16.3389 18.7222 16.0222C18.6167 16.2333 18.6167 16.2333 18.5111 16.1278V16.1278Z"
                fill="white"
              />
              <path
                d="M14.8167 16.4444C14.9222 15.7056 14.9222 15.7056 15.0278 15.3889C15.5556 13.0667 16.0833 10.6389 16.5056 8.31667C16.6111 8.10556 16.6111 8 16.8222 8H18.7222C18.5111 9.26667 18.3 10.2167 17.9833 11.3778C17.6667 12.9611 17.35 14.5444 16.9278 16.1278C16.9278 16.3389 16.8222 16.3389 16.6111L14.8167 16.4444Z"
                fill="white"
              />
              <path
                d="M5 8.21111C5 8.10556 5.21111 8 5.31667 8H8.90556C9.43333 8 9.85556 8.31667 9.96111 8.84444L10.9111 13.4889C10.9111 13.5944 10.9111 13.5944 11.0167 13.7C11.0167 13.5944 11.1222 13.5944 11.1222 13.5944L13.3389 8.21111C13.2333 8.10556 13.3389 8 13.4444 8H15.6611C15.6611 8.10556 15.6611 8.10556 15.5556 8.21111L12.2833 15.9167C12.1778 16.1278 12.1778 16.2333 12.0722 16.3389C11.9667 16.4444 11.7556 16.3389 11.5444 16.3389H9.96111C9.85556 16.3389 9.75 16.3389 9.75 16.1278L8.06111 9.58333C7.85 9.37222 7.53333 9.05556 7.11111 8.95C6.47778 8.63333 5.31667 8.42222 5.10556 8.42222L5 8.21111Z"
                fill="white"
              />
            </svg>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white text-[11px]">
            <div>© 2026 PEGADOR®.</div>
            <div className="text-white cursor-pointer">
              Press conference / PKR Rs | German
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
