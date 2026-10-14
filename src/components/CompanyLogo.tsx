import type { ImgHTMLAttributes } from "react";

import { siteConfig } from "@/data/site";

type CompanyLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  alt?: string;
  decorative?: boolean;
};

/** The single company-logo source used throughout the website. */
export default function CompanyLogo({ alt, decorative = false, ...props }: CompanyLogoProps) {
  if (!siteConfig.logo) return null;

  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={siteConfig.logo} alt={decorative ? "" : (alt ?? siteConfig.name)} />;
}
