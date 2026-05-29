"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

import { openingCard } from "@/data/content";
import { useUI } from "@/store";

export default function OpeningSpecialCard() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const dismissed = useUI((s) => s.openingCardDismissed);
  const dismiss = useUI((s) => s.dismissOpeningCard);

  // Avoid SSR/hydration mismatch — only render after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Open after a delay so it doesn't fight with hero animations
  useEffect(() => {
    if (!mounted || !openingCard.enabled || dismissed) return;
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, [mounted, dismissed]);

  if (!mounted || !openingCard.enabled) return null;
  if (pathname.startsWith("/admin")) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/60 backdrop-blur-sm p-4"
          onClick={() => {
            dismiss();
            setVisible(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid md:grid-cols-2 max-w-3xl w-full overflow-hidden rounded-2xl bg-cream-50 shadow-warm"
          >
            <button
              type="button"
              onClick={() => {
                dismiss();
                setVisible(false);
              }}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 hover:bg-white text-ink shadow-soft"
            >
              <FaTimes className="h-3.5 w-3.5" />
            </button>

            {/* Image side */}
            <div className="relative aspect-square md:aspect-auto md:min-h-[420px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={openingCard.image}
                alt={openingCard.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/40 via-transparent to-transparent" />
              {openingCard.badge && (
                <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-gold text-cream-50 px-3 py-1.5 text-[10px] uppercase tracking-widest-x font-bold">
                  {openingCard.badge}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center bg-cream-50 weave-bg relative">
              <div className="text-[11px] uppercase tracking-widest-x text-gold-dark font-semibold">
                {openingCard.title}
              </div>
              <h2 className="display text-4xl md:text-5xl font-semibold text-maroon-900 mt-3 leading-tight">
                {openingCard.subtitle}
              </h2>
              <p className="mt-4 text-ink-soft leading-relaxed">
                {openingCard.description}
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  href={openingCard.ctaHref}
                  onClick={() => {
                    dismiss();
                    setVisible(false);
                  }}
                  className="btn-primary"
                >
                  {openingCard.ctaLabel}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    dismiss();
                    setVisible(false);
                  }}
                  className="btn-ghost"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
