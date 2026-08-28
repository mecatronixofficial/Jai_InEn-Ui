"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaHeart, FaSearch, FaWhatsapp } from "react-icons/fa";

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

function BrandMark() {
  const [logoFailed, setLogoFailed] = useState(false);

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className="group flex min-w-0 items-center gap-2.5"
    >
      <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl border border-[#143B32]/10 bg-white p-1 shadow-[0_8px_22px_-15px_rgba(20,59,50,0.75)] transition duration-300 group-hover:-rotate-3 group-hover:scale-[1.04] motion-reduce:transform-none sm:h-11 sm:w-11">
        <span className="absolute inset-1 rounded-lg border border-[#FBAA00]/15" />
        {siteConfig.logo && !logoFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={siteConfig.logo}
            alt=""
            onError={() => setLogoFailed(true)}
            className="relative h-full w-full object-contain"
          />
        ) : (
          <span className="display relative text-lg font-bold text-[#579515]">
            {siteConfig.name.charAt(0)}
          </span>
        )}
      </span>

      <span className="min-w-0">
        <span className="display block truncate text-[0.92rem] font-bold leading-none tracking-[-0.035em] text-[#143B32] sm:text-base">
          Jai Export
        </span>
        <span className="mt-1.5 block truncate text-[6px] font-extrabold uppercase tracking-[0.24em] text-[#579515] sm:text-[7px]">
          Enterprises
        </span>
      </span>
    </Link>
  );
}

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="site-menu"
      className={`group flex h-10 items-center gap-2.5 rounded-full border px-3 transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2 xl:hidden ${
        open
          ? "border-[#FBAA00] bg-[#FBAA00] text-[#143B32]"
          : "border-[#143B32]/10 bg-white/70 text-[#143B32] hover:border-[#FBAA00]/60 hover:bg-white"
      }`}
    >
      <span className="hidden text-[7px] font-extrabold uppercase tracking-[0.17em] sm:block">
        {open ? "Close" : "Menu"}
      </span>
      <span className="relative h-4 w-[18px]">
        <span
          className={`absolute left-0 top-0 h-[1.5px] rounded-full bg-current transition-all duration-300 ${
            open ? "top-[7px] w-[18px] rotate-45" : "w-[18px]"
          }`}
        />
        <span
          className={`absolute left-0 top-[7px] h-[1.5px] rounded-full bg-current transition-all duration-300 ${
            open ? "w-0 opacity-0" : "w-3"
          }`}
        />
        <span
          className={`absolute bottom-0 right-0 h-[1.5px] rounded-full bg-current transition-all duration-300 ${
            open ? "bottom-[7px] w-[18px] -rotate-45" : "w-[18px]"
          }`}
        />
      </span>
    </motion.button>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<CategoryApi[]>([]);
  const wishlistCount = useWishlist((state) => state.items.length);

  useEffect(() => {
    api.publicCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 16);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeAtDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    desktop.addEventListener("change", closeAtDesktop);
    return () => desktop.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  if (pathname.startsWith("/admin")) return null;

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="pointer-events-none sticky inset-x-0 top-0 z-50 h-20 pt-2">
      <div className="container-x">
        <div
          className={`pointer-events-auto relative z-50 flex h-16 items-center justify-between gap-3 overflow-hidden rounded-[1.35rem] border px-2.5 transition-[background-color,border-color,box-shadow] duration-500 sm:px-3.5 ${
            scrolled || menuOpen
              ? "border-white/70 bg-white/[0.94] shadow-[0_20px_55px_-30px_rgba(20,59,50,0.8)] backdrop-blur-2xl"
              : "border-white/55 bg-white/[0.78] shadow-[0_14px_40px_-30px_rgba(20,59,50,0.55)] backdrop-blur-xl"
          }`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#579515]/[0.035] via-transparent to-[#FBAA00]/[0.06]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FBAA00]/55 to-transparent"
          />

          <div className="relative shrink-0">
            <BrandMark />
          </div>

          <nav
            aria-label="Primary navigation"
            className="relative hidden items-center rounded-full border border-[#143B32]/[0.07] bg-[#143B32]/[0.045] p-1 xl:flex"
          >
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-3 py-2 text-[9px] font-bold transition duration-300 2xl:px-3.5 ${
                    active
                      ? "bg-[#143B32] text-white shadow-[0_8px_20px_-13px_rgba(20,59,50,0.9)]"
                      : "text-[#52615D] hover:bg-white/80 hover:text-[#143B32]"
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {active && (
                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-white bg-[#FBAA00]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="relative flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/products"
              aria-label="Browse and search products"
              className="hidden h-10 w-10 place-items-center rounded-full border border-[#143B32]/[0.08] bg-white/70 text-xs text-[#52615D] transition duration-300 hover:-translate-y-0.5 hover:border-[#FBAA00]/60 hover:bg-white hover:text-[#D79000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] md:grid"
            >
              <FaSearch aria-hidden="true" />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="group relative grid h-10 w-10 place-items-center rounded-full border border-[#143B32]/[0.08] bg-white/70 text-xs text-[#52615D] transition duration-300 hover:-translate-y-0.5 hover:border-[#FBAA00]/60 hover:bg-white hover:text-[#D79000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00]"
            >
              <FaHeart
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:scale-110"
              />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-[#FBAA00] px-1 text-[7px] font-extrabold text-[#143B32] ring-2 ring-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group hidden h-10 items-center gap-2.5 rounded-full bg-[#579515] px-4 text-[8px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_-15px_rgba(87,149,21,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#143B32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2 lg:flex"
            >
              <FaWhatsapp
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-6"
              />
              Enquire
            </a>

            <MenuButton
              open={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : {
                    clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
                  }
            }
            animate={{
              opacity: 1,
              clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)",
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)",
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.62,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="pointer-events-auto fixed inset-0 z-40 overflow-y-auto bg-[#0D2B24] px-5 pb-8 pt-24 text-white sm:px-8 xl:hidden"
          >
            <div className="pointer-events-none absolute inset-0 bg-weave-dark opacity-55" />
            <div className="pointer-events-none absolute -right-40 -top-36 h-[32rem] w-[32rem] rounded-full border-[100px] border-white/[0.025]" />
            <div className="pointer-events-none absolute -bottom-40 -left-36 h-[32rem] w-[32rem] rounded-full bg-[#FBAA00]/10 blur-3xl" />

            <div className="relative mx-auto grid min-h-[calc(100dvh-8rem)] max-w-7xl gap-10 md:grid-cols-[1.35fr_0.65fr] md:items-center">
              <div>
                <span className="flex items-center gap-3 text-[8px] font-extrabold uppercase tracking-[0.3em] text-[#FBAA00]">
                  <span className="h-px w-8 bg-[#FBAA00]" />
                  Navigate
                </span>

                <nav
                  aria-label="Menu navigation"
                  className="mt-5 grid grid-cols-2 gap-x-5 sm:gap-x-8"
                >
                  {navLinks.map((link, index) => {
                    const active = isActive(link.href);

                    return (
                      <motion.div
                        key={link.href}
                        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: reduceMotion ? 0 : 0.18 + index * 0.04,
                        }}
                      >
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={`group flex min-h-[76px] items-end justify-between border-b py-4 transition-colors duration-300 sm:min-h-[88px] ${
                            active
                              ? "border-[#FBAA00] text-[#FBAA00]"
                              : "border-white/10 text-white hover:border-[#FBAA00]/45 hover:text-[#FBAA00]"
                          }`}
                        >
                          <span className="min-w-0">
                            <span className="block text-[7px] font-extrabold tracking-[0.18em] text-white/25">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="display mt-1 block truncate text-lg font-semibold tracking-[-0.025em] sm:text-2xl">
                              {link.label}
                            </span>
                          </span>
                          <FaArrowRight
                            aria-hidden="true"
                            className="mb-1 ml-2 h-3 w-3 shrink-0 opacity-25 transition duration-300 group-hover:-rotate-45 group-hover:opacity-100"
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              <div className="flex flex-col gap-6 rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-5 backdrop-blur-sm sm:p-6">
                <div>
                  <p className="text-[8px] font-extrabold uppercase tracking-[0.25em] text-[#A8CA82]">
                    Jai Export Enterprises
                  </p>
                  <p className="display mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">
                    {siteConfig.tagline}
                  </p>
                  <p className="mt-3 text-[10px] leading-5 text-white/45">
                    {siteConfig.address.city}, {siteConfig.address.state} · Since{" "}
                    {siteConfig.established}
                  </p>
                </div>

                {categories.length > 0 && (
                  <div className="border-t border-white/10 pt-5">
                    <p className="mb-3 text-[8px] font-extrabold uppercase tracking-[0.23em] text-[#FBAA00]">
                      Shop collections
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories.slice(0, 8).map((category) => (
                        <Link
                          key={category.id}
                          href={`/products?category=${encodeURIComponent(category.slug)}`}
                          className="rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-[9px] font-bold text-white/65 transition duration-300 hover:-translate-y-0.5 hover:border-[#FBAA00] hover:bg-[#FBAA00] hover:text-[#143B32]"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-5">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-3 text-[8px] font-extrabold uppercase tracking-[0.14em] text-white transition duration-300 hover:border-[#FBAA00] hover:text-[#FBAA00]"
                  >
                    <FaSearch aria-hidden="true" />
                    Products
                  </Link>
                  <a
                    href={siteConfig.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FBAA00] px-4 py-3 text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#143B32] transition duration-300 hover:bg-white"
                  >
                    <FaWhatsapp aria-hidden="true" className="h-3 w-3" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
