import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaLeaf } from "react-icons/fa";

import ProductGallery from "./ProductGallery";
import ProductActions from "./ProductActions";
import PremiumPageBanner from "@/components/PremiumPageBanner";
import SectionTitle from "@/components/SectionTitle";
import { ProductTile } from "@/components/LuxTiles";
import { loadProductBySlug, loadProducts } from "@/lib/data";

export async function generateStaticParams() {
  const products = await loadProducts();
  return (products ?? []).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: { title: product.name, description: product.description.slice(0, 160), images: product.images[0] ? [product.images[0]] : [] },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await loadProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await loadProducts();
  const otherCategories = allProducts
    .filter((item) => item.slug !== product.slug && item.category !== product.category)
    .slice(0, 12);

  const specs = [
    product.material && ["Material", product.material],
    product.clothType && ["Cloth type", product.clothType],
    product.gsm && ["GSM", product.gsm],
    product.pattern && ["Pattern", product.pattern],
    ...(product.specifications ?? []).map(({ label, value }) => [label, value]),
  ].filter(Boolean) as [string, string][];

  return (
    <div className="lux-page">
      <PremiumPageBanner titleOnly pageKey="product" eyebrow={product.category} title={product.name} current={product.name} bgImage={product.images[0] || "/images/contact/contact-textile-banner-v3.png"} />

      <section id="page-content" className="lux-section">
        <div className="lux-container">
          <Link href="/products" className="lux-link mb-6"><FaArrowLeft aria-hidden /> Back to all products</Link>

          <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lux-frame lg:col-span-6">
              <ProductGallery images={product.images} name={product.name} />
            </div>

            <div className="lg:col-span-6">
              <p className="lux-eyebrow">{product.category}</p>
              <h2 className="lux-title">{product.name}</h2>
              <div className="lux-ornament" aria-hidden><span /></div>
              <p className="mt-6 text-[15px]">{product.description}</p>

              {specs.length > 0 && (
                <dl className="mt-8 grid border-t border-[#EEE8DC] sm:grid-cols-2">
                  {specs.map(([label, value]) => (
                    <div key={label} className="lux-row border-b border-[#EEE8DC] px-4 py-4">
                      <dt className="lux-kicker !text-[10px]">{label}</dt>
                      <dd className="mt-1 font-[family-name:var(--lux-heading)] text-[15px] font-semibold text-[#1C1C1C]">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <div className="mt-9"><ProductActions product={product} /></div>

              <div className="mt-8 flex items-start gap-4 rounded-[2px] border-l-2 border-[#FBAA00] bg-[#FFFBF2] px-5 py-4 text-sm leading-6 text-[#1C1C1C]">
                <FaLeaf aria-hidden className="mt-1 h-4 w-4 shrink-0 text-[#B57A00]" />
                Contact us for specifications, custom development, quantities and buyer documentation.
              </div>
            </div>
          </div>
        </div>
      </section>

      {otherCategories.length > 0 && (
        <section className="lux-section">
          <div className="lux-container">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionTitle eyebrow="Explore something different" title={<>Products from <span>other categories</span></>} className="!mb-0" />
              <Link href="/products" className="lux-link shrink-0">View all products <FaArrowRight aria-hidden /></Link>
            </div>
          </div>

          <div dir="ltr" className="related-products-marquee mt-6 overflow-hidden pb-4 md:mt-8">
            <div className="related-products-track flex w-max gap-7">
              {[...otherCategories, ...otherCategories].map((item, index) => (
                <div key={`${item.id}-${index}`} className="w-[240px] shrink-0 sm:w-[280px]" aria-hidden={index >= otherCategories.length || undefined}>
                  <ProductTile product={item} categoryLabel={item.category} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
