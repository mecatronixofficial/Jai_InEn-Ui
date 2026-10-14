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

  const filters = [{ slug: "all", name: "All products" }, ...categories.map(({ slug, name }) => ({ slug, name }))];
  const categoryName = (slug: string) => categories.find((item) => item.slug === slug)?.name || slug;

  return (
    <div className="lux-page">
      <PremiumPageBanner eyebrow="Our Collections" title={<>Textiles for every part of <span>the home.</span></>} description="Explore our product catalogue and select any product to see its complete details and image collection." current="Products" bgImage="https://res.cloudinary.com/dtbjt4hvf/image/upload/v1787767823/Thangavel-Textile/tcs5vcfnsvzidtpvgcux.webp" />

      <section id="page-content" className="relative overflow-hidden bg-gradient-to-br from-white via-[#FFFDF8] to-[#FFF6E2] py-12 md:py-16">
        <div aria-hidden className="pointer-events-none absolute right-8 top-10 hidden grid-cols-7 gap-2.5 opacity-60 lg:grid">
          {Array.from({ length: 28 }).map((_, index) => <span key={index} className="h-1 w-1 rounded-full bg-[#FBAA00]" />)}
        </div>

        <div className="lux-container relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="lux-serif text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-[2.75rem]">
              Choose a <span>collection</span>
            </h2>
            <label className="relative w-full sm:max-w-xs">
              <span className="sr-only">Search products</span>
              <FaSearch aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#FBAA00]" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by product name"
                className="w-full rounded-full border border-[#FBAA00]/40 bg-white py-3 pl-11 pr-5 text-sm text-[#1C1C1C] outline-none transition duration-300 placeholder:text-[#A6A097] hover:border-[#FBAA00] focus:border-[#FBAA00] focus:shadow-[0_0_0_4px_rgba(251,170,0,0.14)]"
              />
            </label>
          </div>

          <div className="mt-6 flex gap-2.5 overflow-x-auto pb-3 no-scrollbar" role="tablist" aria-label="Filter by category">
            {filters.map((item) => {
              const active = category === item.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(item.slug)}
                  className={`shrink-0 rounded-full border px-5 py-2.5 font-[family-name:var(--lux-heading)] text-[11px] font-semibold uppercase tracking-[0.14em] transition duration-300 ${
                    active
                      ? "border-[#FBAA00] bg-[#FBAA00] text-[#1C1C1C] shadow-[0_6px_0_rgba(181,122,0,0.22)]"
                      : "border-[#FBAA00]/35 bg-white text-[#B57A00] hover:-translate-y-0.5 hover:border-[#FBAA00] hover:bg-[#FFF4D9]"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="mt-6">
            {loading ? (
              <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => <div key={index} className="aspect-[4/3.6] rounded-lg shimmer" />)}
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="mx-auto mt-6 max-w-xl border-y border-[#FBAA00]/30 py-14 text-center">
                <FaImages aria-hidden className="mx-auto h-7 w-7 text-[#FBAA00]" />
                <h3 className="lux-serif mt-4 text-xl">No products found</h3>
                <p className="mt-2 text-sm">Try another category or search term.</p>
              </div>
            ) : (
              <motion.div layout className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {visibleProducts.map((product, index) => (
                  <motion.article
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
                    className="group relative"
                  >
                    <div aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-[#FBAA00]/30 transition duration-500 group-hover:translate-x-3 group-hover:translate-y-3 group-hover:bg-[#FBAA00]/50" />
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative block overflow-hidden rounded-lg border border-[#1C1C1C]/15 bg-white p-2 shadow-[0_15px_28px_-22px_rgba(32,32,32,0.55)] transition duration-500 group-hover:-translate-y-1 group-hover:border-[#FBAA00]/60 group-hover:shadow-[0_24px_40px_-22px_rgba(32,32,32,0.6)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#FFFBF2]">
                        {product.images[0] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.images[0]} alt={product.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        )}
                        <span aria-hidden className="absolute right-2.5 top-2.5 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-[#FBAA00] text-[#1C1C1C] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                          <FaArrowRight className="h-3 w-3 -rotate-45" />
                        </span>
                      </div>
                      <div className="px-2 pb-2 pt-3.5 text-center">
                        <div className="font-[family-name:var(--lux-heading)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B57A00]">
                          {categoryName(product.category)}
                        </div>
                        <h3 className="lux-serif mt-1.5 text-lg text-[#1C1C1C] underline decoration-[#FBAA00]/50 underline-offset-4 transition-colors duration-300 group-hover:text-[#B57A00] group-hover:decoration-[#FBAA00]">
                          {product.name}
                        </h3>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
