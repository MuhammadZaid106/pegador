"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PackagePlus,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ShieldAlert,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "@/component/AuthProvider";
import { ADMIN_EMAIL } from "@/constants/auth";

const navItems = [
  { href: "/admin/Dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/AddProduct", label: "Add Product", icon: PackagePlus },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAdmin, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    router.push("/login");
  };

  // If client-side check determines user is definitely not admin
  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-neutral-900 flex items-center justify-center p-4 text-black dark:text-white">
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 max-w-md w-full text-center rounded-2xl shadow-xl">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert size={24} />
          </div>
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-[13px] text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
            You are logged in as{" "}
            <strong className="text-black dark:text-white font-mono">
              {user.email}
            </strong>
            , which does not have admin privileges. Only{" "}
            <strong className="text-black dark:text-white font-mono">
              {ADMIN_EMAIL}
            </strong>{" "}
            can access this area.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="flex-1 py-2.5 text-[11px] font-bold tracking-wider uppercase border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-colors rounded-md"
            >
              Go to Store
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 py-2.5 text-[11px] font-bold tracking-wider uppercase bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors rounded-md cursor-pointer"
            >
              Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#fafafa] dark:bg-neutral-900 w-full">
      {/* ── Mobile Top Bar (visible on screens < 768px) ── */}
      <header className="md:hidden sticky top-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="w-9 h-9 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center rounded-md text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
            aria-label="Open Admin Menu"
          >
            <Menu size={18} />
          </button>
          <Link href="/admin/Dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center rounded-lg text-[9px] font-bold">
              PG
            </div>
            <span className="font-bold text-[14px] uppercase tracking-wider text-black dark:text-white">
              PEGADOR® <span className="text-[10px] font-normal text-neutral-400">Admin</span>
            </span>
          </Link>
        </div>

        <Link
          href="/"
          className="w-8 h-8 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center rounded-md text-neutral-500 hover:text-black dark:hover:text-white"
          title="Storefront"
        >
          <ShoppingBag size={14} />
        </Link>
      </header>

      {/* ── Mobile Drawer (Slide-out navigation on mobile) ── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-[280px] bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 flex flex-col h-full shadow-2xl z-10">
            {/* Drawer Header */}
            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center rounded-xl">
                  <span className="text-white dark:text-black text-[9px] font-bold">PG</span>
                </div>
                <span className="font-bold text-[15px] uppercase tracking-wider text-black dark:text-white">
                  PEGADOR®
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center rounded-md text-neutral-500 hover:text-black dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="p-3 flex flex-col gap-1 flex-1 overflow-y-auto">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 px-3 py-2">
                Admin Navigation
              </span>
              {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-3 rounded-md text-[13px] font-bold tracking-wide uppercase transition-colors ${
                      isActive
                        ? "bg-black dark:bg-white text-white dark:text-black"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                    }`}
                  >
                    <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
                    {label}
                  </Link>
                );
              })}

              <div className="my-3 border-t border-neutral-100 dark:border-neutral-800" />

              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-md text-[12px] font-bold tracking-wide uppercase text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <ShoppingBag size={15} />
                Storefront
              </Link>
            </nav>

            {/* Logout Footer */}
            <div className="p-3 border-t border-neutral-100 dark:border-neutral-800">
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 px-3.5 py-3 w-full rounded-md text-[12px] font-bold tracking-wider uppercase text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Desktop Sidebar (hidden on mobile, visible on md+) ── */}
      <aside
        className={`hidden md:flex relative flex-col bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 shrink-0 ${
          collapsed ? "w-[60px]" : "w-[220px]"
        }`}
        style={{ minHeight: "100vh" }}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-3 border-b border-neutral-100 dark:border-neutral-800 ${
            collapsed ? "px-4 py-6 justify-center" : "px-5 py-6"
          }`}
        >
          <div className="w-8 h-8 bg-black dark:bg-white flex items-center justify-center flex-shrink-0 rounded-xl">
            <span className="text-white dark:text-black text-[9px] font-bold tracking-[0.15em]">
              PG
            </span>
          </div>
          {!collapsed && (
            <span className="font-bold text-[18px] text-black dark:text-white tracking-[0.08em] uppercase">
              PEGADOR®
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-px px-2 py-4 flex-1">
          {!collapsed && (
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-600 px-3 mb-2">
              Admin
            </span>
          )}

          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`flex rounded-md items-center gap-3 px-3 py-2.5 transition-all duration-150 ${
                  isActive
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon
                  size={15}
                  strokeWidth={isActive ? 2 : 1.5}
                  className="flex-shrink-0"
                />
                {!collapsed && (
                  <span className="text-[12px] font-bold tracking-[0.05em] uppercase">
                    {label}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="my-3 mx-2 h-px bg-neutral-100 dark:bg-neutral-800" />
        </nav>

        {/* Logout */}
        <div className="border-t border-neutral-100 dark:border-neutral-800 p-2">
          <button
            onClick={handleLogout}
            className={`flex items-center cursor-pointer gap-3 px-3 py-2.5 w-full text-neutral-900 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-black dark:hover:text-white transition-colors ${
              collapsed ? "justify-center" : " rounded-md"
            }`}
          >
            <LogOut size={14} strokeWidth={1.5} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-[12px] font-bold tracking-[0.05em] uppercase">
                Logout
              </span>
            )}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-4 top-[60px] w-9 h-9 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center hover:border-black dark:hover:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors z-10 text-black dark:text-white cursor-pointer rounded-full"
        >
          {collapsed ? (
            <ChevronRight size={11} strokeWidth={2} />
          ) : (
            <ChevronLeft size={11} strokeWidth={2} />
          )}
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 w-full overflow-x-hidden min-w-0">{children}</main>
    </div>
  );
}
