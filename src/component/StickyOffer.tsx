"use client";
import { useState, useEffect } from "react";
import DiscountModal from "./DiscountModal";

const StickyOffer = () => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("pegador_discount_seen");
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setModalOpen(true);
        localStorage.setItem("pegador_discount_seen", "true");
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <div className="fixed bottom-0 left-0 z-999 flex items-center">
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center bg-white text-black px-8 py-4 rounded font-bold tracking-[0.12em] uppercase border border-black/10 hover:bg-black hover:text-white transition-all duration-300 ml-8 text-[1rem] cursor-pointer"
        >
          Get 10% off
        </button>
      </div>

      {modalOpen && <DiscountModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default StickyOffer;
