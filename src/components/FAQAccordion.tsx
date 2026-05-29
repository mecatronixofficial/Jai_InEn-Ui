"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQAccordion({
  items,
  defaultOpen = 0,
}: {
  items: FAQ[];
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-cream-200 border-y border-cream-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-start justify-between gap-6 py-6 text-left group"
              aria-expanded={isOpen}
            >
              <div className="flex items-start gap-5">
                <span className="display text-2xl text-gold font-semibold leading-none mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-xl md:text-2xl text-maroon-950 font-semibold leading-tight group-hover:text-maroon-700 transition">
                  {item.question}
                </span>
              </div>
              <span
                className={`grid shrink-0 h-9 w-9 place-items-center rounded-full border border-maroon-800 text-maroon-800 transition-transform duration-300 ${
                  isOpen ? "rotate-45 bg-maroon-800 text-cream-50 border-maroon-800" : ""
                }`}
              >
                <FaPlus className="h-3 w-3" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pl-12 pr-12 pb-6 text-ink-soft leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
