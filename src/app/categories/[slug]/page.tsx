import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import ProductCard from "@/components/ProductCard";
import { EmptyState } from "@/components/LuxTiles";
import { loadCategories, loadProducts } from "@/lib/data";

export async function generateStaticParams() {
  const categories = await loadCategories();
  return categories.map((category) => ({ slug: category.slug }));
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
    <div className="lux-page">
      <PageHero
        pageKey="category"
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

      <section id="page-content" className="lux-section">
        <div className="lux-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionTitle
              eyebrow={`${list.length} ${list.length === 1 ? "product" : "products"} in this category`}
              title={<>The <span>{cat.name}</span> collection</>}
              className="!mb-0"
            />
            <Link href="/products" className="lux-link shrink-0">View all products <FaArrowRight aria-hidden /></Link>
          </div>

          <div className="mt-6 md:mt-8">
            {list.length === 0 ? (
              <EmptyState title="Coming soon" copy="We're updating this category. Check back shortly.">
                <Link href="/products" className="lux-btn">Browse all products <FaArrowRight aria-hidden /></Link>
              </EmptyState>
            ) : (
              <div className="grid grid-cols-2 gap-5 md:gap-7 lg:grid-cols-4">
                {list.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
