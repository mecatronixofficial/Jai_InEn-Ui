"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { siteConfig } from "@/data/site";
import { api, type BannerApi } from "@/lib/api";

type ItemMetric = {
  element: HTMLDivElement;
  center: number;
  sourceIndex: number;
};

const heroContents = [
  {
    category: "Dining Collection",
    title: "Table Linens",
    highlight: "Styled for Every Gathering",
  },
  {
    category: "Kitchen Collection",
    title: "Kitchen Textiles",
    highlight: "Made for Everyday Moments",
  },
  {
    category: "Living Collection",
    title: "Living Linen",
    highlight: "Comfort Meets Character",
  },
  {
    category: "Window Collection",
    title: "Window Treatments",
    highlight: "Frame Every Space Beautifully",
  },
  {
    category: "Bedroom Collection",
    title: "Bedding & Soft Furnishings",
    highlight: "Designed for Restful Living",
  },
  {
    category: "Lifestyle Collection",
    title: "Other Products",
    highlight: "Comfort in Every Detail",
  },
] as const;

export default function HeroSlider() {
  const [slides, setSlides] = useState<BannerApi[]>([]);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metricsRef = useRef<ItemMetric[]>([]);

  const positionRef = useRef(0);
  const groupWidthRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const velocityRef = useRef(0);
  const targetRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);
  const dragStartRef = useRef({ x: 0, position: 0, time: 0 });
  const activeSlideIndexRef = useRef(0);

  const repeatedSlides = useMemo(() => [slides, slides, slides].flat(), [slides]);

  useEffect(() => {
    api.publicHeroBanners().then(setSlides).catch(() => undefined);
  }, []);

  const wrapPosition = useCallback(() => {
    const width = groupWidthRef.current;
    if (!width) return;

    while (positionRef.current <= -width * 2) positionRef.current += width;
    while (positionRef.current > -width) positionRef.current -= width;
  }, []);

  const renderFrame = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    wrapPosition();
    track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;

    const viewportCenter = viewport.clientWidth / 2;
    const halfWidth = Math.max(viewportCenter, 1);
    let nearestDistance = Number.POSITIVE_INFINITY;
    let nearestSourceIndex = activeSlideIndexRef.current;

    metricsRef.current.forEach(({ element, center, sourceIndex }) => {
      const centerDistance = Math.abs(center + positionRef.current - viewportCenter);
      const normalized = Math.max(
        -1.25,
        Math.min(1.25, (center + positionRef.current - viewportCenter) / halfWidth),
      );
      const distance = Math.min(Math.abs(normalized), 1);
      const rotateY = normalized * -34;
      const translateZ = -Math.pow(distance, 1.2) * 230;
      const translateX = normalized * Math.pow(distance, 1.25) * 38;
      const translateY = Math.pow(distance, 1.45) * 14;
      const scale = 1 - Math.pow(distance, 1.1) * 0.13;
      const brightness = 1 - Math.pow(distance, 1.05) * 0.24;
      const opacity = 1 - Math.max(0, distance - 0.78) * 0.5;

      element.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      element.style.transformOrigin =
        normalized < -0.05 ? "right center" : normalized > 0.05 ? "left center" : "center";
      element.style.filter = `brightness(${brightness})`;
      element.style.opacity = `${opacity}`;
      element.style.zIndex = `${Math.round((1 - distance) * 100)}`;
      element.style.boxShadow = `0 30px 70px -34px rgba(21, 59, 45, ${0.28 + distance * 0.22})`;

      if (centerDistance < nearestDistance) {
        nearestDistance = centerDistance;
        nearestSourceIndex = sourceIndex;
      }
    });

    if (nearestSourceIndex !== activeSlideIndexRef.current) {
      activeSlideIndexRef.current = nearestSourceIndex;
      setActiveSlideIndex(nearestSourceIndex);
    }
  }, [wrapPosition]);

  const measure = useCallback(() => {
    const first = itemRefs.current[0];
    const secondSetFirst = itemRefs.current[slides.length];
    if (!trackRef.current || !first || !secondSetFirst || !slides.length) return;

    groupWidthRef.current = secondSetFirst.offsetLeft - first.offsetLeft;
    metricsRef.current = itemRefs.current.flatMap((element, repeatedIndex) =>
      element
        ? [{
            element,
            center: element.offsetLeft + element.offsetWidth / 2,
            sourceIndex: repeatedIndex % slides.length,
          }]
        : [],
    );
    positionRef.current = -groupWidthRef.current;
    renderFrame();
  }, [renderFrame, slides.length]);

  useEffect(() => {
    if (!slides.length) return;

    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);
    const measureId = window.requestAnimationFrame(measure);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(measureId);
    };
  }, [measure, slides.length]);

  useEffect(() => {
    if (!slides.length) return;

    const duration = Math.min(64, Math.max(34, slides.length * 8));
    const animate = (time: number) => {
      const delta = lastTimeRef.current
        ? Math.min((time - lastTimeRef.current) / 1000, 0.05)
        : 0;
      lastTimeRef.current = time;

      if (targetRef.current !== null) {
        const difference = targetRef.current - positionRef.current;
        positionRef.current += difference * Math.min(1, delta * 8);
        if (Math.abs(difference) < 0.6) {
          positionRef.current = targetRef.current;
          targetRef.current = null;
        }
      } else if (!draggingRef.current) {
        if (Math.abs(velocityRef.current) > 5) {
          positionRef.current += velocityRef.current * delta;
          velocityRef.current *= Math.pow(0.045, delta);
        } else if (!pausedRef.current && !reduceMotion && groupWidthRef.current) {
          positionRef.current -= (groupWidthRef.current / duration) * delta;
        }
      }

      renderFrame();
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
      lastTimeRef.current = 0;
    };
  }, [reduceMotion, renderFrame, slides.length]);

  const scheduleResume = () => {
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      velocityRef.current = 0;
      if (!viewportRef.current?.matches(":hover")) pausedRef.current = false;
    }, 900);
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!slides.length) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    pausedRef.current = true;
    targetRef.current = null;
    velocityRef.current = 0;
    dragStartRef.current = {
      x: event.clientX,
      position: positionRef.current,
      time: performance.now(),
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const now = performance.now();
    const nextPosition =
      dragStartRef.current.position + event.clientX - dragStartRef.current.x;
    const elapsed = Math.max(now - dragStartRef.current.time, 1);

    velocityRef.current = ((nextPosition - positionRef.current) / elapsed) * 1000;
    positionRef.current = nextPosition;
    dragStartRef.current.time = now;
    renderFrame();
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    scheduleResume();
  };

  const moveByOne = (direction: -1 | 1) => {
    const first = itemRefs.current[0];
    const second = itemRefs.current[1];
    const step =
      first && second
        ? second.offsetLeft - first.offsetLeft
        : groupWidthRef.current / Math.max(slides.length, 1);

    pausedRef.current = true;
    velocityRef.current = 0;
    targetRef.current = positionRef.current + direction * step;
    scheduleResume();
  };

  const activeContent = heroContents[activeSlideIndex % heroContents.length];

  return (
    <section className="relative isolate overflow-hidden bg-[#f8f7f1] pb-8 pt-8 text-[#222222] sm:pb-10 sm:pt-10 lg:pb-12 lg:pt-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background-image:repeating-linear-gradient(45deg,rgba(251,170,0,0.04)_0,rgba(251,170,0,0.04)_1px,transparent_1px,transparent_14px),repeating-linear-gradient(-45deg,rgba(87,149,21,0.025)_0,rgba(87,149,21,0.025)_1px,transparent_1px,transparent_14px)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 -top-44 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(251,170,0,0.17),transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(87,149,21,0.11),transparent_68%)]"
      />

      <div className="container-x relative z-10 min-h-[250px] text-center sm:min-h-[275px] lg:min-h-[315px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeSlideIndex}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
            transition={{ duration: reduceMotion ? 0 : 0.32, ease: "easeOut" }}
          >
        <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-[#579515]/20 bg-white/75 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.3em] text-[#579515] shadow-[0_10px_30px_-20px_rgba(21,59,45,0.55)] backdrop-blur-sm sm:text-[10px]">
          <span className="h-px w-6 bg-[#FBAA00]" />
          {activeContent.category}
          <span className="h-px w-6 bg-[#FBAA00]" />
        </div>

        <h1 className="display mx-auto max-w-5xl text-[clamp(2.15rem,6vw,5.3rem)] font-bold leading-[0.94] tracking-[-0.055em] text-[#222222]">
          <span className="text-[#579515]">{activeContent.title}</span>
          <span className="mt-1 block font-normal italic text-[#d48f00] sm:mt-2">
            {activeContent.highlight}
          </span>
        </h1>

        <div className="mx-auto mt-5 flex max-w-2xl flex-col items-center gap-4 sm:mt-6">
          <p className="max-w-xl text-sm leading-6 text-[#222222]/60 sm:text-[15px]">
            Thoughtfully woven collections that bring enduring comfort, natural texture,
            and quiet character to every room.
          </p>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#FBAA00]" />
            <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#222222]/45">
              {siteConfig.tagline}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#FBAA00]" />
          </div>
        </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        ref={viewportRef}
        role="region"
        aria-label="Continuous curved textile image gallery"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") moveByOne(1);
          if (event.key === "ArrowRight") moveByOne(-1);
        }}
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          if (!draggingRef.current) pausedRef.current = false;
        }}
        onFocus={() => {
          pausedRef.current = true;
        }}
        onBlur={() => {
          if (!draggingRef.current) pausedRef.current = false;
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative mt-8 h-[min(92vw,540px)] cursor-grab touch-pan-y select-none overflow-hidden outline-none active:cursor-grabbing sm:mt-10 sm:h-[min(64vw,570px)] md:h-[min(50vw,600px)] lg:h-[min(38vw,620px)] xl:h-[min(34vw,650px)] 2xl:h-[min(30vw,680px)]"
        style={{ perspective: "850px", perspectiveOrigin: "50% 48%" }}
      >
        {!slides.length ? (
          <div className="absolute inset-y-4 left-[9vw] w-[82vw] overflow-hidden rounded-[28px] border border-white bg-white/65 shadow-[0_30px_70px_-40px_rgba(21,59,45,0.5)] sm:left-[22vw] sm:w-[56vw] md:left-[28vw] md:w-[44vw] lg:left-[34vw] lg:w-[32vw] xl:left-[36vw] xl:w-[28vw]">
            <div className="h-full w-full animate-pulse bg-gradient-to-br from-[#FBAA00]/15 via-white to-[#579515]/10" />
          </div>
        ) : (
          <div
            ref={trackRef}
            className="absolute left-0 top-0 flex h-full w-max gap-1.5 will-change-transform sm:gap-2"
            style={{ transformStyle: "preserve-3d" }}
          >
            {repeatedSlides.map((slide, repeatedIndex) => {
              const sourceIndex = repeatedIndex % slides.length;
              const setIndex = Math.floor(repeatedIndex / slides.length);

              return (
                <div
                  key={`${setIndex}-${slide.id}`}
                  ref={(element) => {
                    itemRefs.current[repeatedIndex] = element;
                  }}
                  className="relative h-full w-[82vw] shrink-0 overflow-hidden rounded-[28px] border border-white/80 bg-white will-change-[transform,filter,opacity] sm:w-[56vw] sm:rounded-[34px] md:w-[44vw] lg:w-[32vw] lg:rounded-[40px] xl:w-[28vw] 2xl:w-[26vw]"
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                >
                  <Image
                    src={slide.image}
                    alt={
                      setIndex === 1
                        ? slide.title || `Textile collection ${sourceIndex + 1}`
                        : ""
                    }
                    fill
                    priority={setIndex === 1 && sourceIndex === 0}
                    loading={setIndex === 1 && sourceIndex === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 639px) 82vw, (max-width: 767px) 56vw, (max-width: 1023px) 44vw, (max-width: 1279px) 32vw, (max-width: 1535px) 28vw, 26vw"
                    className="pointer-events-none object-cover transition-transform duration-700"
                    draggable={false}
                    unoptimized
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#153b2d]/30 via-transparent to-[#153b2d]/30"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-white/20 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#153b2d]/20 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2 rounded-[22px] border border-white/20 sm:rounded-[28px] lg:rounded-[33px]"
                  />
                </div>
              );
            })}
          </div>
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-[110] w-[10vw] bg-gradient-to-r from-[#f8f7f1] via-[#f8f7f1]/65 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-[110] w-[10vw] bg-gradient-to-l from-[#f8f7f1] via-[#f8f7f1]/65 to-transparent"
        />
      </div>

      <div className="container-x relative z-[120] mt-6 flex items-center justify-between gap-5 sm:mt-8">
        <div className="hidden items-center gap-3 sm:flex">
          <span className="h-px w-10 bg-[#579515]/35" />
          <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#222222]/45">
            Drag to explore
          </span>
        </div>

        <div className="mx-auto flex items-center gap-3 sm:mx-0">
          <button
            type="button"
            onClick={() => moveByOne(1)}
            aria-label="Previous slide"
            className="group grid h-12 w-12 place-items-center rounded-full border border-[#153b2d]/20 bg-white text-[#153b2d] shadow-[0_12px_30px_-20px_rgba(21,59,45,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#153b2d] hover:bg-[#153b2d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2"
          >
            <FaArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => moveByOne(-1)}
            aria-label="Next slide"
            className="group grid h-12 w-12 place-items-center rounded-full bg-[#FBAA00] text-[#153b2d] shadow-[0_12px_30px_-16px_rgba(251,170,0,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#153b2d] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2"
          >
            <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        <Link
          href="/products"
          className="group hidden items-center gap-3 text-[9px] font-bold uppercase tracking-[0.24em] text-[#579515] transition-colors hover:text-[#d48f00] sm:flex"
        >
          View collections
          <FaArrowRight className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
