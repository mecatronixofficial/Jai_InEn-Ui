import Link from "next/link";
import moment from "moment";
import { FaArrowRight, FaWhatsapp, FaIndustry, FaLeaf, FaHandshake, FaShippingFast, FaTshirt, FaWeight, FaGlobeAsia, FaRecycle, FaCheckCircle } from "react-icons/fa";

import HeroSlider from "@/components/HeroSlider";
import SectionTitle from "@/components/SectionTitle";
import CategoryCarousel from "@/components/CategoryCarousel";
import ProductCard from "@/components/ProductCard";
import StatsCounter from "@/components/StatsCounter";
import TestimonialSlider from "@/components/TestimonialSlider";
import FAQAccordion from "@/components/FAQAccordion";
import OfferBanner from "@/components/OfferBanner";

import {
  loadCategories,
  loadProducts,
  loadBlogs,
  loadTestimonials,
  loadOffers,
} from "@/lib/data";
import { faqs } from "@/data/content";
import { siteConfig, stats, whyChooseUs, manufacturingProcess, latestUpdates } from "@/data/site";

const iconMap = {
  FaIndustry,
  FaTshirt,
  FaWeight,
  FaHandshake,
  FaShippingFast,
  FaLeaf,
};

const evolutionHighlights = [
  {
    marker: "1996",
    title: "Founded in Karur",
    description: "Established as a specialist home textile manufacturer and exporter.",
  },
  {
    marker: "02",
    title: "Integrated production",
    description: "Expanded from traditional textile manufacturing into a fully integrated production facility.",
  },
  {
    marker: "03",
    title: "European market growth",
    description: "Built a strong reputation and enduring presence across European export markets.",
  },
  {
    marker: "04",
    title: "Portfolio diversification",
    description: "Developed a comprehensive range of home furnishing and lifestyle textile products.",
  },
  {
    marker: "05",
    title: "Modernisation",
    description: "Invested in manufacturing technology, quality assurance and sustainability initiatives.",
  },
  {
    marker: "2026",
    title: "Thirty years of operations",
    description: "Celebrating three decades while continuing to strengthen the company’s global presence.",
  },
];

const corePortfolio = [
  {
    title: "Table Linen",
    products: "Tablecloths, runners, placemats and napkins",
  },
  {
    title: "Bedding & Living",
    products: "Premium quilts, bedspreads and cushion covers",
  },
  {
    title: "Kitchen & Drapery",
    products: "High-absorbency kitchen towels, aprons and curtains",
  },
];

const productionAdvantages = [
  {
    Icon: FaIndustry,
    number: "01",
    title: "Fabric Processing & Finishing",
    description:
      "Equipped with modern sewing machinery, advanced processing facilities and specialized quality-control checks at every stage of production.",
  },
  {
    Icon: FaTshirt,
    number: "02",
    title: "Precision Cutting & Stitching",
    description:
      "A high-capacity stitching floor with modern heavy-duty sewing machines, automated cutting tables and specialized folding equipment.",
  },
  {
    Icon: FaCheckCircle,
    number: "03",
    title: "Stringent Quality Control (QC)",
    description:
      "A multi-tiered inspection protocol is applied at every stage—from raw fabric inspection to dispatch—minimizing defects and ensuring absolute batch consistency.",
  },
  {
    Icon: FaShippingFast,
    number: "04",
    title: "Final Inspection & Safe Packing",
    description:
      "Finished products are checked for appearance, dimensions, stitching and buyer specifications before secure packing, accurate labelling and dispatch.",
  },
];

const businessTerms = [
  {
    term: "L/C at sight",
    description: "Payment guaranteed by the buyer's bank upon document verification.",
  },
  {
    term: "CAD at sight",
    description: "Payment made upon receipt of documents.",
  },
  {
    term: "T/T against documents",
    description: "Payment via electronic transfer upon document receipt.",
  },
];

const testingStandards = [
  { name: "AZO Free", detail: "No harmful azo dyes." },
  { name: "REACH", detail: "Compliant with EU chemical safety regulations." },
  { name: "OEKO-TEX", detail: "Certified free from harmful substances." },
];

