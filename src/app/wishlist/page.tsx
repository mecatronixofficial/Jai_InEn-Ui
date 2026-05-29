"use client";

import Link from "next/link";
import { FaHeart, FaArrowRight, FaTrash } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/store";
import { products } from "@/data/products";

export default function WishlistPage() {
  const items = useWishlist((s) => s.items);
  const clear = useWishlist((s) => s.clear);
  const saved = products.filter((p) => items.includes(p.id));

  return (
    <>
      <PageHero
        eyebrow="Your Edit"
        title="Wishlist."
        subtitle="Pieces you've saved for later. Tap any item to order it on WhatsApp."
        bgImage="https://images.unsplash.com/photo-1583846552345-d2ce05fbe1c5?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />

      <section className="section-y">
        <div className="container-x">
          {saved.length === 0 ? (
            <div className="text-center py-16">
              <div className="grid h-20 w-20 mx-auto place-items-center rounded-full bg-cream-100 text-maroon-800 mb-6">
                <FaHeart className="h-7 w-7" />
              </div>
              <h2 className="display text-3xl font-semibold text-maroon-950">
                Your wishlist is empty
              </h2>
              <p className="mt-3 text-ink-muted max-w-md mx-auto">
                Browse our catalogue and tap the heart icon on any product to save it for later.
              </p>
              <Link href="/products" className="btn-primary mt-7">
                Browse Products <FaArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-sm text-ink-muted">
                  {saved.length} {saved.length === 1 ? "item" : "items"} saved
                </p>
                <button
                  type="button"
                  onClick={clear}
                  className="text-xs uppercase tracking-wider-x font-semibold text-maroon-800 hover:text-maroon-950 flex items-center gap-2"
                >
                  <FaTrash className="h-3 w-3" /> Clear all
                </button>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
                {saved.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
