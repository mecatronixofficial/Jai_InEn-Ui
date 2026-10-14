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
    if (items.length < 2) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 6500);
    return () => clearInterval(id);
  }, [items.length]);

  if (!t) {
    return (
      <div className="relative py-6 text-center text-[15px] text-[#5F5F5F]">
        Customer reviews will appear here soon.
      </div>
    );
  }

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);
  const next = () => setIdx((i) => (i + 1) % items.length);

  return (
    <div className="relative">
      <FaQuoteLeft aria-hidden className="absolute -top-2 right-0 h-20 w-20 text-[#FBAA00]/15" />

      <AnimatePresence mode="wait">
        <motion.div
          key={t.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45 }}
          className="relative"
        >
          <div className="mb-6 flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} aria-hidden className={cn("h-4 w-4", i < Math.floor(t.rating) ? "text-[#FBAA00]" : "text-[#EEE8DC]")} />
            ))}
          </div>

          <blockquote className="font-[family-name:var(--lux-heading)] text-lg font-medium leading-[1.7] text-[#1C1C1C] sm:text-[22px]">
            &ldquo;{t.review}&rdquo;
          </blockquote>

          <div className="mt-8 flex items-center gap-4 border-t border-[#EEE8DC] pt-6">
            {t.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={t.image} alt={t.name} className="h-14 w-14 rounded-full object-cover shadow-[0_0_0_5px_#fff,0_0_0_6px_#FBAA00]" />
            ) : (
              <div className="grid h-14 w-14 place-items-center rounded-full bg-[#FBAA00] font-[family-name:var(--lux-heading)] text-xl font-semibold text-[#1C1C1C] shadow-[0_0_0_5px_#fff,0_0_0_6px_#FBAA00]">
                {t.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="font-[family-name:var(--lux-heading)] font-semibold text-[#1C1C1C]">{t.name}</div>
              <div className="text-sm text-[#5F5F5F]">
                {t.role}
                {t.company ? ` · ${t.company}` : ""} · {t.location}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Review ${i + 1}`}
                className={cn("h-1 rounded-full transition-all duration-500", i === idx ? "w-10 bg-[#FBAA00]" : "w-4 bg-[#EEE8DC] hover:bg-[#FBAA00]/60")}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {[{ onClick: prev, label: "Previous review", Icon: FaChevronLeft }, { onClick: next, label: "Next review", Icon: FaChevronRight }].map(({ onClick, label, Icon }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-[#EEE8DC] text-[#1C1C1C] transition duration-300 hover:border-[#FBAA00] hover:bg-[#FBAA00] hover:shadow-[0_12px_22px_-12px_rgba(251,170,0,0.9)]"
              >
                <Icon className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
