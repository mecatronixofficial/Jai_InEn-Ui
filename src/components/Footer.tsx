"use client";

import { useEffect, useState } from "react";
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
import { api, type CategoryApi } from "@/lib/api";

export default function Footer() {
  const pathname = usePathname();
  const [shopCategories, setShopCategories] = useState<CategoryApi[]>([]);

  useEffect(() => {
    let active = true;
    api.publicCategories()
      .then((items) => {
        if (active) setShopCategories(items);
      })
      .catch(() => {
        if (active) setShopCategories([]);
      });

    return () => {
      active = false;
    };
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative overflow-hidden  border-[#ECECEC] bg-[#F5F5F5] text-[#666666]">
      {/* ===================================================== */}
      {/* GLOBAL DECORATIONS */}
      {/* ===================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-weave-light opacity-[0.13]" />

      <div className="pointer-events-none absolute -right-32 top-10 h-[360px] w-[360px] rounded-full bg-[#FBAA00]/[0.08] blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -left-28 h-[340px] w-[340px] rounded-full bg-[#579515]/[0.07] blur-3xl" />

      {/* ===================================================== */}
      {/* NEWSLETTER */}
      {/* ===================================================== */}

      <div className="relative overflow-hidden border-b border-[#FBAA00]/45 bg-[#FBAA00]/35 text-[#174D2A]">
        <div className="container-x grid items-center gap-5 py-6 lg:grid-cols-2 lg:py-7">
          {/* LEFT CONTENT */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-[#579515]" />

              <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#174D2A]">
                Stay in touch
              </span>
            </div>

            <h3 className="display mt-2 max-w-xl text-xl font-semibold leading-[1.15] text-[#174D2A] md:text-2xl">
              Wholesale rates, new collections,
              <span className="text-[#579515]"> festival drops.</span>
            </h3>

            <p className="mt-2 max-w-lg text-xs leading-5 text-[#174D2A]/75">
              Join our list to be the first to know about new arrivals,
              seasonal collections and exclusive bulk-order opportunities.
            </p>
          </div>

          {/* FORM */}
          <form className="relative rounded-xl border border-white/70 bg-white p-1.5 shadow-[0_12px_28px_-18px_rgba(23,77,42,0.4)] sm:flex sm:items-center">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full flex-1 bg-transparent px-3 py-2 text-xs text-[#174D2A] outline-none placeholder:text-[#174D2A]/55 sm:px-4"
            />

            <button
              type="submit"
              className="mt-1.5 inline-flex w-full items-center justify-center rounded-lg bg-[#579515] px-5 py-2.5 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(87,149,21,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#174D2A] sm:mt-0 sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ===================================================== */}
      {/* MAIN FOOTER */}
      {/* ===================================================== */}

      <div className="relative bg-[#F5F5F5]">
        <div className="container-x grid gap-7 py-8 md:grid-cols-2 lg:grid-cols-12 lg:py-10">
          {/* ================================================= */}
          {/* BRAND */}
          {/* ================================================= */}

          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              {siteConfig.logo ? (
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-[#ECECEC] bg-white p-1 shadow-[0_8px_20px_rgba(51,59,55,0.06)]">
                  <img
                    src={siteConfig.logo}
                    alt={siteConfig.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#579515] font-display text-xl font-bold uppercase text-[#FBAA00]">
                  {siteConfig?.name?.charAt(0) || "T"}
                </div>
              )}

              <div>
                <div className="display text-xl font-semibold text-[#579515]">
                  {siteConfig.name}
                </div>

                <div className="mt-1 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#FBAA00]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E89D00]" />

                  {siteConfig.address.city} · {siteConfig.address.state}
                </div>
              </div>
            </div>

            <p className="mt-4 max-w-sm text-[13px] leading-5 text-[#666666]">
              {siteConfig.description}
            </p>

            {/* SOCIAL */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
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
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-[#ECECEC] bg-[#F5F5F5] text-[#579515] transition-all duration-300 hover:-translate-y-1 hover:border-[#E89D00] hover:bg-[#E89D00] hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* ================================================= */}
          {/* SHOP */}
          {/* ================================================= */}

          <div className="lg:col-span-3">
            <FooterHeading title="Shop" />

            <ul className="space-y-2">
              {shopCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="group inline-flex items-center gap-2 text-[13px] text-[#666666] transition duration-300 hover:translate-x-1 hover:text-[#FBAA00]"
                  >
                    <span className="h-px w-0 bg-[#E89D00] transition-all duration-300 group-hover:w-4" />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================================================= */}
          {/* COMPANY */}
          {/* ================================================= */}

          <div className="lg:col-span-2">
            <FooterHeading title="Company" />

            <ul className="space-y-2">
              {[
                ["About", "/about"],
                ["Sustainability", "/sustainability"],
                ["Certifications", "/certifications"],
                ["Categories", "/categories"],
                ["Blog", "/blog"],
                ["Reviews", "/testimonials"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-[13px] text-[#666666] transition duration-300 hover:translate-x-1 hover:text-[#FBAA00]"
                  >
                    <span className="h-px w-0 bg-[#E89D00] transition-all duration-300 group-hover:w-4" />

                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================================================= */}
          {/* CONTACT */}
          {/* ================================================= */}

          <div className="lg:col-span-3">
            <FooterHeading title="Reach us" />

            <ul className="space-y-2.5">
              {/* ADDRESS */}
              <li className="group flex items-start gap-2.5">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#F5F5F5] text-[#FBAA00] transition group-hover:bg-[#E89D00] group-hover:text-white">
                  <FaMapMarkerAlt className="h-3.5 w-3.5" />
                </div>

                <span className="text-[13px] leading-5 text-[#666666]">
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state} -{" "}
                  {siteConfig.address.pincode}
                </span>
              </li>

              {/* PHONE */}
              <li className="group flex items-center gap-2.5">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#F5F5F5] text-[#579515] transition group-hover:bg-[#579515] group-hover:text-white">
                  <FaPhoneAlt className="h-3.5 w-3.5" />
                </div>

                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  className="text-[13px] text-[#666666] transition hover:text-[#FBAA00]"
                >
                  {siteConfig.phone}
                </a>
              </li>

              {/* EMAIL */}
              <li className="group flex items-center gap-2.5">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#F5F5F5] text-[#FBAA00] transition group-hover:bg-[#E89D00] group-hover:text-white">
                  <FaEnvelope className="h-3.5 w-3.5" />
                </div>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all text-[13px] text-[#666666] transition hover:text-[#FBAA00]"
                >
                  {siteConfig.email}
                </a>
              </li>

              {/* HOURS */}
              <li className="group flex items-center gap-2.5">
                <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#F5F5F5] text-[#579515] transition group-hover:bg-[#579515] group-hover:text-white">
                  <FaClock className="h-3.5 w-3.5" />
                </div>

                <span className="text-[13px] text-[#666666]">
                  {siteConfig.workingHours}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/* BUSINESS INFORMATION */}
      {/* ===================================================== */}

      <div className="relative border-y border-[#ECECEC] bg-[#F5F5F5]">
        <div className="container-x grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Legal Status", siteConfig.legalStatus],
            ["CEO", siteConfig.ceo],
            ["GST Since", siteConfig.gstSince],
            ["Business", siteConfig.natureOfBusiness],
          ].map(([key, value], index) => (
            <div
              key={key}
              className={`relative py-3 sm:px-5 ${
                index !== 0 ? "lg:border-l lg:border-[#ECECEC]" : ""
              }`}
            >
              <span className="absolute left-0 top-1/2 hidden h-7 w-[2px] -translate-y-1/2 bg-[#E89D00] lg:block" />

              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#FBAA00]">
                {key}
              </div>

              <div className="mt-1 text-[13px] font-semibold text-[#579515]">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================================================== */}
      {/* BOTTOM PREMIUM BAR */}
      {/* ===================================================== */}

      <div className="relative overflow-hidden bg-[#579515]">
        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-[#FBAA00]/10 blur-3xl" />

        <div className="container-x relative flex flex-col items-center justify-between gap-2 py-3 text-center text-[11px] text-white/60 sm:flex-row sm:text-left">
          <span>
            © 2026{" "}
            <span className="font-medium text-[#FBAA00]">
              {siteConfig.name}
            </span>
            . All rights reserved.
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FBAA00]" />

            <span>
              Designed & manufactured with care in Karur, Tamil Nadu.
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ========================================================= */
/* FOOTER HEADING */
/* ========================================================= */

function FooterHeading({ title }: { title: string }) {
  return (
    <div className="mb-3.5">
      <div className="flex items-center gap-2.5">
        <span className="h-2 w-2 rounded-full bg-[#E89D00]" />

        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#579515]">
          {title}
        </span>
      </div>

      <div className="mt-2 h-px w-7 bg-[#FBAA00]" />
    </div>
  );
}
