import type { Metadata } from "next";
import Link from "next/link";
import {
  FaQuoteRight,
  FaCheckCircle,
  FaArrowRight,
  FaHandshake,
  FaIndustry,
  FaPalette,
  FaPrint,
  FaStore,
  FaTint,
  FaTshirt,
} from "react-icons/fa";

import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import StatsCounter from "@/components/StatsCounter";
import { siteConfig, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    `Learn about ${siteConfig.name} Textile — a leading textile manufacturer from ${siteConfig.address.city}, ${siteConfig.address.state}, specializing in cotton and handloom products since ${siteConfig.established}.`,
};

const values = [
  "Pure cotton, ethically sourced from regional spinning mills",
  "Strict GSM and finish standards on every roll",
  "Honest pricing — no inflated MRPs, no hidden markups",
  "Direct from manufacturer — no middleman costs",
  "Pan-India despatch with reliable transport partners",
  "GST-compliant invoicing for wholesale buyers",
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

const teamwork = [
  {
    Icon: FaIndustry,
    role: "MD",
    title: "Strategic Leadership",
    focus: "Global vision, compliance and infrastructure scaling",
    description:
      "Steers the enterprise through investment in advanced textile technology, fair-trade labour practices and uncompromising international quality benchmarks.",
  },
  {
    Icon: FaHandshake,
    role: "Merchandising",
    title: "The Operational Bridge",
    focus: "Costing, buyer alignment and timeline enforcement",
    description:
      "Acts as the dedicated point of contact for global buyers, managing critical paths, aligning material supply chains and keeping shipments on schedule and within budget.",
  },
  {
    Icon: FaPalette,
    role: "Designers",
    title: "Creative Trendsetters",
    focus: "Aesthetic innovation and global market research",
    description:
      "Translates evolving interior trends across Europe and North America into commercial weave patterns, prints, motifs and structural concepts for table, kitchen and bed linen.",
  },
];

const facilities = [
  {
    Icon: FaTshirt,
    number: "01",
    title: "Stitching",
    description:
      "Modern stitching machines and trained teams support efficient bulk production, customer-specific design development and meticulous hemming.",
  },
  {
    Icon: FaIndustry,
    number: "02",
    title: "Weaving",
    description:
      "Handloom, power loom and auto loom capabilities produce plain, check, dobby and jacquard fabrics in widths from 33 cm to 300 cm.",
  },
  {
    Icon: FaStore,
    number: "03",
    title: "Showroom",
    description:
      "An elegantly designed presentation space showcases coordinated products with close attention to detail and customer experience.",
  },
  {
    Icon: FaTint,
    number: "04",
    title: "Dyeing",
    description:
      "Cheese, cabinet and jigger dyeing facilities process up to 60,000 kg of yarn and 50,000 metres of fabric monthly, following AZO-free, OEKO-TEX and REACH requirements.",
  },
  {
    Icon: FaPrint,
    number: "05",
    title: "Printing",
    description:
      "Advanced rotary-printing machinery in spacious production units supports consistent, high-quality results at commercial scale.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title={`A textile house woven into the fabric of ${siteConfig.address.city}.`}
        subtitle={`Manufacturing cotton, handloom and finished textiles from one of Tamil Nadu's oldest textile towns — since ${siteConfig.established}.`}
        bgImage="https://images.unsplash.com/photo-1620713043691-2a6c2c5dd47f?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Overview */}
      <section className="section-y">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1200&auto=format&fit=crop&q=80"
                alt="Handloom weaving"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 md:right-4 w-44 md:w-52 aspect-square overflow-hidden rounded-2xl border-4 border-cream-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&auto=format&fit=crop&q=80"
                alt="Cotton textile"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -top-4 -left-4 hidden md:block rounded-2xl bg-gold text-gray-950 p-5 max-w-[180px]">
              <div className="display text-3xl font-semibold leading-none">{siteConfig.established}</div>
              <div className="text-[10px] uppercase tracking-widest-x font-bold mt-1">
                Year established
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="Who We Are"
              title="Honest manufacturing, woven the right way."
              description={`${siteConfig.name} Textile is a proprietorship firm based in ${siteConfig.address.city}, ${siteConfig.address.state} — the textile heartland of South India. We manufacture and wholesale a focused range of cotton and handloom products: petticoats, lungis, towels, gamcha, bed sheets, dhotis and stoles.`}
            />
            <p className="text-ink-soft leading-relaxed mb-6">
              Started in {siteConfig.established} by {siteConfig.ceo}, we've grown
              from a small workshop into a recognised supplier serving retailers,
              boutiques, hostels and households across India. We've kept things
              deliberately small — large enough to deliver consistent quality,
              small enough that you'll always know who you're dealing with.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
              {values.map((v) => (
                <div key={v} className="flex items-start gap-3 py-1.5">
                  <FaCheckCircle className="h-4 w-4 text-gold shrink-0 mt-1" />
                  <span className="text-sm text-ink-soft">{v}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                See Our Products <FaArrowRight className="h-3 w-3" />
              </Link>
              <Link href="/contact" className="btn-outline">
                Visit Our Facility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-cream-100/50">
        <div className="container-x">
          <StatsCounter items={stats} />
        </div>
      </section>

      {/* Founder message */}
      <section className="section-y">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-gray-950 text-cream-50 p-10 md:p-16">
            <div className="absolute inset-0 bg-weave-dark opacity-40" />
            <FaQuoteRight className="absolute top-8 right-8 h-24 w-24 text-gold/15" />
            <div className="relative grid md:grid-cols-3 gap-10 items-center">
              <div className="md:col-span-2">
                <div className="eyebrow !text-gold-light mb-5">
                  <span>From the founder</span>
                </div>
                <blockquote className="display text-2xl md:text-3xl font-medium leading-snug italic">
                  &ldquo;We started {siteConfig.name} Textile with one principle — make
                  cloth we'd be happy to use ourselves, and sell it at a price we'd
                  pay. Eight years later, that principle hasn't changed. Every
                  reorder from a wholesale partner is a vote of confidence we
                  take seriously.&rdquo;
                </blockquote>
                <div className="mt-6">
                  <div className="display text-xl font-semibold text-cream-50">
                    {siteConfig.ceo}
                  </div>
                  <div className="text-xs uppercase tracking-wider-x text-gold-light">
                    Founder & CEO
                  </div>
                </div>
              </div>
              <div className="md:col-span-1">
                <div className="aspect-square rounded-2xl overflow-hidden border-4 border-cream-50/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1542178243-bc20204b769f?w=600&auto=format&fit=crop&q=80"
                    alt="Founder"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="section-y relative overflow-hidden bg-gray-950 text-cream-50">
        <div className="absolute inset-0 bg-weave-dark opacity-50" />
        <div className="absolute -left-24 -top-28 h-80 w-80 rounded-full border-[70px] border-white/[0.025]" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-gold/[0.06] blur-3xl" />

        <div className="container-x relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest-x text-gold-light">
                <span className="h-px w-10 bg-gold" /> Our Quality
              </div>
              <h2 className="display mt-5 text-4xl font-semibold leading-tight md:text-5xl">
                Customer satisfaction, built into every process
              </h2>
              <p className="mt-5 max-w-3xl leading-relaxed text-cream-100/75">
                {siteConfig.name} is dedicated to delivering premium home furnishing
                fabrics and made-ups at competitive prices. We adhere closely to
                delivery schedules, meet customer specifications and continually
                improve our processes.
              </p>
            </div>
            <div className="lg:col-span-5">
              <p className="border-l-2 border-[#8ca947] pl-5 text-sm italic leading-relaxed text-cream-100/70">
                We craft high-quality home textiles with a planet-first approach,
                blending traditional craftsmanship with modern sustainability.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {qualityCommitments.map(({ number, title, description }) => (
              <article
                key={title}
                className="group relative min-h-[260px] bg-gray-950/90 p-7 transition hover:bg-gray-900"
              >
                <span className="absolute right-5 top-3 display text-5xl font-bold text-white/[0.05]">
                  {number}
                </span>
                <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-light transition group-hover:bg-gold group-hover:text-gray-950">
                  <FaCheckCircle className="h-4 w-4" />
                </div>
                <h3 className="display mt-6 text-2xl font-semibold leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream-100/60">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-y bg-cream-100/50">
        <div className="container-x">
          <SectionTitle
            eyebrow="Direction"
            title="Mission & Vision"
            align="center"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-10 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gold/10" />
              <div className="display text-7xl text-gold/30 font-semibold leading-none">01</div>
              <h3 className="display text-3xl font-semibold text-gray-950 mt-3">Mission</h3>
              <p className="mt-4 text-ink-soft leading-relaxed">
                Our mission is to deliver exceptional products and trade services
                across global borders by upholding the highest standards of quality,
                reliability and business ethics, with a firm commitment to ethical
                practices and environmental stewardship.
              </p>
            </div>
            <div className="card p-10 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gray-200/40" />
              <div className="display text-7xl text-gray-200 font-semibold leading-none">02</div>
              <h3 className="display text-3xl font-semibold text-gray-950 mt-3">Vision</h3>
              <p className="mt-4 text-ink-soft leading-relaxed">
                To be a globally trusted leader in international trade, recognized
                for seamless global supply-chain excellence, uncompromising ethical
                integrity and a steadfast commitment to building a sustainable,
                eco-conscious future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teamwork & workflow */}
      <section className="section-y relative overflow-hidden bg-white">
        <div className="absolute -left-32 top-24 h-80 w-80 rounded-full border-[70px] border-cream-100/70" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold/[0.05] blur-3xl" />
        <div className="container-x relative">
          <SectionTitle
            eyebrow="One coordinated team"
            title="Our Synergistic Teamwork & Workflow"
            description="Strategic leadership, buyer-focused merchandising and creative design work as one connected system—from global market direction to production-ready collections."
            align="center"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {teamwork.map(({ Icon, role, title, focus, description }, index) => (
              <article
                key={role}
                className="group relative min-h-[340px] overflow-hidden rounded-[1.75rem] border border-cream-200 bg-cream-50 p-7 shadow-soft transition duration-500 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-warm sm:p-8"
              >
                <span className="absolute -right-2 -top-6 display text-[8rem] font-bold leading-none text-gray-950/[0.035]">
                  0{index + 1}
                </span>
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gray-950 text-gold-light shadow-soft transition duration-500 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="relative mt-6 text-[9px] font-bold uppercase tracking-widest-x text-gold-dark">
                  {role}
                </div>
                <h3 className="display relative mt-2 text-3xl font-semibold text-gray-950">
                  {title}
                </h3>
                <p className="relative mt-4 border-l-2 border-gold pl-4 text-xs font-semibold uppercase leading-relaxed tracking-wider-x text-gray-800">
                  {focus}
                </p>
                <p className="relative mt-4 text-sm leading-relaxed text-ink-muted">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <div className="relative mx-auto mt-8 hidden max-w-4xl items-center justify-center md:flex">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/40" />
            <span className="mx-4 rounded-full border border-gold/30 bg-cream-50 px-5 py-2 text-[9px] font-bold uppercase tracking-widest-x text-gold-dark">
              Vision · Creativity · Execution
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-y relative overflow-hidden bg-cream-100/60">
        <div className="absolute inset-0 bg-weave-light opacity-70" />
        <div className="container-x relative">
          <SectionTitle
            eyebrow="Integrated manufacturing"
            title="Our Facilities"
            description="Purpose-built production and presentation capabilities help move each buyer programme from fabric development to finished home textiles."
            align="center"
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
            {facilities.map(({ Icon, number, title, description }, index) => (
              <article
                key={title}
                className={`group relative min-h-[290px] overflow-hidden rounded-[1.75rem] border border-white bg-white p-7 shadow-soft transition duration-500 hover:-translate-y-1.5 hover:shadow-warm lg:col-span-2 ${
                  index === 3 ? "lg:col-start-2" : ""
                }`}
              >
                <span className="absolute right-4 top-2 display text-6xl font-bold text-cream-200/70">
                  {number}
                </span>
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-[#718b34] text-white shadow-lg shadow-[#718b34]/15 transition duration-500 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="relative mt-6 text-[9px] font-bold uppercase tracking-widest-x text-gold-dark">
                  Facility {number}
                </div>
                <h3 className="display relative mt-2 text-3xl font-semibold text-gray-950">
                  {title}
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-ink-muted">
                  {description}
                </p>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#718b34] transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Business info */}
      <section className="section-y">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow="At a Glance"
              title="Business Information"
              description="Every detail, on the record."
            />
          </div>
          <div className="lg:col-span-7">
            <dl className="grid sm:grid-cols-2 gap-px bg-cream-200 border border-cream-200 rounded-2xl overflow-hidden">
              {[
                ["Nature of Business", siteConfig.natureOfBusiness],
                ["Additional Business", siteConfig.additionalBusiness.join(", ")],
                ["CEO", siteConfig.ceo],
                ["GST Registration Date", siteConfig.gstSince],
                ["Legal Status", siteConfig.legalStatus],
                ["Year Established", siteConfig.established],
                ["Location", `${siteConfig.address.city}, ${siteConfig.address.state}`],
                ["Working Hours", siteConfig.workingHours],
              ].map(([label, value]) => (
                <div key={label} className="bg-cream-50 p-6">
                  <dt className="text-[10px] uppercase tracking-widest-x text-gold-dark font-semibold">
                    {label}
                  </dt>
                  <dd className="display text-xl text-gray-950 font-semibold mt-2">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
