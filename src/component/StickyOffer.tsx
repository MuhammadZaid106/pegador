"use client";
import { useState, useEffect } from "react";
import DiscountModal from "./DiscountModal";

const StickyOffer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Sync with body class toggled by the filter drawer
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setFilterOpen(document.body.classList.contains("filter-open"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

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
      <div
        className={`fixed bottom-0 left-0 z-40 flex items-center transition-all duration-300 ${
          filterOpen ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center bg-white dark:bg-neutral-900 text-black dark:text-white px-8 py-4 rounded font-bold tracking-[0.12em] uppercase border border-black/10 dark:border-neutral-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 ml-6 text-[1rem] cursor-pointer"
        >
          Get 10% off
        </button>
      </div>

      {modalOpen && <DiscountModal onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default StickyOffer;

