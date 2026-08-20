import collectionsDataRaw from "./collectionsData.json";
import productsDataRaw from "./productsData.json";

export interface Collection {
  id: string;
  name: string;
  slug: string;
  href: string;
  category: string;
  subCategory: string;
  description: string;
  heroImage: string;
  itemCount: number;
  featured: boolean;
}

export interface ProductDetails {
  description: string;
  fit: string;
  fabric: string;
  care: string;
  features: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  collectionSlug: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice: number | null;
  currency: string;
  currencySymbol: string;
  image: string;
  moreImages: string[];
  sizes: string[];
  stock: number;
  inStock: boolean;
  color: string;
  rating: number;
  reviewCount: number;
  details: ProductDetails;
}

export const collectionsData: Collection[] = collectionsDataRaw as Collection[];
export const productsData: Product[] = productsDataRaw as Product[];

// Helper functions for easy data querying
export const getCollectionBySlug = (slug: string): Collection | undefined => {
  return collectionsData.find((col) => col.slug === slug);
};

export const getProductsByCollection = (collectionSlug: string): Product[] => {
  return productsData.filter((prod) => prod.collectionSlug === collectionSlug);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return productsData.find((prod) => prod.slug === slug);
};
