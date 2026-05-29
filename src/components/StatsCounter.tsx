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
}: {
  items: Stat[];
  light?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/20 rounded-2xl overflow-hidden border border-gold/20">
      {items.map((item, i) => (
        <StatTile key={i} item={item} light={light} />
      ))}
    </div>
  );
}

function StatTile({ item, light }: { item: Stat; light: boolean }) {
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={`p-7 text-center ${light ? "bg-maroon-900" : "bg-cream-50"}`}
    >
      <div
        className={`display text-5xl md:text-6xl font-semibold leading-none ${
          light ? "text-gold-light" : "text-maroon-800"
        }`}
      >
        {n.toLocaleString("en-IN")}
        {item.suffix}
      </div>
      <div
        className={`mt-3 text-xs uppercase tracking-wider-x font-semibold ${
          light ? "text-cream-100/70" : "text-ink-muted"
        }`}
      >
        {item.label}
      </div>
    </motion.div>
  );
}
