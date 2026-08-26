"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import type { Category } from "@/types";

export default function CategoryCard({
  category,
  index = 0,
  compact = false,
}: {
  category: Category;
  index?: number;
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      className={compact ? "group relative pb-2 pr-2 [perspective:1000px]" : ""}
    >
      {compact && (
        <span className="pointer-events-none absolute inset-0 translate-x-2 translate-y-2 rounded-xl bg-gradient-to-br from-[#FBAA00]/45 to-[#579515]/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
      )}
      <Link
        href={`/products?category=${category.slug}`}
        className={`group relative block overflow-hidden bg-cream-100 ${compact ? "rounded-xl border border-[#143B32]/25 bg-white p-2 shadow-[0_12px_28px_rgba(20,59,50,0.14)] transition duration-300 hover:-translate-y-1 hover:rotate-[0.35deg]" : "aspect-[4/5] rounded-2xl"}`}
      >
        <div className={compact ? "relative aspect-[4/3] overflow-hidden rounded-md" : "contents"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/85 via-gray-950/20 to-transparent" />

        {/* Top label */}
        <div className={`absolute inline-flex items-center rounded-full bg-cream-50/95 uppercase tracking-widest-x font-bold text-gray-800 ${compact ? "left-4 top-4 px-2 py-1 text-[7px]" : "left-5 top-5 px-3 py-1 text-[10px]"}`}>
          {category.productCount} items
        </div>

        {/* Bottom content */}
        <div className={`absolute bottom-0 left-0 right-0 text-cream-50 ${compact ? "p-4" : "p-6"}`}>
          <h3 className="display text-base font-semibold leading-tight">
            {category.name}
          </h3>
          <p className={`mt-1.5 text-cream-100/80 line-clamp-2 ${compact ? "text-xs leading-5" : "text-sm"}`}>
            {category.description}
          </p>
          <div className={`inline-flex items-center gap-2 uppercase tracking-wider-x font-semibold text-gold-light group-hover:gap-3 transition-all ${compact ? "mt-2 text-[8px]" : "mt-4 text-xs"}`}>
            Shop now <FaArrowRight className="h-3 w-3" />
          </div>
        </div>
        </div>
      </Link>
    </motion.div>
  );
}
