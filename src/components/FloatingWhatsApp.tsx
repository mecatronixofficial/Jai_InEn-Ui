"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppEnquiryUrl } from "@/lib/whatsapp";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTooltipOpen(true), 2500);
    const t2 = setTimeout(() => setTooltipOpen(false), 8000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-3">
      <AnimatePresence>
        {tooltipOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="hidden sm:flex flex-col rounded-2xl bg-white shadow-warm border border-cream-200 px-4 py-3 max-w-[260px] relative"
          >
            <button
              type="button"
              onClick={() => setTooltipOpen(false)}
              aria-label="Dismiss"
              className="absolute top-1 right-2 text-ink-muted hover:text-maroon-800 text-xs"
            >
              ✕
            </button>
            <div className="text-xs uppercase tracking-wider-x text-gold-dark font-semibold">
              Talk to us
            </div>
            <div className="text-sm text-ink mt-1">
              Quick quotes for wholesale & retail orders
            </div>
            <div className="absolute -right-1.5 bottom-5 h-3 w-3 rotate-45 bg-white border-r border-b border-cream-200" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={buildWhatsAppEnquiryUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-warm hover:scale-105 transition">
          <FaWhatsapp className="h-7 w-7" />
        </span>
      </a>
    </div>
  );
}
