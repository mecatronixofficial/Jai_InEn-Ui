"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

import { siteConfig } from "@/data/site";
import { categories } from "@/data/categories";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-maroon-950 text-cream-100 relative overflow-hidden">
      {/* Decorative weave overlay */}
      <div className="absolute inset-0 bg-weave-dark opacity-50 pointer-events-none" />

      {/* Top: newsletter */}
      <div className="relative border-b border-cream-50/10">
        <div className="container-x py-12 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-[11px] uppercase tracking-widest-x text-gold-light font-semibold">
              Stay in touch
            </div>
            <h3 className="display text-3xl md:text-4xl font-semibold mt-2 text-cream-50">
              Wholesale rates, new collections, festival drops.
            </h3>
            <p className="text-cream-100/70 text-sm mt-2 max-w-md">
              Join our list to be the first to know about new arrivals and bulk
              order deals.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="flex-1 rounded-full bg-white/10 border border-white/20 px-5 py-3 text-cream-50 placeholder:text-cream-100/50 focus:outline-none focus:border-gold focus:bg-white/15 transition"
            />
            <button type="submit" className="btn-gold">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Mid */}
      <div className="relative container-x py-16 grid md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Brand */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            {siteConfig.logo ? (
              <img
                src={siteConfig.logo}
                alt={siteConfig.name}
                className="h-12 w-12 object-cover"
              />
            ) : (
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gold text-maroon-950 font-display text-2xl font-bold uppercase">
                {siteConfig?.name?.charAt(0) || "T"}
              </div>
            )}

            <div>
              <div className="display text-2xl text-cream-50 font-semibold">
                {siteConfig.name}
              </div>

              <div className="text-[10px] uppercase tracking-widest text-gold-light font-semibold">
                {siteConfig.address.city} · {siteConfig.address.state}
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm text-cream-100/70 leading-relaxed max-w-sm">
            {siteConfig.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            {[
              {
                href: siteConfig.socials.facebook,
                Icon: FaFacebookF,
                label: "Facebook",
              },
              {
                href: siteConfig.socials.instagram,
                Icon: FaInstagram,
                label: "Instagram",
              },
              {
                href: siteConfig.socials.youtube,
                Icon: FaYoutube,
                label: "YouTube",
              },
              {
                href: siteConfig.socials.whatsapp,
                Icon: FaWhatsapp,
                label: "WhatsApp",
              },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-gold hover:text-maroon-950 transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="lg:col-span-3">
          <div className="text-[11px] uppercase tracking-widest-x text-gold-light font-semibold mb-5">
            Shop
          </div>
          <ul className="space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/products?category=${c.slug}`}
                  className="text-cream-100/80 hover:text-gold-light transition"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="lg:col-span-2">
          <div className="text-[11px] uppercase tracking-widest-x text-gold-light font-semibold mb-5">
            Company
          </div>
          <ul className="space-y-3 text-sm">
            {[
              ["About", "/about"],
              ["Collections", "/collections"],
              ["Blog", "/blog"],
              ["Reviews", "/testimonials"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-cream-100/80 hover:text-gold-light transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <div className="text-[11px] uppercase tracking-widest-x text-gold-light font-semibold mb-5">
            Reach us
          </div>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <FaMapMarkerAlt className="h-4 w-4 text-gold-light shrink-0 mt-0.5" />
              <span className="text-cream-100/80 leading-relaxed">
                {siteConfig.address.line2},<br />
                {siteConfig.address.city}, {siteConfig.address.state} -{" "}
                {siteConfig.address.pincode}
              </span>
            </li>
            <li className="flex gap-3">
              <FaPhoneAlt className="h-4 w-4 text-gold-light shrink-0 mt-0.5" />
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="text-cream-100/80 hover:text-gold-light"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <FaEnvelope className="h-4 w-4 text-gold-light shrink-0 mt-0.5" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-cream-100/80 hover:text-gold-light"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-3">
              <FaClock className="h-4 w-4 text-gold-light shrink-0 mt-0.5" />
              <span className="text-cream-100/80">
                {siteConfig.workingHours}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Business strip */}
      <div className="relative border-t border-cream-50/10">
        <div className="container-x py-6 grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs text-cream-100/60">
          {[
            ["Legal Status", siteConfig.legalStatus],
            ["CEO", siteConfig.ceo],
            ["GST Since", siteConfig.gstSince],
            ["Business", siteConfig.natureOfBusiness],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="uppercase tracking-wider-x">{k}</div>
              <div className="mt-1 text-cream-50 font-medium">{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative border-t border-cream-50/10">
        <div className="container-x py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream-100/60">
          <span>© 2026 {siteConfig.name}. All rights reserved.</span>
          <span>Designed & manufactured with care in Erode, Tamil Nadu.</span>
        </div>
      </div>
    </footer>
  );
}
