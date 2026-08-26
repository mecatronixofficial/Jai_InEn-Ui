import type { Crumb } from "@/components/Breadcrumbs";
import PremiumPageBanner from "@/components/PremiumPageBanner";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  bgImage?: string;
  breadcrumbs?: Crumb[];
  pageKey?: string;
}

export default function PageHero({
  title,
  subtitle,
  eyebrow,
  bgImage,
  breadcrumbs,
  pageKey,
}: PageHeroProps) {
  const current = breadcrumbs?.[breadcrumbs.length - 1]?.label || title;
  const parentCrumb = breadcrumbs && breadcrumbs.length > 2 ? breadcrumbs[breadcrumbs.length - 2] : undefined;
  return <PremiumPageBanner eyebrow={eyebrow || "Jai Export Enterprises"} title={title} description={subtitle} current={current} parent={parentCrumb?.href ? { label: parentCrumb.label, href: parentCrumb.href } : undefined} bgImage={bgImage} pageKey={pageKey} />;
}
