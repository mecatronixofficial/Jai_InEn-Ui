import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import { EmptyState } from "@/components/LuxTiles";
import { loadCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Curated textile categories from Jai India Enterprises — Petticoats, Lungis, Towels, Handloom and more.",
};

export default async function CategoriesPage() {
  const categories = await loadCategories();

  return (
    <div className="lux-page">
      <PageHero
        pageKey="categories"
        eyebrow="Curated"
        title={<>Categories, by <span>theme and season.</span></>}
        subtitle="Hand-picked groupings across our entire textile range — for festivals, wholesale, daily wear and beyond."
        bgImage="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />

      <section id="page-content" className="lux-section">
        <div className="lux-container">
          <SectionTitle
            eyebrow={`Our range · ${categories.length} collections`}
            title={<>Find the right textile for <span>every space.</span></>}
            align="center"
            ornament
          />
          {categories.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((cat, i) => (
                <Link key={cat.id} href={`/categories/${cat.slug}`} className="lux-poster">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                  <span className="lux-poster-index">{String(i + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}</span>
                  <div className="lux-poster-body">
                    <h3>{cat.name}</h3>
                    <p className="line-clamp-2">{cat.description}</p>
                    <div className="lux-poster-foot">
                      <span>{cat.productCount} products</span>
                      <span className="inline-flex items-center gap-2">Explore <FaArrowRight aria-hidden /></span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState title="Categories are being updated" copy="Please check back shortly." />
          )}
        </div>
      </section>
    </div>
  );
}
