"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { siteConfig } from "@/data/site";
import { api, type BannerApi } from "@/lib/api";

type ItemMetric = {
  element: HTMLDivElement;
  center: number;
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

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Text remains in its original top position, but this track
  // moves in exact sync with the image slider.
  const textTrackRef = useRef<HTMLDivElement>(null);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const metricsRef = useRef<ItemMetric[]>([]);

  const positionRef = useRef(0);
  const groupWidthRef = useRef(0);
  const stepWidthRef = useRef(0);

  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  const pausedRef = useRef(false);
  const draggingRef = useRef(false);

  const dragStartRef = useRef({
    x: 0,
    position: 0,
    time: 0,
  });

  const velocityRef = useRef(0);
  const targetRef = useRef<number | null>(null);
  const resumeTimerRef = useRef<number | null>(null);

  const repeatedSlides = useMemo(
    () => [slides, slides, slides].flat(),
    [slides],
  );

  /* ======================================================
     LOAD SLIDES
  ====================================================== */

  useEffect(() => {
    api
      .publicHeroBanners()
      .then(setSlides)
      .catch(() => {});
  }, []);

  /* ======================================================
     INFINITE LOOP POSITION
  ====================================================== */

  const wrapPosition = useCallback(() => {
    const width = groupWidthRef.current;

    if (!width) return;

    while (positionRef.current <= -width * 2) {
      positionRef.current += width;
    }

    while (positionRef.current > -width) {
      positionRef.current -= width;
    }
  }, []);

  /* ======================================================
     STRONG 3D CYLINDER EFFECT
  ====================================================== */

  const renderFrame = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) return;

    wrapPosition();

    track.style.transform = `
      translate3d(${positionRef.current}px, 0, 0)
    `;

    const viewportWidth = viewport.clientWidth;
    const viewportCenter = viewportWidth / 2;

    // Keep heading/text movement locked to the image slide progress.
    // Image cards can stay their existing adaptive size, while each
    // text slide keeps the original full-width heading composition.
    const stepWidth = stepWidthRef.current;

    if (
      textTrackRef.current &&
      stepWidth > 0
    ) {
      const textPosition =
        (positionRef.current /
          stepWidth) *
        viewportWidth;

      textTrackRef.current.style.transform = `
        translate3d(${textPosition}px, 0, 0)
      `;
    }

    const halfWidth = Math.max(
      viewportWidth / 2,
      1,
    );

    metricsRef.current.forEach(
      ({ element, center }) => {
        const itemCenter =
          center + positionRef.current;

        /*
         * -1 = left edge
         *  0 = center
         * +1 = right edge
         */

        const normalized = Math.max(
          -1.3,
          Math.min(
            1.3,
            (itemCenter - viewportCenter) /
              halfWidth,
          ),
        );

        const distance = Math.min(
          Math.abs(normalized),
          1,
        );

        /*
         * Strong curved/cylindrical rotation.
         *
         * Center = 0 degrees
         * Left   = +32 degrees
         * Right  = -32 degrees
         */

        const rotateY =
          normalized * -46;

        /*
         * Push side cards backward.
         *
         * Center = 0
         * Edge   = approx -220px
         */

        const translateZ =
          -Math.pow(distance, 1.22) *
          320;

        /*
         * Small horizontal correction
         * creates smoother cylindrical curve.
         */

        const translateX =
          normalized *
          Math.pow(distance, 1.24) *
          56;

        /*
         * Slight vertical movement makes
         * edges feel farther away.
         */

        const translateY =
          Math.pow(distance, 1.5) *
          18;

        /*
         * Side images shrink slightly.
         */

        const scale =
          1 -
          Math.pow(distance, 1.12) *
            0.18;

        /*
         * Darker toward edges.
         */

        const brightness =
          1 -
          Math.pow(distance, 1.08) *
            0.3;

        /*
         * Very subtle opacity falloff.
         */

        const opacity =
          1 -
          Math.max(
            0,
            distance - 0.8,
          ) *
            0.35;

        element.style.transform = `
          translate3d(
            ${translateX}px,
            ${translateY}px,
            ${translateZ}px
          )
          rotateY(${rotateY}deg)
          scale(${scale})
        `;

        element.style.filter = `
          brightness(${brightness})
        `;

        element.style.opacity =
          `${opacity}`;

        /*
         * Rotate each card naturally
         * toward the middle.
         */

        if (normalized < -0.05) {
          element.style.transformOrigin =
            "right center";
        } else if (
          normalized > 0.05
        ) {
          element.style.transformOrigin =
            "left center";
        } else {
          element.style.transformOrigin =
            "center center";
        }

        /*
         * Bring center cards visually forward.
         */

        element.style.zIndex = `${Math.round(
          (1 - distance) * 100,
        )}`;

        /*
         * Dynamic depth shadow.
         */

        const shadowOpacity =
          Math.min(
            distance * 0.35,
            0.35,
          );

        element.style.boxShadow = `
          0 18px 55px
          rgba(16, 0, 37, ${shadowOpacity})
        `;
      },
    );
  }, [wrapPosition]);

  /* ======================================================
     MEASURE SLIDER
  ====================================================== */

  const measure = useCallback(() => {
    const track = trackRef.current;

    if (
      !track ||
      slides.length === 0
    ) {
      return;
    }

    const first =
      itemRefs.current[0];

    const secondSetFirst =
      itemRefs.current[
        slides.length
      ];

    if (
      !first ||
      !secondSetFirst
    ) {
      return;
    }

    groupWidthRef.current =
      secondSetFirst.offsetLeft -
      first.offsetLeft;

    const second =
      itemRefs.current[1];

    stepWidthRef.current =
      first && second
        ? second.offsetLeft -
          first.offsetLeft
        : groupWidthRef.current /
          Math.max(
            slides.length,
            1,
          );

    metricsRef.current =
      itemRefs.current.flatMap(
        (element) =>
          element
            ? [
                {
                  element,
                  center:
                    element.offsetLeft +
                    element.offsetWidth /
                      2,
                },
              ]
            : [],
      );

    positionRef.current =
      -groupWidthRef.current;

    renderFrame();
  }, [
    renderFrame,
    slides.length,
  ]);

  /* ======================================================
     RESIZE
  ====================================================== */

  useEffect(() => {
    if (!slides.length) return;

    const resizeObserver =
      new ResizeObserver(measure);

    if (viewportRef.current) {
      resizeObserver.observe(
        viewportRef.current,
      );
    }

    if (trackRef.current) {
      resizeObserver.observe(
        trackRef.current,
      );
    }

    const measureId =
      window.requestAnimationFrame(
        measure,
      );

    return () => {
      resizeObserver.disconnect();

      window.cancelAnimationFrame(
        measureId,
      );
    };
  }, [
    measure,
    slides.length,
  ]);

  /* ======================================================
     AUTO SCROLL
  ====================================================== */

  useEffect(() => {
    if (!slides.length) return;

    const duration = Math.min(
      60,
      Math.max(
        30,
        slides.length * 8,
      ),
    );

    const animate = (
      time: number,
    ) => {
      const delta =
        lastTimeRef.current
          ? Math.min(
              (time -
                lastTimeRef.current) /
                1000,
              0.05,
            )
          : 0;

      lastTimeRef.current =
        time;

      /*
       * Arrow animation
       */

      if (
        targetRef.current !==
        null
      ) {
        const difference =
          targetRef.current -
          positionRef.current;

        positionRef.current +=
          difference *
          Math.min(
            1,
            delta * 8.5,
          );

        if (
          Math.abs(difference) <
          0.6
        ) {
          positionRef.current =
            targetRef.current;

          targetRef.current =
            null;
        }
      } else if (
        !draggingRef.current
      ) {
        /*
         * Momentum after drag
         */

        if (
          Math.abs(
            velocityRef.current,
          ) > 5
        ) {
          positionRef.current +=
            velocityRef.current *
            delta;

          velocityRef.current *=
            Math.pow(
              0.045,
              delta,
            );
        }

        /*
         * Continuous auto scroll
         */

        else if (
          !pausedRef.current &&
          groupWidthRef.current
        ) {
          positionRef.current -=
            (groupWidthRef.current /
              duration) *
            delta;
        }
      }

      renderFrame();

      frameRef.current =
        window.requestAnimationFrame(
          animate,
        );
    };

    frameRef.current =
      window.requestAnimationFrame(
        animate,
      );

    return () => {
      if (
        frameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          frameRef.current,
        );
      }

      if (
        resumeTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          resumeTimerRef.current,
        );
      }
    };
  }, [
    renderFrame,
    slides.length,
  ]);

  /* ======================================================
     AUTO PLAY RESUME
  ====================================================== */

  const scheduleResume = () => {
    if (
      resumeTimerRef.current !==
      null
    ) {
      window.clearTimeout(
        resumeTimerRef.current,
      );
    }

    resumeTimerRef.current =
      window.setTimeout(() => {
        velocityRef.current = 0;

        if (
          !viewportRef.current?.matches(
            ":hover",
          )
        ) {
          pausedRef.current =
            false;
        }
      }, 900);
  };

  /* ======================================================
     DRAG START
  ====================================================== */

  const onPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (!slides.length) return;

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    draggingRef.current = true;
    pausedRef.current = true;

    targetRef.current = null;
    velocityRef.current = 0;

    dragStartRef.current = {
      x: event.clientX,
      position:
        positionRef.current,
      time: performance.now(),
    };
  };

  /* ======================================================
     DRAG MOVE
  ====================================================== */

  const onPointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      !draggingRef.current
    ) {
      return;
    }

    const now =
      performance.now();

    const nextPosition =
      dragStartRef.current
        .position +
      event.clientX -
      dragStartRef.current.x;

    const elapsed = Math.max(
      now -
        dragStartRef.current.time,
      1,
    );

    velocityRef.current =
      ((nextPosition -
        positionRef.current) /
        elapsed) *
      1000;

    positionRef.current =
      nextPosition;

    dragStartRef.current.time =
      now;

    renderFrame();
  };

  /* ======================================================
     DRAG END
  ====================================================== */

  const onPointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      !draggingRef.current
    ) {
      return;
    }

    draggingRef.current = false;

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId,
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    }

    scheduleResume();
  };

  /* ======================================================
     PREVIOUS / NEXT
  ====================================================== */

  const moveByOne = (
    direction: -1 | 1,
  ) => {
    const first =
      itemRefs.current[0];

    const second =
      itemRefs.current[1];

    const step =
      first && second
        ? second.offsetLeft -
          first.offsetLeft
        : groupWidthRef.current /
          Math.max(
            slides.length,
            1,
          );

    velocityRef.current = 0;

    targetRef.current =
      positionRef.current +
      direction * step;

    scheduleResume();
  };

  /* ======================================================
     JSX
  ====================================================== */

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-[#FBAA00]/35
        pb-6
        pt-4
        text-[#100025]

        sm:pb-8
        lg:pb-10
      "
    >
      {/* ======================================
          TITLE — SAME PLACE / SAME STYLE
          Only movement is added so each banner text
          travels with its matching image.
      ====================================== */}

      <div
        className="
          relative
          z-10
          w-full
          overflow-hidden
        "
      >
        {!slides.length ? (
          <div
            className="
              container-x
              relative
              mx-auto
              pb-2
              pt-2
              text-center

              sm:pb-3

              lg:pb-4
            "
          >
            <div
              className="
                mb-3
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#9b7424]/25
                bg-white
                px-3
                py-1.5
                text-[9px]
                font-bold
                uppercase
                tracking-[0.34em]
                text-[#9b7424]
                shadow-[0_8px_18px_-14px_rgba(155,116,36,0.55)]

                sm:mb-4
              "
              style={{
                transform:
                  "perspective(900px) rotateX(7deg) translateZ(16px)",
              }}
            >
              <span className="h-px w-5 bg-[#9b7424]/60" />
              Manufacturer · Karur, India
              <span className="h-px w-5 bg-[#9b7424]/60" />
            </div>

            <div
              className="
                relative
                mx-auto
                max-w-6xl
                [perspective:1200px]
              "
            >
              <h1
                className="
                  display
                  relative
                  z-10
                  mx-auto
                  text-[clamp(1.55rem,3.5vw,3.4rem)]
                  font-semibold
                  uppercase
                  leading-[0.9]
                  tracking-[-0.04em]
                  text-[#100025]

                  sm:text-[clamp(1.9rem,3.7vw,3.6rem)]
                "
                style={{
                  transform:
                    "perspective(1200px) rotateX(5deg) translateZ(22px)",
                  transformStyle:
                    "preserve-3d",
                  textShadow:
                    "0 1px 0 rgba(255,255,255,1), 0 3px 0 rgba(16,0,37,0.13), 0 6px 0 rgba(16,0,37,0.08), 0 10px 18px rgba(16,0,37,0.13), 0 22px 36px rgba(16,0,37,0.10)",
                }}
              >
                <span className="block">
                  Crafting Home Textiles
                </span>

                <span
                  className="
                    mt-1
                    block
                    italic
                    text-[#9b7424]
                  "
                  style={{
                    textShadow:
                      "0 1px 0 rgba(255,255,255,1), 0 2px 0 rgba(155,116,36,0.13), 0 3px 0 rgba(155,116,36,0.09), 0 7px 14px rgba(155,116,36,0.16), 0 16px 30px rgba(155,116,36,0.10)",
                  }}
                >
                  for Modern Living
                </span>
              </h1>
            </div>

            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-[10px]
                tracking-[0.08em]
                text-[#100025]/55

                sm:mt-3
                sm:text-[11px]
              "
            >
              {siteConfig.tagline}
            </p>
          </div>
        ) : (
          <div
            ref={textTrackRef}
            className="
              flex
              w-max
              will-change-transform
            "
          >
            {repeatedSlides.map(
              (
                slide,
                repeatedIndex,
              ) => {
                const sourceIndex =
                  repeatedIndex %
                  slides.length;

                const content =
                  heroContents[
                    sourceIndex %
                      heroContents.length
                  ];

                return (
                <div
                  key={`text-${repeatedIndex}-${slide.id}`}
                  className="
                    w-screen
                    shrink-0
                  "
                >
                  <div
                    className="
                      container-x
                      relative
                      mx-auto
                      pb-2
                      pt-2
                      text-center

                      sm:pb-3

                      lg:pb-4
                    "
                  >
                    <div
                      className="
                        mb-3
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-[#9b7424]/25
                        bg-white
                        px-3
                        py-1.5
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.34em]
                        text-[#9b7424]
                        shadow-[0_8px_18px_-14px_rgba(155,116,36,0.55)]

                        sm:mb-4
                      "
                      style={{
                        transform:
                          "perspective(900px) rotateX(7deg) translateZ(16px)",
                      }}
                    >
                      <span className="h-px w-5 bg-[#9b7424]/60" />
                      {content.category}
                      <span className="h-px w-5 bg-[#9b7424]/60" />
                    </div>

                    <div
                      className="
                        relative
                        mx-auto
                        max-w-6xl
                        [perspective:1200px]
                      "
                    >
                      <h1
                        className="
                          display
                          relative
                          z-10
                          mx-auto
                          text-[clamp(1.55rem,3.5vw,3.4rem)]
                          font-semibold
                          uppercase
                          leading-[0.9]
                          tracking-[-0.04em]
                          text-[#100025]

                          sm:text-[clamp(1.9rem,3.7vw,3.6rem)]
                        "
                        style={{
                          transform:
                            "perspective(1200px) rotateX(5deg) translateZ(22px)",
                          transformStyle:
                            "preserve-3d",
                          textShadow:
                            "0 1px 0 rgba(255,255,255,1), 0 3px 0 rgba(16,0,37,0.13), 0 6px 0 rgba(16,0,37,0.08), 0 10px 18px rgba(16,0,37,0.13), 0 22px 36px rgba(16,0,37,0.10)",
                        }}
                      >
                        <span className="block">
                          {content.title}
                        </span>

                        <span
                          className="
                            mt-1
                            block
                            italic
                            text-[#9b7424]
                          "
                          style={{
                            textShadow:
                              "0 1px 0 rgba(255,255,255,1), 0 2px 0 rgba(155,116,36,0.13), 0 3px 0 rgba(155,116,36,0.09), 0 7px 14px rgba(155,116,36,0.16), 0 16px 30px rgba(155,116,36,0.10)",
                          }}
                        >
                          {content.highlight}
                        </span>
                      </h1>
                    </div>

                    <p
                      className="
                        mx-auto
                        mt-3
                        max-w-xl
                        text-[10px]
                        tracking-[0.08em]
                        text-[#100025]/55

                        sm:mt-3
                        sm:text-[11px]
                      "
                    >
                      {siteConfig.tagline}
                    </p>
                  </div>
                </div>
                );
              },
            )}
          </div>
        )}
      </div>

      {/* ======================================
          3D SLIDER
      ====================================== */}

      <div
        ref={viewportRef}
        role="region"
        aria-label="Continuous curved textile image gallery"
        tabIndex={0}

        onKeyDown={(event) => {
          if (
            event.key ===
            "ArrowLeft"
          ) {
            moveByOne(1);
          }

          if (
            event.key ===
            "ArrowRight"
          ) {
            moveByOne(-1);
          }
        }}

        onMouseEnter={() => {
          pausedRef.current =
            true;
        }}

        onMouseLeave={() => {
          if (
            !draggingRef.current
          ) {
            pausedRef.current =
              false;
          }
        }}

        onPointerDown={
          onPointerDown
        }

        onPointerMove={
          onPointerMove
        }

        onPointerUp={
          onPointerUp
        }

        onPointerCancel={
          onPointerUp
        }

        className="
          relative

          h-[min(108vw,600px)]

          cursor-grab
          touch-pan-y
          select-none
          overflow-hidden
          outline-none

          active:cursor-grabbing

          sm:h-[min(72vw,620px)]

          md:h-[min(56vw,660px)]

          lg:h-[min(42vw,700px)]

          xl:h-[min(36vw,740px)]

          2xl:h-[min(32vw,780px)]
        "

        style={{
          /*
           * Smaller number =
           * stronger 3D perspective.
           */
          perspective:
            "680px",

          perspectiveOrigin:
            "50% 50%",
        }}
      >
        {/* ======================================
            LOADING
        ====================================== */}

        {!slides.length ? (
          <div
            className="
              absolute
              inset-y-0

              left-[9vw]
              w-[82vw]

              animate-pulse
              bg-white/30

              sm:left-[21vw]
              sm:w-[58vw]

              md:left-[27vw]
              md:w-[46vw]

              lg:left-[33vw]
              lg:w-[34vw]

              xl:left-[35vw]
              xl:w-[30vw]

              2xl:left-[36vw]
              2xl:w-[28vw]
            "
          />
        ) : (
          /* ======================================
             SLIDER TRACK
          ====================================== */

          <div
            ref={trackRef}
            className="
              absolute
              left-0
              top-0

              flex

              h-full
              w-max

              gap-[3px]

              will-change-transform

              sm:gap-1
            "
            style={{
              transformStyle:
                "preserve-3d",
            }}
          >
            {repeatedSlides.map(
              (
                slide,
                repeatedIndex,
              ) => {
                const sourceIndex =
                  repeatedIndex %
                  slides.length;

                const setIndex =
                  Math.floor(
                    repeatedIndex /
                      slides.length,
                  );

                return (
                  <div
                    key={`${setIndex}-${slide.id}`}

                    ref={(element) => {
                      itemRefs.current[
                        repeatedIndex
                      ] = element;
                    }}

                    className="
                      relative

                      h-full

                      w-[82vw]

                      shrink-0

                      overflow-hidden

                      rounded-[26px]
                      border
                      border-[#100025]/[0.08]

                      bg-white

                      shadow-[0_28px_70px_-34px_rgba(16,0,37,0.45)]

                      will-change-[transform,filter,opacity]

                      sm:rounded-[32px]

                      lg:rounded-[38px]

                      sm:w-[58vw]

                      md:w-[46vw]

                      lg:w-[34vw]

                      xl:w-[30vw]

                      2xl:w-[28vw]
                    "

                    style={{
                      transformStyle:
                        "preserve-3d",

                      backfaceVisibility:
                        "hidden",
                    }}
                  >
                    {/* IMAGE */}

                    <Image
                      src={
                        slide.image
                      }

                      alt={
                        setIndex === 1
                          ? slide.title ||
                            `Textile collection ${
                              sourceIndex +
                              1
                            }`
                          : ""
                      }

                      fill

                      priority={
                        setIndex ===
                          1 &&
                        sourceIndex ===
                          0
                      }

                      loading={
                        setIndex ===
                          1 &&
                        sourceIndex ===
                          0
                          ? "eager"
                          : "lazy"
                      }

                      sizes="
                        (max-width: 639px) 82vw,
                        (max-width: 767px) 58vw,
                        (max-width: 1023px) 46vw,
                        (max-width: 1279px) 34vw,
                        (max-width: 1535px) 30vw,
                        28vw
                      "

                      className="
                        pointer-events-none
                        object-cover
                      "

                      draggable={false}

                      unoptimized
                    />

                    {/* ==================================
                        3D SIDE LIGHT / SHADOW
                    ================================== */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-10

                        bg-gradient-to-r

                        from-[#100025]/40
                        via-transparent
                        to-[#100025]/40
                      "
                    />

                    {/* CYLINDER CENTER HIGHLIGHT */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        left-1/2
                        z-10
                        w-[42%]
                        -translate-x-1/2
                        bg-gradient-to-r
                        from-transparent
                        via-white/[0.11]
                        to-transparent
                        blur-[1px]
                      "
                    />

                    {/* LEFT EDGE LIGHT */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        left-0
                        z-10

                        w-px

                        bg-white/20
                      "
                    />

                    {/* RIGHT EDGE SHADOW */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-y-0
                        right-0
                        z-10

                        w-px

                        bg-[#100025]/30
                      "
                    />

                    {/* TOP LIGHT */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        top-0
                        z-10

                        h-[18%]

                        bg-gradient-to-b
                        from-white/10
                        to-transparent
                      "
                    />

                    {/* BOTTOM DEPTH */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-x-0
                        bottom-0
                        z-10

                        h-[20%]

                        bg-gradient-to-t

                        from-[#100025]/12
                        to-transparent
                      "
                    />
                  </div>
                );
              },
            )}
          </div>
        )}

        {/* ======================================
            TOP CURVE MASK
        ====================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -top-20
            left-[-5%]
            z-20

            h-28
            w-[110%]

            rounded-b-[50%]

            bg-white
          "
        />

        {/* ======================================
            BOTTOM CURVE MASK
        ====================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            -bottom-20
            left-[-5%]
            z-20

            h-28
            w-[110%]

            rounded-t-[50%]

            bg-white
          "
        />

        {/* OPTIONAL LEFT EDGE FADE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-y-0
            left-0
            z-20

            w-[7vw]

            bg-gradient-to-r

            from-white/60
            to-transparent
          "
        />

        {/* OPTIONAL RIGHT EDGE FADE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute
            inset-y-0
            right-0
            z-20

            w-[7vw]

            bg-gradient-to-l

            from-white/60
            to-transparent
          "
        />
      </div>

      {/* ======================================
          CONTROLS
      ====================================== */}

      {slides.length > 1 && (
        <div
          className="
            relative
            z-30

            mt-7

            flex
            items-center
            justify-center
            gap-3
          "
        >
          {/* PREVIOUS */}

          <button
            type="button"

            onClick={() =>
              moveByOne(1)
            }

            aria-label="Previous slide"

            className="
              grid

              h-11
              w-11

              place-items-center

              rounded-full

              border
              border-[#100025]/60

              bg-transparent

              text-[#100025]

              transition
              duration-300

              hover:scale-105

              hover:bg-[#100025]

              hover:text-[#f3dfe0]
            "
          >
            <FaArrowLeft
              className="
                h-3
                w-3
              "
            />
          </button>

          {/* NEXT */}

          <button
            type="button"

            onClick={() =>
              moveByOne(-1)
            }

            aria-label="Next slide"

            className="
              grid

              h-11
              w-11

              place-items-center

              rounded-full

              border
              border-[#100025]/60

              bg-transparent

              text-[#100025]

              transition
              duration-300

              hover:scale-105

              hover:bg-[#100025]

              hover:text-[#f3dfe0]
            "
          >
            <FaArrowRight
              className="
                h-3
                w-3
              "
            />
          </button>
        </div>
      )}
    </section>
  );
}
