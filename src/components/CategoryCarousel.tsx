"use client";

import { useEffect, useRef, useState } from "react";

import type { Category } from "@/types";
import CategoryCard from "@/components/CategoryCard";

export default function CategoryCarousel({ categories }: { categories: Category[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || categories.length < 2) return;

    let frame = 0;
    let previous = performance.now();

    const moveRightToLeft = (now: number) => {
      const track = trackRef.current;
      if (track) {
        const elapsed = Math.min(now - previous, 50);
        track.scrollLeft += elapsed * 0.05;

        // The category list is rendered twice, so resetting at its midpoint
        // creates a seamless continuous right-to-left loop.
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft -= track.scrollWidth / 2;
        }
      }
      previous = now;
      frame = window.requestAnimationFrame(moveRightToLeft);
    };

    frame = window.requestAnimationFrame(moveRightToLeft);

    return () => window.cancelAnimationFrame(frame);
  }, [categories.length, paused]);

  return (
    <div
      ref={trackRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      className="category-carousel -mx-4 flex gap-5 overflow-x-auto px-4 pb-5 pt-1 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      aria-label="Product categories"
    >
      {[...categories, ...categories].map((category, index) => (
        <div
          key={`${category.id}-${index >= categories.length ? "duplicate" : "original"}`}
          className="w-[82%] shrink-0 sm:w-[48%] lg:w-[calc((100%_-_2.5rem)_/_3)]"
          aria-hidden={index >= categories.length}
        >
          <CategoryCard category={category} index={index} compact />
        </div>
      ))}
    </div>
  );
}
