"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface AboutBannerImageProps {
  fallbackImage: string;
  pageKey?: string;
}

export default function AboutBannerImage({ fallbackImage, pageKey = "about" }: AboutBannerImageProps) {
  const premiumBanner = "/images/contact/contact-textile-banner-v3.png";
  const [image, setImage] = useState(fallbackImage || premiumBanner);

  useEffect(() => {
    let active = true;
    api.publicPageBanner(pageKey)
      .then((banner) => {
        if (active && banner?.image) setImage(banner.image);
      })
      .catch(() => {});
    return () => { active = false; };
  }, [pageKey]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt="Jai Export Enterprises textile facility"
      className="premium-banner-image absolute inset-0 h-full w-full object-cover"
      onError={() => setImage((current) => current === fallbackImage ? premiumBanner : fallbackImage)}
    />
  );
}
