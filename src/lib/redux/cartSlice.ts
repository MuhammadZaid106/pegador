import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/data";
import { CartItem } from "@/types/cart.types";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const saveCartToStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("pegador_cart", JSON.stringify(items));
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart: (state) => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("pegador_cart");
        if (stored) {
          try {
            state.items = JSON.parse(stored);
          } catch (e) {
            console.error("Error parsing cart from storage", e);
          }
        }
      }
    },
    addItem: (state, action: PayloadAction<{ product: Product; size: string; quantity: number }>) => {
      const { product, size, quantity } = action.payload;
      const itemId = `${product.id}_${size}`;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: itemId,
          product,
          size,
          quantity,
        });
      }
      saveCartToStorage(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

export const { hydrateCart, addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
