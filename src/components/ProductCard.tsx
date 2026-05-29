"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaWhatsapp, FaStar } from "react-icons/fa";

import type { Product } from "@/types";
import { useWishlist } from "@/store";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { formatINR, discountPercent } from "@/utils";

export default function ProductCard({ product }: { product: Product }) {
  const has = useWishlist((s) => s.has(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const discount = discountPercent(product.originalPrice, product.offerPrice);

  const whatsappUrl = buildWhatsAppOrderUrl({
    productName: product.name,
    productLink: `https://thangaveltextile.in/products/${product.slug}`,
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      {/* Full-card link overlay — sits below interactive elements */}
      <Link
        href={`/products/${product.slug}`}
        className="absolute inset-0 z-0"
        aria-label={product.name}
      />

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-cream-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0] ?? ""}
          alt={product.name}
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover image */}
        {product.images[1] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[1]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.newArrival && (
            <span className="inline-flex items-center rounded-full bg-cream-50 text-maroon-800 px-2.5 py-1 text-[10px] uppercase tracking-widest-x font-bold">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="inline-flex items-center rounded-full bg-gold text-cream-50 px-2.5 py-1 text-[10px] uppercase tracking-widest-x font-bold">
              {discount}% off
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {product.stock === 0 && (
          <div className="absolute inset-0 grid place-items-center bg-cream-50/85 z-10">
            <span className="text-maroon-800 uppercase tracking-widest-x text-xs font-bold">
              Out of stock
            </span>
          </div>
        )}

        {/* Wishlist — z-10 so it sits above the card link overlay */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggle(product.id);
          }}
          aria-label={has ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-cream-50/90 backdrop-blur text-maroon-800 hover:bg-cream-50 transition shadow-soft"
        >
          {has ? (
            <FaHeart className="h-3.5 w-3.5 text-maroon-800" />
          ) : (
            <FaRegHeart className="h-3.5 w-3.5" />
          )}
        </button>

        {/* WhatsApp CTA — slides up on hover, z-10 so it sits above the card link */}
        <div className="absolute bottom-0 left-0 right-0 p-3 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full rounded-full bg-maroon-900 text-cream-50 py-2.5 text-xs font-medium tracking-wide hover:bg-maroon-950 transition"
          >
            <FaWhatsapp className="h-4 w-4" /> Order on WhatsApp
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="relative z-10 mt-4 px-1 pointer-events-none">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest-x text-ink-muted font-semibold">
          <span>{product.category}</span>
          <span className="h-1 w-1 rounded-full bg-gold" />
          <span className="flex items-center gap-1">
            <FaStar className="h-2.5 w-2.5 text-gold" />
            {product.rating} ({product.reviews})
          </span>
        </div>

        <h3 className="display text-xl font-semibold text-maroon-950 mt-2 leading-tight group-hover:text-maroon-700 transition">
          {product.name}
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-ink">
            {formatINR(product.offerPrice)}
          </span>
          {product.originalPrice > product.offerPrice && (
            <span className="text-sm text-ink-muted line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color swatches */}
        {product.colors.length > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            {product.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                title={c}
                className={`${colorSwatch(c)} inline-block h-2.5 w-2.5 rounded-full border border-cream-300`}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[10px] text-ink-muted">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function colorSwatch(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("white") || n.includes("cream") || n.includes("off")) return "bg-[#f5e9d4]";
  if (n.includes("maroon")) return "bg-[#7d2b2b]";
  if (n.includes("red")) return "bg-[#c0392b]";
  if (n.includes("black")) return "bg-[#1a1410]";
  if (n.includes("navy") || n.includes("indigo")) return "bg-[#1e3a8a]";
  if (n.includes("blue")) return "bg-[#2563eb]";
  if (n.includes("sea green")) return "bg-[#2dd4bf]"; // must precede "green"
  if (n.includes("green") || n.includes("bottle")) return "bg-[#15803d]";
  if (n.includes("yellow") || n.includes("mustard")) return "bg-[#eab308]";
  if (n.includes("orange")) return "bg-[#ea580c]";
  if (n.includes("pink")) return "bg-[#ec4899]";
  if (n.includes("beige") || n.includes("skin")) return "bg-[#e8dab7]";
  if (n.includes("brown")) return "bg-[#92400e]";
  return "bg-[#9ca3af]";
}
