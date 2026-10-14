"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  suffix?: string;
  label: string;
}

/** Row of count-up statistics in framed cells. */
export default function StatsCounter({ items }: { items: Stat[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-[4px] border border-[#EEE8DC] bg-[#EEE8DC] sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <StatTile key={item.label} item={item} index={i} />
      ))}
    </div>
  );
}

function StatTile({ item, index }: { item: Stat; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setStarted(true);
      },
      { threshold: 0.4 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(item.value);
      return;
    }
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
    <div
      ref={ref}
      className="lux-hover group relative bg-white px-5 py-6 transition-colors duration-500 hover:bg-[#FFFBF2]"
    >
      <span className="lux-num absolute right-4 top-4 !text-[20px]">{String(index + 1).padStart(2, "0")}</span>
      <div className="lux-stat text-[34px] md:text-[38px]">
        {n.toLocaleString("en-IN")}
        {item.suffix}
      </div>
      <div className="lux-kicker mt-2 max-w-[14rem] !leading-5">{item.label}</div>
      <span className="absolute inset-x-5 bottom-0 h-[2px] origin-left scale-x-0 bg-[#FBAA00] transition-transform duration-500 group-hover:scale-x-100" />
    </div>
  );
}
