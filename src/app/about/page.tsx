import type { Metadata } from "next";
import Link from "next/link";
import {
  FaQuoteLeft,
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
import PremiumPageBanner from "@/components/PremiumPageBanner";
import PremiumTeamwork from "@/components/PremiumTeamwork";
import ManagedSectionImage from "@/components/ManagedSectionImage";
import SectionTitle from "@/components/SectionTitle";
import { siteConfig, stats } from "@/data/site";
import { loadProducts } from "@/lib/data";
import styles from "./about.module.css";

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
    Icon: FaEye,
    title: "Stringent Inspection Protocol",
    description:
      "Our specialized team conducts a thorough analysis of every stage of the production process to guarantee the highest quality.",
  },
  {
    Icon: FaGlobe,
    title: "International Standards",
    description:
      "We follow ISO 9001:2015 procedures and maintain compliance with AQL 4.0 and 2.5 standards to uphold product excellence.",
  },
  {
    Icon: FaUserTie,
    title: "Investment in Human Capital",
    description:
      "Our employees are our most valuable asset. We carefully recruit and extensively train people to fulfil their responsibilities with confidence.",
  },
  {
    Icon: FaHandshake,
    title: "Our Commitment",
    description:
      "Together with our employees and suppliers, we pursue continuous improvement through a robust quality-management framework and shared accountability.",
  },
];

const facilities = [
  {
    Icon: FaTshirt,
    title: "Stitching",
    description:
      "We employ modern stitching machines for efficient bulk production and have trained staff who understand and develop our customers’ designs. Our dedicated workforce ensures meticulous hemming, guaranteeing superior product delivery to our clients.",
  },
  {
    Icon: FaIndustry,
    title: "Weaving",
    description:
      "We specialize in sourcing weaving materials from diverse regions and producing high-end fabrics using Handloom, Power Loom and Auto Loom units. Our offerings include Plain, Check, Dobby and Jacquard designs in widths ranging from 33 cm to 300 cm, all crafted with high-quality yarns from leading spinning mills.",
  },
  {
    Icon: FaStore,
    title: "Showroom",
    description:
      "Our showroom is elegantly designed to enhance the customer experience, showcasing our products with meticulous attention to detail and aesthetic appeal.",
  },
  {
    Icon: FaTint,
    title: "Dyeing",
    description:
      "We specialize in dyeing yarn and fabrics using advanced machinery to process up to 60,000 kg of yarn and 50,000 metres of fabric monthly. Our methods include Cheese and Cabinet dyeing for yarn, and Jigger dyeing for fabrics. We adhere to AZO Free, OEKO-TEX and REACH standards for environmental and safety compliance.",
  },
  {
    Icon: FaPrint,
    title: "Printing",
    description:
      "Our team offers superior rotary printing solutions with advanced machinery in spacious units, ensuring top-quality results.",
  },
];

