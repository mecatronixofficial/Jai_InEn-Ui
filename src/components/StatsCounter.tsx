"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatsCounter({
  items,
  light = false,
  colorful = false,
  compact = false,
}: {
  items: Stat[];
  light?: boolean;
  colorful?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={
        colorful
          ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          : `grid grid-cols-2 gap-3 md:grid-cols-4 ${compact ? "" : "gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/20"}`
      }
    >
      {items.map((item, i) => (
        <StatTile key={i} item={item} light={light} colorful={colorful} compact={compact} index={i} />
      ))}
    </div>
  );
}

function StatTile({
  item,
  light,
  colorful,
  compact,
  index,
}: {
  item: Stat;
  light: boolean;
  colorful: boolean;
  compact: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) setStarted(true);
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(item.value * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, item.value]);

  const colorfulAccents = [
    "bg-[#174D2A]",
    "bg-[#FBAA00]",
    "bg-[#579515]",
    "bg-[#2D2D2D]",
  ];
  const colorfulSurfaces = [
    "bg-[#F3F8F1]",
    "bg-[#FFF8E8]",
    "bg-[#F7FAF3]",
    "bg-[#F5F5F5]",
  ];
  const colorfulNumbers = [
    "text-[#174D2A]",
    "text-[#C98200]",
    "text-[#579515]",
    "text-[#2D2D2D]",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={
        colorful
          ? `relative flex min-h-[140px] flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-200 px-5 py-6 text-center shadow-[0_12px_28px_-22px_rgba(23,77,42,0.5)] transition duration-300 hover:-translate-y-1 hover:border-[#FBAA00]/60 ${colorfulSurfaces[index % colorfulSurfaces.length]}`
          : compact
            ? "rounded-lg border border-[#143B32]/20 bg-white px-3 py-4 text-center shadow-[0_8px_20px_rgba(20,59,50,0.07)]"
            : "bg-white p-7 text-center"
      }
    >
      {colorful && (
        <>
          <span
            className={`absolute inset-y-0 left-0 w-1.5 ${colorfulAccents[index % colorfulAccents.length]}`}
          />
          <span className="pointer-events-none absolute right-3 top-1 font-sans text-5xl font-bold text-gray-900/[0.05]">
            {String(index + 1).padStart(2, "0")}
          </span>
        </>
      )}

      <div
        className={`display font-semibold leading-none ${
          colorful ? `relative text-xl ${colorfulNumbers[index % colorfulNumbers.length]}` : compact ? `text-xl md:text-2xl ${
            light ? "text-[#FBAA00]" : "text-[#222222]"
          }` : `text-5xl md:text-6xl ${
            light ? "text-[#FBAA00]" : "text-[#222222]"
          }`
        }`}
      >
        {n.toLocaleString("en-IN")}
        {item.suffix}
      </div>
      <div
        className={`uppercase font-semibold tracking-wider-x ${
          colorful ? "relative mt-3 max-w-[14rem] text-[10px] leading-4 text-gray-600" : compact ? `mt-2 text-[9px] leading-4 ${
            light ? "text-[#666666]" : "text-ink-muted"
          }` : `mt-3 text-xs ${
            light ? "text-[#666666]" : "text-ink-muted"
          }`
        }`}
      >
        {item.label}
      </div>
    </motion.div>
  );
}
