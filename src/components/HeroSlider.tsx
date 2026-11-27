"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { api, type BannerApi } from "@/lib/api";
import styles from "@/app/home.module.css";

const companyImage =
  "https://res.cloudinary.com/ddpfxvydm/image/upload/v1787643040/About_img_1_vwqrzs.png";

const fallback = {
  id: "default",
  eyebrow: "Home textile manufacturer & exporter · India",
  title: "Crafting Textiles.",
  highlight: "Connecting Markets.",
  description: "Premium home textiles manufactured in India, designed for global markets.",
  ctaLabel: "Explore Collections",
  ctaHref: "/products",
  secondaryLabel: "Request a Quote",
  secondaryHref: "/contact#enquiry",
};

// Short, export-focused supporting copy. CMS banner fields (title, highlight,
// eyebrow, description) always take priority over these defaults.
const heroStories = [
  {
    eyebrow: "Since 1996 · Karur, India",
    title: "Crafting Textiles.",
    highlight: "Connecting Markets.",
    description: "Premium home textiles manufactured in India, designed for global markets.",
  },
  {
    eyebrow: "Table & kitchen linen",
    title: "Everyday essentials.",
    highlight: "Made for export.",
    description: "Table and kitchen linen developed to international buyer specifications.",
  },
  {
    eyebrow: "Bed & living linen",
    title: "Comfort in every layer.",
    highlight: "Crafted for global homes.",
    description: "Bed and living textiles manufactured with consistent quality.",
  },
  {
    eyebrow: "Manufacturing & quality",
    title: "From fabric to finish.",
    highlight: "Checked at every stage.",
    description: "Integrated production with inspection from cutting to dispatch.",
  },
  {
    eyebrow: "For importers & retailers",
    title: "Your specification.",
    highlight: "Our craftsmanship.",
    description: "Custom collections developed for brands, retailers and wholesalers.",
  },
  {
    eyebrow: "Responsible production",
    title: "Made with care.",
    highlight: "Built for tomorrow.",
    description: "Mindful production for home textiles designed to last.",
  },
] as const;

type HeroProduct = {
  id: string;
  name: string;
  slug: string;
  image: string;
};

export default function HeroSlider({ products }: { products: HeroProduct[] }) {
  const [banners, setBanners] = useState<BannerApi[]>([]);
  const [bannersLoaded, setBannersLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let cancelled = false;
    api.publicHeroBanners()
      .then((items) => {
        if (!cancelled) setBanners(items);
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setBannersLoaded(true);
      });
    return () => { cancelled = true; };
  }, []);

  const bannerSlides = useMemo(() => {
    const candidates = banners.length > 0
      ? banners.map((banner, index) => {
          const story = heroStories[index % heroStories.length];
          return {
            id: `banner-${banner.id}`,
            image: banner.image,
            alt: banner.title || "Jai Export Enterprises home textiles",
            content: {
              ...banner,
              eyebrow: banner.eyebrow || story.eyebrow,
              title: banner.title || story.title,
              // A CMS title stands on its own; only pair it with a CMS highlight.
              highlight: banner.title ? banner.highlight : banner.highlight || story.highlight,
              description: banner.description || story.description,
              ctaLabel: fallback.ctaLabel,
              ctaHref: fallback.ctaHref,
              secondaryLabel: fallback.secondaryLabel,
              secondaryHref: fallback.secondaryHref,
            },
          };
        })
      : products.length > 0
        ? products.map((product, index) => {
            const story = heroStories[(index + 1) % heroStories.length];
            return {
              id: product.id,
              image: product.image,
              alt: product.name,
              content: {
                ...story,
                id: product.id,
                title: product.name,
                ctaLabel: "View Product",
                ctaHref: `/products/${product.slug}`,
                secondaryLabel: fallback.secondaryLabel,
                secondaryHref: fallback.secondaryHref,
              },
            };
          })
        : [{ id: "company", image: companyImage, alt: "Jai Export Enterprises textile company", content: fallback }];

    return candidates.filter(
      (candidate, index, items) => items.findIndex((item) => item.image === candidate.image) === index,
    );
  }, [banners, products]);

  const slide = bannerSlides[activeSlide]?.content || fallback;

  useEffect(() => {
    if (bannerSlides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % bannerSlides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [bannerSlides.length]);

  useEffect(() => {
    if (activeSlide >= bannerSlides.length) setActiveSlide(0);
  }, [activeSlide, bannerSlides.length]);

  if (!bannersLoaded) {
    return <section data-page-banner="home" className={styles.hero} aria-label="Loading home textile collection" aria-busy="true" />;
  }

  return (
    <section data-page-banner="home" className={styles.hero} aria-label="Jai Export Enterprises home textile collection">
      <div className={styles.heroSlides} aria-live="off">
        {bannerSlides.map((item, index) => (
          <Image
            key={item.id}
            src={item.image}
            alt={index === activeSlide ? item.alt : ""}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`${styles.heroImage} ${index === activeSlide ? styles.heroImageActive : ""}`}
            aria-hidden={index !== activeSlide}
            unoptimized
          />
        ))}
      </div>
      <div className={styles.heroOverlay} aria-hidden />
      <div key={bannerSlides[activeSlide]?.id || "hero"} className={`${styles.container} ${styles.heroContent}`}>
        <div className={styles.heroCopy}>
          <p className={styles.label}>{slide.eyebrow || fallback.eyebrow}</p>
          <h1>{slide.title || fallback.title}{slide.highlight && <span>{slide.highlight}</span>}</h1>
          <p className={styles.heroDescription}>{slide.description || fallback.description}</p>
          <div className={styles.heroActions}>
            <Link href={slide.ctaHref || fallback.ctaHref} className={styles.primary}>{slide.ctaLabel || fallback.ctaLabel} <FaArrowRight aria-hidden /></Link>
            {slide.secondaryHref && <Link href={slide.secondaryHref} className={styles.secondary}>{slide.secondaryLabel || "Learn more"}<FaArrowRight aria-hidden /></Link>}
          </div>
        </div>
      </div>
      {bannerSlides.length > 1 && (
        <div className={`${styles.container} ${styles.heroSlideDots}`} aria-label="Choose banner image">
          {bannerSlides.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show banner image ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
              onClick={() => setActiveSlide(index)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
