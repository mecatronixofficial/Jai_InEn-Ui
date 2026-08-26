"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils";

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  decorative?: boolean;
  compact?: boolean;
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  decorative = true,
  compact = true,
}: Props) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={cn(
        "max-w-3xl mb-6 md:mb-8",
        isCenter && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3 mb-2",
            isCenter && "justify-center"
          )}
        >
          {decorative && <span className="h-px w-10 bg-gold" />}
          <span
            className={cn(
              "text-[11px] uppercase tracking-widest-x font-semibold",
              "text-[#FBAA00]"
            )}
          >
            {eyebrow}
          </span>
          {decorative && <span className="h-px w-10 bg-gold" />}
        </div>
      )}
      <h2
        className={cn(
          "display font-semibold leading-[1.05] tracking-tight",
          compact ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl lg:text-[3.25rem]",
          light ? "text-cream-50" : "text-gray-950"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 text-sm leading-6 sm:text-base sm:leading-7 max-w-2xl",
            isCenter && "mx-auto",
            light ? "text-cream-100/80" : "text-ink-soft"
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
