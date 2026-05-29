"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaTag } from "react-icons/fa";
import type { Offer } from "@/types";

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: diff <= 0 };
}

export default function OfferBanner({ offer }: { offer: Offer }) {
  const cd = useCountdown(offer.expiresAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-maroon-900 text-cream-50 p-7 md:p-10"
    >
      <div className="absolute inset-0 bg-weave-dark opacity-40 pointer-events-none" />
      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-gold/15 blur-2xl" />

      <div className="relative grid md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gold text-maroon-950 px-3 py-1 text-[10px] uppercase tracking-widest-x font-bold">
            <FaTag className="h-2.5 w-2.5" /> Limited Time
          </div>
          <h3 className="display text-3xl md:text-4xl font-semibold mt-4 leading-tight">
            {offer.title}
          </h3>
          <p className="mt-2 text-cream-100/80">{offer.description}</p>
          {offer.code && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-gold/60 bg-cream-50/5 px-4 py-2 text-sm">
              <span className="text-cream-100/70">Code:</span>
              <span className="font-bold tracking-wider text-gold-light">
                {offer.code}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          {!cd.done ? (
            <div className="grid grid-cols-4 gap-2">
              {[
                ["Days", cd.days],
                ["Hrs", cd.hours],
                ["Min", cd.minutes],
                ["Sec", cd.seconds],
              ].map(([label, val]) => (
                <div
                  key={label as string}
                  className="text-center rounded-lg bg-cream-50/10 backdrop-blur border border-cream-50/15 px-3 py-2 min-w-[58px]"
                >
                  <div className="display text-2xl font-semibold text-gold-light leading-none">
                    {String(val).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] uppercase tracking-widest-x text-cream-100/60 mt-1">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-sm text-cream-100/70">Offer expired</span>
          )}

          {offer.ctaHref && offer.ctaLabel && (
            <Link href={offer.ctaHref} className="btn-gold">
              {offer.ctaLabel} <FaArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}
