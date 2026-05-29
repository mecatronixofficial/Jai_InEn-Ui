"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { heroSlides } from "@/data/content";
import { cn } from "@/utils";

export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  const slide = heroSlides[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroSlides.length), 7000);
    return () => clearInterval(t);
  }, []);

  const prev = () => setIdx((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setIdx((i) => (i + 1) % heroSlides.length);

  return (
    <section className="relative h-[88vh] min-h-[640px] max-h-[820px] overflow-hidden bg-maroon-950">
      {/* Background slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/80 via-maroon-950/55 to-maroon-950/20" />
          <div className="absolute inset-0 bg-weave-dark opacity-40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full container-x flex items-center">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-cream-50/10 backdrop-blur border border-cream-50/20 px-4 py-1.5 text-[11px] uppercase tracking-widest-x text-gold-light font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                {slide.eyebrow}
              </div>

              <h1 className="display text-5xl md:text-7xl lg:text-[5.5rem] font-semibold text-cream-50 mt-6 leading-[0.95] tracking-tight">
                {slide.title}
                {slide.highlight && (
                  <>
                    <br />
                    <span className="text-gold-light italic">
                      {slide.highlight}
                    </span>
                  </>
                )}
              </h1>

              <p className="mt-6 text-lg text-cream-100/85 max-w-xl leading-relaxed">
                {slide.description}
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                {slide.ctaHref.startsWith("http") ? (
                  <a
                    href={slide.ctaHref}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold"
                  >
                    <FaWhatsapp className="h-4 w-4" /> {slide.ctaLabel}
                  </a>
                ) : (
                  <Link href={slide.ctaHref} className="btn-gold">
                    {slide.ctaLabel} <FaArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
                {slide.secondaryHref && (
                  <Link
                    href={slide.secondaryHref}
                    className="btn-outline !border-cream-50/40 !text-cream-50 hover:!bg-cream-50 hover:!text-maroon-900"
                  >
                    {slide.secondaryLabel}
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container-x flex items-center justify-between">
          {/* Dots */}
          <div className="flex items-center gap-2">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === idx ? "w-10 bg-gold" : "w-5 bg-cream-50/30 hover:bg-cream-50/60"
                )}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream-50/30 text-cream-50 hover:bg-cream-50 hover:text-maroon-900 transition"
            >
              <FaChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-cream-50/30 text-cream-50 hover:bg-cream-50 hover:text-maroon-900 transition"
            >
              <FaChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
        <div className="text-cream-50/60 text-[10px] uppercase tracking-widest-x">
          Scroll
        </div>
      </div>
    </section>
  );
}
