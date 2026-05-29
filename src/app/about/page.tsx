import type { Metadata } from "next";
import Link from "next/link";
import { FaQuoteRight, FaCheckCircle, FaArrowRight } from "react-icons/fa";

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
            <div className="absolute -top-4 -left-4 hidden md:block rounded-2xl bg-gold text-maroon-950 p-5 max-w-[180px]">
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
          <div className="relative overflow-hidden rounded-3xl bg-maroon-950 text-cream-50 p-10 md:p-16">
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
              <h3 className="display text-3xl font-semibold text-maroon-950 mt-3">Mission</h3>
              <p className="mt-4 text-ink-soft leading-relaxed">
                To produce honest, well-made cotton and handloom textiles —
                priced fairly, finished consistently, and delivered on time. To
                make wholesale buying as transparent as it used to be, and as
                reliable as it should be.
              </p>
            </div>
            <div className="card p-10 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-maroon-200/40" />
              <div className="display text-7xl text-maroon-200 font-semibold leading-none">02</div>
              <h3 className="display text-3xl font-semibold text-maroon-950 mt-3">Vision</h3>
              <p className="mt-4 text-ink-soft leading-relaxed">
                To become the default partner for small and mid-sized textile
                retailers across India — the supplier who picks up the phone,
                knows the product, and delivers without surprises. Year after year.
              </p>
            </div>
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
                  <dd className="display text-xl text-maroon-950 font-semibold mt-2">
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
