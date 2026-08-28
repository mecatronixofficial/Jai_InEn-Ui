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
import { siteConfig, stats, whyChooseUs, manufacturingProcess } from "@/data/site";

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
  const [categoryData, productData, blogData, testimonialData, offerData] = await Promise.all([
    loadCategories(),
    loadProducts(),
    loadBlogs(),
    loadTestimonials(),
    loadOffers(),
  ]);

  const categories = categoryData ?? [];
  const products = productData ?? [];
  const blogPosts = blogData ?? [];
  const testimonials = testimonialData ?? [];
  const offers = offerData ?? [];
  const newArrivals = products
    .filter((product) => product.newArrival)
    .slice(0, 4);

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
      <section className="section-y relative isolate overflow-hidden bg-[#F3EFE5] text-[#18352F]">
        <div className="pointer-events-none absolute inset-0 bg-weave-light opacity-60" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FBAA00]/70 to-transparent" />
        <div className="pointer-events-none absolute -left-28 top-32 h-72 w-72 rounded-full border-[46px] border-[#FBAA00]/[0.07]" />
        <div className="pointer-events-none absolute -right-24 bottom-20 h-80 w-80 rounded-full bg-[#579515]/10 blur-3xl" />

        <div className="container-x relative">
          <div className="mb-9 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#18352F]/10 bg-white/70 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#579515] shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FBAA00] shadow-[0_0_0_4px_rgba(251,170,0,0.13)]" />
                History &amp; Evolution
              </div>
              <h2 className="display mt-4 max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-[#18352F] sm:text-4xl lg:text-[3.25rem]">
                Three decades of textile excellence,
                <span className="block text-[#E89D00]">woven one milestone at a time.</span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-[#4D625D] lg:col-span-5 lg:justify-self-end">
              Established in 1996 in Karur, Tamil Nadu, Jai Export Enterprises has
              grown into a trusted manufacturer and exporter known for craftsmanship,
              reliability and superior product standards.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[1.75rem] border border-[#18352F]/10 bg-white/75 shadow-[0_30px_80px_-42px_rgba(20,59,50,0.55)] backdrop-blur-sm lg:grid-cols-12">
            <article className="group relative flex min-h-[520px] flex-col overflow-hidden bg-[#18352F] p-6 text-white sm:p-8 lg:col-span-5 lg:p-10">
              <div className="pointer-events-none absolute inset-0 bg-weave-dark opacity-35" />
              <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full border-[48px] border-[#FBAA00]/10 transition-transform duration-700 group-hover:scale-110" />
              <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-[#579515]/35 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-[#FBAA00]">
                  A legacy in motion
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Since 1996
                </span>
              </div>

              <div className="relative mt-14 flex items-end gap-4">
                <span className="display text-[7rem] font-semibold leading-[0.72] tracking-[-0.08em] text-[#FBAA00] sm:text-[8.5rem]">
                  30
                </span>
                <span className="mb-1 max-w-[90px] text-[10px] font-bold uppercase leading-4 tracking-[0.22em] text-white/65">
                  Years of expertise
                </span>
              </div>

              <div className="relative my-8 h-px bg-white/15">
                <span className="absolute left-0 top-0 h-px w-24 bg-[#FBAA00]" />
              </div>

              <h3 className="display relative max-w-md text-2xl font-semibold leading-tight text-white">
                Traditional expertise,
                <span className="block italic text-[#FBAA00]">guided by modern standards.</span>
              </h3>
              <p className="relative mt-4 max-w-lg text-xs leading-6 text-white/65">
                Our textile knowledge, responsible production and exacting quality
                standards continue to shape every collection we make.
              </p>

              <div className="relative mt-auto grid grid-cols-2 gap-3 pt-8">
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition hover:bg-white/[0.1]">
                  <FaGlobeAsia className="h-4 w-4 text-[#FBAA00]" />
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white">Global reach</div>
                  <p className="mt-1 text-[10px] leading-4 text-white/50">Germany &amp; IHGF Delhi</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm transition hover:bg-white/[0.1]">
                  <FaRecycle className="h-4 w-4 text-[#8CC63F]" />
                  <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-white">Responsible craft</div>
                  <p className="mt-1 text-[10px] leading-4 text-white/50">Reduce · Reuse · Recycle</p>
                </div>
              </div>
            </article>

            <div className="relative p-5 sm:p-7 lg:col-span-7 lg:p-8">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#E89D00]">Our journey</span>
                  <h3 className="display mt-1 text-xl font-semibold text-[#18352F] sm:text-2xl">Defining moments</h3>
                </div>
                <span className="hidden items-center gap-2 text-[8px] font-bold uppercase tracking-[0.18em] text-[#18352F]/40 sm:flex">
                  1996 <span className="h-px w-10 bg-[#FBAA00]" /> 2026
                </span>
              </div>

              <div className="relative grid gap-3 sm:grid-cols-2">
                <div className="pointer-events-none absolute bottom-4 left-4 top-4 hidden w-px bg-gradient-to-b from-[#FBAA00] via-[#579515]/35 to-transparent sm:block" />
                {evolutionHighlights.map(({ marker, title, description }, index) => (
                  <article
                    key={title}
                    className="group relative overflow-hidden rounded-2xl border border-[#18352F]/10 bg-[#FAF9F5] p-5 pl-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FBAA00]/50 hover:bg-white hover:shadow-[0_18px_35px_-24px_rgba(20,59,50,0.45)] sm:pl-8"
                  >
                    <span className="absolute inset-y-0 left-0 w-1 origin-bottom scale-y-0 bg-gradient-to-b from-[#FBAA00] to-[#579515] transition-transform duration-300 group-hover:scale-y-100" />
                    <span className="display pointer-events-none absolute -right-2 -top-4 text-[4.5rem] font-semibold leading-none text-[#18352F]/[0.035]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex items-center justify-between gap-3">
                      <span className="inline-flex rounded-full bg-[#FBAA00]/12 px-3 py-1 text-[10px] font-bold tracking-[0.12em] text-[#C98600]">
                        {marker}
                      </span>
                      <span className="grid h-7 w-7 place-items-center rounded-full border border-[#579515]/15 bg-[#579515]/10 text-[#579515] transition duration-300 group-hover:rotate-6 group-hover:bg-[#579515] group-hover:text-white">
                        <FaCheckCircle className="h-3 w-3" />
                      </span>
                    </div>
                    <h3 className="display relative mt-4 text-base font-semibold text-[#18352F]">{title}</h3>
                    <p className="relative mt-2 text-[11px] leading-5 text-[#63736F]">{description}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-[1.5rem] bg-[#579515] px-5 py-6 shadow-[0_18px_45px_-28px_rgba(20,59,50,0.7)] sm:px-7">
            <div className="pointer-events-none absolute inset-0 bg-weave-dark opacity-30" />
            <div className="pointer-events-none absolute -right-10 -top-20 h-48 w-48 rounded-full bg-[#FBAA00]/20 blur-2xl" />

            <div className="relative grid gap-5 lg:grid-cols-[0.8fr_2.2fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.24em] text-[#FBAA00]">
                  <span className="h-px w-8 bg-[#FBAA00]" />
                  Core portfolio
                </div>
                <h3 className="display mt-2 text-xl font-semibold text-white">Made for every room.</h3>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {corePortfolio.map(({ title, products }, index) => (
                  <article
                    key={title}
                    className="group flex min-h-[126px] items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#FBAA00]/45 hover:bg-white/[0.12]"
                  >
                    <span className="display grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#FBAA00] text-xs font-semibold text-[#18352F] shadow-[0_7px_18px_rgba(0,0,0,0.14)]">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="display text-sm font-semibold text-white transition-colors group-hover:text-[#FBAA00]">{title}</h3>
                      <p className="mt-2 text-[10px] leading-5 text-white/60">{products}</p>
                    </div>
                  </article>
                ))}
              </div>
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
                    className={`group relative overflow-hidden rounded-lg border p-4 shadow-[0_10px_24px_rgba(20,59,50,0.10)] transition-all duration-500 hover:-translate-y-1 ${isGreen
                        ? "border-emerald-200/70 bg-gradient-to-br from-white to-emerald-50/60 hover:border-emerald-400/50 hover:shadow-[0_22px_50px_rgba(87,149,21,0.16)]"
                        : "border-gray-200/70 bg-gradient-to-br from-white to-[#F5F5F5] hover:border-[#FBAA00]/40 hover:shadow-[0_22px_50px_rgba(251,170,0,0.16)]"
                      }`}
                  >
                    <span className="display absolute right-4 top-1 text-7xl font-bold text-gray-950/[0.04]">
                      {number}
                    </span>

                    <div
                      className={`relative grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_8px_18px_rgba(17,24,39,0.2)] transition duration-500 group-hover:-rotate-6 group-hover:scale-105 ${isGreen
                          ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                          : "bg-gradient-to-br from-[#FBAA00] to-[#E89D00]"
                        }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div
                      className={`relative mt-7 text-[9px] font-bold uppercase tracking-widest-x ${isGreen ? "text-emerald-600" : "text-[#E89D00]"
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
                      className={`absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${isGreen ? "bg-emerald-500" : "bg-[#FBAA00]"
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
      {categories.length > 0 && (
        <section
          aria-labelledby="category-section-title"
          className="section-y relative isolate overflow-hidden border-y border-[#143B32]/10 bg-[#F3EFE5]"
        >
          <div className="pointer-events-none absolute inset-0 bg-weave-light opacity-60" />
          <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full border-[48px] border-[#FBAA00]/[0.08]" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#579515]/10 blur-3xl" />

          <div className="container-x relative">
            <div className="mb-8 grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="mb-3 inline-flex items-center gap-3 rounded-full border border-[#579515]/15 bg-white/75 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#579515] shadow-sm backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FBAA00] shadow-[0_0_0_4px_rgba(251,170,0,0.12)]" />
                  Our range · {categories.length}{" "}
                  {categories.length === 1 ? "collection" : "collections"}
                </div>

                <h2
                  id="category-section-title"
                  className="display max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-[#143B32] sm:text-4xl lg:text-[3rem]"
                >
                  Find the right textile for
                  <span className="block italic text-[#E89D00]">every space and purpose.</span>
                </h2>
              </div>

              <div className="flex flex-col items-start gap-4 lg:col-span-4 lg:items-end">
                <p className="max-w-md text-sm leading-6 text-[#556762] lg:text-right">
                  Browse every category currently available in our product catalogue.
                </p>
                <Link
                  href="/categories"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#579515] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_-14px_rgba(87,149,21,0.75)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FBAA00] hover:text-[#143B32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2"
                >
                  View all categories
                  <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/80 bg-white/60 px-4 pb-1 pt-4 shadow-[0_24px_60px_-38px_rgba(20,59,50,0.55)] backdrop-blur-sm sm:px-6 sm:pt-6">
              <CategoryCarousel categories={categories} />
            </div>
          </div>
        </section>
      )}

      {/* OFFER BANNER */}
      {offers.length > 0 && (
        <section className="section-y bg-white">
          <div className="container-x">
            <OfferBanner offer={offers[0]} />
          </div>
        </section>
      )}

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section
          aria-labelledby="new-arrivals-title"
          className="section-y relative isolate overflow-hidden bg-[#F7F4EC]"
        >
          <div className="pointer-events-none absolute inset-0 bg-weave-light opacity-60" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#FBAA00]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-36 top-10 h-96 w-96 rounded-full border-[64px] border-[#579515]/[0.07]" />

          <div className="container-x relative">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#143B32] px-5 pb-24 pt-8 shadow-[0_30px_80px_-45px_rgba(20,59,50,0.85)] sm:px-8 sm:pb-28 sm:pt-10 lg:rounded-[2.5rem] lg:px-12 lg:pb-32 lg:pt-12">
              <div className="pointer-events-none absolute inset-0 bg-weave-dark opacity-40" />
              <div className="pointer-events-none absolute -right-20 -top-36 h-80 w-80 rounded-full border-[70px] border-white/[0.035]" />
              <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-[#FBAA00]/10 blur-3xl" />
              <div className="pointer-events-none absolute left-0 top-0 h-1 w-1/3 bg-gradient-to-r from-[#FBAA00] to-transparent" />

              <div className="relative grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8">
                  <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#FFD36F] backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FBAA00]/60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FBAA00]" />
                    </span>
                    Just in · {newArrivals.length} new{" "}
                    {newArrivals.length === 1 ? "piece" : "pieces"}
                  </div>

                  <h2
                    id="new-arrivals-title"
                    className="display max-w-3xl text-3xl font-semibold leading-[1.04] tracking-tight text-white sm:text-4xl lg:text-[3.25rem]"
                  >
                    Fresh additions,
                    <span className="block italic text-[#FBAA00]">
                      ready to be discovered.
                    </span>
                  </h2>
                </div>

                <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
                  <p className="max-w-sm text-sm leading-6 text-white/65 lg:text-right">
                    Explore the newest products currently available in our catalogue.
                  </p>
                  <Link
                    href="/products"
                    className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#143B32] shadow-[0_12px_30px_-16px_rgba(0,0,0,0.65)] transition duration-300 hover:-translate-y-0.5 hover:border-[#FBAA00] hover:bg-[#FBAA00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#143B32]"
                  >
                    Explore all products
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[#143B32] text-white transition duration-300 group-hover:rotate-[-8deg]">
                      <FaArrowRight className="h-2.5 w-2.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative z-10 -mt-16 px-2 sm:-mt-20 sm:px-6 lg:-mt-24 lg:px-10">
              <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 lg:grid-cols-4">
                {newArrivals.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    compact
                    showPrice={false}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* MANUFACTURING PROCESS */}
      {manufacturingProcess.length > 0 && (
        <section
          aria-labelledby="manufacturing-title"
          className="section-y relative isolate overflow-hidden bg-[#F7F4EC]"
        >
          <div className="pointer-events-none absolute inset-0 bg-weave-light opacity-60" />
          <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#FBAA00]/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#579515]/[0.08] blur-3xl" />

          <div className="container-x relative">
            <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#143B32]/10 bg-white/80 px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#579515] shadow-sm backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FBAA00] shadow-[0_0_0_4px_rgba(251,170,0,0.12)]" />
                  From yarn to your hands
                </div>

                <h2
                  id="manufacturing-title"
                  className="display max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-[#143B32] sm:text-4xl lg:text-[3rem]"
                >
                  The making of
                  <span className="italic text-[#E89D00]"> our cloth.</span>
                </h2>
              </div>

              <div className="flex items-center gap-4 lg:col-span-4 lg:justify-end">
                <span className="display text-5xl font-semibold leading-none text-[#FBAA00] sm:text-6xl">
                  {String(manufacturingProcess.length).padStart(2, "0")}
                </span>
                <p className="max-w-[12rem] border-l border-[#143B32]/15 pl-4 text-xs leading-5 text-[#66736F]">
                  Refined stages behind every finished textile.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-[#143B32] p-5 shadow-[0_32px_80px_-44px_rgba(20,59,50,0.9)] sm:p-8 lg:rounded-[2.5rem] lg:px-8 lg:py-10">
              <div className="pointer-events-none absolute inset-0 bg-weave-dark opacity-45" />
              <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full border-[60px] border-white/[0.035]" />
              <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#FBAA00]/10 blur-3xl" />

              <div className="pointer-events-none absolute bottom-10 left-[3.25rem] top-10 w-px bg-gradient-to-b from-[#FBAA00] via-[#FBAA00]/45 to-[#579515] lg:hidden" />
              <div className="pointer-events-none absolute left-[10%] right-[10%] top-[4.4rem] hidden h-px bg-gradient-to-r from-[#FBAA00] via-[#FBAA00]/50 to-[#579515] lg:block" />

              <div className="relative grid gap-4 lg:grid-cols-5 lg:gap-3 xl:gap-5">
                {manufacturingProcess.map((process, index) => {
                  const isFinal = index === manufacturingProcess.length - 1;

                  return (
                    <article
                      key={`${process.step}-${process.title}`}
                      className="group relative grid grid-cols-[3.75rem_1fr] gap-3 lg:block"
                    >
                      <div className="relative z-10 flex justify-center lg:mb-7">
                        <span
                          className={`display grid h-12 w-12 shrink-0 place-items-center rounded-full border text-sm font-semibold shadow-[0_10px_25px_-14px_rgba(0,0,0,0.8)] transition duration-500 group-hover:-translate-y-1 group-hover:scale-105 motion-reduce:transform-none ${
                            isFinal
                              ? "border-[#A8CA82] bg-[#579515] text-white"
                              : "border-[#FBAA00]/50 bg-[#FBAA00] text-[#143B32]"
                          }`}
                        >
                          {process.step}
                        </span>
                      </div>

                      <div
                        className={`relative overflow-hidden rounded-[1.25rem] border p-5 transition duration-500 group-hover:-translate-y-1 motion-reduce:transform-none lg:min-h-56 ${
                          isFinal
                            ? "border-[#A8CA82]/25 bg-[#579515]/25 group-hover:border-[#A8CA82]/55 group-hover:bg-[#579515]/35"
                            : "border-white/10 bg-white/[0.055] group-hover:border-[#FBAA00]/35 group-hover:bg-white/[0.085]"
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute -right-4 -top-5 display text-7xl font-semibold leading-none ${
                            isFinal ? "text-[#A8CA82]/10" : "text-white/[0.035]"
                          }`}
                        >
                          {process.step}
                        </span>

                        <div
                          className={`mb-4 h-0.5 w-8 rounded-full transition-all duration-500 group-hover:w-12 ${
                            isFinal ? "bg-[#A8CA82]" : "bg-[#FBAA00]"
                          }`}
                        />

                        <h3 className="display relative text-lg font-semibold leading-tight text-white">
                          {process.title}
                        </h3>

                        <p
                          className={`relative mt-3 text-[11px] leading-5 ${
                            isFinal ? "text-white/75" : "text-white/60"
                          }`}
                        >
                          {process.description}
                        </p>

                        {index < manufacturingProcess.length - 1 && (
                          <FaArrowRight
                            aria-hidden="true"
                            className="absolute bottom-4 right-4 hidden h-3 w-3 text-[#FBAA00]/45 transition-transform duration-300 group-hover:translate-x-1 lg:block"
                          />
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* JOURNAL */}
      {blogPosts.length > 0 && (
        <section
          aria-labelledby="journal-title"
          className="section-y relative isolate overflow-hidden bg-white"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FBAA00]/60 to-transparent" />
          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#FBAA00]/[0.07] blur-3xl" />
          <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#579515]/[0.06] blur-3xl" />

          <div className="container-x relative">
            <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#143B32]/10 bg-[#F7F4EC] px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.24em] text-[#579515]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FBAA00] shadow-[0_0_0_4px_rgba(251,170,0,0.12)]" />
                  From the journal · {blogPosts.length}{" "}
                  {blogPosts.length === 1 ? "article" : "articles"}
                </div>

                <h2
                  id="journal-title"
                  className="display max-w-3xl text-3xl font-semibold leading-[1.05] tracking-tight text-[#143B32] sm:text-4xl lg:text-[3rem]"
                >
                  Stories, guidance and
                  <span className="block italic text-[#E89D00]">
                    notes from our looms.
                  </span>
                </h2>
              </div>

              <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
                <p className="max-w-sm text-sm leading-6 text-[#66736F] lg:text-right">
                  Explore our latest textile insights, product stories and care advice.
                </p>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-3 rounded-full border border-[#143B32]/15 bg-[#143B32] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_-16px_rgba(20,59,50,0.75)] transition duration-300 hover:-translate-y-0.5 hover:border-[#FBAA00] hover:bg-[#FBAA00] hover:text-[#143B32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2"
                >
                  View all articles
                  <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-12">
              <Link
                href={`/blog/${blogPosts[0].slug}`}
                className={`group relative min-h-[28rem] overflow-hidden rounded-[1.75rem] bg-[#143B32] shadow-[0_28px_70px_-38px_rgba(20,59,50,0.8)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_36px_80px_-38px_rgba(20,59,50,0.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2 ${
                  blogPosts.length > 1 ? "lg:col-span-7" : "lg:col-span-12"
                }`}
              >
                {blogPosts[0].coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={blogPosts[0].coverImage}
                    alt={blogPosts[0].title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#143B32] via-[#315B0D] to-[#579515]" />
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A211C] via-[#143B32]/35 to-black/5" />
                <div className="pointer-events-none absolute inset-0 bg-weave-dark opacity-20" />
                <div className="pointer-events-none absolute inset-3 rounded-[1.2rem] border border-white/20 transition duration-500 group-hover:inset-4 group-hover:border-[#FBAA00]/50" />

                <div className="relative flex min-h-[28rem] flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-4">
                    {blogPosts[0].category && (
                      <span className="rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md">
                        {blogPosts[0].category}
                      </span>
                    )}
                    <span className="display ml-auto text-5xl font-semibold text-white/15">
                      01
                    </span>
                  </div>

                  <div className="max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 text-[9px] font-bold uppercase tracking-[0.17em] text-[#FFD36F]">
                      {blogPosts[0].publishedAt && (
                        <span>
                          {moment(blogPosts[0].publishedAt).format("MMM D, YYYY")}
                        </span>
                      )}
                      {blogPosts[0].publishedAt && blogPosts[0].readTime > 0 && (
                        <span aria-hidden="true">·</span>
                      )}
                      {blogPosts[0].readTime > 0 && (
                        <span>{blogPosts[0].readTime} min read</span>
                      )}
                    </div>

                    <h3 className="display mt-3 text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2.35rem]">
                      {blogPosts[0].title}
                    </h3>

                    {blogPosts[0].excerpt && (
                      <p className="mt-4 line-clamp-2 max-w-xl text-sm leading-6 text-white/70">
                        {blogPosts[0].excerpt}
                      </p>
                    )}

                    <span className="mt-6 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                      Read featured story
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FBAA00] text-[#143B32] transition duration-300 group-hover:rotate-[-8deg]">
                        <FaArrowRight className="h-3 w-3" />
                      </span>
                    </span>
                  </div>
                </div>
              </Link>

              {blogPosts.length > 1 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
                  {blogPosts.slice(1, 3).map((blog, index) => (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.slug}`}
                      className="group grid min-h-[13.75rem] overflow-hidden rounded-[1.5rem] border border-[#143B32]/10 bg-[#F7F4EC] p-2 shadow-[0_18px_45px_-34px_rgba(20,59,50,0.65)] transition duration-500 hover:-translate-y-1 hover:border-[#FBAA00]/50 hover:bg-white hover:shadow-[0_26px_55px_-34px_rgba(20,59,50,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-2 sm:grid-cols-[8.5rem_1fr] lg:grid-cols-[10rem_1fr]"
                    >
                      <div className="relative min-h-40 overflow-hidden rounded-[1.05rem] bg-[#143B32] sm:min-h-full">
                        {blog.coverImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#143B32] to-[#579515]" />
                        )}
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#143B32]/55 to-transparent" />
                        <span className="display absolute bottom-3 left-3 text-3xl font-semibold text-white/70">
                          0{index + 2}
                        </span>
                      </div>

                      <div className="flex min-w-0 flex-col p-3 sm:p-4">
                        <div className="flex flex-wrap items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] text-[#579515]">
                          {blog.category && <span>{blog.category}</span>}
                          {blog.category && blog.publishedAt && (
                            <span aria-hidden="true" className="text-[#FBAA00]">·</span>
                          )}
                          {blog.publishedAt && (
                            <span>{moment(blog.publishedAt).format("MMM D, YYYY")}</span>
                          )}
                        </div>

                        <h3 className="display mt-2 line-clamp-3 text-lg font-semibold leading-tight text-[#143B32] transition-colors duration-300 group-hover:text-[#D79000]">
                          {blog.title}
                        </h3>

                        {blog.excerpt && (
                          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-[#66736F]">
                            {blog.excerpt}
                          </p>
                        )}

                        <span className="mt-auto flex items-center gap-2 pt-3 text-[8px] font-extrabold uppercase tracking-[0.17em] text-[#143B32]">
                          Read article
                          <FaArrowRight className="h-2.5 w-2.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

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
