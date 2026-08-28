"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  index?: number;
  compact?: boolean;
  tabIndex?: number;
}

export default function CategoryCard({
  category,
  index = 0,
  compact = false,
  tabIndex,
}: CategoryCardProps) {
  const reducedMotion = useReducedMotion();
  const animationDelay = Math.min(Math.max(index, 0), 6) * 0.05;
  const itemLabel = category.productCount === 1 ? "item" : "items";
  const href = `/products?category=${encodeURIComponent(category.slug)}`;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: reducedMotion ? 0 : 0.5,
        delay: reducedMotion ? 0 : animationDelay,
        ease: "easeOut",
      }}
      className={`group relative h-full ${
        compact ? "pb-2 pr-2 [perspective:1000px]" : ""
      }`}
    >
      {compact && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-[#FBAA00]/45 to-[#579515]/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1 motion-reduce:transition-none"
        />
      )}

      <Link
        href={href}
        tabIndex={tabIndex}
        aria-label={`View ${category.name} products`}
        className={`relative block h-full overflow-hidden bg-cream-100 outline-none transition duration-300 focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none ${
          compact
            ? "rounded-xl border border-[#143B32]/25 bg-white p-2 shadow-[0_12px_28px_rgba(20,59,50,0.14)] hover:-translate-y-1 hover:rotate-[0.35deg] hover:border-[#FBAA00]/55 hover:shadow-[0_18px_36px_rgba(20,59,50,0.18)]"
            : "rounded-2xl shadow-soft hover:-translate-y-1"
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            compact ? "aspect-[4/3] rounded-lg" : "aspect-[4/5]"
          }`}
        >
          {category.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={category.image}
              alt={category.name}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
            />
          ) : (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-[#143B32] via-[#315B0D] to-[#579515]"
            />
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#143B32]/95 via-[#143B32]/25 to-transparent"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-0 ring-1 ring-inset ring-white/35 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div
            className={`absolute inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 font-bold uppercase tracking-widest-x text-[#143B32] shadow-sm backdrop-blur-sm ${
              compact
                ? "left-3 top-3 px-2.5 py-1 text-[7px]"
                : "left-5 top-5 px-3 py-1.5 text-[10px]"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FBAA00]" />
            {category.productCount} {itemLabel}
          </div>

          <div
            className={`absolute bottom-0 left-0 right-0 text-white ${
              compact ? "p-4" : "p-6"
            }`}
          >
            <h3
              className={`display font-semibold leading-tight ${
                compact ? "text-base" : "text-xl"
              }`}
            >
              {category.name}
            </h3>

            {category.description && (
              <p
                className={`mt-1.5 line-clamp-2 text-white/75 ${
                  compact ? "text-xs leading-5" : "text-sm leading-6"
                }`}
              >
                {category.description}
              </p>
            )}

            <span
              className={`inline-flex items-center gap-2 font-semibold uppercase tracking-wider-x text-[#FBAA00] transition-all duration-300 group-hover:gap-3 ${
                compact ? "mt-2 text-[8px]" : "mt-4 text-xs"
              }`}
            >
              Shop now
              <FaArrowRight aria-hidden="true" className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
