"use client";
import React from "react";
import { ProductForm } from "@/component/admin";

export default function AddProductPage() {
  return (
    <div className="p-3 sm:p-6 lg:p-8 bg-[#fafafa] dark:bg-neutral-900 min-h-screen text-black dark:text-white max-w-full overflow-x-hidden">
      <ProductForm />
    </div>
  );
}