"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Download,
  RefreshCw,
  Plus,
  LogOut,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/component/AuthProvider";
import { ADMIN_EMAIL } from "@/constants/auth";

export interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  search: string;
  onSearchChange: (value: string) => void;
  onExport: () => void;
  onRefresh: () => void;
  refreshing: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "Hello, Admin!",
  subtitle = "Here's your store analytic detail",
  search,
  onSearchChange,
  onExport,
  onRefresh,
  refreshing,
}) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    router.push("/login");
  };

  const displayName = user?.name || "Zaid Admin";
  const displayEmail = user?.email || ADMIN_EMAIL;
  const initialLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-black dark:text-white">
          {title}
        </h1>
        <p className="text-[12px] text-neutral-400 dark:text-neutral-500 mt-0.5 tracking-wide">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Search input */}
        <div className="relative flex-1 sm:flex-initial">
          <Search
            size={13}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder="Search customer, product, etc..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-60 pl-9 pr-4 py-2 text-[12px] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-black dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors tracking-wide rounded-md"
          />
        </div>

        {/* Export Button */}
        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-1.5 px-3 py-2 text-[10px] font-bold tracking-[0.15em] uppercase border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors cursor-pointer rounded-md"
        >
          <Download size={12} strokeWidth={2} />
          Exports
        </button>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          title="Refresh Data"
          className="w-8.5 h-8.5 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center bg-white dark:bg-neutral-950 text-neutral-500 hover:border-black dark:hover:border-white transition-colors cursor-pointer disabled:opacity-50 rounded-md"
        >
          <RefreshCw size={13} strokeWidth={1.5} className={refreshing ? "animate-spin" : ""} />
        </button>

        {/* Admin Profile Dropdown with Logout */}
        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen((v) => !v)}
            className="flex items-center gap-2 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1.5 rounded-md hover:border-black dark:hover:border-white transition-colors cursor-pointer"
            aria-label="Admin Profile Menu"
          >
            <div className="w-6 h-6 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center rounded text-[10px] font-bold">
              {initialLetter}
            </div>
            <div className="hidden sm:block text-left">
              <span className="text-[11px] font-bold tracking-wide text-black dark:text-white block leading-tight">
                {displayName}
              </span>
              <span className="text-[9px] text-neutral-400 uppercase tracking-widest block leading-tight">
                Store Admin
              </span>
            </div>
            <ChevronDown size={12} className="text-neutral-400" />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-11 z-50 min-w-[200px] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-md py-1.5 overflow-hidden animate-fade-in">
              <div className="px-3.5 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
                <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-400 block mb-0.5">
                  Logged in as
                </span>
                <span className="text-[12px] font-bold text-black dark:text-white block truncate">
                  {displayName}
                </span>
                <span className="text-[11px] text-neutral-500 font-mono block truncate">
                  {displayEmail}
                </span>
              </div>

              <Link
                href="/"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2 text-[12px] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
              >
                <ShoppingBag size={14} />
                View Live Store
              </Link>

              <div className="my-1 border-t border-neutral-100 dark:border-neutral-800" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-3.5 py-2 text-[12px] text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              >
                <LogOut size={14} />
                Log out
              </button>
            </div>
          )}
        </div>

        {/* Add Product CTA */}
        <Link
          href="/admin/AddProduct"
          className="flex items-center gap-1.5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shrink-0 rounded-md"
        >
          <Plus size={13} strokeWidth={2.5} />
          Add Product
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
