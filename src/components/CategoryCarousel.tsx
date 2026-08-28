"use client";

import { useEffect, useRef, useState } from "react";

import CategoryCard from "@/components/CategoryCard";
import type { Category } from "@/types";

const AUTO_SCROLL_SPEED = 0.05;
const TOUCH_RESUME_DELAY = 1200;

export default function CategoryCarousel({
  categories,
}: {
  categories: Category[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopDistanceRef = useRef(0);
  const touchResumeTimerRef = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const canLoop = categories.length > 1;
  const carouselItems = canLoop ? [...categories, ...categories] : categories;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !canLoop) {
      loopDistanceRef.current = 0;
      return;
    }

    const original = track.querySelector<HTMLElement>('[data-copy="original"]');
    const duplicate = track.querySelector<HTMLElement>('[data-copy="duplicate"]');

    if (!original || !duplicate) return;

    const measureLoop = () => {
      loopDistanceRef.current = duplicate.offsetLeft - original.offsetLeft;
    };

    measureLoop();

    const resizeObserver = new ResizeObserver(measureLoop);
    resizeObserver.observe(track);
    resizeObserver.observe(original);
    resizeObserver.observe(duplicate);

    return () => resizeObserver.disconnect();
  }, [canLoop, categories.length]);

  useEffect(() => {
    if (!canLoop || paused || reducedMotion) return;

    let animationFrame = 0;
    let previousTime = performance.now();

    const moveRightToLeft = (currentTime: number) => {
      const track = trackRef.current;
      const loopDistance = loopDistanceRef.current;

      if (track && loopDistance > 0 && !document.hidden) {
        const elapsed = Math.min(currentTime - previousTime, 50);
        track.scrollLeft += elapsed * AUTO_SCROLL_SPEED;

        if (track.scrollLeft >= loopDistance) {
          track.scrollLeft -= loopDistance;
        }
      }

      previousTime = currentTime;
      animationFrame = window.requestAnimationFrame(moveRightToLeft);
    };

    animationFrame = window.requestAnimationFrame(moveRightToLeft);

    return () => window.cancelAnimationFrame(animationFrame);
  }, [canLoop, paused, reducedMotion]);

  useEffect(
    () => () => {
      if (touchResumeTimerRef.current !== null) {
        window.clearTimeout(touchResumeTimerRef.current);
      }
    },
    [],
  );

  const pauseForTouch = () => {
    if (touchResumeTimerRef.current !== null) {
      window.clearTimeout(touchResumeTimerRef.current);
    }
    setPaused(true);
  };

  const resumeAfterTouch = () => {
    if (touchResumeTimerRef.current !== null) {
      window.clearTimeout(touchResumeTimerRef.current);
    }

    touchResumeTimerRef.current = window.setTimeout(() => {
      setPaused(false);
      touchResumeTimerRef.current = null;
    }, TOUCH_RESUME_DELAY);
  };

  if (categories.length === 0) return null;

  return (
    <div
      ref={trackRef}
      role="region"
      aria-label="Product categories"
      aria-live="off"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onTouchStart={pauseForTouch}
      onTouchEnd={resumeAfterTouch}
      onTouchCancel={resumeAfterTouch}
      className="category-carousel -mx-4 flex gap-5 overflow-x-auto px-4 pb-5 pt-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
    >
      {carouselItems.map((category, index) => {
        const isDuplicate = canLoop && index >= categories.length;

        return (
          <div
            key={`${category.id}-${isDuplicate ? "duplicate" : "original"}`}
            data-copy={isDuplicate ? "duplicate" : "original"}
            aria-hidden={isDuplicate || undefined}
            className="w-[82%] shrink-0 sm:w-[48%] lg:w-[calc((100%_-_2.5rem)_/_3)]"
          >
            <CategoryCard
              category={category}
              index={index % categories.length}
              compact
              tabIndex={isDuplicate ? -1 : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}
