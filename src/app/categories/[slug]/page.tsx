import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { loadCategories, loadProducts } from "@/lib/data";
import { categories as staticCategories } from "@/data/categories";

export function generateStaticParams() {
  return staticCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await loadCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category Not Found" };
  return { title: cat.name, description: cat.description };
}

export default async function CategoryDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categories, allProducts] = await Promise.all([
    loadCategories(),
    loadProducts(),
  ]);

  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const list = allProducts.filter((p) => p.category === slug);

  return (
    <>
      <PageHero
        eyebrow="Category"
        title={cat.name}
        subtitle={cat.description}
        bgImage={cat.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
          { label: cat.name },
        ]}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="mb-10 flex items-center justify-between">
            <p className="text-sm text-ink-muted">
              {list.length} {list.length === 1 ? "product" : "products"} in this category
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider-x font-semibold text-maroon-800 hover:text-gold-dark"
            >
              View all products <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {list.length === 0 ? (
            <div className="card p-12 text-center">
              <h3 className="display text-2xl text-maroon-950">Coming soon</h3>
              <p className="text-ink-muted mt-2">
                We&apos;re updating this category. Check back shortly.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
              {list.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
