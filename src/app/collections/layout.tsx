import React from "react";
import AnouncementBar from "@/component/AnouncementBar";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import StickyOffer from "@/component/StickyOffer";

export default function CollectionsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnouncementBar />
      <Header />
      <main className="min-h-screen bg-white">
        {children}
      </main>
      <Footer />
      <StickyOffer />
    </>
  );
}
