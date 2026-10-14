"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type ManagedSectionImageProps = {
  pageKey: string;
  slotKey: string;
  fallbackImage: string;
  alt: string;
  className?: string;
  ariaHidden?: boolean;
};

export default function ManagedSectionImage({
  pageKey,
  slotKey,
  fallbackImage,
  alt,
  className,
  ariaHidden,
}: ManagedSectionImageProps) {
  const [src, setSrc] = useState(fallbackImage);

  useEffect(() => {
    let cancelled = false;
    api.publicSectionImage(pageKey, slotKey)
      .then((item) => {
        if (!cancelled && item?.image) setSrc(item.image);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [pageKey, slotKey]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={ariaHidden ? "" : alt}
      aria-hidden={ariaHidden || undefined}
      className={className}
      onError={() => setSrc(fallbackImage)}
    />
  );
}
