"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  FaArrowRight,
  FaHeart,
  FaSearch,
  FaWhatsapp,
} from "react-icons/fa";

import { siteConfig } from "@/data/site";
import { api, type CategoryApi } from "@/lib/api";
import { useWishlist } from "@/store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/certifications", label: "Certifications" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

/* =====================================================================
   TILT CARD — pointer-tracked 3D depth, reused for links + categories
===================================================================== */

function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  liftZ = 22,
  glare = true,
}: {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  liftZ?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const springCfg = { stiffness: 220, damping: 20, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(py, [0, 1], [maxTilt, -maxTilt]),
    springCfg
  );
  const rotateY = useSpring(
    useTransform(px, [0, 1], [-maxTilt, maxTilt]),
    springCfg
  );
  const translateZ = useSpring(hovering ? liftZ : 0, springCfg);
  const glareX = useTransform(px, [0, 1], ["10%", "90%"]);
  const glareY = useTransform(py, [0, 1], ["10%", "90%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;
    px.set((e.clientX - bounds.left) / bounds.width);
    py.set((e.clientY - bounds.top) / bounds.height);
  };

  const handleLeave = () => {
    setHovering(false);
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, translateZ, transformStyle: "preserve-3d" }}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      {children}

      {glare && (
        <motion.span
          aria-hidden="true"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(180px circle at ${gx} ${gy}, rgba(246,233,221,0.14), transparent 65%)`
            ),
          }}
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}

/* =====================================================================
   MENU TOGGLE — 3D flip-coin button: hamburger face flips to a close
   face on a real rotateY axis, with pointer tilt layered on top.
===================================================================== */

function MenuToggle({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <TiltCard maxTilt={16} liftZ={18} glare={false} className="rounded-2xl">
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="group relative block h-12 w-12 sm:h-14 sm:w-14 lg:h-[3.75rem] lg:w-[3.75rem] [perspective:700px]"
      >
        <motion.div
          animate={{ rotateY: open ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {/* FRONT FACE — closed state */}
          <span className="absolute inset-0 grid place-items-center rounded-2xl border border-[#100025]/15 bg-gradient-to-b from-white to-[#f3efe6] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_-3px_5px_rgba(0,0,0,0.08)_inset,0_14px_26px_-14px_rgba(16,0,37,0.4)] transition-shadow duration-300 [backface-visibility:hidden] group-hover:shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_-3px_5px_rgba(0,0,0,0.08)_inset,0_18px_32px_-14px_rgba(198,154,53,0.55)]">
            <span className="flex flex-col items-end gap-[5px]">
              <span className="h-[2px] w-6 rounded-full bg-[#100025] transition-all duration-300 group-hover:w-7" />
              <span className="h-[2px] w-4 rounded-full bg-[#c69a35] transition-all duration-300 group-hover:w-7" />
              <span className="h-[2px] w-5 rounded-full bg-[#100025] transition-all duration-300 group-hover:w-7" />
            </span>
          </span>

          {/* BACK FACE — open state */}
          <span className="absolute inset-0 grid place-items-center rounded-2xl border border-[#c69a35]/50 bg-gradient-to-b from-[#1c4a37] to-[#0f2a1f] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_-3px_6px_rgba(0,0,0,0.5)_inset,0_14px_26px_-14px_rgba(0,0,0,0.65)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="relative grid h-6 w-6 place-items-center">
              <motion.span
                animate={{ rotate: open ? 360 : 0 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-[#c69a35]/45"
              />
              <span className="absolute h-[2px] w-4 rotate-45 rounded-full bg-[#f6e9dd]" />
              <span className="absolute h-[2px] w-4 -rotate-45 rounded-full bg-[#f6e9dd]" />
            </span>
          </span>
        </motion.div>
      </motion.button>
    </TiltCard>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryApi[]>([]);
  const [logoFailed, setLogoFailed] = useState(false);

  const wishlistCount = useWishlist((state) => state.items.length);

  useEffect(() => {
    api.publicCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky inset-x-0 top-0 z-50 h-14 border-b border-[#c69a35]/15 bg-white/95 shadow-[0_8px_24px_-20px_rgba(16,0,37,0.4)] backdrop-blur-md sm:h-[4.5rem]">
      {/* ===================================================
          SIDE MENU — dim backdrop + panel that swings in from
          the right on a 3D hinge (perspective + rotateY), then
          settles flat into place.
      =================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP */}
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-40 h-[100dvh] w-screen cursor-default bg-[#100025]/20 backdrop-blur-[3px]"
            />

            {/* PANEL — hinge from the right edge */}
            <div className="fixed inset-0 z-[45] h-[100dvh] w-screen overflow-hidden [perspective:1800px]">
              <motion.aside
                initial={{ x: 40, rotateY: -55, opacity: 0 }}
                animate={{ x: 0, rotateY: 0, opacity: 1 }}
                exit={{ x: 40, rotateY: -35, opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
                style={{ transformOrigin: "right center" }}
                className="absolute right-0 top-0 flex h-full w-full flex-col overflow-x-hidden overflow-y-auto border-l border-[#c69a35]/25 bg-white text-[#100025] shadow-[-30px_0_60px_-34px_rgba(16,0,37,0.28)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:w-[420px] md:w-[440px]"
              >
                {/* ambient glow, kept subtle for the narrower panel */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(198,154,53,0.10),transparent_70%)]"
                />

                <div
                  onClick={(e) => {
                    if (e.target === e.currentTarget) setMenuOpen(false);
                  }}
                  className="relative flex h-full min-w-0 flex-col overflow-x-hidden px-6 pb-8 pt-8 sm:px-8 sm:pt-9"
                >
                  {/* HEADER STRIP — brand + close */}
                  <div className="sticky top-0 z-30 -mx-2 mb-7 flex items-center justify-between rounded-xl border border-[#100025]/[0.06] bg-white/95 px-2 py-2 shadow-[0_8px_24px_-20px_rgba(16,0,37,0.45)] backdrop-blur-md">
                    <Link
                      href="/"
                      className="flex min-w-0 items-center gap-3"
                      aria-label={`${siteConfig.name} home`}
                    >
                      {siteConfig.logo && !logoFailed ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={siteConfig.logo}
                          alt={siteConfig.name}
                          onError={() => setLogoFailed(true)}
                          className="h-12 w-12 shrink-0 rounded-xl border border-[#c69a35]/35 bg-white object-contain p-1.5 shadow-sm"
                        />
                      ) : (
                        <span className="display grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-[#c69a35] bg-[#143b32] text-xl font-bold text-[#FBAA00] shadow-sm">
                          {siteConfig.name.charAt(0)}
                        </span>
                      )}
                      <span className="truncate text-sm font-bold uppercase tracking-[0.16em] text-[#100025] sm:text-[15px]">
                        {siteConfig.name}
                      </span>
                    </Link>

                    <TiltCard maxTilt={16} liftZ={14} glare={false}>
                      <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close menu"
                        className="group grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#100025]/10 bg-[#faf9f6] text-[#100025]/65 transition-all duration-300 hover:border-[#c69a35] hover:bg-[#c69a35] hover:text-white hover:shadow-[0_12px_28px_-16px_rgba(198,154,53,0.7)]"
                      >
                        <span className="relative block h-4 w-4">
                          <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                          <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                        </span>
                      </button>
                    </TiltCard>
                  </div>

                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-px w-8 bg-[#c69a35]" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.30em] text-[#c69a35] sm:text-[11px]">
                        Menu
                      </span>
                    </div>
                    <span className="text-[9px] uppercase tracking-[0.22em] text-[#100025]/35">
                      01 — 07
                    </span>
                  </div>

                  {/* NAV LINKS */}
                  <nav aria-label="Primary navigation" className="flex flex-col gap-1.5 [perspective:1000px]">
                    {navLinks.map((link, index) => {
                      const isActive =
                        pathname === link.href ||
                        (link.href !== "/" && pathname.startsWith(link.href));

                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 18 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.16 + index * 0.05, duration: 0.4 }}
                        >
                          <TiltCard maxTilt={5} liftZ={12} className="group">
                            <Link
                              href={link.href}
                              className={`relative flex min-h-[58px] items-center justify-between overflow-hidden border-b px-1 py-2 transition-[transform,border-color] duration-300 sm:min-h-[62px] sm:px-2 ${
                                isActive
                                  ? "border-[#c69a35]/70"
                                  : "border-[#100025]/10 group-hover:border-[#c69a35]/45"
                              }`}
                            >
                              <div className="flex min-w-0 items-center gap-3" style={{ transform: "translateZ(14px)" }}>
                                <span
                                  className={`w-5 shrink-0 text-[7px] font-semibold tracking-[0.18em] ${
                                    isActive ? "text-[#c69a35]" : "text-[#100025]/30"
                                  }`}
                                >
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <span
                                  className={`display block truncate text-[1.65rem] leading-[0.95] tracking-[-0.035em] transition-colors duration-300 sm:text-[1.8rem] ${
                                    isActive ? "text-[#c69a35]" : "text-[#100025] group-hover:text-[#143b32]"
                                  }`}
                                >
                                  {link.label}
                                </span>
                              </div>

                              <FaArrowRight
                                style={{ transform: "translateZ(20px)" }}
                                className={`shrink-0 text-[11px] transition-all duration-300 group-hover:translate-x-1 group-hover:-rotate-45 ${
                                  isActive ? "text-[#c69a35]" : "text-[#100025]/25 group-hover:text-[#c69a35]"
                                }`}
                              />
                            </Link>
                          </TiltCard>
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* COLLECTIONS */}
                  {categories.length > 0 && (
                    <>
                      <div className="my-6 h-px bg-gradient-to-r from-[#100025]/10 via-[#c69a35]/35 to-transparent" />

                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#c69a35] sm:text-[11px]">
                        Collections
                      </p>

                      <div className="flex flex-col gap-1.5 [perspective:1000px]">
                        {categories.map((category) => (
                          <TiltCard key={category.id} maxTilt={5} liftZ={10} className="group">
                            <Link
                              href={`/products?category=${category.slug}`}
                              className="flex min-h-[46px] items-center justify-between gap-3 border-b border-[#100025]/10 px-1 py-2.5 transition-[transform,border-color] duration-300 group-hover:translate-x-1 group-hover:border-[#c69a35]/50"
                            >
                              <div className="flex min-w-0 items-center gap-3" style={{ transform: "translateZ(10px)" }}>
                                <span className="h-6 w-px shrink-0 bg-[#c69a35]/40 transition-all duration-300 group-hover:h-7 group-hover:bg-[#c69a35]" />
                                <span className="block truncate text-[12px] font-semibold text-[#100025]/70 transition-colors duration-300 group-hover:text-[#100025] sm:text-[13px]">
                                  {category.name}
                                </span>
                              </div>
                              <FaArrowRight className="shrink-0 text-[9px] text-[#100025]/25 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#c69a35]" />
                            </Link>
                          </TiltCard>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="mt-auto pt-6">
                    <div className="mb-4 h-px bg-gradient-to-r from-[#100025]/10 via-[#c69a35]/35 to-transparent" />

                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#c69a35] sm:text-[11px]">
                          Quick Access
                        </p>
                        <p className="mt-1 text-[10px] text-[#100025]/45">
                          {siteConfig.address.city}, {siteConfig.address.state}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <TiltCard maxTilt={16} liftZ={12}>
                          <Link
                            href="/products"
                            aria-label="Search products"
                            className="group grid h-12 w-12 place-items-center rounded-full border border-[#100025]/10 bg-[#faf9f6] text-[17px] text-[#100025]/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c69a35] hover:bg-[#c69a35] hover:text-white hover:shadow-[0_14px_30px_-18px_rgba(198,154,53,0.75)]"
                          >
                            <FaSearch />
                          </Link>
                        </TiltCard>

                        <TiltCard maxTilt={16} liftZ={12}>
                          <Link
                            href="/wishlist"
                            aria-label={`Wishlist with ${wishlistCount} items`}
                            className="group relative grid h-12 w-12 place-items-center rounded-full border border-[#100025]/10 bg-[#faf9f6] text-[17px] text-[#100025]/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c69a35] hover:bg-[#c69a35] hover:text-white hover:shadow-[0_14px_30px_-18px_rgba(198,154,53,0.75)]"
                          >
                            <FaHeart />
                            {wishlistCount > 0 && (
                              <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#c69a35] px-1 text-[8px] font-bold text-white">
                                {wishlistCount}
                              </span>
                            )}
                          </Link>
                        </TiltCard>

                        <TiltCard maxTilt={16} liftZ={12}>
                          <a
                            href={siteConfig.socials.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Order on WhatsApp"
                            className="group grid h-12 w-12 place-items-center rounded-full border border-[#100025]/10 bg-[#faf9f6] text-[17px] text-[#100025]/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c69a35] hover:bg-[#c69a35] hover:text-white hover:shadow-[0_14px_30px_-18px_rgba(198,154,53,0.75)]"
                          >
                            <FaWhatsapp />
                          </a>
                        </TiltCard>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ===================================================
          NORMAL NAVBAR
      =================================================== */}

      <div className="container-x relative z-30 flex h-full items-start justify-between pt-2.5 sm:pt-3">
        <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
          {siteConfig.logo && !logoFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={siteConfig.logo}
              alt={siteConfig.name}
              onError={() => setLogoFailed(true)}
              className="h-10 w-10 rounded-xl border border-[#c69a35]/35 bg-white object-contain p-1 shadow-sm sm:h-11 sm:w-11"
            />
          ) : (
            <span className="display grid h-10 w-10 place-items-center rounded-xl border border-[#c69a35] bg-[#143b32] text-lg font-bold text-[#FBAA00] shadow-sm sm:h-11 sm:w-11">
              {siteConfig.name.charAt(0)}
            </span>
          )}

          <span className="hidden text-xs font-bold uppercase tracking-[0.16em] text-[#100025] sm:block">
            {siteConfig.name}
          </span>
        </Link>

        <div className="relative z-50 -mr-1 -mt-1 sm:-mr-2 sm:-mt-1.5">
          <MenuToggle open={menuOpen} onClick={() => setMenuOpen((open) => !open)} />
        </div>
      </div>
    </header>
  );
}
