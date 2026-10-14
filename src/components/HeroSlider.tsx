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
  eyebrow: "Home textiles · Crafted in Karur",
  title: "Woven for beautiful homes.",
  highlight: "Made for lasting impressions.",
  description: "Discover thoughtfully crafted home textiles that bring comfort, character and dependable quality to every space.",
  ctaLabel: "Explore Our Products",
  ctaHref: "/products",
  secondaryLabel: "Partner with us",
  secondaryHref: "/contact",
};

const heroStories = [
  {
    eyebrow: "Established 1996 · Karur, India",
    title: "Crafted with experience.",
    highlight: "Designed for modern living.",
    description: "Three decades of textile knowledge shape refined collections for homes, retailers and hospitality partners worldwide.",
  },
  {
    eyebrow: "Kitchen & dining collection",
    title: "Everyday essentials.",
    highlight: "Elevated by thoughtful design.",
    description: "Beautifully woven towels, aprons and table linens unite practical performance with colours and textures that feel at home.",
  },
  {
    eyebrow: "Bedding & living collection",
    title: "Layers of comfort.",
    highlight: "Made to be lived in.",
    description: "Soft, considered textiles bring warmth, calm and lasting style to bedrooms and living spaces.",
  },
  {
    eyebrow: "Manufacturing excellence",
    title: "From fibre to finish.",
    highlight: "Quality in every detail.",
    description: "Skilled craftsmanship, precise production and careful inspection deliver consistency from the first sample to every shipment.",
  },
  {
    eyebrow: "For global brands & retailers",
    title: "Your vision, woven.",
    highlight: "Your standards, delivered.",
    description: "Flexible product development and dependable export support help turn distinctive ideas into market-ready textile collections.",
  },
  {
    eyebrow: "Responsible textile making",
    title: "Made with care.",
    highlight: "Created for a better tomorrow.",
    description: "Responsible materials and mindful production guide textiles designed to look beautiful, perform well and last longer.",
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
              eyebrow: story.eyebrow,
              title: banner.title || story.title,
              highlight: story.highlight,
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
                ctaLabel: "View This Product",
                ctaHref: `/products/${product.slug}`,
                secondaryLabel: "Explore All Products",
                secondaryHref: "/products",
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
