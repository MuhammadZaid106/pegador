"use client";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";

const AnnouncementBar = () => {
  const data: string[] = [
    "NEW FW '26 COLLECTION IS LIVE",
    "FREE RETURNS",
    "FREE SHIPPING ON ORDERS OVER €99",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#F4F4F4] text-black text-[12px] md:text-[14px] font-medium flex justify-center items-center py-2 px-4 overflow-hidden h-8 relative">
      <AnimatePresence mode="wait">
        <motion.a
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute underline underline-offset-4 hover:text-[#413e3e] transition-colors duration-300"
          href="#"
        >
          {data[current]}
        </motion.a>
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementBar;
