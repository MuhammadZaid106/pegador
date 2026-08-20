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
      <div className="fixed top-0 left-0 z-50 h-full w-full max-w-[360px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out border-r border-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
          <h2 className="text-[14px] font-bold tracking-[0.18em] uppercase text-[#111]">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-black transition-colors cursor-pointer"
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
                className="w-4 h-4 rounded border-neutral-300 accent-black cursor-pointer"
              />
              <span className="text-[13px] text-neutral-700 font-medium">In Stock Only</span>
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
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400"
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
                    className="flex items-center justify-between text-[13px] text-neutral-700 py-1.5 px-2 hover:bg-neutral-50 rounded transition-colors text-left cursor-pointer"
                  >
                    <span>{col}</span>
                    {isSelected && <Check size={16} className="text-black" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between gap-4">
          <button
            onClick={onResetFilters}
            className="text-[11px] font-bold tracking-wider uppercase text-neutral-500 hover:text-black underline cursor-pointer"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-black text-white py-3 text-[11px] font-bold tracking-widest uppercase text-center hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Show Results ({totalResults})
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;
