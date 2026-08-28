"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaArrowRight,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";

import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { useWishlist } from "@/store";
import type { Product } from "@/types";
import { discountPercent, formatINR } from "@/utils";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  showPrice?: boolean;
}

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.jai-india.com"
).replace(/\/$/, "");

export default function ProductCard({
  product,
  compact = false,
  showPrice = true,
}: ProductCardProps) {
  const reducedMotion = useReducedMotion();
  const isSaved = useWishlist((state) => state.has(product.id));
  const toggleWishlist = useWishlist((state) => state.toggle);

  const colors = product.colors ?? [];
  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1];
  const detail = product.material || product.clothType;
  const isOutOfStock = product.stock <= 0;
  const hasRating = Number.isFinite(product.rating) && product.rating > 0;
  const hasReviews = Number.isFinite(product.reviews) && product.reviews > 0;
  const hasOfferPrice =
    Number.isFinite(product.offerPrice) && product.offerPrice > 0;
  const hasOriginalPrice =
    Number.isFinite(product.originalPrice) && product.originalPrice > 0;
  const currentPrice = hasOfferPrice
    ? product.offerPrice
    : hasOriginalPrice
      ? product.originalPrice
      : 0;
  const discount =
    hasOfferPrice &&
    hasOriginalPrice &&
    product.originalPrice > product.offerPrice
      ? Math.max(0, discountPercent(product.originalPrice, product.offerPrice))
      : 0;
  const productPath = `/products/${encodeURIComponent(product.slug)}`;
  const whatsappUrl = buildWhatsAppOrderUrl({
    productName: product.name,
    productLink: `${SITE_URL}${productPath}`,
  });

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative isolate flex h-full flex-col overflow-hidden border bg-white transition-[transform,border-color,box-shadow] duration-500 motion-reduce:transform-none motion-reduce:transition-none ${
        compact
          ? "rounded-[1.25rem] border-[#143B32]/10 p-2 shadow-[0_18px_45px_-30px_rgba(20,59,50,0.6)] hover:-translate-y-1.5 hover:border-[#FBAA00]/45 hover:shadow-[0_28px_55px_-30px_rgba(20,59,50,0.65)]"
          : "rounded-[1.75rem] border-[#143B32]/10 p-2.5 shadow-[0_22px_60px_-38px_rgba(20,59,50,0.65)] hover:-translate-y-2 hover:border-[#FBAA00]/50 hover:shadow-[0_35px_70px_-36px_rgba(20,59,50,0.7)]"
      }`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#FBAA00] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#FBAA00]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />

      <Link
        href={productPath}
        aria-label={`View ${product.name}`}
        className="absolute inset-0 z-10 rounded-[inherit] outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-inset"
      />

      <div
        className={`relative overflow-hidden bg-[#F2ECDD] ${
          compact
            ? "aspect-[5/4] rounded-[0.9rem]"
            : "aspect-[4/5] rounded-[1.3rem]"
        }`}
      >
        {primaryImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transform-none motion-reduce:transition-none"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center overflow-hidden bg-gradient-to-br from-[#143B32] via-[#315B0D] to-[#579515] px-6 text-center">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-weave-dark opacity-60"
            />
            <span className="display relative text-3xl font-semibold text-white/90">
              {product.name}
            </span>
          </div>
        )}

        {secondaryImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={secondaryImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition duration-700 ease-out group-hover:scale-[1.06] group-hover:opacity-100 motion-reduce:transform-none motion-reduce:transition-none"
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D2B24]/70 via-[#143B32]/[0.03] to-black/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/40"
        />

        <div className="pointer-events-none absolute left-3 top-3 z-20 flex max-w-[calc(100%-4rem)] flex-wrap gap-1.5">
          {product.newArrival && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.17em] text-[#143B32] shadow-sm backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#579515]" />
              New
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-[#FBAA00] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.15em] text-[#143B32] shadow-sm">
              Save {discount}%
            </span>
          )}
          {isOutOfStock && (
            <span className="rounded-full border border-white/20 bg-[#143B32]/90 px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.15em] text-white backdrop-blur-md">
              Out of stock
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={
            isSaved
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isSaved}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute right-3 top-3 z-30 grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/90 text-[#143B32] shadow-[0_10px_25px_-15px_rgba(20,59,50,0.8)] backdrop-blur-md transition duration-300 hover:scale-105 hover:border-[#FBAA00] hover:bg-[#FBAA00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2 motion-reduce:transform-none"
        >
          {isSaved ? (
            <FaHeart aria-hidden="true" className="h-3.5 w-3.5 text-[#315B0D]" />
          ) : (
            <FaRegHeart aria-hidden="true" className="h-3.5 w-3.5" />
          )}
        </button>

        {!isOutOfStock && (
          <div className="absolute inset-x-0 bottom-0 z-30 p-3 sm:translate-y-2 sm:opacity-0 sm:transition-all sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100 motion-reduce:transition-none">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Enquire about ${product.name} on WhatsApp`}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-[#FBAA00] px-3 py-2.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#143B32] shadow-[0_12px_30px_-16px_rgba(0,0,0,0.75)] transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#143B32]"
            >
              <FaWhatsapp aria-hidden="true" className="h-3.5 w-3.5" />
              Enquire on WhatsApp
            </a>
          </div>
        )}
      </div>

      <div
        className={`pointer-events-none relative z-20 flex flex-1 flex-col ${
          compact ? "px-1.5 pb-1.5 pt-3.5" : "px-2 pb-2 pt-[1.125rem]"
        }`}
      >
        <div className="flex min-w-0 items-center justify-between gap-3">
          {product.category ? (
            <span
              className={`truncate font-extrabold uppercase tracking-[0.18em] text-[#579515] ${
                compact ? "text-[7px]" : "text-[9px]"
              }`}
            >
              {product.category}
            </span>
          ) : (
            <span />
          )}

          {hasRating && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#FFF7E5] px-2 py-1 text-[9px] font-bold text-[#143B32]">
              <FaStar aria-hidden="true" className="h-2.5 w-2.5 text-[#FBAA00]" />
              {product.rating}
              {hasReviews && (
                <span className="text-[#7D8985]">({product.reviews})</span>
              )}
            </span>
          )}
        </div>

        <h3
          className={`display line-clamp-2 font-semibold leading-[1.15] text-[#143B32] transition-colors duration-300 group-hover:text-[#D79000] ${
            compact ? "mt-2 text-[1.05rem]" : "mt-2.5 text-xl"
          }`}
        >
          {product.name}
        </h3>

        {detail && (
          <p
            className={`mt-1.5 truncate text-[#73807C] ${
              compact ? "text-[9px]" : "text-xs"
            }`}
          >
            {detail}
          </p>
        )}

        <div
          className={`mt-auto flex items-end justify-between gap-3 ${
            compact ? "pt-3" : "pt-4"
          }`}
        >
          <div className="min-w-0">
            {showPrice && currentPrice > 0 && (
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span
                  className={`font-extrabold tracking-tight text-[#143B32] ${
                    compact ? "text-sm" : "text-lg"
                  }`}
                >
                  {formatINR(currentPrice)}
                </span>
                {hasOfferPrice &&
                  hasOriginalPrice &&
                  product.originalPrice > product.offerPrice && (
                    <span className="text-[10px] text-[#8A9692] line-through">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
              </div>
            )}

            {colors.length > 0 && (
              <div
                role="list"
                aria-label="Available colors"
                className={`${
                  showPrice && currentPrice > 0 ? "mt-2" : ""
                } flex items-center gap-1.5`}
              >
                {colors.slice(0, compact ? 3 : 4).map((color, index) => (
                  <span
                    role="listitem"
                    key={`${color}-${index}`}
                    title={color}
                    aria-label={color}
                    className={`${colorSwatch(color)} inline-block h-3 w-3 rounded-full border border-black/10 ring-2 ring-white shadow-[0_0_0_1px_rgba(20,59,50,0.08)]`}
                  />
                ))}
                {colors.length > (compact ? 3 : 4) && (
                  <span className="text-[9px] font-bold text-[#66736F]">
                    +{colors.length - (compact ? 3 : 4)}
                  </span>
                )}
              </div>
            )}
          </div>

          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#143B32]/10 bg-[#F7F3E9] text-[#143B32] transition duration-300 group-hover:rotate-[-8deg] group-hover:border-[#FBAA00] group-hover:bg-[#FBAA00] motion-reduce:transform-none">
            <FaArrowRight aria-hidden="true" className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function colorSwatch(name: string): string {
  const color = name.toLowerCase();

  if (color.includes("white") || color.includes("cream") || color.includes("off")) {
    return "bg-[#f5e9d4]";
  }
  if (color.includes("maroon")) return "bg-[#7d2b2b]";
  if (color.includes("red")) return "bg-[#c0392b]";
  if (color.includes("black")) return "bg-[#1a1410]";
  if (color.includes("navy") || color.includes("indigo")) return "bg-[#1e3a8a]";
  if (color.includes("blue")) return "bg-[#2563eb]";
  if (color.includes("sea green")) return "bg-[#2dd4bf]";
  if (color.includes("green") || color.includes("bottle")) return "bg-[#15803d]";
  if (color.includes("yellow") || color.includes("mustard")) return "bg-[#eab308]";
  if (color.includes("orange")) return "bg-[#ea580c]";
  if (color.includes("pink")) return "bg-[#ec4899]";
  if (color.includes("beige") || color.includes("skin")) return "bg-[#e8dab7]";
  if (color.includes("brown")) return "bg-[#92400e]";

  return "bg-[#9ca3af]";
}
