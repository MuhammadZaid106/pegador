import collectionsDataRaw from "./collectionsData.json";
import productsDataRaw from "./productsData.json";
import { Collection, Product } from "@/types/product.types";

export * from "@/types/product.types";
export * from "@/utils/format";

export const collectionsData: Collection[] = collectionsDataRaw as Collection[];
export const productsData: Product[] = productsDataRaw as Product[];
