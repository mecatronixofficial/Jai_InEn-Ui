import type { Metadata } from "next";
import Link from "next/link";
import {
  FaQuoteRight,
  FaCheckCircle,
  FaArrowRight,
  FaIndustry,
  FaPrint,
  FaStore,
  FaTint,
  FaTshirt,
  FaBullseye,
  FaBinoculars,
  FaEye,
  FaUserTie,
  FaGlobe,
  FaHandshake,
} from "react-icons/fa";

import StatsCounter from "@/components/StatsCounter";
import AboutBannerImage from "@/components/AboutBannerImage";
import PremiumPageBanner from "@/components/PremiumPageBanner";
import ScrollReveal from "@/components/ScrollReveal";
import PremiumTeamwork from "@/components/PremiumTeamwork";
import { siteConfig, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${siteConfig.name} Textile — a leading textile manufacturer from ${siteConfig.address.city}, ${siteConfig.address.state}, specializing in cotton and handloom products since ${siteConfig.established}.`,
};

const values = [
  { label: "Nature of firm", value: "Manufacturer & Exporter" },
  { label: "Production capacity", value: "375,000 metres per month — and more depending on orders" },
  { label: "Infrastructure", value: "133,689 sq. ft." },
  { label: "Export markets", value: "European countries and Japan" },
];

const qualityCommitments = [
  {
    number: "01",
    title: "Stringent Inspection Protocol",
    description:
      "Our specialized team conducts a thorough analysis of every stage of the production process to guarantee the highest quality.",
  },
  {
    number: "02",
    title: "International Standards",
    description:
      "We follow ISO 9001:2015 procedures and maintain compliance with AQL 4.0 and 2.5 standards to uphold product excellence.",
  },
  {
    number: "03",
    title: "Investment in Human Capital",
    description:
      "Our employees are our most valuable asset. We carefully recruit and extensively train people to fulfil their responsibilities with confidence.",
  },
  {
    number: "04",
    title: "Our Commitment",
    description:
      "Together with our employees and suppliers, we pursue continuous improvement through a robust quality-management framework and shared accountability.",
  },
];

const qualityIcons = [FaEye, FaGlobe, FaUserTie, FaHandshake];

const facilities = [
  {
    Icon: FaTshirt,
    number: "01",
    title: "Stitching",
    description:
      "We employ modern stitching machines for efficient bulk production and have trained staff who understand and develop our customers’ designs. Our dedicated workforce ensures meticulous hemming, guaranteeing superior product delivery to our clients.",
  },
  {
    Icon: FaIndustry,
    number: "02",
    title: "Weaving",
    description:
      "We specialize in sourcing weaving materials from diverse regions and producing high-end fabrics using Handloom, Power Loom and Auto Loom units. Our offerings include Plain, Check, Dobby and Jacquard designs in widths ranging from 33 cm to 300 cm, all crafted with high-quality yarns from leading spinning mills.",
  },
  {
    Icon: FaStore,
    number: "03",
    title: "Showroom",
    description:
      "Our showroom is elegantly designed to enhance the customer experience, showcasing our products with meticulous attention to detail and aesthetic appeal.",
  },
  {
    Icon: FaTint,
    number: "04",
    title: "Dyeing",
    description:
      "We specialize in dyeing yarn and fabrics using advanced machinery to process up to 60,000 kg of yarn and 50,000 metres of fabric monthly. Our methods include Cheese and Cabinet dyeing for yarn, and Jigger dyeing for fabrics. We adhere to AZO Free, OEKO-TEX and REACH standards for environmental and safety compliance.",
  },
  {
    Icon: FaPrint,
    number: "05",
    title: "Printing",
    description:
      "Our team offers superior rotary printing solutions with advanced machinery in spacious units, ensuring top-quality results.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  dark = false,
  eyebrowClassName = "",
  titleClassName = "",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  center?: boolean;
  dark?: boolean;
  eyebrowClassName?: string;
  titleClassName?: string;
}) {
  return (
    <div
      className={
        center
          ? "mx-auto max-w-3xl text-center"
          : "max-w-3xl"
      }
    >
      <div
        className={`mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#FBAA00] ${
          center ? "justify-center" : ""
        } ${eyebrowClassName}`}
      >
        <span className="h-px w-9 bg-[#FBAA00]" />

        <span>{eyebrow}</span>

        {center && <span className="h-px w-9 bg-[#FBAA00]" />}
      </div>

      <h2
        className={`display text-3xl font-semibold leading-[1.1] sm:text-4xl ${
          dark ? "text-white" : "text-black"
        } ${titleClassName}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-5 text-sm leading-7 sm:text-base ${
            dark ? "text-white/70" : "text-black"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="about-page-typography overflow-hidden bg-white text-black">
      <PremiumPageBanner eyebrow="Our Story" title={<>A textile house woven into the fabric of <span className="text-[#FBAA00]">{siteConfig.address.city}.</span></>} description={<>Manufacturing cotton, handloom and finished textiles from one of Tamil Nadu&apos;s oldest textile towns—since {siteConfig.established}.</>} current="About" />
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="hidden">
        <AboutBannerImage pageKey="about" fallbackImage="https://images.unsplash.com/photo-1620713043691-2a6c2c5dd47f?w=1920&auto=format&fit=crop&q=80" />
        <div className="absolute inset-0 bg-[#174D2A]/75" />
        <div className="absolute inset-y-0 left-0 w-2 bg-[#579515]" />

        <div className="container-x relative flex min-h-[220px] flex-col justify-end pb-4 pt-14 lg:min-h-[280px] lg:pb-5">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
            <Link
              href="/"
              className="text-[#FBAA00] transition-colors duration-300 hover:text-white"
            >
              Home
            </Link>

            <span className="text-white/60">/</span>

            <span className="text-white">About</span>
          </div>

          <div className="max-w-5xl">
            <div className="mb-3 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.24em] text-[#FBAA00]">
              <span className="h-0.5 w-8 bg-[#FBAA00]" />
              Our Story
            </div>

            <h1 className="max-w-3xl font-sans text-3xl font-semibold uppercase leading-[1.1] tracking-tight text-white [text-shadow:0_3px_8px_rgba(0,0,0,0.85)] sm:text-4xl">
              <span className="block">A textile house</span>
              <span className="block">woven into the fabric of</span>
              <span className="block text-[#FBAA00]">
                {siteConfig.address.city}.
              </span>
            </h1>

            <p className="mt-2 max-w-2xl text-[11px] font-bold leading-5 text-white/90 sm:text-xs sm:leading-5">
              Manufacturing cotton, handloom and finished textiles from one of
              Tamil Nadu&apos;s oldest textile towns — since{" "}
              {siteConfig.established}.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-[#FBAA00] px-4 py-2 text-[8px] font-bold uppercase tracking-[0.14em] text-[#174D2A] shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white"
              >
                Explore Products

                <FaArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-[#FBAA00] bg-[#174D2A]/70 px-4 py-2 text-[8px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition duration-300 hover:bg-[#FBAA00] hover:text-[#174D2A]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO / WHO WE ARE
      ========================================================= */}
      <section className="relative bg-white py-8 md:py-10">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#FBAA00]/5 blur-3xl" />

        <div className="absolute right-0 top-0 h-96 w-72 bg-gradient-to-l from-[#F5F5F5] to-transparent" />

        <div className="container-x relative grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto h-[420px] w-full max-w-[620px] lg:h-[540px]">
              <div className="absolute -left-5 -top-5 hidden h-32 w-32 rounded-tl-[2rem] border-l border-t border-[#FBAA00]/50 md:block" />

              <div className="group absolute bottom-12 left-0 right-12 top-0 overflow-hidden rounded-[1.5rem] border border-[#579515]/20 bg-[#F5F5F5] shadow-[12px_16px_0_rgba(87,149,21,0.12),0_28px_50px_-30px_rgba(20,59,50,0.55)] [transform:perspective(1000px)_rotateY(2deg)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://res.cloudinary.com/ddpfxvydm/image/upload/v1787643040/About_img_1_vwqrzs.png"
                    alt="Handloom weaving"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#579515]/30 via-transparent to-transparent" />
              </div>

                <div className="group absolute bottom-0 right-0 h-[44%] w-[58%] overflow-hidden rounded-[1.25rem] border-[6px] border-white bg-[#F5F5F5] shadow-[0_22px_45px_-20px_rgba(20,59,50,0.65)] [transform:perspective(900px)_rotateY(-5deg)_rotateX(3deg)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://res.cloudinary.com/ddpfxvydm/image/upload/v1787643046/Screenshot_2026-08-25_124048_bgxa68.png"
                    alt="Finished cotton home textiles"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#174D2A]/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.14em] text-[#579515] backdrop-blur">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FBAA00]" />
                    From craft to finished textile
                  </div>
                </div>

              <div className="absolute -left-3 top-8 hidden rounded-xl bg-[#579515] px-4 py-3 text-white shadow-xl md:block">
                <div className="display text-2xl font-semibold text-[#FBAA00]">
                  {siteConfig.established}
                </div>

                <div className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  Established
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Who We Are"
              title="The Masters of Weaving (The Foundation)"
              eyebrowClassName="!text-black"
              titleClassName="!text-[#FBAA00]"
              description="Established in 1996 in Karur, Jai Export Enterprises has grown into a trusted global manufacturer and exporter of sustainable, high-quality home textiles."
            />

            <div className="mt-5 max-w-3xl space-y-3 text-sm leading-6 text-black">
              <p>
                <strong className="font-semibold text-[#579515]">Launch of Jai Export Enterprises (1996) — The Modernization:</strong>{" "}
                Family textile expertise became Jai Export Enterprises in 1996. Modern stitching capacity helped bring Karur-made table, kitchen and bed linen to international buyers.
              </p>
              <p>
                <strong className="font-semibold text-[#579515]">Tech-Driven, Global Pioneers (The Present & Future):</strong>{" "}
                From Karur Textile Park, we combine sustainable materials, technology-led quality control and digital sampling to deliver large orders reliably, supported by three generations of experience and ethical practices.
              </p>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {values.map(({ label, value }) => (
                <div
                  key={label}
                  className="group flex items-start gap-2 rounded-lg border border-[#ECECEC] bg-white p-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#FBAA00]/45 hover:shadow-[0_12px_32px_-24px_rgba(87,149,21,0.3)]"
                >
                  <div className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FBAA00]/10 text-[#E89D00] transition duration-300 group-hover:bg-[#FBAA00] group-hover:text-black">
                    <FaCheckCircle className="h-3 w-3" />
                  </div>

                  <span className="text-[11px] leading-4 text-black sm:text-xs">
                    <strong className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#579515]">{label}</strong>
                    <span className="mt-0.5 block">{value}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#FBAA00] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-black shadow-[0_12px_30px_-15px_rgba(251,170,0,0.65)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#FBAA00]"
              >
                See Our Products

                <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-black transition duration-300 hover:border-[#FBAA00] hover:text-[#E89D00]"
              >
                Visit Our Facility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================= */}
<section className="relative border-y border-[#ECECEC] bg-[#F5F5F5] py-8 sm:py-10">
  <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-2xl bg-gradient-to-r from-transparent via-[#FBAA00]/50 to-transparent" />

  <div className="container-x relative">
    <div className="mx-auto max-w-4xl">
      <StatsCounter items={stats} colorful />
    </div>
  </div>
</section>

      {/* =========================================================
          FOUNDER
      ========================================================= */}
     <section className="relative overflow-hidden bg-[#579515] py-10 sm:py-12">
  <div className="container-x relative">
    <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#F5F5F5] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)]">
      <div className="grid items-stretch md:grid-cols-[1.3fr_0.7fr]">
        
        {/* Content */}
        <div className="relative p-5 sm:p-6 md:p-7 lg:p-8">
          <div className="absolute left-0 top-0 h-1 w-20 bg-[#FBAA00]" />

          <FaQuoteRight className="absolute right-5 top-5 h-10 w-10 text-[#FBAA00]/10" />

          <div className="mb-4 flex items-center gap-2">
            <span className="h-px w-7 bg-[#FBAA00]" />

            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#FBAA00]">
              From The Founder
            </span>
          </div>

          <blockquote className="display max-w-2xl text-sm font-medium leading-6 text-[#222222] sm:text-base sm:leading-7">
            &ldquo;We started {siteConfig.name} Textile with one principle —
            make cloth we&apos;d be happy to use ourselves, and sell it at a
            price we&apos;d pay. Eight years later, that principle hasn&apos;t
            changed. Every reorder from a wholesale partner is a vote of
            confidence we take seriously.&rdquo;
          </blockquote>

          <div className="mt-5 flex items-center gap-3">
            <span className="h-10 w-1 rounded-full bg-[#FBAA00]" />

            <div>
              <div className="display text-base font-semibold text-[#143B32]">
                {siteConfig.ceo}
              </div>

              <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#8A8A8A]">
                Founder & CEO
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative min-h-[260px] overflow-hidden bg-[#143B32] md:min-h-[300px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1542178243-bc20204b769f?w=700&auto=format&fit=crop&q=85"
            alt="Founder"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#143B32]/70 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4 rounded-xl border border-white/20 bg-[#143B32]/70 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="display text-2xl font-bold text-white">
                8+
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#FBAA00]">
                Years Experience
              </span>
            </div>
          </div>

          <div className="absolute right-4 top-4 h-10 w-10 border-r-2 border-t-2 border-[#FBAA00]" />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Quality and direction — reference-inspired open layout */}
      <section className="section-y relative overflow-hidden bg-white">
        <div className="absolute right-10 top-20 hidden grid-cols-6 gap-2 opacity-60 lg:grid">
          {Array.from({ length: 24 }).map((_, index) => <span key={index} className="h-1 w-1 rounded-full bg-[#FBAA00]" />)}
        </div>
        <div className="container-x relative">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="display text-3xl font-semibold leading-[1.1] text-[#FBAA00] sm:text-4xl">Our Quality</h2>
            <p className="mx-auto mt-5 max-w-5xl text-sm leading-7 text-black/70 sm:text-base">
              {siteConfig.name} is dedicated to achieving utmost customer satisfaction through premium home furnishing fabrics and made-ups at competitive prices. We adhere strictly to delivery schedules, meet customer specifications and continually enhance our processes. We craft high-quality home textiles with a planet-first approach, blending traditional craftsmanship with modern sustainability.
            </p>
          </div>

          <div className="mt-10 grid gap-5 [perspective:1200px] md:grid-cols-2">
            <div className="group relative grid min-h-[210px] items-center gap-5 overflow-hidden rounded-[1.75rem] border border-[#FBAA00]/35 bg-gradient-to-br from-[#fff9e9] to-[#FBAA00]/25 px-7 py-7 shadow-[8px_10px_0_rgba(251,170,0,0.18),0_24px_45px_-30px_rgba(87,149,21,0.5)] transition-[transform,box-shadow] duration-500 [transform-style:preserve-3d] hover:[transform:translateY(-7px)_rotateY(3deg)] hover:shadow-[12px_14px_0_rgba(251,170,0,0.23),0_30px_50px_-27px_rgba(87,149,21,0.55)] sm:grid-cols-[1fr_auto]">
              <span className="absolute inset-y-0 left-0 w-2 bg-[#FBAA00]" />
              <div>
                <h3 className="display text-base font-semibold text-[#E89D00]">Our Mission</h3>
                <p className="mt-2 max-w-4xl text-sm leading-6 text-[#579515]">Our mission is to deliver exceptional products and trade services across global borders by upholding the highest standards of quality, reliability and business ethics. We are committed to ethical practices and environmental stewardship.</p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#FBAA00] text-white shadow-[0_8px_0_rgba(232,157,0,0.25)] transition-transform duration-500 [transform:translateZ(28px)] group-hover:rotate-6 group-hover:scale-105">
                <FaBullseye className="h-8 w-8" />
              </div>
            </div>

            <div className="group relative grid min-h-[210px] items-center gap-5 overflow-hidden rounded-[1.75rem] border border-[#579515]/30 bg-gradient-to-br from-white to-[#579515]/10 px-7 py-7 shadow-[8px_10px_0_rgba(87,149,21,0.15),0_24px_45px_-30px_rgba(87,149,21,0.5)] transition-[transform,box-shadow] duration-500 [transform-style:preserve-3d] hover:[transform:translateY(-7px)_rotateY(-3deg)] hover:shadow-[12px_14px_0_rgba(87,149,21,0.2),0_30px_50px_-27px_rgba(87,149,21,0.55)] sm:grid-cols-[1fr_auto]">
              <span className="absolute inset-y-0 right-0 w-2 bg-[#579515]" />
              <div>
                <h3 className="display text-base font-semibold text-[#E89D00]">Our Vision</h3>
                <p className="mt-2 max-w-4xl text-sm leading-6 text-[#579515]">To be a globally trusted leader in international trade, recognised for seamless global supply-chain excellence, uncompromising ethical integrity and a steadfast commitment to building a sustainable, eco-conscious future.</p>
              </div>
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[#579515] text-white shadow-[0_8px_0_rgba(49,91,13,0.24)] transition-transform duration-500 [transform:translateZ(28px)] group-hover:-rotate-6 group-hover:scale-105">
                <FaBinoculars className="h-8 w-8" />
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 [perspective:1200px] sm:grid-cols-2 lg:grid-cols-4">
            {qualityCommitments.map(({ title, description }, index) => {
              const Icon = qualityIcons[index];
              return (
                <div key={title} className="group relative min-h-[220px] rounded-2xl [transform-style:preserve-3d]">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-[#FBAA00]/25 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />
                  <div className="relative h-full overflow-hidden rounded-2xl border border-[#FBAA00]/30 bg-white p-5 shadow-[0_20px_38px_-28px_rgba(20,59,50,0.6)] transition-[transform,box-shadow] duration-500 [transform-style:preserve-3d] group-hover:[transform:translateY(-8px)_rotateX(5deg)_rotateY(-4deg)] group-hover:shadow-[0_30px_48px_-25px_rgba(20,59,50,0.65)]">
                    <span className="absolute -right-5 -top-8 display text-8xl font-bold text-[#579515]/[0.05]">0{index + 1}</span>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#FBAA00] text-white shadow-[0_7px_0_rgba(232,157,0,0.22)] transition-transform duration-500 [transform:translateZ(30px)] group-hover:rotate-6 group-hover:scale-105">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="relative mt-5 text-sm font-bold uppercase leading-5 tracking-wide text-[#E89D00]">{title}</h3>
                    <p className="relative mt-3 text-xs leading-6 text-black/70">{description}</p>
                    <span className="absolute inset-x-5 bottom-4 h-0.5 origin-left scale-x-0 bg-[#579515] transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Previous separate quality layout retained in source for reference. */}
      <section className="hidden">
  {/* Background effects */}
  <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#FBAA00]/10 blur-[100px]" />
  <div className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#579515]/10 blur-[110px]" />

  <div className="container-x relative">
    {/* Header */}
    <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-8">
        <SectionHeading
          eyebrow="Our Quality"
          title="Customer satisfaction, built into every process."
          description={`${siteConfig.name} is dedicated to delivering premium home furnishing fabrics and made-ups at competitive prices. We adhere closely to delivery schedules, meet customer specifications and continually improve our processes.`}
        />
      </div>

      {/* Small side quote card */}
      <div className="lg:col-span-4">
        <div className="relative overflow-hidden rounded-[1.4rem] border border-[#E7E7E7] bg-white p-5 shadow-[0_18px_50px_-35px_rgba(20,59,50,0.35)]">
          <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-[3rem] bg-[#FBAA00]/10" />

          <div className="mb-4 h-1 w-12 rounded-full bg-[#FBAA00]" />

          <p className="relative text-xs italic leading-6 text-black sm:text-[13px]">
            We craft high-quality home textiles with a planet-first approach,
            blending traditional craftsmanship with modern sustainability.
          </p>
        </div>
      </div>
    </div>

    {/* 3D Quality Cards */}
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {qualityCommitments.map(({ number, title, description }, index) => (
        <div
          key={title}
          className="quality-perspective group"
        >
          <article
            className={`
              quality-card
              relative
              min-h-[230px]
              overflow-hidden
              rounded-[1.5rem]
              border
              border-[#E8E8E8]
              bg-white
              p-5
              shadow-[0_18px_40px_-25px_rgba(20,59,50,0.28)]
              transition-all
              duration-500
              ease-out
              group-hover:border-[#FBAA00]/50
              group-hover:shadow-[0_30px_70px_-30px_rgba(251,170,0,0.42)]
            `}
            style={{
              animationDelay: `${index * 80}ms`,
            }}
          >
            {/* 3D back layer */}
            <div
              className={`
                pointer-events-none
                absolute
                inset-[7px]
                rounded-[1.25rem]
                border
                border-[#FBAA00]/0
                transition-all
                duration-500
                group-hover:translate-x-2
                group-hover:translate-y-2
                group-hover:border-[#FBAA00]/20
              `}
            />

            {/* Soft green glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#579515]/[0.07] blur-2xl transition duration-500 group-hover:bg-[#579515]/[0.13]" />

            {/* Gold glow */}
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full bg-[#FBAA00]/[0.05] blur-3xl transition duration-500 group-hover:bg-[#FBAA00]/[0.12]" />

            {/* Large number */}
            <span
              className={`
                display
                absolute
                right-3
                top-0
                text-[5.2rem]
                font-bold
                leading-none
                text-[#143B32]/[0.045]
                transition-all
                duration-500
                group-hover:-translate-y-1
                group-hover:text-[#FBAA00]/[0.08]
              `}
            >
              {number}
            </span>

            {/* Icon */}
            <div
              className={`
                relative
                grid
                h-11
                w-11
                place-items-center
                rounded-[14px]
                bg-[#143B32]
                text-white
                shadow-[0_10px_25px_-12px_rgba(20,59,50,0.7)]
                transition-all
                duration-500
                group-hover:-translate-y-1
                group-hover:rotate-[-6deg]
                group-hover:bg-[#FBAA00]
                group-hover:shadow-[0_14px_30px_-12px_rgba(251,170,0,0.65)]
              `}
            >
              <FaCheckCircle className="h-4 w-4" />
            </div>

            {/* Label */}
            <div className="relative mt-6 flex items-center gap-2">
              <span className="h-px w-6 bg-[#FBAA00]" />

              <span className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#FBAA00]">
                Quality {number}
              </span>
            </div>

            {/* Title */}
            <h3
              className={`
                display
                relative
                mt-2
                text-[17px]
                font-semibold
                leading-snug
                text-[#143B32]
                transition-all
                duration-500
                group-hover:translate-x-1
              `}
            >
              {title}
            </h3>

            {/* Description */}
            <p className="relative mt-3 text-[11px] leading-[1.8] text-black sm:text-xs">
              {description}
            </p>

            {/* Bottom animated gold line */}
            <div className="absolute inset-x-5 bottom-4">
              <div className="h-px overflow-hidden bg-[#ECECEC]">
                <span
                  className={`
                    block
                    h-full
                    w-full
                    origin-left
                    scale-x-0
                    bg-[#FBAA00]
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  `}
                />
              </div>
            </div>

            {/* Small corner */}
            <div
              className={`
                absolute
                bottom-0
                right-0
                h-10
                w-10
                rounded-tl-[1.5rem]
                bg-[#143B32]/[0.03]
                transition-all
                duration-500
                group-hover:bg-[#FBAA00]/10
              `}
            />
          </article>
        </div>
      ))}
    </div>
  </div>

</section>
      {/* =========================================================
          MISSION / VISION
      ========================================================= */}
      <section className="hidden">
        {/* Decorative colour shapes — kept outside the content cards. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-28 h-72 w-72 rounded-full bg-[#FBAA00]/20 blur-sm sm:h-96 sm:w-96"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-16 h-80 w-80 rounded-full border-[54px] border-[#579515]/10 sm:h-[28rem] sm:w-[28rem] sm:border-[72px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-10 left-[8%] h-20 w-20 rounded-full border-2 border-[#FBAA00]/30"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-[28%] h-28 w-28 translate-y-1/2 rounded-full bg-[#143B32]/[0.06]"
        />

        <div className="container-x relative z-10">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Direction"
              title="Mission & Vision"
              description="Our long-term direction is rooted in quality, trust, responsible growth and enduring relationships."
              center
            />
          </ScrollReveal>

          <div className="relative mx-auto mt-14 grid max-w-5xl overflow-hidden rounded-[2rem] border border-[#FBAA00]/25 bg-white/85 shadow-[0_30px_70px_-40px_rgba(20,59,50,0.5)] backdrop-blur md:grid-cols-2">
            <span className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-transparent via-[#143B32]/20 to-transparent md:block" />

            <ScrollReveal
              className="group relative p-7 sm:p-9 md:p-10 lg:p-12"
              direction="left"
              delay={0.08}
            >
              <div className="flex items-start gap-5 sm:gap-7">
                <div className="display grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#FBAA00] text-2xl font-semibold text-[#143B32] transition-transform duration-500 group-hover:rotate-6 sm:h-24 sm:w-24 sm:text-3xl">
                  01
                </div>

                <div className="pt-2">
                  <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#C77F00]">
                    Our Purpose
                  </div>
                  <h3 className="display mt-2 text-base font-semibold text-[#143B32]">
                    Mission
                  </h3>
                </div>
              </div>

              <p className="mt-7 text-sm leading-7 text-[#52635F]">
                Our mission is to deliver exceptional products and trade
                services across global borders by upholding the highest
                standards of quality, reliability and business ethics, with a
                firm commitment to ethical practices and environmental
                stewardship.
              </p>
              <span className="mt-7 block h-1 w-16 rounded-full bg-[#FBAA00]" />
            </ScrollReveal>

            <ScrollReveal
              className="group relative border-t border-[#143B32]/10 p-7 sm:p-9 md:border-l-0 md:border-t-0 md:p-10 lg:p-12"
              direction="right"
              delay={0.18}
            >
              <div className="flex items-start gap-5 sm:gap-7">
                <div className="display grid h-20 w-20 shrink-0 place-items-center rounded-full bg-[#579515] text-2xl font-semibold text-white transition-transform duration-500 group-hover:-rotate-6 sm:h-24 sm:w-24 sm:text-3xl">
                  02
                </div>

                <div className="pt-2">
                  <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#579515]">
                    Our Future
                  </div>
                  <h3 className="display mt-2 text-base font-semibold text-[#143B32]">
                    Vision
                  </h3>
                </div>
              </div>

              <p className="mt-7 text-sm leading-7 text-[#52635F]">
                To be a globally trusted leader in international trade,
                recognized for seamless global supply-chain excellence,
                uncompromising ethical integrity and a steadfast commitment
                to building a sustainable, eco-conscious future.
              </p>
              <span className="mt-7 block h-1 w-16 rounded-full bg-[#579515]" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          TEAMWORK
      ========================================================= */}
      <PremiumTeamwork />

      {/* =========================================================
          FACILITIES
      ========================================================= */}
      <section className="section-y relative bg-white">
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-[#FBAA00]/5 blur-3xl" />

        <div className="container-x relative">
          <SectionHeading
            eyebrow="Integrated Manufacturing"
            title="Our Facilities"
            description="Purpose-built production and presentation capabilities help move each buyer programme from fabric development to finished home textiles."
            center
          />

          <div className="mx-auto mt-9 grid max-w-5xl gap-4 md:grid-cols-2 lg:grid-cols-6">
            {facilities.map(
              ({ Icon, number, title, description }, index) => (
                <article
                  key={title}
                  tabIndex={0}
                  aria-label={`${title}: hover or focus to view details`}
                  className={`group relative h-[245px] cursor-pointer rounded-[1.15rem] outline-none [perspective:1100px] lg:col-span-2 ${
                    index === 3 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div className="relative h-full w-full rounded-[1.15rem] shadow-[0_18px_38px_-28px_rgba(20,59,50,0.5)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus:[transform:rotateY(180deg)]">
                    {/* Front: deliberately minimal — heading only. */}
                    <div className="absolute inset-0 flex overflow-hidden rounded-[1.15rem] border border-[#579515]/20 bg-white p-4 [backface-visibility:hidden]">
                      <div
                        className={`absolute h-40 w-40 rounded-full border-[28px] opacity-10 ${
                          index % 2 === 0
                            ? "-right-12 -top-12 border-[#579515]"
                            : "-bottom-14 -left-12 border-[#FBAA00]"
                        }`}
                      />
                      <span className="display absolute right-4 top-2 text-5xl font-semibold text-[#143B32]/[0.05]">
                        {number}
                      </span>

                      <div className="relative flex w-full flex-col justify-between">
                        <div className={`grid h-10 w-10 place-items-center rounded-full text-white shadow-[0_8px_18px_-10px_rgba(20,59,50,0.6)] ${index % 2 === 0 ? "bg-[#579515]" : "bg-[#143B32]"}`}>
                          <Icon className="h-4 w-4" />
                        </div>

                        <div>
                          <div className="text-[8px] font-bold uppercase tracking-[0.24em] text-[#579515]">
                            Facility {number}
                          </div>
                          <h3 className="display mt-1 text-base font-semibold text-[#143B32]">
                            {title}
                          </h3>
                          <span className="mt-2 flex items-center gap-2 text-[7px] font-bold uppercase tracking-[0.16em] text-[#143B32]/45">
                            Hover to explore
                            <FaArrowRight className="h-2.5 w-2.5 text-[#FBAA00]" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Back: details are revealed by the 3D rotation. */}
                    <div className={`absolute inset-0 flex overflow-hidden rounded-[1.15rem] p-4 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] ${index % 2 === 0 ? "bg-[#143B32]" : "bg-[#579515]"}`}>
                      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[26px] border-white/[0.06]" />
                      <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#FBAA00]/10" />

                      <div className="relative flex w-full flex-col">
                        <div className="flex items-center justify-between">
                          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#FBAA00] text-[#143B32]">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <span className="display text-3xl font-semibold text-white/10">{number}</span>
                        </div>

                        <h3 className="display mt-2 !text-base font-semibold text-white">{title}</h3>
                        <p className="mt-1.5 !text-[11px] !leading-[1.55] text-white/85">{description}</p>
                        <span className="mt-auto h-1 w-12 rounded-full bg-[#FBAA00]" />
                      </div>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =========================================================
          BUSINESS INFORMATION
      ========================================================= */}
      <section className="section-y relative isolate overflow-hidden bg-[#F4F0E7]">
        <div className="pointer-events-none absolute -left-32 top-1/4 h-80 w-80 rounded-full border-[55px] border-[#579515]/[0.06]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#FBAA00]/[0.06] blur-3xl" />

        <div className="container-x relative grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="At A Glance"
                title="Business Information"
                description="Every important detail, clearly presented and on the record."
              />

              <div className="relative mt-10 h-28 w-28 [perspective:700px]">
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[1.75rem] bg-[#FBAA00]" />
                <div className="relative grid h-full w-full place-items-center rounded-[1.75rem] bg-[#143B32] shadow-[0_20px_35px_-18px_rgba(20,59,50,0.8)] [transform:rotateX(8deg)_rotateY(-9deg)]">
                  <div className="text-center">
                    <span className="display block text-3xl font-semibold text-white">08</span>
                    <span className="mt-1 block text-[7px] font-bold uppercase tracking-[0.24em] text-[#FBAA00]">Verified facts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="group relative pb-6 [perspective:1400px] lg:col-span-8">
            <div className="absolute inset-0 translate-x-4 translate-y-5 rounded-[2rem] bg-[#143B32] opacity-20 transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-7" />
            <div className="relative overflow-hidden rounded-[2rem] border border-[#143B32]/15 bg-[#FFFEFA] shadow-[0_35px_70px_-35px_rgba(20,59,50,0.55)] transition-[transform,box-shadow] duration-700 ease-out [transform:rotateX(2deg)_rotateY(-2deg)] [transform-style:preserve-3d] group-hover:shadow-[0_45px_80px_-32px_rgba(20,59,50,0.65)] group-hover:[transform:rotateX(0deg)_rotateY(0deg)_translateY(-6px)]">
              <div className="relative flex items-center justify-between overflow-hidden bg-[#143B32] px-6 py-5 sm:px-8">
                <div className="absolute -right-8 -top-16 h-40 w-40 rounded-full border-[24px] border-[#579515]/25" />
                <div className="relative">
                  <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#FBAA00]">Official company dossier</div>
                  <div className="display mt-1 text-base font-semibold text-white">Business Registry</div>
                </div>
                <div className="relative grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-[#579515] text-[10px] font-bold text-white shadow-[0_8px_0_#315B0D]">08</div>
              </div>

              <dl className="grid sm:grid-cols-2">
              {[
                ["Nature of Business", siteConfig.natureOfBusiness],
                [
                  "Additional Business",
                  siteConfig.additionalBusiness.join(", "),
                ],
                ["CEO", siteConfig.ceo],
                ["GST Registration Date", siteConfig.gstSince],
                ["Legal Status", siteConfig.legalStatus],
                ["Year Established", siteConfig.established],
                [
                  "Location",
                  `${siteConfig.address.city}, ${siteConfig.address.state}`,
                ],
                ["Working Hours", siteConfig.workingHours],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={`relative flex min-h-[112px] gap-4 border-[#143B32]/10 px-5 py-5 transition-colors duration-300 hover:bg-[#EDF4E7] sm:px-7 ${
                    index < 6 ? "border-b" : ""
                  } ${index % 2 === 0 ? "sm:border-r" : ""}`}
                >
                  <span className="display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FBAA00]/15 text-[10px] font-semibold text-[#143B32]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <dt className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#579515]">{label}</dt>
                    <dd className="display mt-2 text-sm font-semibold leading-snug text-[#143B32] sm:text-base">{value}</dd>
                  </div>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#FBAA00] transition-all duration-500 hover:w-full" />
                </div>
              ))}
              </dl>

              <div className="flex items-center justify-between border-t border-[#143B32]/10 bg-[#EDF4E7] px-6 py-3 text-[7px] font-bold uppercase tracking-[0.22em] text-[#143B32]/50 sm:px-8">
                <span>Company profile · Verified information</span>
                <span className="h-2 w-2 rounded-full bg-[#579515] shadow-[0_0_0_4px_rgba(87,149,21,0.12)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