export default async function HomePage() {
  const [categories, products, blogPosts, testimonials, offers] = await Promise.all([
    loadCategories(),
    loadProducts(),
    loadBlogs(),
    loadTestimonials(),
    loadOffers(),
  ]);

  const featured = products.filter((p) => p.featured).slice(0, 8);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <main className="home-page">
      {/* HERO */}
      <HeroSlider />

      {/* INTRO / STATS */}
   <section className="section-y relative overflow-hidden bg-gradient-to-b from-[#F5F5F5] to-white">
  {/* Decorative background blobs */}
  <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#FBAA00]/10 blur-3xl" />
  <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

  <div className="container-x relative">
    <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch">
      <div className="relative overflow-hidden rounded-[2rem] border border-gray-200/90 bg-white p-7 shadow-[0_24px_70px_rgba(17,24,39,0.09)] sm:p-10 lg:col-span-6 lg:h-full lg:p-12">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#FBAA00] to-transparent" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gray-100/80 blur-2xl" />
        <div className="relative mb-6 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-[10px] font-bold uppercase tracking-widest-x text-[#E89D00]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FBAA00]" />
          <span>Welcome to our company</span>
        </div>
        <h2 className="display relative text-3xl font-semibold leading-[1.1] text-gray-950 md:text-4xl">
          Crafting Home Textiles for{" "}
          <span className="italic text-[#E89D00]">Modern Living</span>
        </h2>
        <p className="relative mt-6 leading-relaxed text-gray-600">
          At {siteConfig.name}, we transform ideas into beautifully crafted home
          textile collections that inspire modern lifestyles. Based in Karur,
          Tamil Nadu, India—one of the world&apos;s leading home textile manufacturing
          hubs—we are a trusted manufacturer and export partner for global
          retailers, brands, wholesalers and importers.
        </p>

        <p className="relative mt-4 leading-relaxed text-gray-500">
          Combining craftsmanship with innovation, we develop high-quality home
          textiles that balance contemporary design, functionality, comfort and
          sustainability. Every collection is thoughtfully created to meet evolving
          international market trends and consumer preferences.
        </p>
        <div className="relative mt-8 flex flex-wrap gap-3 border-t border-gray-100 pt-7">
          <Link href="/about" className="inline-flex items-center justify-center rounded-full bg-[#FBAA00] px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_22px_rgba(251,170,0,0.22)] transition hover:bg-[#E89D00]">
            About Our Company
          </Link>
          <Link href="/products" className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-gray-50 px-7 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-100">
            Explore Collections
          </Link>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[2rem] border border-gray-200/90 bg-white p-7 shadow-[0_24px_70px_rgba(17,24,39,0.09)] sm:p-10 lg:col-span-6 lg:h-full lg:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#FBAA00]/10 blur-3xl" />

        <div className="relative mb-7">
          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest-x text-[#E89D00]">
            <span className="h-px w-9 bg-[#FBAA00]" />
            What drives us
          </div>
          <h2 className="display mt-3 text-3xl font-semibold text-gray-950 sm:text-4xl">
            Key Organizational Pillars
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
            The principles behind every collection, partnership and delivery.
          </p>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2">
          {whyChooseUs.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];

            // Rotating accent palette — tweak colors to match your brand
            const palette = [
              {
                text: "text-[#FBAA00]",
                bg: "bg-[#FBAA00]",
                soft: "bg-[#FBAA00]/10",
                border: "border-[#FBAA00]/30",
                hoverText: "group-hover:text-[#FBAA00]",
                hoverBg: "group-hover:bg-[#FBAA00]",
              },
              {
                text: "text-emerald-600",
                bg: "bg-emerald-600",
                soft: "bg-emerald-50",
                border: "border-emerald-200",
                hoverText: "group-hover:text-emerald-600",
                hoverBg: "group-hover:bg-emerald-600",
              },
              {
                text: "text-rose-600",
                bg: "bg-rose-600",
                soft: "bg-rose-50",
                border: "border-rose-200",
                hoverText: "group-hover:text-rose-600",
                hoverBg: "group-hover:bg-rose-600",
              },
              {
                text: "text-sky-600",
                bg: "bg-sky-600",
                soft: "bg-sky-50",
                border: "border-sky-200",
                hoverText: "group-hover:text-sky-600",
                hoverBg: "group-hover:bg-sky-600",
              },
            ];
            const c = palette[index % palette.length];

            return (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-gray-50/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FBAA00]/35 hover:bg-white hover:shadow-[0_14px_35px_rgba(17,24,39,0.08)]"
              >
                {/* Number */}
                <span className={`display absolute right-4 top-3 text-2xl font-semibold text-gray-200 transition-colors duration-300 ${c.hoverText}`}>
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className={`grid h-11 w-11 place-items-center rounded-xl border ${c.border} ${c.soft} ${c.text} transition-all duration-300 ${c.hoverBg} group-hover:scale-105 group-hover:text-white`}>
                  {Icon && <Icon className="h-4 w-4" />}
                </div>

                {/* Text */}
                <div className="mt-5 min-w-0">
                  <h3 className="display text-base font-semibold text-gray-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-ink-muted">
                    {item.description}
                  </p>
                </div>

                {/* Bottom accent bar on hover */}
                <span className={`absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 ${c.bg} transition-transform duration-300 group-hover:scale-x-100`} />
              </article>
            );
          })}
        </div>
      </div>
    </div>

    <div className="mt-8">
      <StatsCounter items={stats} compact />
    </div>
  </div>
