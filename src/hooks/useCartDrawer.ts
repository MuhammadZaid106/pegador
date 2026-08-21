import { useEffect, useState } from "react";

export const useCartDrawer = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener("open-cart", handleOpenCart);
    return () => window.removeEventListener("open-cart", handleOpenCart);
  }, []);

  return { isCartOpen, setIsCartOpen };
};
