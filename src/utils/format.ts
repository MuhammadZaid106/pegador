import { Collection, Product } from "@/types/product.types";
import { collectionsData, productsData } from "@/data";

export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collectionsData.find((col) => col.slug === slug);
};

export const getProductsByCollection = (collectionSlug: string): Product[] => {
  return productsData.filter((prod) => prod.collectionSlug === collectionSlug);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return productsData.find((prod) => prod.slug === slug);
};
