"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowRight, FaImages, FaSearch } from "react-icons/fa";

import PremiumPageBanner from "@/components/PremiumPageBanner";
import { api, type CategoryApi, type ProductApi } from "@/lib/api";

export default function ProductsBrowser() {
  const params = useSearchParams();
  const [products, setProducts] = useState<ProductApi[]>([]);
  const [categories, setCategories] = useState<CategoryApi[]>([]);
  const [category, setCategory] = useState(params.get("category") || "all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.publicProducts("limit=100"), api.publicCategories()])
      .then(([productResult, categoryResult]) => {
        setProducts(productResult.data);
        setCategories(categoryResult);
      })
      .catch(() => {
        setProducts([]);
        setCategories([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setCategory(params.get("category") || "all");
  }, [params]);

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesSearch = !query || product.name.toLowerCase().includes(query) || product.material.toLowerCase().includes(query) || product.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [products, category, search]);

  return (
    <main className="overflow-hidden bg-white">
      <PremiumPageBanner eyebrow="Our Collections" title={<>Textiles for every part of <span className="text-[#FBAA00]">the home.</span></>} description="Explore our product catalogue and select any product to see its complete details and image collection." current="Products" bgImage="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1920&auto=format&fit=crop&q=80" />

      <section className="section-y relative bg-gradient-to-br from-white via-[#fffaf0] to-[#FBAA00]/10">
        <div className="absolute right-8 top-12 hidden grid-cols-7 gap-2 opacity-50 lg:grid">
          {Array.from({ length: 28 }).map((_, index) => <span key={index} className="h-1 w-1 rounded-full bg-[#FBAA00]" />)}
        </div>

        <div className="container-x relative">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="display text-3xl font-semibold leading-[1.1] text-[#FBAA00] sm:text-4xl">Choose a collection</h2>
            </div>
            <label className="relative w-full sm:max-w-xs">
              <FaSearch className="absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#579515]/55" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by product name" className="w-full rounded-full border border-[#FBAA00]/35 bg-white py-2.5 pl-11 pr-5 text-xs text-black outline-none transition focus:border-[#579515] focus:shadow-[0_0_0_3px_rgba(87,149,21,0.1)]" />
            </label>
          </div>

          <div className="mt-4 flex flex-col items-start">
            <div className="flex w-full max-w-full gap-2 overflow-x-auto pb-2 no-scrollbar">
              <button type="button" onClick={() => setCategory("all")} className={`shrink-0 rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition ${category === "all" ? "bg-[#579515] text-white shadow-[0_7px_0_rgba(49,91,13,0.2)]" : "border border-[#579515]/20 bg-white text-[#579515] hover:border-[#FBAA00]"}`}>All Products</button>
              {categories.map((item) => (
                <button key={item.id} type="button" onClick={() => setCategory(item.slug)} className={`shrink-0 rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] transition ${category === item.slug ? "bg-[#579515] text-white shadow-[0_7px_0_rgba(49,91,13,0.2)]" : "border border-[#579515]/20 bg-white text-[#579515] hover:border-[#FBAA00]"}`}>{item.name}</button>
              ))}
            </div>

          </div>

          {loading ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => <div key={index} className="aspect-[4/3] rounded-lg shimmer" />)}
            </div>
          ) : visibleProducts.length === 0 ? (
            <div className="mx-auto mt-12 max-w-xl border-y border-[#FBAA00]/30 py-14 text-center">
              <FaImages className="mx-auto h-7 w-7 text-[#FBAA00]" />
              <h3 className="display mt-4 text-base font-semibold text-black">No products found</h3>
              <p className="mt-2 text-sm text-black/60">Try another category or search term.</p>
            </div>
          ) : (
            <motion.div layout className="mt-6 grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((product, index) => (
                <motion.article key={product.id} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: (index % 3) * 0.08 }} className="group relative [perspective:1200px]">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-[#FBAA00]/30 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />
                  <Link href={`/products/${product.slug}`} className="relative block overflow-hidden rounded-lg border border-[#143B32]/25 bg-white p-2 shadow-[0_15px_28px_-22px_rgba(20,59,50,0.55)] transition-[transform,box-shadow] duration-500 [transform-style:preserve-3d] group-hover:[transform:translateY(-5px)_rotateX(2deg)_rotateY(-2deg)] group-hover:shadow-[0_24px_40px_-22px_rgba(20,59,50,0.6)]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F5F5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.images[0] || ""} alt={product.name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <span className="absolute right-2.5 top-2.5 grid h-8 w-8 translate-y-2 place-items-center rounded-full bg-[#FBAA00] text-[#174D2A] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><FaArrowRight className="h-2.5 w-2.5 -rotate-45" /></span>
                    </div>
                    <div className="px-1.5 pb-1.5 pt-3 text-center">
                      <div className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#579515]">{categories.find((item) => item.slug === product.category)?.name || product.category}</div>
                      <h3 className="display mt-1 text-base font-semibold text-black underline decoration-[#FBAA00]/50 underline-offset-4">{product.name}</h3>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
