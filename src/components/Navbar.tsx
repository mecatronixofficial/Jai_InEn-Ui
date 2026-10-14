"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaHeart, FaSearch, FaWhatsapp } from "react-icons/fa";

import { siteConfig } from "@/data/site";
import { api, type CategoryApi } from "@/lib/api";
import { useWishlist } from "@/store";
import CompanyLogo from "@/components/CompanyLogo";

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
      <span className="relative block h-[90px] w-[90px] shrink-0 transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transform-none">
        {siteConfig.logo && !logoFailed ? (
          <CompanyLogo
            decorative
            onError={() => setLogoFailed(true)}
            className="relative h-full w-full object-contain"
          />
        ) : (
          <span className="display relative text-lg font-bold text-[#FFB900]">
            {siteConfig.name.charAt(0)}
          </span>
        )}
      </span>

      <span className="min-w-0">
        <span className="display block truncate text-[1.05rem] font-bold leading-none tracking-[-0.035em] text-black sm:text-xl">
          Jai Export
        </span>
        <span className="mt-1.5 block truncate text-[8px] font-extrabold uppercase tracking-[0.24em] text-[#FFB900] sm:text-[9px]">
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
          ? "border-[#FBAA00] bg-[#FBAA00] text-[#2B2B2B]"
          : "border-[#2B2B2B]/10 bg-white/70 text-[#2B2B2B] hover:border-[#FBAA00]/60 hover:bg-white"
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
  const [headerHidden, setHeaderHidden] = useState(false);
  const [categories, setCategories] = useState<CategoryApi[]>([]);
  const wishlistCount = useWishlist((state) => state.items.length);

  useEffect(() => {
    api.publicCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    setHeaderHidden(false);
    const updateScrolled = () => {
      const currentY = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      setScrolled(currentY > 16);
      if (currentY <= 88) {
        setHeaderHidden(false);
        previousY = currentY;
        return;
      }
      // Ignore small scroll movements to avoid flickering.
      if (Math.abs(currentY - previousY) < 8) return;
      setHeaderHidden(currentY > previousY);
      previousY = currentY;
    };
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [pathname]);

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
    <>
    <div aria-hidden="true" className="h-[5.5rem]" />
    <header className={`pointer-events-none fixed inset-x-0 z-50 h-[5.5rem] pt-2 transition-[top] duration-300 ease-out focus-within:top-0 motion-reduce:transition-none ${headerHidden && !menuOpen ? "-top-[6.5rem]" : "top-0"}`}>
      <div className="container-x">
        <div
          className={`pointer-events-auto relative z-50 flex h-[4.5rem] items-center justify-between gap-3 overflow-visible rounded-[1.35rem] border px-2.5 transition-[background-color,border-color,box-shadow] duration-500 sm:px-3.5 ${
            scrolled || menuOpen
              ? "border-white/70 bg-white/[0.94] shadow-[0_20px_55px_-30px_rgba(32,32,32,0.8)] backdrop-blur-2xl"
              : "border-white/55 bg-white/[0.78] shadow-[0_14px_40px_-30px_rgba(32,32,32,0.55)] backdrop-blur-xl"
          }`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-[#FFB900]/[0.035] via-transparent to-[#FBAA00]/[0.06]"
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
            className="relative hidden items-center rounded-full border border-[#2B2B2B]/[0.07] bg-[#2B2B2B]/[0.045] p-1 xl:flex"
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
                      ? "bg-[#2B2B2B] text-white shadow-[0_8px_20px_-13px_rgba(32,32,32,0.9)]"
                      : "text-[#666666] hover:bg-white/80 hover:text-[#2B2B2B]"
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
              className="hidden h-10 w-10 place-items-center rounded-full border border-[#2B2B2B]/[0.08] bg-white/70 text-xs text-[#666666] transition duration-300 hover:-translate-y-0.5 hover:border-[#FBAA00]/60 hover:bg-white hover:text-[#D79000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] md:grid"
            >
              <FaSearch aria-hidden="true" />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="group relative grid h-10 w-10 place-items-center rounded-full border border-[#2B2B2B]/[0.08] bg-white/70 text-xs text-[#666666] transition duration-300 hover:-translate-y-0.5 hover:border-[#FBAA00]/60 hover:bg-white hover:text-[#D79000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00]"
            >
              <FaHeart
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:scale-110"
              />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-[17px] min-w-[17px] place-items-center rounded-full bg-[#FBAA00] px-1 text-[7px] font-extrabold text-[#2B2B2B] ring-2 ring-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group hidden h-10 items-center gap-2.5 rounded-full bg-[#FFB900] px-4 text-[8px] font-extrabold uppercase tracking-[0.14em] text-[#252525] shadow-[0_10px_25px_-15px_rgba(255,185,0,0.8)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2B2B2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2 lg:flex"
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
                    clipPath: "circle(0% at calc(100% - 2.5rem) 2.75rem)",
                  }
            }
            animate={{
              opacity: 1,
              clipPath: "circle(150% at calc(100% - 2.5rem) 2.75rem)",
            }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : {
                    clipPath: "circle(0% at calc(100% - 2.5rem) 2.75rem)",
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.62,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="pointer-events-auto fixed inset-0 z-40 overflow-y-auto bg-white px-5 pb-10 pt-28 font-[family-name:var(--font-public-body)] text-[#1C1C1C] sm:px-8 xl:hidden"
          >
            {/* Soft gold light, classic inset frame and a faint logo watermark. */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 bg-[radial-gradient(70%_55%_at_100%_0%,rgba(251,170,0,0.16),transparent_70%),radial-gradient(50%_45%_at_0%_100%,rgba(251,170,0,0.1),transparent_70%)]" />
            <div aria-hidden="true" className="pointer-events-none fixed inset-3 rounded-[1.5rem] border border-[#FBAA00]/30 sm:inset-4" />
            <div aria-hidden="true" className="pointer-events-none fixed -right-28 -top-28 h-[26rem] w-[26rem] rounded-full border border-[#FBAA00]/25" />
            <div aria-hidden="true" className="pointer-events-none fixed -right-12 -top-12 h-[18rem] w-[18rem] rounded-full border border-dashed border-[#FBAA00]/30" />
            {siteConfig.logo && (
              <CompanyLogo decorative aria-hidden="true" className="pointer-events-none fixed -bottom-10 -right-10 h-[22rem] w-[22rem] object-contain opacity-[0.06]" />
            )}

            <div className="relative mx-auto grid min-h-[calc(100dvh-9.5rem)] max-w-7xl gap-10 [&>*]:min-w-0 md:grid-cols-[1.35fr_0.65fr] md:items-center">
              <div>
                <span className="flex items-center gap-3 font-[family-name:var(--font-public-heading)] text-[11px] font-semibold uppercase tracking-[0.3em] text-[#B57A00]">
                  <span className="h-px w-8 bg-[#FBAA00]" />
                  Navigate
                  <span className="h-1.5 w-1.5 rotate-45 bg-[#FBAA00]" />
                </span>

                <nav
                  aria-label="Menu navigation"
                  className="mt-5 grid grid-cols-2 gap-x-5 sm:gap-x-10"
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
                        className="min-w-0"
                      >
                        <Link
                          href={link.href}
                          aria-current={active ? "page" : undefined}
                          className={`group relative flex min-h-[76px] items-end justify-between border-b py-4 transition-colors duration-300 sm:min-h-[92px] ${
                            active
                              ? "border-[#FBAA00] text-[#B57A00]"
                              : "border-[#EEE8DC] text-[#1C1C1C] hover:text-[#B57A00]"
                          }`}
                        >
                          <span aria-hidden="true" className={`absolute inset-x-0 -bottom-px h-0.5 origin-left bg-gradient-to-r from-[#E89D00] via-[#FBAA00] to-[#FFC533] transition-transform duration-500 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                          <span className="min-w-0 transition-transform duration-500 group-hover:translate-x-1.5">
                            <span className={`block font-[family-name:var(--font-public-heading)] text-[11px] font-semibold tracking-[0.2em] ${active ? "text-[#FBAA00]" : "text-[#B57A00]/60"}`}>
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span className="mt-1 block truncate font-[family-name:var(--font-public-heading)] text-lg font-semibold tracking-[-0.025em] min-[400px]:text-xl sm:text-[1.75rem]">
                              {link.label}
                            </span>
                          </span>
                          <span
                            aria-hidden="true"
                            className={`mb-1 ml-2 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition duration-300 ${
                              active
                                ? "border-[#FBAA00] bg-[#FBAA00] text-[#1C1C1C]"
                                : "border-[#EEE8DC] text-[#B57A00] group-hover:-rotate-45 group-hover:border-[#FBAA00] group-hover:bg-[#FBAA00] group-hover:text-[#1C1C1C]"
                            }`}
                          >
                            <FaArrowRight className="h-2.5 w-2.5" />
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.35, duration: 0.5 }}
                className="relative flex flex-col gap-6 overflow-hidden rounded-[1.5rem] border border-[#FBAA00]/40 bg-gradient-to-br from-[#FFF4D9] via-white to-white p-6 shadow-[0_30px_60px_-34px_rgba(181,122,0,0.55)] outline outline-1 -outline-offset-[10px] outline-[#FBAA00]/20 sm:p-7"
              >
                <div className="flex items-center gap-4">
                  {siteConfig.logo && (
                    <span className="block h-[90px] w-[90px] shrink-0 transition-transform duration-300 hover:scale-[1.03] motion-reduce:transform-none">
                      <CompanyLogo decorative className="h-full w-full object-contain" />
                    </span>
                  )}
                  <div>
                    <p className="font-[family-name:var(--font-public-heading)] text-base font-semibold text-[#1C1C1C]">
                      {siteConfig.name}
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-public-heading)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B57A00]">
                      {siteConfig.address.city}, {siteConfig.address.state} · Since {siteConfig.established}
                    </p>
                  </div>
                </div>
                <p className="font-[family-name:var(--font-public-heading)] text-xl font-semibold leading-snug text-[#1C1C1C] sm:text-2xl">
                  {siteConfig.tagline}
                </p>

                {categories.length > 0 && (
                  <div className="border-t border-[#EEE8DC] pt-5">
                    <p className="mb-3 font-[family-name:var(--font-public-heading)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B57A00]">
                      Shop collections
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categories.slice(0, 8).map((category) => (
                        <Link
                          key={category.id}
                          href={`/products?category=${encodeURIComponent(category.slug)}`}
                          className="rounded-full border border-[#FBAA00]/40 bg-white px-3.5 py-2 text-xs font-medium text-[#1C1C1C] transition duration-300 hover:-translate-y-0.5 hover:border-[#FBAA00] hover:bg-[#FBAA00] hover:shadow-[0_10px_20px_-12px_rgba(251,170,0,0.9)]"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2.5 border-t border-[#EEE8DC] pt-5">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1C1C1C]/15 bg-white px-4 py-3 font-[family-name:var(--font-public-heading)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1C1C1C] transition duration-300 hover:-translate-y-0.5 hover:border-[#FBAA00] hover:bg-[#FFF4D9] hover:text-[#B57A00]"
                  >
                    <FaSearch aria-hidden="true" />
                    Products
                  </Link>
                  <a
                    href={siteConfig.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FBAA00] px-4 py-3 font-[family-name:var(--font-public-heading)] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1C1C1C] shadow-[0_12px_24px_-14px_rgba(251,170,0,0.95)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1C1C1C] hover:text-white"
                  >
                    <FaWhatsapp aria-hidden="true" className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
