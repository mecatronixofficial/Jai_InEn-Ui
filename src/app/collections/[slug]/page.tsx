import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { collections, getCollectionBySlug } from "@/data/content";
import { products } from "@/data/products";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);
  if (!col) return { title: "Collection Not Found" };
  return { title: col.name, description: col.description };
}

export default async function CollectionDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const col = getCollectionBySlug(slug);
  if (!col) notFound();

  // Simple mapping: pull a relevant subset of products based on slug
  const list = (() => {
    switch (slug) {
      case "handloom":
        return products.filter((p) => p.category === "handloom" || p.tags.includes("handloom"));
      case "festival":
        return products.filter(
          (p) => p.category === "dhoti" || p.category === "bed-sheets" || p.tags.includes("festive")
        );
      case "premium":
        return products.filter((p) => p.offerPrice >= 400 || p.tags.includes("premium"));
      case "wholesale":
        return products.filter((p) => p.tags.includes("wholesale") || p.tags.includes("bulk") || p.tags.includes("pack"));
      case "trending":
        return products.filter((p) => p.featured);
      case "daily":
        return products.filter((p) => p.category === "petticoats" || p.category === "lungis" || p.category === "towels");
      default:
        return products;
    }
  })();

  return (
    <>
      <PageHero
        eyebrow={col.badge || "Collection"}
        title={col.name}
        subtitle={col.description}
        bgImage={col.image}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: col.name },
        ]}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="mb-10 flex items-center justify-between">
            <p className="text-sm text-ink-muted">
              {list.length} {list.length === 1 ? "product" : "products"} in this collection
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
              <h3 className="display text-2xl text-maroon-950">
                Coming soon
              </h3>
              <p className="text-ink-muted mt-2">
                We're updating this collection. Check back shortly.
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
