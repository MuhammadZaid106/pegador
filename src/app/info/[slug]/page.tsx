import React from "react";
import { notFound } from "next/navigation";
import AnouncementBar from "@/component/AnouncementBar";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import StickyOffer from "@/component/StickyOffer";
import Link from "next/link";

type PageInfo = {
  title: string;
  text: string;
};

const pages: Record<string, PageInfo> = {
  shipping: {
    title: "Shipping and Delivery",
    text: "At PEGADOR\u00ae, we strive to deliver your urban luxury garments as quickly as possible. All orders are processed within 24 hours of placement and shipped via premium logistics partners with full track and trace capability. Standard shipping is free on all orders exceeding \u20ac99, with estimated delivery times ranging from 2 to 5 business days depending on your location. Thank you for choosing us to elevate your everyday apparel.",
  },
  return: {
    title: "Returns & Exchanges",
    text: "If your purchase does not fit or meet your expectations, we offer a hassle-free 14-day return and exchange policy. To initiate a return, simply use the prepaid return label included inside your shipping package and drop it off at any authorized logistics counter. Please ensure all items are returned in their original condition, unworn and with all brand tags attached. Once received, our team will process your refund or exchange within 5 business days.",
  },
  contact: {
    title: "Contact Us",
    text: "Our customer experience team is here to support you with any questions regarding orders, sizing, fits, or styling collections. You can reach us directly via our email support at support@pegador.com or by filling out our online assistance form. We operate Monday through Friday from 9:00 AM to 6:00 PM CET, aiming to respond to all inquiries within 24 hours. Your satisfaction is our highest priority as we build the progressive street community.",
  },
  "cancel-contract": {
    title: "Cancel Contract",
    text: "Under European consumer protection guidelines, you have the right to cancel your purchase contract with PEGADOR\u00ae within 14 days without giving any reason. To exercise your right of cancellation, you must inform us via a clear written statement sent by post or email. You may use our cancellation template or submit a custom cancellation request. Once processed, we will reimburse all payments received from you, including initial standard delivery costs.",
  },
  loyalty: {
    title: "Loyalty Program",
    text: "Welcome to the PEGADOR\u00ae Loyalty Circle, where your passion for progressive streetwear translates into exclusive member benefits. For every purchase you make, you earn valuable loyalty reward points that can be redeemed for discounts on future collection drops. Members also receive early access to seasonal campaigns, birthday rewards, and invitations to exclusive brand events. Sign up for a free account today to start accumulating points and unlocking premium streetwear perks.",
  },
  app: {
    title: "PEGADOR\u00ae App",
    text: "Experience the brand like never before with the official PEGADOR\u00ae Mobile App, available now on iOS and Android. Our app offers a seamless shopping experience, customized size recommendations, and instant push notifications for limited capsule releases. App users also benefit from app-only product pre-orders, express checkout options, and a personalized feed of lookbooks. Download the app today and stay connected with the forefront of high-street fashion.",
  },
  career: {
    title: "Careers",
    text: "Join the creative force behind one of Europe's fastest-growing streetwear labels and help shape the future of urban luxury. At PEGADOR\u00ae, we are always looking for passionate designers, marketing specialists, developers, and logistics leaders. We foster a collaborative, progressive environment where innovative ideas are welcomed and career growth is nurtured. Explore our open positions today and take the next step in your professional journey with us.",
  },
  reviews: {
    title: "Customer Reviews",
    text: "Discover what our global streetwear community has to say about the fit, quality, and comfort of PEGADOR\u00ae apparel. We pride ourselves on using premium, heavyweight fabrics and custom cuts that stand out, and our customers' reviews reflect this dedication. Read verified feedback on our popular tees, hoodies, and jackets to help you select the perfect piece. Your feedback helps us continue refining our collections and offering the best high-street gear.",
  },
  imprint: {
    title: "Imprint",
    text: "In compliance with legal disclosure regulations, this page contains the official company identification details for PEGADOR\u00ae Germany. This digital storefront is operated by PEGADOR GmbH, registered under trade registry HRB 12345 in the local court of Cologne. Our managing directors are contactable for any formal legal, corporate, or compliance inquiries via imprint@pegador.com. All intellectual property, trademarks, and design concepts displayed are owned by PEGADOR\u00ae.",
  },
  privacy: {
    title: "Privacy Policy",
    text: "At PEGADOR\u00ae, we respect your personal data and are committed to protecting your privacy in full compliance with GDPR regulations. This privacy statement explains how we collect, process, and secure your information when you browse our site or place an order. We use secure encryption protocols to protect your personal transactions, and we never share your details with third parties without consent. You retain full rights to request access, correction, or deletion of your data at any time.",
  },
  cancellation: {
    title: "Cancellation Policy",
    text: "This section outlines the legal details of your right to cancel orders placed on our online store. Consumers have a standard 14-day cancellation window beginning from the day the final package of your order is delivered. The policy covers standard return shipping fees, refund timeframes, and details on how we issue your reimbursement. Please read the full cancellation details to understand your consumer rights when shopping on pegador.com.",
  },
  terms: {
    title: "Terms & Conditions",
    text: "By accessing or shopping on pegador.com, you agree to comply with and be bound by our general terms and conditions. These terms govern the contractual relationship between PEGADOR\u00ae and customers, including ordering processes, pricing, payment methods, and ownership. They also detail dispute resolution mechanisms and the legal jurisdiction governing all transactions. We recommend reviewing these terms periodically to stay informed of our policies.",
  },
  accessibility: {
    title: "Accessibility Statement",
    text: "PEGADOR\u00ae is dedicated to ensuring that our digital shopping experience is accessible to everyone, including individuals with disabilities. We continually improve our website's user experience and apply relevant accessibility standards to accommodate assistive technologies. Our development team monitors site performance to ensure ease of navigation, clear typography, and responsive layouts for all users. If you encounter any barriers on our site, please contact us.",
  },
  cookies: {
    title: "Cookie Settings",
    text: "We use cookies and similar tracking technologies to customize your browsing experience, analyze site traffic, and deliver relevant marketing ads. This page details the different categories of cookies we employ, including essential system cookies, performance analytics, and marketing cookies. You can manage your preferences at any time to enable or disable optional cookies based on your choice. Adjusting your settings helps us tailor the pegador.com experience to your needs.",
  },
  "about-us": {
    title: "About Us",
    text: "PEGADOR\u00ae was born out of a desire to create progressive streetwear that combines urban ease with luxury construction. Our journey began with a small team dedicated to oversized graphic tees, and we have grown into a worldwide streetwear community. We design every collection with meticulous attention to fits, heavyweight fabrics, and custom dye treatments. We are driven by creative freedom and a vision to push high-street apparel forward.",
  },
  "gift-card": {
    title: "Gift Card",
    text: "Give the gift of choice with the official PEGADOR\u00ae Digital Gift Card, the perfect present for any streetwear enthusiast. Available in values from \u20ac25 to \u20ac250, our digital gift cards are sent via email instantly after purchase and contain clear redemption instructions. They carry no processing fees, never expire, and can be used across all collections online. Let them select their own perfect fit from our premium graphic tees, hoodies, or cargo pants.",
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export default async function InfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 flex flex-col justify-between transition-colors duration-300">
      <div>
        <AnouncementBar />
        <Header />

        <section className="pt-28 pb-16 px-6 sm:px-12 max-w-[800px] mx-auto w-full text-center space-y-6">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#5147e5] uppercase">
            /info/{slug}
          </span>
          <h1 className="text-[22px] sm:text-[28px] font-normal tracking-wide text-black dark:text-white uppercase leading-tight">
            {page.title}
          </h1>
          <p className="text-[13px] sm:text-[14px] text-neutral-500 dark:text-neutral-400 font-light leading-relaxed">
            {page.text}
          </p>
        </section>
      </div>

      <div className="col-span-3 flex items-center justify-center mb-8">
        <Link
          href="/collections"
          className="text-white text-[14px] font-semibold tracking-widest uppercase bg-black dark:bg-white dark:text-black px-6 py-3 hover:bg-white hover:text-black dark:hover:bg-neutral-200
                border border-transparent hover:border-black dark:border-white dark:hover:border-neutral-200 transition-colors duration-200"
        >
          Shop Now
        </Link>
      </div>
      <div>
        <Footer />
        <StickyOffer />
      </div>
    </main>
  );
}
