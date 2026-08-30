"use client";
import React from "react";
import { X, Check } from "lucide-react";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  selectedColors: string[];
  onToggleColor: (color: string) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  onResetFilters: () => void;
  totalResults: number;
}

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const ALL_COLORS = [
  "Vintage Black",
  "Washed Grey",
  "Off White",
  "Espresso Brown",
  "Sage Green",
  "Midnight Navy"
];

const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedSizes,
  onToggleSize,
  selectedColors,
  onToggleColor,
  inStockOnly,
  onToggleInStock,
  onResetFilters,
  totalResults,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out drawer */}
      <div className="fixed top-0 left-0 z-50 h-full w-full max-w-[360px] bg-white dark:bg-neutral-950 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out border-r border-neutral-200 dark:border-neutral-800">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-[14px] font-bold tracking-[0.18em] uppercase text-[#111] dark:text-white">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Availability */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">
              Availability
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={onToggleInStock}
                className="w-4 h-4 rounded border-neutral-300 accent-black dark:accent-white cursor-pointer"
              />
              <span className="text-[13px] text-neutral-700 dark:text-neutral-300 font-medium">In Stock Only</span>
            </label>
          </div>

          {/* Size Filter */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">
              Size
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {ALL_SIZES.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => onToggleSize(size)}
                    className={`py-2 text-[12px] font-medium border text-center transition-all cursor-pointer ${
                      isSelected
                        ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                        : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">
              Colorway
            </h3>
            <div className="flex flex-col gap-2">
              {ALL_COLORS.map((col) => {
                const isSelected = selectedColors.includes(col);
                return (
                  <button
                    key={col}
                    onClick={() => onToggleColor(col)}
                    className="flex items-center justify-between text-[13px] text-neutral-700 dark:text-neutral-300 py-1.5 px-2 hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded transition-colors text-left cursor-pointer"
                  >
                    <span>{col}</span>
                    {isSelected && <Check size={16} className="text-black dark:text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 flex items-center justify-between gap-4">
          <button
            onClick={onResetFilters}
            className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white underline cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 text-[11px] font-bold tracking-widest uppercase text-center hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            Show Results ({totalResults})
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
