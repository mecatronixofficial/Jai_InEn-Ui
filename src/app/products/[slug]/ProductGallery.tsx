"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils";

export default function ProductGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="lux-media group relative aspect-[4/3.4] border border-[#EEE8DC]">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={name}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        {images.length > 1 && (
          <span className="absolute bottom-4 right-4 z-10 rounded-full bg-white/95 px-3.5 py-1.5 font-[family-name:var(--lux-heading)] text-[11px] font-semibold tracking-[0.14em] text-[#1C1C1C]">
            {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === active}
              className={cn(
                "relative h-16 w-20 shrink-0 overflow-hidden rounded-[2px] border-2 transition duration-300 sm:h-20 sm:w-24",
                i === active
                  ? "border-[#FBAA00] shadow-[0_10px_20px_-12px_rgba(251,170,0,0.9)]"
                  : "border-transparent opacity-60 hover:-translate-y-0.5 hover:border-[#FBAA00]/50 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
