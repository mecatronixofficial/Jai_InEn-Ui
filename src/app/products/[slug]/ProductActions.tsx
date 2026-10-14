"use client";

import { useState } from "react";
import { FaWhatsapp, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

import type { Product } from "@/types";
import { useWishlist } from "@/store";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { cn } from "@/utils";

const optionClass = (selected: boolean) =>
  cn(
    "min-w-[64px] rounded-[2px] border px-4 py-2.5 text-[13px] font-medium transition duration-300",
    selected
      ? "border-[#FBAA00] bg-[#FBAA00] text-[#1C1C1C] shadow-[0_10px_20px_-12px_rgba(251,170,0,0.9)]"
      : "border-[#EEE8DC] text-[#5F5F5F] hover:-translate-y-0.5 hover:border-[#FBAA00] hover:text-[#B57A00]"
  );

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
    <div className="grid gap-7">
      {product.colors.length > 0 && (
        <div>
          <div className="lux-label">Colour · <span className="normal-case tracking-normal text-[#5F5F5F]">{color}</span></div>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button key={c} type="button" onClick={() => setColor(c)} aria-pressed={c === color} className={optionClass(c === color)}>{c}</button>
            ))}
          </div>
        </div>
      )}

      {product.sizes.length > 0 && (
        <div>
          <div className="lux-label">Size · <span className="normal-case tracking-normal text-[#5F5F5F]">{size}</span></div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button key={s} type="button" onClick={() => setSize(s)} aria-pressed={s === size} className={optionClass(s === size)}>{s}</button>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="lux-label">Quantity</div>
        <div className="inline-flex items-center rounded-[2px] border border-[#EEE8DC] bg-white transition hover:border-[#FBAA00]">
          <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-12 w-12 place-items-center text-lg text-[#5F5F5F] transition hover:bg-[#FFF4D9] hover:text-[#B57A00]" aria-label="Decrease quantity">−</button>
          <span className="min-w-[3rem] text-center font-[family-name:var(--lux-heading)] font-semibold text-[#1C1C1C]">{qty}</span>
          <button type="button" onClick={() => setQty(qty + 1)} className="grid h-12 w-12 place-items-center text-lg text-[#5F5F5F] transition hover:bg-[#FFF4D9] hover:text-[#B57A00]" aria-label="Increase quantity">+</button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-[#EEE8DC] pt-7">
        <a href={whatsapp} target="_blank" rel="noreferrer" className="lux-btn min-w-[220px] flex-1">
          <FaWhatsapp aria-hidden /> Order on WhatsApp
        </a>
        <button type="button" onClick={() => toggle(product.id)} className="lux-btn lux-btn--ghost lux-btn--icon" aria-label={has ? "Remove from wishlist" : "Add to wishlist"} aria-pressed={has}>
          {has ? <FaHeart aria-hidden className="text-[#B57A00]" /> : <FaRegHeart aria-hidden />}
        </button>
        <button type="button" onClick={share} className="lux-btn lux-btn--ghost lux-btn--icon" aria-label="Share">
          <FaShareAlt aria-hidden />
        </button>
      </div>
    </div>
  );
}
