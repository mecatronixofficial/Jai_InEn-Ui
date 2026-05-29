import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaCheck, FaTruck, FaShieldAlt, FaUndoAlt, FaArrowRight } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import ProductGallery from "./ProductGallery";
import ProductActions from "./ProductActions";

import { products as staticProducts } from "@/data/products";
import { loadProductBySlug, loadRelatedProducts } from "@/lib/data";
import { formatINR, discountPercent } from "@/utils";

// Build-time params come from static seed data. Any product added in admin after
// build is rendered on-demand (dynamicParams = true is the default).
export function generateStaticParams() {
  return staticProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await loadProductBySlug(slug);
  if (!product) notFound();

  const related = await loadRelatedProducts(slug);
  const discount = discountPercent(product.originalPrice, product.offerPrice);
  const inStock = product.stock > 0;

  return (
    <>
      <PageHero
        title={product.name}
        eyebrow={product.category}
        bgImage={product.images[0]}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <section className="section-y">
        <div className="container-x">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Gallery */}
            <div className="lg:col-span-7">
              <ProductGallery images={product.images} name={product.name} />
            </div>

            {/* Info */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest-x font-semibold mb-4">
                <span className="text-gold-dark">{product.category}</span>
                {product.subcategory && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-cream-300" />
                    <span className="text-ink-muted">{product.subcategory}</span>
                  </>
                )}
              </div>

              <h1 className="display text-4xl md:text-5xl font-semibold text-maroon-950 leading-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-3 text-sm text-ink-muted">
                <span className="text-gold">
                  {"★".repeat(Math.round(product.rating))}
                  <span className="text-cream-300">
                    {"★".repeat(5 - Math.round(product.rating))}
                  </span>
                </span>
                <span>·</span>
                <span>
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mt-6 flex items-end gap-4">
                <div className="display text-4xl font-semibold text-maroon-900">
                  {formatINR(product.offerPrice)}
                </div>
                {product.originalPrice > product.offerPrice && (
                  <>
                    <div className="text-lg text-ink-muted line-through mb-1">
                      {formatINR(product.originalPrice)}
                    </div>
                    <div className="inline-flex items-center rounded-full bg-gold/15 text-gold-dark px-2.5 py-1 text-xs font-bold mb-1">
                      Save {discount}%
                    </div>
                  </>
                )}
              </div>

              {/* Stock */}
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span
                  className={`h-2 w-2 rounded-full ${
                    inStock ? "bg-green-600" : "bg-red-600"
                  }`}
                />
                <span className={inStock ? "text-green-700" : "text-red-700"}>
                  {inStock
                    ? `In stock — ${product.stock} available`
                    : "Out of stock"}
                </span>
              </div>

              {/* Description */}
              <p className="mt-6 text-ink-soft leading-relaxed">
                {product.description}
              </p>

              {/* Actions (client) */}
              <div className="mt-8">
                <ProductActions product={product} />
              </div>

              {/* Trust badges */}
              <div className="mt-8 grid grid-cols-2 gap-3 pt-8 border-t border-cream-200">
                {[
                  { Icon: FaTruck, label: "Pan-India delivery", sub: "3–7 working days" },
                  { Icon: FaShieldAlt, label: "Quality assured", sub: "Multi-stage QC" },
                  { Icon: FaUndoAlt, label: "Easy returns", sub: "7-day policy" },
                  { Icon: FaCheck, label: "GST invoice", sub: "Wholesale ready" },
                ].map(({ Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-cream-100 text-maroon-800">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{label}</div>
                      <div className="text-xs text-ink-muted">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section-y bg-cream-100/50">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow="Details"
              title="Specifications"
              description="The technical details you need before placing a wholesale or retail order."
            />
          </div>
          <div className="lg:col-span-7">
            <dl className="rounded-2xl bg-white border border-cream-200 overflow-hidden divide-y divide-cream-200">
              {[
                ["Material", product.material],
                product.gsm ? ["GSM", product.gsm] : null,
                product.pattern ? ["Pattern", product.pattern] : null,
                ["Cloth Type", product.clothType],
                ["Colors Available", product.colors.join(", ")],
                ["Sizes Available", product.sizes.join(", ")],
                ["Washable", product.washable ? "Yes — machine wash recommended" : "Dry clean only"],
                ["Country of Origin", "India (Erode, Tamil Nadu)"],
                ...(product.specifications?.map((s) => [s.label, s.value]) || []),
              ]
                .filter(Boolean)
                .map((row, i) => {
                  const [k, v] = row as [string, string];
                  return (
                    <div
                      key={`${k}-${i}`}
                      className="grid grid-cols-3 gap-4 p-5"
                    >
                      <dt className="text-sm text-ink-muted col-span-1">{k}</dt>
                      <dd className="text-sm text-ink font-medium col-span-2">
                        {v}
                      </dd>
                    </div>
                  );
                })}
            </dl>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-y">
          <div className="container-x">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <SectionTitle
                eyebrow="You may also like"
                title="Related products"
              />
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider-x font-semibold text-maroon-800 hover:text-gold-dark"
              >
                View All <FaArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
