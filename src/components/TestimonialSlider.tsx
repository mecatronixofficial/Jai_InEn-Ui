"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Testimonial } from "@/types";
import { cn } from "@/utils";

export default function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [idx, setIdx] = useState(0);
  const t = items[idx];

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  return (
    <div className="relative">
      <FaQuoteLeft className="absolute -top-6 -left-2 h-20 w-20 text-gold/15" />

      <AnimatePresence mode="wait">
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          <div className="flex items-center gap-1 text-gold mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < Math.floor(t.rating) ? "text-gold" : "text-cream-300"
                )}
              />
            ))}
          </div>

          <blockquote className="display text-2xl md:text-3xl text-maroon-950 leading-snug font-medium italic">
            &ldquo;{t.review}&rdquo;
          </blockquote>

          <div className="mt-8 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-maroon-800 text-cream-50 display text-xl font-semibold">
              {t.name.charAt(0)}
            </div>
            <div>
              <div className="font-semibold text-ink">{t.name}</div>
              <div className="text-xs text-ink-muted">
                {t.role}
                {t.company ? ` · ${t.company}` : ""} · {t.location}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Review ${i + 1}`}
              className={cn(
                "h-1 rounded-full transition-all",
                i === idx ? "w-8 bg-maroon-800" : "w-4 bg-cream-300 hover:bg-cream-400"
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-maroon-800/30 text-maroon-800 hover:bg-maroon-800 hover:text-cream-50 transition"
          >
            <FaChevronLeft className="h-3 w-3" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="grid h-10 w-10 place-items-center rounded-full border border-maroon-800/30 text-maroon-800 hover:bg-maroon-800 hover:text-cream-50 transition"
          >
            <FaChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
