"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaTag } from "react-icons/fa";
import type { Offer } from "@/types";

function useCountdown(target: string) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (now === null) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: false, ready: false };
  const diff = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, done: diff <= 0, ready: true };
}

export default function OfferBanner({ offer }: { offer: Offer }) {
  const cd = useCountdown(offer.expiresAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full overflow-hidden rounded-xl border border-[#ECECEC] bg-[#F5F5F5] px-5 py-4 text-[#222222] shadow-soft sm:px-6 sm:py-5"
    >
      <div className="pointer-events-none absolute inset-0 bg-weave-light opacity-50" />
      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-gold/15 blur-2xl" />

      <div className="relative grid items-center gap-4 md:grid-cols-[1fr_auto]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-gold text-gray-950 px-3 py-1 text-[10px] uppercase tracking-widest-x font-bold">
            <FaTag className="h-2.5 w-2.5" /> Limited Time
          </div>
          <h3 className="display mt-2 text-base font-semibold leading-tight">
            {offer.title}
          </h3>
          <p className="mt-1.5 text-xs leading-5 text-[#666666]">{offer.description}</p>
          {offer.code && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-md border border-dashed border-gold/60 bg-white px-3 py-1.5 text-xs">
              <span className="text-[#666666]">Code:</span>
              <span className="font-bold tracking-wider text-gold-light">
                {offer.code}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-start md:items-end gap-4">
          {cd.ready && !cd.done ? (
            <div className="grid grid-cols-4 gap-2">
              {[
                ["Days", cd.days],
                ["Hrs", cd.hours],
                ["Min", cd.minutes],
                ["Sec", cd.seconds],
              ].map(([label, val]) => (
                <div
                  key={label as string}
                    className="min-w-[48px] rounded-md border border-[#ECECEC] bg-white px-2 py-1.5 text-center"
                >
                  <div className="display text-lg font-semibold leading-none text-gold-light">
                    {String(val).padStart(2, "0")}
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-widest-x text-[#737373]">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-sm text-[#737373]">Offer expired</span>
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
