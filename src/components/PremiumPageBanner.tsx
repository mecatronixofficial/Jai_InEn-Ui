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
  actions?: ReactNode;
  titleOnly?: boolean;
}

const DEFAULT_BANNER = "/images/contact/contact-textile-banner-v3.png";

/** Compact responsive banner shared by every inner page. */
export default function PremiumPageBanner({ eyebrow, title, current, parent, bgImage = DEFAULT_BANNER, pageKey, actions, titleOnly = false }: PremiumPageBannerProps) {
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
    <section data-page-banner={resolvedPageKey} className={`lux-banner${titleOnly ? " lux-banner--title-only" : ""}`} aria-labelledby={`${resolvedPageKey}-banner-title`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={bannerImage} src={bannerImage} alt="" fetchPriority="high" className="lux-banner-image" onError={() => setBannerImage((image) => (image === DEFAULT_BANNER ? image : DEFAULT_BANNER))} />
      <div className="lux-banner-shade" aria-hidden />
      <div className="lux-banner-frame" aria-hidden />

      <div className="lux-banner-content">
        <div className="lux-banner-copy">
          {!titleOnly && <nav aria-label="Breadcrumb" className="lux-crumbs">
            <Link href="/">Home</Link>
            {parent && <><i aria-hidden /><Link href={parent.href}>{parent.label}</Link></>}
            <i aria-hidden />
            <span aria-current="page">{current}</span>
          </nav>}
          {!titleOnly && <div><p className="lux-eyebrow">{eyebrow}</p></div>}
          <h1 id={`${resolvedPageKey}-banner-title`}>{title}</h1>
          {!titleOnly && actions && <div className="lux-banner-actions">{actions}</div>}
        </div>
      </div>

      {!titleOnly && <a href="#page-content" className="lux-scroll">Scroll</a>}
    </section>
  );
}