</section>

      {/* HISTORY & EVOLUTION */}
      <section className="section-y relative overflow-hidden bg-[#F5F5F5] text-[#222222]">
  {/* Background Decorations */}
  <div className="pointer-events-none absolute inset-0 bg-weave-light opacity-[0.08]" />

  <div className="pointer-events-none absolute -left-40 top-16 h-[420px] w-[420px] rounded-full border-[80px] border-[#FBAA00]/[0.05]" />

  <div className="pointer-events-none absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-[#579515]/10 blur-3xl" />

  <div className="container-x relative">
    {/* SECTION HEADING */}
    <SectionTitle
      compact
      eyebrow="History & Evolutionary Milestone"
      title="Three decades of textile excellence"
      description="Established in 1996 in Karur, Tamil Nadu, Jai Export Enterprises has grown into a trusted manufacturer and exporter known for craftsmanship, reliability and superior product standards."
      align="center"
    />

    <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
      {/* ===================================================== */}
      {/* LEFT SIDE */}
      {/* ===================================================== */}

      <div className="space-y-5 lg:col-span-5 lg:flex lg:h-full lg:flex-col lg:space-y-0">
        {/* MAIN HERITAGE CARD */}
        <article className="group relative overflow-hidden rounded-lg border border-[#143B32]/25 bg-white p-4 shadow-[0_10px_24px_rgba(20,59,50,0.10)] transition duration-300 hover:border-[#FBAA00]/45">
          {/* Gold Corner Detail */}
          <div className="absolute left-0 top-0 h-24 w-[4px] bg-[#FBAA00]" />

          <div className="absolute left-0 top-0 h-[4px] w-24 bg-[#FBAA00]" />

          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FBAA00]/10 blur-3xl" />

          {/* Large faded number */}
          <span className="display pointer-events-none absolute -right-3 bottom-[-30px] text-[9rem] font-bold leading-none text-[#FBAA00]/[0.06]">
            96
          </span>

          {/* Label */}
          <div className="relative flex items-center gap-3">
            <span className="h-px w-8 bg-[#FBAA00]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FBAA00]">
              Leadership & Heritage
            </span>
          </div>

          {/* Heading */}
          <h3 className="display relative mt-4 max-w-md text-base font-semibold leading-tight text-[#222222]">
            Traditional expertise,
            <span className="block text-[#FBAA00]">
              guided by modern standards
            </span>
          </h3>

          {/* Divider */}
          <div className="relative my-6 h-px w-full bg-[#ECECEC]">
            <div className="h-px w-20 bg-[#FBAA00]" />
          </div>

          {/* Description */}
          <p className="relative max-w-lg text-xs leading-5 text-[#666666]">
            Established under strategic vision and leadership, the company has
            grown consistently by combining traditional textile knowledge with
            modern manufacturing standards. This foundation continues to drive
            our global export footprint and commitment to excellence.
          </p>

          {/* Bottom Tag */}
          <div className="relative mt-8 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#737373]">
              Since
            </span>

            <span className="display text-lg font-semibold text-[#FBAA00]">
              1996
            </span>
          </div>
        </article>

        {/* SMALL CARDS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:mt-5 lg:flex-1">
          {/* INTERNATIONAL FOOTPRINT */}
          <article className="group relative overflow-hidden rounded-lg border border-[#143B32]/25 bg-white p-4 shadow-[0_10px_24px_rgba(20,59,50,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FBAA00]/50 lg:h-full">
            {/* Top Number */}
            <span className="absolute right-5 top-5 text-[10px] font-bold tracking-[0.2em] text-[#FBAA00]/40">
              01
            </span>

            {/* Icon */}
            <div className="relative flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-[#FBAA00]/30 bg-[#FBAA00]/10 text-[#FBAA00] transition duration-300 group-hover:bg-[#FBAA00] group-hover:text-white">
                <FaGlobeAsia className="h-4 w-4" />
              </div>
            </div>

            {/* Gold mini divider */}
            <div className="mt-6 h-[2px] w-8 bg-[#FBAA00] transition-all duration-300 group-hover:w-14" />

            <h3 className="display mt-4 text-base font-semibold text-[#222222]">
              International Footprint
            </h3>

            <p className="mt-3 text-xs leading-6 text-[#666666]">
              Collections showcased at Messe Frankfurt, Germany, and the IHGF
              Delhi Fair.
            </p>
          </article>

          {/* SUSTAINABILITY */}
          <article className="group relative overflow-hidden rounded-lg border border-[#143B32]/25 bg-white p-4 shadow-[0_10px_24px_rgba(20,59,50,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#579515]/45 lg:h-full">
            {/* Decorative Circle */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full border-[28px] border-[#579515]/[0.06]" />

            <span className="absolute right-5 top-5 text-[10px] font-bold tracking-[0.2em] text-[#579515]/35">
              02
            </span>

            {/* Icon */}
            <div className="grid h-12 w-12 place-items-center rounded-full bg-[#579515] text-[#FBAA00] shadow-[0_8px_18px_rgba(87,149,21,0.20)] transition duration-300 group-hover:-rotate-6 group-hover:scale-105">
              <FaRecycle className="h-4 w-4" />
            </div>

            <div className="mt-6 h-[2px] w-8 bg-[#579515] transition-all duration-300 group-hover:w-14" />

            <h3 className="display mt-4 text-base font-semibold text-[#579515]">
              Sustainable Innovation
            </h3>

            <p className="mt-3 text-xs leading-6 text-[#579515]/70">
              Reduce, Reuse and Recycle principles are integrated across major
              production lines.
            </p>
          </article>
        </div>
      </div>

      {/* ===================================================== */}
      {/* RIGHT EVOLUTION TIMELINE / CARDS */}
      {/* ===================================================== */}

      <div className="lg:col-span-7">
        <div className="grid gap-5 sm:grid-cols-2">
          {evolutionHighlights.map(
            ({ marker, title, description }, index) => {
              const isGold = index === 1 || index === 4;

              return (
                <article
                  key={title}
                  className={`group relative overflow-hidden rounded-lg border p-4 transition-all duration-300 hover:-translate-y-1 ${
                    isGold
                      ? "border-[#FBAA00]/25 bg-[#F5F5F5] shadow-soft hover:border-[#FBAA00]/55 hover:bg-white"
                      : "border-[#ECECEC] bg-white shadow-soft hover:border-[#FBAA00]/45 hover:shadow-lg"
                  }`}
                >
                  {/* Number */}
                  <span
                    className={`display absolute -right-2 -top-3 text-[5rem] font-semibold leading-none ${
                      isGold
                        ? "text-[#FBAA00]/[0.09]"
                        : "text-[#579515]/[0.06]"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Marker Row */}
                  <div className="relative flex items-center justify-between">
                    <span
                      className={`display text-2xl font-semibold ${
                        isGold ? "text-[#FBAA00]" : "text-[#579515]"
                      }`}
                    >
                      {marker}
                    </span>

                    <div
                      className={`grid h-8 w-8 place-items-center rounded-full border ${
                        isGold
                          ? "border-[#579515]/15 bg-[#579515]/10 text-[#579515]"
                          : "border-[#FBAA00]/20 bg-[#FBAA00]/10 text-[#FBAA00]"
                      }`}
                    >
                      <FaCheckCircle className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Divider */}
                  <div
                    className={`mt-5 h-px ${
                      isGold ? "bg-[#579515]/15" : "bg-[#ECECEC]"
                    }`}
                  >
                    <div
                      className={`h-px w-10 transition-all duration-300 group-hover:w-20 ${
                        isGold ? "bg-[#579515]" : "bg-[#FBAA00]"
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <h3
                    className={`display relative mt-4 text-base font-semibold ${
                      isGold ? "text-[#222222]" : "text-[#222222]"
                    }`}
                  >
                    {title}
                  </h3>

                  <p
                    className={`relative mt-3 text-xs leading-6 ${
                      isGold ? "text-[#666666]" : "text-[#666666]"
                    }`}
                  >
                    {description}
                  </p>
                </article>
              );
            },
          )}
        </div>
      </div>
    </div>

    {/* ===================================================== */}
    {/* CORE PRODUCT PORTFOLIO */}
    {/* ===================================================== */}

    <div className="mt-14 border-t border-[#ECECEC] pt-10">
      {/* Section Mini Heading */}
      <div className="mb-4 flex items-center gap-4">
        <span className="h-px w-10 bg-[#FBAA00]" />

        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FBAA00]">
          Core Product Portfolio
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {corePortfolio.map(({ title, products }, index) => (
          <article
            key={title}
            className="group relative overflow-hidden rounded-lg border border-[#143B32]/25 bg-white p-4 shadow-[0_10px_24px_rgba(20,59,50,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FBAA00]/50"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between">
              {/* Number */}
              <span className="display text-4xl font-semibold text-[#579515]/10 transition duration-300 group-hover:text-[#FBAA00]/25">
                0{index + 1}
              </span>

              {/* Small dot */}
              <span className="h-2 w-2 rounded-full bg-[#FBAA00]" />
            </div>

            {/* Divider */}
            <div className="mt-4 h-px bg-[#ECECEC]">
              <div className="h-px w-8 bg-[#FBAA00] transition-all duration-300 group-hover:w-16" />
            </div>

            {/* Content */}
            <div className="mt-6">
              <h3 className="display text-base font-semibold text-[#222222]">
                {title}
              </h3>

              <p className="mt-3 text-xs leading-6 text-[#666666]">
                {products}
              </p>
            </div>

            {/* Hover corner */}
            <div className="absolute bottom-0 right-0 h-0 w-0 border-b-[42px] border-r-[42px] border-b-[#FBAA00]/0 border-r-[#FBAA00]/0 transition-all duration-300 group-hover:border-b-[#FBAA00]/10 group-hover:border-r-[#FBAA00]/10" />
          </article>
        ))}
      </div>
    </div>
  </div>
</section>

  {/* WHY CHOOSE US */}
  <section className="section-y relative overflow-hidden bg-gray-50">
    <div className="absolute inset-0 bg-weave-light opacity-50" />
    <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[72px] border-gray-300/20" />
    <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-emerald-500/[0.06] blur-3xl" />

    <div className="container-x relative">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5 [&_h2]:!text-gray-950 [&_span]:!text-gray-500">
          <SectionTitle
            compact
            eyebrow="Production confidence"
            title="Why Choose Us?"
            description="Integrated processing, precision manufacturing and layered quality control give every buyer programme a dependable path from fabric to dispatch."
          />
        </div>

        <div className="lg:col-span-7 lg:pb-12">
          <p className="max-w-2xl border-l-2 border-[#FBAA00] pl-5 text-sm leading-relaxed text-gray-500">
            Our manufacturing systems combine skilled teams with modern
            equipment, clear commercial terms and internationally recognized
            product-safety requirements.
          </p>
        </div>
      </div>

      <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
        {productionAdvantages.map(
          ({ Icon, number, title, description }, i) => {
            const isGreen = i === 1;

            return (
              <article
                key={title}
                className={`group relative overflow-hidden rounded-lg border p-4 shadow-[0_10px_24px_rgba(20,59,50,0.10)] transition-all duration-500 hover:-translate-y-1 ${
                  isGreen
                    ? "border-emerald-200/70 bg-gradient-to-br from-white to-emerald-50/60 hover:border-emerald-400/50 hover:shadow-[0_22px_50px_rgba(87,149,21,0.16)]"
                    : "border-gray-200/70 bg-gradient-to-br from-white to-[#F5F5F5] hover:border-[#FBAA00]/40 hover:shadow-[0_22px_50px_rgba(251,170,0,0.16)]"
                }`}
              >
                <span className="display absolute right-4 top-1 text-7xl font-bold text-gray-950/[0.04]">
                  {number}
                </span>

                <div
                  className={`relative grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_8px_18px_rgba(17,24,39,0.2)] transition duration-500 group-hover:-rotate-6 group-hover:scale-105 ${
                    isGreen
                      ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                      : "bg-gradient-to-br from-[#FBAA00] to-[#E89D00]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div
                  className={`relative mt-7 text-[9px] font-bold uppercase tracking-widest-x ${
                    isGreen ? "text-emerald-600" : "text-[#E89D00]"
                  }`}
                >
                  Manufacturing advantage
                </div>

                <h3 className="display relative mt-2 text-base font-semibold leading-tight text-gray-950">
                  {title}
                </h3>

                <p className="relative mt-3 text-xs leading-5 text-gray-500">
                  {description}
                </p>

                <span
                  className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                    isGreen ? "bg-emerald-500" : "bg-[#FBAA00]"
                  }`}
                />
              </article>
            );
          },
        )}
      </div>

      {/* BUSINESS TERMS + TESTING */}
      <div className="mt-7 overflow-hidden rounded-[1.75rem] border border-[#ECECEC] bg-[#F5F5F5] text-[#222222] shadow-soft">
        <div className="grid lg:grid-cols-12">
          {/* BUSINESS TERMS */}
          <div className="relative border-b border-[#ECECEC] p-7 sm:p-9 lg:col-span-7 lg:border-b-0 lg:border-r">
            <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-[#FBAA00]/[0.08] blur-3xl" />

            <div className="relative flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest-x text-gold-light">
              <FaHandshake className="h-4 w-4" />
              Terms of Business
            </div>

            <div className="relative mt-7 grid gap-6 sm:grid-cols-3">
              {businessTerms.map(({ term, description }, index) => (
                <div key={term} className="relative">
                  <span className="display grid h-8 w-8 place-items-center rounded-full border border-[#FBAA00]/40 text-sm font-semibold text-gold-light">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="display mt-3 text-base font-semibold text-[#222222]">
                    {term}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#666666]">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TESTING STANDARDS */}
          <div className="relative overflow-hidden p-7 sm:p-9 lg:col-span-5">
            <div className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-emerald-500/20 blur-2xl" />

            <div className="relative flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest-x text-emerald-300">
              <FaLeaf className="h-4 w-4" />
              Product Testing Standards
            </div>

            <div className="relative mt-6 space-y-3">
              {testingStandards.map(({ name, detail }) => (
                <div
                  key={name}
                  className="flex items-center gap-4 rounded-xl border border-[#ECECEC] bg-white px-4 py-3 transition hover:border-[#579515]/35 hover:shadow-soft"
                >
                  <FaCheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-400" />

                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider-x text-[#222222]">
                      {name}
                    </div>

                    <div className="mt-0.5 text-[11px] text-[#666666]">
                      {detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  {/* CATEGORIES */}
  <section className="section-y bg-white">
    <div className="container-x">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionTitle
          compact
          eyebrow="Our Range"
          title="Shop by Category"
          description="Seven core categories. Hundreds of variations. All woven and finished under one roof."
        />

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider-x text-gray-700 transition hover:text-[#E89D00]"
        >
          View All
          <FaArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <CategoryCarousel categories={categories} />
    </div>
  </section>


  {/* OFFER BANNER */}
  <section className="section-y bg-white">
    <div className="container-x">
      {offers[0] && <OfferBanner offer={offers[0]} />}
    </div>
  </section>

  {/* NEW ARRIVALS */}
  <section className="section-y bg-white">
    <div className="container-x">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionTitle
          compact
          eyebrow="Just In"
          title="New Arrivals"
          description="The latest pieces from our looms."
        />

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider-x text-gray-700 transition hover:text-[#E89D00]"
        >
          See All
          <FaArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-7 lg:grid-cols-4">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} compact showPrice={false} />
        ))}
      </div>
    </div>
  </section>

  {/* MANUFACTURING PROCESS */}
  <section className="section-y bg-[#F5F5F5]">
    <div className="container-x">
      <SectionTitle
        compact
        eyebrow="From yarn to your hands"
        title="The making of our cloth"
        description="Five steps. Years of refinement. Every roll passes through this process."
        align="center"
      />

      <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-6">
        {manufacturingProcess.map((process, index) => {
          const isGreen = index === manufacturingProcess.length - 1;

          return (
            <div
              key={`${process.step}-${process.title}`}
              className={`relative lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""}`}
            >
              <div
                className={`h-full rounded-lg border p-4 shadow-[0_8px_24px_rgba(17,24,39,0.04)] transition duration-300 hover:-translate-y-1 ${
                  isGreen
                    ? "border-emerald-200/70 bg-white hover:border-emerald-400/50 hover:shadow-[0_16px_36px_rgba(87,149,21,0.12)]"
                    : "border-gray-200/70 bg-white hover:border-[#FBAA00]/40 hover:shadow-[0_16px_36px_rgba(251,170,0,0.12)]"
                }`}
              >
                <div
                  className={`display text-4xl font-semibold leading-none ${
                    isGreen
                      ? "text-emerald-600/70"
                      : "text-[#FBAA00]/70"
                  }`}
                >
                  {process.step}
                </div>

                <h3 className="display mt-3 text-base font-semibold text-gray-900">
                  {process.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-600">
                  {process.description}
                </p>
              </div>

              {index < manufacturingProcess.length - 1 && (
                <div className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 place-items-center rounded-full bg-[#FBAA00] text-white shadow-[0_4px_10px_rgba(251,170,0,0.4)] lg:grid">
                  <FaArrowRight className="h-2.5 w-2.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>

  

  {/* BLOG PREVIEW + LATEST UPDATES */}
  <section className="section-y relative overflow-hidden bg-cream">
    <div className="pointer-events-none absolute inset-0 bg-weave-light opacity-60" />
    <div className="container-x">
      <div className="relative mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionTitle
          compact
          eyebrow="From the Journal"
          title="Notes from our looms"
          description="Guides, industry insights and product care advice — written by us, in plain language."
        />

        <Link
          href="/blog"
          className="group inline-flex w-fit items-center gap-3 rounded-full border border-[#FBAA00]/30 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wider-x text-gray-800 shadow-soft transition duration-300 hover:border-[#FBAA00]/60 hover:bg-[#FBAA00] hover:text-white"
        >
          All Articles
          <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="relative grid gap-5 lg:grid-cols-12">
        {/* BLOG POSTS */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {blogPosts.slice(0, 2).map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#143B32]/25 bg-white p-2 shadow-[0_10px_24px_rgba(20,59,50,0.10)] transition-all duration-500 hover:-translate-y-1 hover:border-[#FBAA00]/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/35 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />

                <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-[#579515]/90 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-widest-x text-[#FBAA00] shadow-lg backdrop-blur-sm">
                  {blog.category}
                </div>
              </div>

              <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3">
                <div className="flex items-center gap-2 text-[7px] font-semibold uppercase tracking-wider-x text-[#FBAA00]">
                  {moment(blog.publishedAt).format("MMM D, YYYY")} ·{" "}
                  {blog.readTime} min read
                </div>

                <h3 className="display mt-1 text-base font-semibold leading-tight text-gray-950 transition duration-300 group-hover:text-[#FBAA00]">
                  {blog.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                  {blog.excerpt}
                </p>

                <div className="mt-auto flex items-center gap-2 pt-3 text-[8px] font-bold uppercase tracking-wider-x text-[#579515]">
                  Read article
                  <FaArrowRight className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* LATEST UPDATES */}
        <aside className="lg:col-span-4">
          <div className="relative h-full overflow-hidden rounded-lg border border-[#FBAA00]/20 bg-[#579515] p-4 text-white shadow-[0_12px_30px_rgba(87,149,21,0.18)]">
            <div className="pointer-events-none absolute inset-0 bg-weave-dark opacity-30" />
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FBAA00]/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-emerald-300/10 blur-3xl" />

            <div className="relative flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest-x text-[#FBAA00]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FBAA00] shadow-[0_0_0_5px_rgba(251,170,0,0.12)]" />
              Latest Updates
            </div>

            <div className="relative mt-4 space-y-2">
              {latestUpdates.map((update) => (
                <div
                  key={update.id}
                  className="rounded-md border border-white/10 bg-white/[0.05] p-3 transition duration-300 hover:border-[#FBAA00]/30 hover:bg-white/[0.09]"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[9px] font-semibold uppercase tracking-wider-x text-emerald-200/80">
                    <span>{update.tag}</span>
                    <span>•</span>
                    <span>{moment(update.date).fromNow()}</span>
                  </div>

                  <h4 className="display mt-2 text-sm font-semibold leading-snug text-white">
                    {update.title}
                  </h4>

                  <p className="mt-1.5 text-[11px] leading-4 text-emerald-50/65">
                    {update.excerpt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="section-y bg-white">
    <div className="container-x">
      <div className="relative overflow-hidden rounded-xl bg-[#579515] p-4 text-white sm:p-5 md:p-6">
        <div className="pointer-events-none absolute inset-0 bg-weave-dark opacity-25" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FBAA00]/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-emerald-300/[0.14] blur-3xl" />

        <div className="relative grid items-center gap-4 md:grid-cols-2 md:gap-6">
          {/* CTA CONTENT */}
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FBAA00]/30 bg-[#FBAA00]/10 px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest-x text-gold-light">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FBAA00]" />
              Get in touch
            </div>

            <h2 className="display text-xl font-semibold leading-tight text-white md:text-2xl">
              Ready to place an order or request a quote?
            </h2>

            <p className="mt-3 max-w-xl text-xs leading-5 text-emerald-50/80">
              Talk to us directly on WhatsApp for fast quotes, share your
              requirement, or visit our facility in Erode.
            </p>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col gap-4 sm:flex-row md:flex-col md:items-end">
            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-white shadow-[0_10px_28px_rgba(87,149,21,0.3)] transition hover:bg-emerald-600 sm:w-auto"
            >
              <FaWhatsapp className="h-3 w-3" />
              Order on WhatsApp
            </a>

            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-50/40 bg-emerald-50/[0.05] px-5 py-2.5 text-xs font-semibold text-white transition hover:border-[#FBAA00]/80 hover:bg-[#FBAA00]/15 sm:w-auto"
            >
              Send Enquiry
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
);
}
