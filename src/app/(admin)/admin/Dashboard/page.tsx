"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Check } from "lucide-react";
import { Product } from "@/data";
import {
  StatCard,
  RevenueChart,
  CategoryDistribution,
  ProductsTable,
  DeleteModal,
  AdminHeader,
} from "@/component/admin";

export default function DashboardPage() {
  const [products, setProducts]                 = useState<Product[]>([]);
  const [search, setSearch]                     = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedStock, setSelectedStock]       = useState<string>("ALL");
  const [sortBy, setSortBy]                     = useState<string>("newest");
  const [loading, setLoading]                   = useState(true);
  const [refreshing, setRefreshing]             = useState(false);
  const [toDelete, setToDelete]                 = useState<Product | null>(null);
  const [deleting, setDeleting]                 = useState(false);
  const [notification, setNotification]         = useState<string | null>(null);

  // Fetch live products
  const fetchProducts = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      // Fallback
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Toast notification timer
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalOrdersCount = 12832;
    const totalSalesAmount = 12832.8;
    const visitsCount = 1062;
    const inStockCount = products.filter((p) => p.inStock).length;

    return {
      totalOrdersCount,
      totalSalesAmount,
      visitsCount,
      inStockCount,
    };
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q) ||
          p.subCategory?.toLowerCase().includes(q) ||
          p.collectionSlug?.toLowerCase().includes(q) ||
          p.color?.toLowerCase().includes(q) ||
          p.id?.toLowerCase().includes(q),
      );
    }

    // Category filter
    if (selectedCategory !== "ALL") {
      list = list.filter((p) => p.category?.toUpperCase() === selectedCategory);
    }

    // Stock filter
    if (selectedStock === "IN_STOCK") {
      list = list.filter((p) => p.inStock);
    } else if (selectedStock === "OUT_OF_STOCK") {
      list = list.filter((p) => !p.inStock);
    }

    // Sorting
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "stock-asc") {
      list.sort((a, b) => a.stock - b.stock);
    } else if (sortBy === "rating-desc") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [products, search, selectedCategory, selectedStock, sortBy]);

  // Execute Delete
  const handleDeleteConfirm = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: toDelete.id }),
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== toDelete.id));
        setNotification(`Product "${toDelete.name}" deleted successfully.`);
      }
    } catch {
      setNotification("Failed to delete product.");
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  // Export data as JSON
  const handleExport = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `pegador-products-${new Date().toISOString().slice(0, 10)}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setNotification("Product catalog exported as JSON.");
  };

  return (
    <div className="p-3 sm:p-6 lg:p-8 bg-[#fafafa] dark:bg-neutral-900 min-h-screen text-black dark:text-white max-w-full overflow-x-hidden">
      {/* ── Toast Notification ── */}
      {notification && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-4 py-3 border border-neutral-700 shadow-2xl rounded-lg">
          <Check size={14} strokeWidth={2.5} />
          <p className="text-[11px] font-bold tracking-wide">{notification}</p>
        </div>
      )}

      {/* ── Delete Modal ── */}
      {toDelete && (
        <DeleteModal
          product={toDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setToDelete(null)}
          loading={deleting}
        />
      )}

      {/* ── Header ── */}
      <AdminHeader
        title="Hello, Admin!"
        subtitle="Here's your store analytic detail"
        search={search}
        onSearchChange={setSearch}
        onExport={handleExport}
        onRefresh={() => fetchProducts(true)}
        refreshing={refreshing}
      />

      {/* ── 4 Stat Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatCard
          title="Total orders"
          value={stats.totalOrdersCount.toLocaleString()}
          percentChange="+20.1%"
          subText="+2,123 today"
          trend="up"
        />
        <StatCard
          title="Total Sales"
          value={`€${stats.totalSalesAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
          percentChange="+10.6%"
          subText="€1,895 today"
          trend="up"
        />
        <StatCard
          title="Visits"
          value={stats.visitsCount.toLocaleString()}
          percentChange="-10%"
          subText="-426 today"
          trend="down"
        />
        <StatCard
          title="In Stock Items"
          value={loading ? "—" : `${stats.inStockCount} / ${products.length}`}
          percentChange="+12%"
          subText="+42 today"
          trend="up"
        />
      </div>

      {/* ── Middle Row: Revenue Chart + Category Distribution ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <CategoryDistribution products={products} />
        </div>
      </div>

      {/* ── Bottom Section: Products Table & Filters ── */}
      <ProductsTable
        products={products}
        filteredProducts={filteredProducts}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedStock={selectedStock}
        onSelectStock={setSelectedStock}
        sortBy={sortBy}
        onSelectSortBy={setSortBy}
        onResetFilters={() => {
          setSearch("");
          setSelectedCategory("ALL");
          setSelectedStock("ALL");
        }}
        onDeleteProduct={(product) => setToDelete(product)}
        loading={loading}
      />
    </div>
  );
}
