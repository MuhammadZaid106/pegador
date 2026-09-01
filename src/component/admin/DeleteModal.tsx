"use client";
import React from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "@/data";

export interface DeleteModalProps {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  product,
  onConfirm,
  onCancel,
  loading,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 max-w-md w-full shadow-2xl  rounded-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100 dark:border-neutral-900">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">
            Confirm Removal
          </p>
          <button
            type="button"
            onClick={onCancel}
            className="text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900 p-1 hover:rounded-2xl"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex items-start gap-4 mb-6">
          <div className="relative w-14 h-14 bg-neutral-100 dark:bg-neutral-900 shrink-0 border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
          </div>
          <div>
            <h3 className="text-[14px] font-bold text-black dark:text-white leading-snug line-clamp-2">
              {product.name}
            </h3>
            <p className="text-[11px] text-neutral-400 mt-1">
              SKU: {product.id} · {product.color} · €{product.price.toFixed(2)}
            </p>
          </div>
        </div>

        <p className="text-[12px] text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed">
          Are you sure you want to delete this product? It will be permanently removed from{" "}
          <code className="text-black dark:text-white font-mono text-[11px]">productsData.json</code>{" "}
          and will no longer appear on the live store.
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 text-[10px] font-bold tracking-[0.15em] uppercase border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors disabled:opacity-50 cursor-pointer rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 text-[10px] font-bold tracking-[0.15em] uppercase bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer rounded-md"
          >
            {loading && (
              <div className="w-3.5 h-3.5 border-2 border-white dark:border-black border-t-transparent animate-spin" />
            )}
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
