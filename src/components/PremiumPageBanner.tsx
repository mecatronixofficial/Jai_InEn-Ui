"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

interface PremiumPageBannerProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  current: string;
  parent?: { label: string; href: string };
  bgImage?: string;
  pageKey?: string;
}

export default function PremiumPageBanner({ eyebrow, title, description, current, parent, bgImage = "/images/contact/contact-textile-banner-v3.png", pageKey }: PremiumPageBannerProps) {
  const [bannerImage, setBannerImage] = useState(bgImage);
  const resolvedPageKey = pageKey || current.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  useEffect(() => {
    let active = true;
    setBannerImage(bgImage);
    api.publicPageBanner(resolvedPageKey)
      .then((banner) => {
        if (active && banner?.image) setBannerImage(banner.image);
      })
      .catch(() => {});
    return () => { active = false; };
  }, [bgImage, resolvedPageKey]);

  return (
    <section className="group relative mx-3 mt-4 h-[235px] overflow-hidden rounded-[24px] border border-[#FBAA00]/70 bg-[#174D2A] shadow-[0_18px_0_-10px_rgba(251,170,0,0.2),0_30px_45px_-24px_rgba(20,59,50,0.65)] sm:mx-5 lg:mx-8 lg:h-[295px] lg:rounded-[32px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bannerImage} alt="" width="1862" height="845" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1600ms] group-hover:scale-[1.025]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071d11]/95 via-[#174D2A]/65 to-transparent" />
      <div className="absolute inset-y-0 left-[52%] hidden w-px origin-bottom -rotate-[16deg] bg-gradient-to-b from-transparent via-[#FBAA00]/70 to-transparent shadow-[0_0_18px_rgba(251,170,0,0.5)] md:block" />
      <div className="absolute inset-y-0 left-[55%] hidden w-px origin-bottom -rotate-[16deg] bg-white/10 md:block" />
      <div className="absolute bottom-4 right-6 hidden grid-cols-6 gap-2 opacity-40 lg:grid">
        {Array.from({ length: 24 }).map((_, index) => <span key={index} className="h-1 w-1 rounded-full bg-[#FBAA00]" />)}
      </div>
      <div className="absolute inset-y-0 left-0 w-2 bg-[#579515]" />
      <div className="pointer-events-none absolute inset-2 rounded-[18px] border border-white/20 shadow-[inset_0_0_0_1px_rgba(251,170,0,0.14),inset_0_0_28px_rgba(0,0,0,0.16)] lg:rounded-[25px]" />
      <span className="pointer-events-none absolute left-7 top-0 h-1 w-32 bg-gradient-to-r from-transparent via-[#FBAA00] to-transparent" />
      <span className="pointer-events-none absolute bottom-0 right-7 h-1 w-32 bg-gradient-to-r from-transparent via-[#579515] to-transparent" />
      <div className="container-x relative flex h-[235px] flex-col justify-end pb-7 pt-12 lg:h-[295px] lg:pb-9">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white">
          <Link href="/" className="text-[#FBAA00] hover:text-white">Home</Link><span className="text-white/60">/</span>
          {parent && <><Link href={parent.href} className="text-[#FBAA00] hover:text-white">{parent.label}</Link><span className="text-white/60">/</span></>}
          <span className="line-clamp-1">{current}</span>
        </div>
        <div className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FBAA00]"><span className="h-0.5 w-10 bg-[#FBAA00]" /> {eyebrow}</div>
        <h1 className="max-w-4xl font-sans text-3xl font-semibold leading-[1.1] tracking-tight text-white [text-shadow:0_3px_8px_rgba(0,0,0,0.85)] sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-white/90 sm:text-base sm:leading-7">{description}</p>}
      </div>
    </section>
  );
}
