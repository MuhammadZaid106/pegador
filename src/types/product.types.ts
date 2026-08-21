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