export default async function AboutPage() {
  const showcaseProducts = (await loadProducts())
    .filter((product) => Boolean(product.images?.[0]))
    .slice(0, 3);

  const businessInfo = [
    ["Nature of Business", siteConfig.natureOfBusiness],
    ["Additional Business", siteConfig.additionalBusiness.join(", ")],
    ["CEO", siteConfig.ceo],
    ["GST Registration Date", siteConfig.gstSince],
    ["Legal Status", siteConfig.legalStatus],
    ["Year Established", siteConfig.established],
    ["Location", `${siteConfig.address.city}, ${siteConfig.address.state}`],
    ["Working Hours", siteConfig.workingHours],
  ];

  return (
    <div className={`lux-page ${styles.about}`}>
      <PremiumPageBanner
        eyebrow="Our Story"
        title={<>A textile house woven into the fabric of <span>{siteConfig.address.city}.</span></>}
        description={<>Manufacturing cotton, handloom and finished textiles from one of Tamil Nadu&apos;s oldest textile towns—since {siteConfig.established}.</>}
        current="About"
        bgImage="https://images.unsplash.com/photo-1738520420640-5818ce094b4e?auto=format&fit=crop&w=1920&q=85"
        actions={<>
          <Link href="/products" className="lux-btn">Explore products <FaArrowRight aria-hidden /></Link>
          <Link href="/contact" className="lux-btn lux-btn--light">Contact us</Link>
        </>}
      />

      {/* Who we are */}
      <section id="page-content" className="lux-section">
        <div className="lux-container grid items-center gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="relative mx-auto w-full max-w-[520px] lg:col-span-5">
            <div className="lux-frame mr-6 sm:mr-10">
              <div className="lux-media aspect-square">
                <ManagedSectionImage pageKey="about" slotKey="story-primary" fallbackImage="https://res.cloudinary.com/ddpfxvydm/image/upload/v1787643040/About_img_1_vwqrzs.png" alt="Handloom weaving" className="absolute inset-0" />
              </div>
            </div>
            <div className="lux-media absolute -bottom-5 right-0 aspect-[4/3] w-[43%] border-4 border-white shadow-[0_18px_34px_-26px_rgba(28,28,28,0.45)]">
              <ManagedSectionImage pageKey="about" slotKey="story-secondary" fallbackImage="https://res.cloudinary.com/ddpfxvydm/image/upload/v1787643046/Screenshot_2026-08-25_124048_bgxa68.png" alt="Finished cotton home textiles" className="absolute inset-0" />
            </div>
            <div className="absolute -left-2 top-6 rounded-[2px] bg-[#FBAA00] px-4 py-3 transition duration-500 hover:-translate-y-1">
              <div className="font-[family-name:var(--lux-heading)] text-2xl font-bold text-[#1C1C1C]">{siteConfig.established}</div>
              <div className="mt-1 font-[family-name:var(--lux-heading)] text-[9px] font-semibold uppercase tracking-[0.2em] text-[#1C1C1C]/70">Established</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="Who we are"
              title={<>The masters of <span>weaving</span></>}
              description="Established in 1996 in Karur, Jai Export Enterprises has grown into a trusted global manufacturer and exporter of sustainable, high-quality home textiles."
              className="!mb-5"
            />

            <div className="grid gap-3 text-sm leading-relaxed md:text-base">
              <p>
                <strong className="font-semibold text-[#1C1C1C]">Launch of Jai Export Enterprises (1996) — The Modernization:</strong>{" "}
                Family textile expertise became Jai Export Enterprises in 1996. Modern stitching capacity helped bring Karur-made table, kitchen and bed linen to international buyers.
              </p>
              <p>
                <strong className="font-semibold text-[#1C1C1C]">Tech-Driven, Global Pioneers (The Present &amp; Future):</strong>{" "}
                From Karur Textile Park, we combine sustainable materials, technology-led quality control and digital sampling to deliver large orders reliably, supported by three generations of experience and ethical practices.
              </p>
            </div>

            <dl className="mt-5 grid border-t border-[#EEE8DC] sm:grid-cols-2">
              {values.map(({ label, value }) => (
                <div key={label} className="lux-row border-b border-[#EEE8DC] px-3 py-3">
                  <dt className="lux-kicker !text-[10px]">{label}</dt>
                  <dd className="mt-1 font-[family-name:var(--lux-heading)] text-sm font-semibold !leading-relaxed md:text-base text-[#1C1C1C]">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products" className="lux-btn">See our products <FaArrowRight aria-hidden /></Link>
              <Link href="/contact" className="lux-btn lux-btn--ghost">Visit our facility</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="lux-section lux-section--tight">
        <div className={`lux-container ${styles.compactStats}`}>
          <StatsCounter items={stats} />
        </div>
      </section>

      {/* Founder */}
      <section className="lux-section">
        <div className="lux-container">
          <div className="lux-panel grid items-center gap-6 !p-0 md:grid-cols-[1.25fr_0.75fr]">
            <div className="p-6 md:p-8">
              <p className="lux-eyebrow">From the founder</p>
              <FaQuoteLeft aria-hidden className="mt-4 h-8 w-8 text-[#FBAA00]" />
              <blockquote className="mt-4 font-[family-name:var(--lux-heading)] text-lg font-medium !leading-relaxed text-[#1C1C1C] md:text-xl">
                &ldquo;We started {siteConfig.name} Textile with one principle — make cloth we&apos;d be happy to use ourselves, and sell it at a price we&apos;d pay. Thirty years later, that principle hasn&apos;t changed. Every reorder from a wholesale partner is a vote of confidence we take seriously.&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-4 border-t border-[#EEE8DC] pt-4">
                <span className="h-12 w-[3px] bg-[#FBAA00]" />
                <div>
                  <div className="font-[family-name:var(--lux-heading)] text-lg font-semibold text-[#1C1C1C]">{siteConfig.ceo}</div>
                  <div className="lux-kicker mt-1 !text-[10px]">Founder &amp; CEO</div>
                </div>
              </div>
            </div>
            <div className={`lux-media relative h-full min-h-[260px] !rounded-none ${styles.founderMedia}`}>
              <ManagedSectionImage pageKey="about" slotKey="founder" fallbackImage="https://images.unsplash.com/photo-1542178243-bc20204b769f?w=700&auto=format&fit=crop&q=85" alt="Founder" className={`absolute inset-0 ${styles.founderImage}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100D08]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 rounded-[2px] border border-white/25 bg-[#100D08]/55 px-5 py-3 backdrop-blur-md">
                <span className="font-[family-name:var(--lux-heading)] text-2xl font-bold text-white">30+</span>
                <span className="ml-3 font-[family-name:var(--lux-heading)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FFC533]">Years experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showcaseProducts.length > 0 && (
        <section className="lux-section">
          <div className="lux-container">
            <SectionTitle
              eyebrow="Made in Karur"
              title={<>Craftsmanship you can <span>see and feel</span></>}
              description="A closer look at selected home textiles from our current product collection."
              className="!mb-5"
            />
            <div className={styles.productShowcase}>
              {showcaseProducts.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className={`${styles.productStory} ${index === 0 ? styles.productStoryFeatured : ""}`}
                  aria-label={`View ${product.name}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.images[0]} alt={product.name} loading="lazy" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quality, mission & vision */}
      <section className="lux-section">
        <div className="lux-container">
          <SectionTitle
            eyebrow="Our quality"
            title={<>Customer satisfaction, <span>built into every process</span></>}
            description={`${siteConfig.name} is dedicated to achieving utmost customer satisfaction through premium home furnishing fabrics and made-ups at competitive prices. We adhere strictly to delivery schedules, meet customer specifications and continually enhance our processes. We craft high-quality home textiles with a planet-first approach, blending traditional craftsmanship with modern sustainability.`}
            align="center"
            ornament
          />

          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {[
              { Icon: FaBullseye, kicker: "Our purpose", title: "Our Mission", copy: "Our mission is to deliver exceptional products and trade services across global borders by upholding the highest standards of quality, reliability and business ethics. We are committed to ethical practices and environmental stewardship." },
              { Icon: FaBinoculars, kicker: "Our future", title: "Our Vision", copy: "To be a globally trusted leader in international trade, recognised for seamless global supply-chain excellence, uncompromising ethical integrity and a steadfast commitment to building a sustainable, eco-conscious future." },
            ].map(({ Icon, kicker, title, copy }) => (
              <article key={title} className="lux-card lux-card--wash flex flex-col gap-4 sm:flex-row sm:items-start">
                <span className="lux-icon"><Icon /></span>
                <div>
                  <p className="lux-kicker">{kicker}</p>
                  <h3 className="mt-2 text-lg md:text-xl">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed md:text-base">{copy}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {qualityCommitments.map(({ Icon, title, description }, index) => (
              <article key={title} className="lux-card">
                <div className="flex items-center justify-between">
                  <span className="lux-icon lux-icon--sm"><Icon /></span>
                  <span className="lux-num !text-[30px]">0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-lg md:text-xl">{title}</h3>
                <p className="mt-2 text-sm !leading-relaxed md:text-base">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PremiumTeamwork />

      {/* Facilities */}
      <section className="lux-section">
        <div className="lux-container">
          <SectionTitle
            eyebrow="Integrated manufacturing"
            title={<>Our <span>facilities</span></>}
            description="Purpose-built production and presentation capabilities help move each buyer programme from fabric development to finished home textiles."
            align="center"
            ornament
          />

          <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-6">
            {facilities.map(({ Icon, title, description }, index) => (
              <article key={title} className={`lux-card flex flex-col lg:col-span-2 ${index === 3 ? "lg:col-start-2" : ""}`}>
                <div className="flex items-center justify-between">
                  <span className="lux-icon"><Icon /></span>
                  <span className="lux-kicker">Facility 0{index + 1}</span>
                </div>
                <h3 className="mt-4 text-lg md:text-xl">{title}</h3>
                <p className="mt-2 text-sm !leading-relaxed md:text-base">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Business information */}
      <section className="lux-section">
        <div className="lux-container grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionTitle eyebrow="At a glance" title={<>Business <span>information</span></>} description="Every important detail, clearly presented and on the record." className="!mb-5" />
              <div className="lux-card lux-card--wash inline-flex items-center gap-4 !py-4">
                <span className="lux-stat text-4xl">{String(businessInfo.length).padStart(2, "0")}</span>
                <span className="lux-kicker max-w-[8rem] !leading-5">Verified company facts</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-[4px] border border-[#EEE8DC] bg-white transition-shadow duration-500 hover:shadow-[0_30px_60px_-34px_rgba(181,122,0,0.55)]">
              <div className="flex items-center justify-between border-b border-[#EEE8DC] bg-[#FFFBF2] px-5 py-4 sm:px-6">
                <div>
                  <p className="lux-kicker !text-[10px]">Official company dossier</p>
                  <h3 className="mt-1 text-lg">Business registry</h3>
                </div>
                <span className="lux-icon lux-icon--sm"><FaIndustry /></span>
              </div>
              <dl className="grid sm:grid-cols-2">
                {businessInfo.map(([label, value], index) => (
                  <div key={label} className={`lux-row flex gap-3 border-[#EEE8DC] px-5 py-4 sm:px-6 ${index < businessInfo.length - 2 ? "border-b" : index < businessInfo.length - 1 ? "border-b sm:border-b-0" : ""} ${index % 2 === 0 ? "sm:border-r" : ""}`}>
                    <span className="font-[family-name:var(--lux-heading)] text-xs font-semibold text-[#B57A00]">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <dt className="lux-kicker !text-[10px]">{label}</dt>
                      <dd className="mt-1 font-[family-name:var(--lux-heading)] text-sm font-semibold !leading-relaxed md:text-base text-[#1C1C1C]">{value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
