"use client";

import { useState } from "react";
import { FaWhatsapp, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

import type { Product } from "@/types";
import { useWishlist } from "@/store";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { cn } from "@/utils";

export default function ProductActions({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0] || "");
  const [size, setSize] = useState(product.sizes[0] || "");
  const [qty, setQty] = useState(1);

  const has = useWishlist((s) => s.has(product.id));
  const toggle = useWishlist((s) => s.toggle);

  const whatsapp = buildWhatsAppOrderUrl({
    productName: product.name,
    color,
    size,
    quantity: qty,
    productLink: `https://thangaveltextile.in/products/${product.slug}`,
  });

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description.slice(0, 100),
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch {
      // user cancelled
    }
  };

  return (
    <div className="space-y-6">
      {/* Colors */}
      {product.colors.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-widest-x text-gold-dark font-semibold mb-3">
            Color · <span className="text-ink-soft normal-case">{color}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs transition",
                  c === color
                    ? "border-maroon-800 bg-maroon-800 text-cream-50"
                    : "border-cream-300 text-ink-soft hover:border-maroon-800"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.sizes.length > 0 && (
        <div>
          <div className="text-[11px] uppercase tracking-widest-x text-gold-dark font-semibold mb-3">
            Size · <span className="text-ink-soft normal-case">{size}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs transition min-w-[60px]",
                  s === size
                    ? "border-maroon-800 bg-maroon-800 text-cream-50"
                    : "border-cream-300 text-ink-soft hover:border-maroon-800"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <div className="text-[11px] uppercase tracking-widest-x text-gold-dark font-semibold mb-3">
          Quantity
        </div>
        <div className="inline-flex items-center rounded-full border border-cream-300 bg-white">
          <button
            type="button"
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="h-11 w-11 grid place-items-center text-ink-soft hover:text-maroon-800"
            aria-label="Decrease"
          >
            −
          </button>
          <span className="px-5 font-semibold text-ink">{qty}</span>
          <button
            type="button"
            onClick={() => setQty(qty + 1)}
            className="h-11 w-11 grid place-items-center text-ink-soft hover:text-maroon-800"
            aria-label="Increase"
          >
            +
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3 pt-2">
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="btn-primary flex-1 min-w-[200px]"
        >
          <FaWhatsapp className="h-4 w-4" /> Order on WhatsApp
        </a>
        <button
          type="button"
          onClick={() => toggle(product.id)}
          className="btn-outline !px-4"
          aria-label="Wishlist"
        >
          {has ? <FaHeart className="h-4 w-4" /> : <FaRegHeart className="h-4 w-4" />}
        </button>
        <button
          type="button"
          onClick={share}
          className="btn-outline !px-4"
          aria-label="Share"
        >
          <FaShareAlt className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
