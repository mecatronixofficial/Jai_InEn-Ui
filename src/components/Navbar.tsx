"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaSearch,
  FaHeart,
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaChevronDown,
  FaPhoneAlt,
} from "react-icons/fa";

import { siteConfig } from "@/data/site";
import { api, type CategoryApi } from "@/lib/api";
import { cn } from "@/utils";
import { useWishlist } from "@/store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryApi[]>([]);
  const wishlistCount = useWishlist((s) => s.items.length);

  useEffect(() => {
    api.publicCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShopOpen(false);
  }, [pathname]);

  // Hide on admin routes — admin has its own layout
  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility strip */}
      <div className="bg-maroon-900 text-cream-100 text-xs">
        <div className="container-x flex h-9 items-center justify-between">
          <span className="hidden sm:inline tracking-wider-x">
            {siteConfig.address.city} • {siteConfig.address.state} • Manufacturing since {siteConfig.established}
          </span>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 hover:text-gold-light transition"
            >
              <FaPhoneAlt className="h-3 w-3" /> {siteConfig.phone}
            </a>
            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-2 hover:text-gold-light transition"
            >
              <FaWhatsapp className="h-3.5 w-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "transition-all duration-300 backdrop-blur",
          scrolled ? "bg-cream-50/95 shadow-soft" : "bg-cream-50/80",
        )}
      >
        <div className="container-x flex h-20 items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-4 group">
            {siteConfig.logo ? (
              <img
                src={siteConfig.logo}
                alt={siteConfig.name}
                className="h-11 w-11 object-cover"
              />
            ) : (
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gold text-maroon-950 font-display text-2xl font-bold uppercase">
                {siteConfig?.name?.charAt(0) || "T"}
              </div>
            )}

            <div className="leading-tight">
              <div className="display text-xl text-maroon-900 font-semibold tracking-tight">
                {siteConfig.name}
              </div>
              <div className="text-[10px] uppercase tracking-widest-x text-gold-dark font-semibold">
                Textile · {siteConfig.address.city}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              // Products dropdown
              if (link.href === "/products") {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setShopOpen(true)}
                    onMouseLeave={() => setShopOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium tracking-wide transition flex items-center gap-1.5",
                        active
                          ? "text-maroon-800"
                          : "text-ink-soft hover:text-maroon-800",
                      )}
                    >
                      {link.label}
                      <FaChevronDown
                        className={cn(
                          "h-2.5 w-2.5 transition-transform",
                          shopOpen && "rotate-180",
                        )}
                      />
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-0.5 left-4 right-4 h-px bg-gold"
                        />
                      )}
                    </Link>

                    <AnimatePresence>
                      {shopOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full pt-3 w-[420px]"
                        >
                          <div className="rounded-2xl bg-white border border-cream-200 shadow-warm p-4">
                            <div className="text-[10px] uppercase tracking-widest-x text-gold-dark font-semibold px-3 py-2">
                              Shop by Category
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              {categories.map((c) => (
                                <Link
                                  key={c.id}
                                  href={`/products?category=${c.slug}`}
                                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 hover:bg-cream-100 transition"
                                >
                                  <div className="h-9 w-9 rounded-md overflow-hidden bg-cream-200 shrink-0">
                                    <img
                                      src={c.image}
                                      alt={c.name}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-ink group-hover:text-maroon-800">
                                      {c.name}
                                    </div>
                                    <div className="text-xs text-ink-muted">
                                      {c.productCount} items
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <Link
                              href="/products"
                              className="mt-2 block text-center text-xs uppercase tracking-wider-x font-semibold text-maroon-800 hover:text-gold-dark py-2 border-t border-cream-200 pt-3"
                            >
                              View All Products →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium tracking-wide transition",
                    active
                      ? "text-maroon-800"
                      : "text-ink-soft hover:text-maroon-800",
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-4 right-4 h-px bg-gold"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <Link
              href="/products"
              className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-cream-100 hover:text-maroon-800 transition"
              aria-label="Search"
            >
              <FaSearch className="h-4 w-4" />
            </Link>
            <Link
              href="/wishlist"
              className="relative grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-cream-100 hover:text-maroon-800 transition"
              aria-label="Wishlist"
            >
              <FaHeart className="h-4 w-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 grid place-items-center rounded-full bg-gold text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex btn-primary !py-2 !px-5 text-xs ml-2"
            >
              <FaWhatsapp className="h-4 w-4" />
              Order Now
            </a>
            <button
              type="button"
              className="lg:hidden grid h-10 w-10 place-items-center rounded-full text-ink-soft hover:bg-cream-100"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <FaTimes className="h-5 w-5" />
              ) : (
                <FaBars className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-cream-50 border-t border-cream-200"
          >
            <div className="container-x py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-sm font-medium",
                    (
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href)
                    )
                      ? "bg-maroon-800 text-cream-50"
                      : "text-ink-soft hover:bg-cream-100",
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn-primary w-full mt-4"
              >
                <FaWhatsapp className="h-4 w-4" /> Order on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
