import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaArrowRight, FaImages, FaLeaf } from "react-icons/fa";

import ProductGallery from "./ProductGallery";
import ProductActions from "./ProductActions";
import AboutBannerImage from "@/components/AboutBannerImage";
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

  return (
    <main className="overflow-hidden bg-white">
      <section className="relative min-h-[165px] overflow-hidden border-y-2 border-[#FBAA00] bg-[#174D2A]">
        <div className="absolute inset-0 opacity-35">
          <AboutBannerImage pageKey="product" fallbackImage={product.images[0] || "/images/contact/contact-textile-banner-v3.png"} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#174D2A]/95 via-[#174D2A]/80 to-[#579515]/55" />
        <div className="absolute inset-y-0 left-0 w-2 bg-[#579515]" />
        <div className="container-x relative flex min-h-[165px] flex-col justify-end pb-4 pt-10">
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/80 sm:text-[11px]">
            <Link href="/" className="text-[#FBAA00] hover:text-white">Home</Link><span>/</span>
            <Link href="/products" className="text-[#FBAA00] hover:text-white">Products</Link><span>/</span>
            <span className="line-clamp-1">{product.name}</span>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#FBAA00] sm:text-[10px]">{product.category}</div>
          <h1 className="mt-1 max-w-4xl text-3xl font-semibold uppercase leading-[1.1] tracking-tight text-white sm:text-4xl">{product.name}</h1>
        </div>
      </section>

      <section className="relative bg-gradient-to-br from-white via-[#fffaf0] to-[#FBAA00]/10 py-6 md:py-8">
        <div className="absolute -right-28 top-12 h-72 w-72 rounded-full border-[55px] border-[#FBAA00]/10" />
        <div className="container-x relative">
          <div className="mx-auto max-w-5xl">
          <Link href="/products" className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#579515] transition hover:text-[#FBAA00] sm:text-xs"><FaArrowLeft className="h-4 w-4" /> Back to all products</Link>

          <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <div className="group relative pb-3 pr-3 [perspective:1200px]">
                <div className="absolute bottom-0 left-3 right-0 top-3 rounded-[0.75rem_2rem_0.75rem_2rem] bg-[#579515] shadow-[0_20px_38px_-28px_rgba(20,59,50,0.75)] transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
                <div className="relative overflow-hidden rounded-[2rem_0.75rem_2rem_0.75rem] border border-[#FBAA00]/50 bg-white p-2.5 shadow-[0_24px_48px_-34px_rgba(20,59,50,0.65)] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:translateY(-4px)_rotateY(-1.5deg)]">
                  <span className="absolute left-0 top-8 z-10 h-16 w-1.5 rounded-r-full bg-[#FBAA00]" />
                  <span className="absolute right-0 top-0 z-10 h-14 w-14 rounded-bl-[2rem] border-b border-l border-[#FBAA00]/50 bg-white/20" />
                  <ProductGallery images={product.images} name={product.name} />
                  <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-full bg-[#174D2A]/90 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.14em] text-white shadow-lg backdrop-blur">
                    <FaImages className="h-3 w-3 text-[#FBAA00]" /> {product.images.length} views
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:pt-1">
              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-[#579515]">
                <span className="h-px w-9 bg-[#FBAA00]" /> {product.category}
              </div>
              <h2 className="display mt-2.5 text-3xl font-semibold leading-[1.1] text-black sm:text-4xl">{product.name}</h2>
              <p className="mt-3 border-l-2 border-[#FBAA00] pl-4 text-[13px] leading-6 text-black/75">{product.description}</p>

              <div className="mt-4"><ProductActions product={product} /></div>

              <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-[#579515]/10 px-4 py-3 text-[10px] leading-4 text-[#174D2A]">
                <FaLeaf className="h-3.5 w-3.5 shrink-0 text-[#579515]" />
                Contact us for specifications, custom development, quantities and buyer documentation.
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {otherCategories.length > 0 && (
        <section className="relative overflow-hidden bg-white py-8 text-black md:py-10">
          <div className="container-x relative">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#FBAA00]">Explore something different</div>
                <h2 className="display mt-2 text-3xl font-semibold leading-[1.1] text-black sm:text-4xl">Products from other categories</h2>
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#579515] hover:text-[#FBAA00]">View all products <FaArrowRight className="h-3 w-3" /></Link>
            </div>

            <div dir="ltr" className="related-products-marquee mt-6 overflow-hidden px-1 pb-5">
              <div className="related-products-track flex w-max gap-4 lg:gap-5">
              {[...otherCategories, ...otherCategories].map((item, index) => (
                <Link key={`${item.id}-${index}`} href={`/products/${item.slug}`} className="group relative w-[210px] shrink-0 overflow-hidden rounded-lg border border-[#143B32]/25 bg-white p-2 shadow-[0_15px_28px_-22px_rgba(20,59,50,0.55)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_38px_-20px_rgba(20,59,50,0.6)] sm:w-[240px] lg:w-[255px]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#F5F5F5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.images[0] || ""} alt={item.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="px-1.5 pb-1.5 pt-3 text-center">
                    <div className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#579515]">{item.category}</div>
                    <h3 className="display mt-1 text-sm font-semibold text-black">{item.name}</h3>
                  </div>
                </Link>
              ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
