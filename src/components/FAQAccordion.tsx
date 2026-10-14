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
    <div className="grid gap-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.id}
            className={`group relative overflow-hidden rounded-[4px] border bg-white transition-[border-color,box-shadow] duration-500 ${
              isOpen
                ? "border-[#FBAA00]/60 shadow-[0_30px_60px_-38px_rgba(181,122,0,0.6)]"
                : "border-[#EEE8DC] hover:border-[#FBAA00]/45 hover:shadow-[0_24px_50px_-38px_rgba(181,122,0,0.55)]"
            }`}
          >
            <span className={`absolute inset-y-0 left-0 w-[3px] origin-top bg-[#FBAA00] transition-transform duration-500 ${isOpen ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"}`} />
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
              aria-expanded={isOpen}
            >
              <span className="flex items-center gap-5">
                <span className={`lux-num !text-[28px] ${isOpen ? "!text-[#FBAA00] ![-webkit-text-stroke-color:#FBAA00]" : ""}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`font-[family-name:var(--lux-heading)] text-[17px] font-semibold leading-snug transition-colors duration-300 ${isOpen ? "text-[#B57A00]" : "text-[#1C1C1C] group-hover:text-[#B57A00]"}`}>
                  {item.question}
                </span>
              </span>
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                  isOpen
                    ? "rotate-45 border-[#FBAA00] bg-[#FBAA00] text-[#1C1C1C]"
                    : "border-[#EEE8DC] text-[#B57A00] group-hover:border-[#FBAA00] group-hover:rotate-90"
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
                  transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-7 text-[15px] leading-[1.85] text-[#5F5F5F] sm:pl-[5.75rem] sm:pr-16">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
