"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import type { Category } from "@/types";

export default function CategoryCard({
  category,
  index = 0,
}: {
  category: Category;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
    >
      <Link
        href={`/products?category=${category.slug}`}
        className="group block relative overflow-hidden rounded-2xl bg-cream-100 aspect-[4/5]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/85 via-maroon-950/20 to-transparent" />

        {/* Top label */}
        <div className="absolute top-5 left-5 inline-flex items-center rounded-full bg-cream-50/95 px-3 py-1 text-[10px] uppercase tracking-widest-x font-bold text-maroon-800">
          {category.productCount} items
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-cream-50">
          <h3 className="display text-3xl font-semibold leading-tight">
            {category.name}
          </h3>
          <p className="mt-1.5 text-sm text-cream-100/80 line-clamp-2">
            {category.description}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-wider-x font-semibold text-gold-light group-hover:gap-3 transition-all">
            Shop now <FaArrowRight className="h-3 w-3" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
