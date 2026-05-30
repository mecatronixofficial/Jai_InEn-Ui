import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import { loadCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Curated textile categories from Jai India Enterprises — Petticoats, Lungis, Towels, Handloom and more.",
};

export default async function CategoriesPage() {
  const categories = await loadCategories();

  return (
    <>
      <PageHero
        eyebrow="Curated"
        title="Categories, by theme and season."
        subtitle="Hand-picked groupings across our entire textile range — for festivals, wholesale, daily wear and beyond."
        bgImage="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Categories" }]}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="group block relative overflow-hidden rounded-2xl aspect-[4/5]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/90 via-maroon-950/30 to-transparent" />

                <div className="absolute top-5 right-5 text-cream-50 text-xs font-semibold opacity-70">
                  {String(i + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-7 text-cream-50">
                  <h3 className="display text-3xl md:text-4xl font-semibold leading-tight">
                    {cat.name}
                  </h3>
                  <p className="mt-2 text-sm text-cream-100/80 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider-x text-gold-light">
                      {cat.productCount} products
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider-x font-semibold text-gold-light group-hover:gap-3 transition-all">
                      Explore <FaArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
