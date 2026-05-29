"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaTimes } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { cn } from "@/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "New Arrivals" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];

export default function ProductsPage() {
  const params = useSearchParams();
  const initialCategory = params.get("category") || "all";

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000);

  useEffect(() => {
    setCategory(params.get("category") || "all");
  }, [params]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.material.toLowerCase().includes(q)
      );
    }
    list = list.filter((p) => p.offerPrice <= maxPrice);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.offerPrice - b.offerPrice);
        break;
      case "price-desc":
        list.sort((a, b) => b.offerPrice - a.offerPrice);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [category, search, sort, maxPrice]);

  return (
    <>
      <PageHero
        eyebrow="Catalogue"
        title="Browse our complete textile range."
        subtitle="From everyday petticoats to heritage handloom — every piece manufactured in our Erode facility."
        bgImage="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      />

      <section className="section-y">
        <div className="container-x">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-ink-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="rounded-full border border-cream-300 bg-white pl-11 pr-5 py-2.5 text-sm w-72 focus:outline-none focus:border-maroon-700 transition"
                />
              </div>

              <button
                type="button"
                onClick={() => setShowFilters((v) => !v)}
                className="lg:hidden btn-outline !py-2 !px-4 text-xs"
              >
                <FaFilter className="h-3 w-3" /> Filters
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-ink-muted">
                {filtered.length} {filtered.length === 1 ? "product" : "products"}
              </span>
              <div className="h-4 w-px bg-cream-300" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-full border border-cream-300 bg-white px-4 py-2 text-sm focus:outline-none focus:border-maroon-700"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sidebar filters */}
            <aside
              className={cn(
                "lg:col-span-3 lg:block",
                showFilters
                  ? "fixed inset-0 z-40 bg-cream-50 p-6 overflow-y-auto"
                  : "hidden"
              )}
            >
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="display text-2xl text-maroon-950">Filters</h3>
                <button onClick={() => setShowFilters(false)} aria-label="Close">
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <div className="text-[11px] uppercase tracking-widest-x text-gold-dark font-semibold mb-4">
                  Category
                </div>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => setCategory("all")}
                    className={cn(
                      "w-full flex items-center justify-between rounded-lg px-4 py-2.5 text-sm text-left transition",
                      category === "all"
                        ? "bg-maroon-800 text-cream-50"
                        : "text-ink-soft hover:bg-cream-100"
                    )}
                  >
                    <span>All Products</span>
                    <span className="text-xs opacity-70">{products.length}</span>
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.slug)}
                      className={cn(
                        "w-full flex items-center justify-between rounded-lg px-4 py-2.5 text-sm text-left transition",
                        category === c.slug
                          ? "bg-maroon-800 text-cream-50"
                          : "text-ink-soft hover:bg-cream-100"
                      )}
                    >
                      <span>{c.name}</span>
                      <span className="text-xs opacity-70">{c.productCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="text-[11px] uppercase tracking-widest-x text-gold-dark font-semibold mb-4">
                  Maximum Price
                </div>
                <input
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-maroon-800"
                />
                <div className="flex items-center justify-between text-xs text-ink-muted mt-2">
                  <span>₹100</span>
                  <span className="font-semibold text-maroon-800">
                    Up to ₹{maxPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setSearch("");
                  setMaxPrice(2000);
                  setSort("featured");
                  setShowFilters(false);
                }}
                className="btn-outline w-full text-xs"
              >
                Reset Filters
              </button>
            </aside>

            {/* Grid */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="card p-16 text-center"
                  >
                    <h3 className="display text-2xl text-maroon-950">
                      No products match your filters
                    </h3>
                    <p className="mt-2 text-ink-muted">
                      Try removing a filter or searching differently.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
                  >
                    {filtered.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
