import { Product } from "@/types/product.types";

export interface CartItem {
  id: string; // combination of productId_size
  product: Product;
  size: string;
  quantity: number;
}
