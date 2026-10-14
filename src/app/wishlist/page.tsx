"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaArrowRight, FaTrash } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import { api, type ProductApi } from "@/lib/api";
import { useWishlist } from "@/store";

export default function WishlistPage() {
  const items = useWishlist((s) => s.items);
  const clear = useWishlist((s) => s.clear);
  const [products, setProducts] = useState<ProductApi[]>([]);

  useEffect(() => {
    api.publicProducts("limit=100")
      .then((result) => setProducts(result.data))
      .catch(() => setProducts([]));
  }, []);

  const saved = products.filter((p) => items.includes(p.id));

  return (
    <div className="lux-page">
      <PageHero
        pageKey="wishlist"
        eyebrow="Your Edit"
        title={<>Your <span>wishlist.</span></>}
        subtitle="Pieces you've saved for later. Tap any item to order it on WhatsApp."
        bgImage="https://images.unsplash.com/photo-1583846552345-d2ce05fbe1c5?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
      />

      <section id="page-content" className="lux-section">
        <div className="lux-container">
          {saved.length === 0 ? (
            <div className="lux-card lux-card--flat mx-auto max-w-2xl text-center !py-14">
              <span className="lux-icon mx-auto"><FaHeart /></span>
              <h2 className="mt-4">Your wishlist is empty</h2>
              <p className="mx-auto mt-3 max-w-md text-[15px]">
                Browse our catalogue and tap the heart icon on any product to save it for later.
              </p>
              <Link href="/products" className="lux-btn mt-8">
                Browse products <FaArrowRight aria-hidden />
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-col gap-4 md:gap-6 sm:flex-row sm:items-end sm:justify-between">
                <SectionTitle
                  eyebrow={`${saved.length} ${saved.length === 1 ? "item" : "items"} saved`}
                  title={<>Saved for <span>later</span></>}
                  className="!mb-0"
                />
                <button type="button" onClick={clear} className="lux-btn lux-btn--ghost shrink-0">
                  <FaTrash aria-hidden /> Clear all
                </button>
              </div>
              <div className="grid grid-cols-2 gap-5 md:gap-7 lg:grid-cols-4">
                {saved.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
