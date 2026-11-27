import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle, FaGlobeAsia, FaIndustry, FaPencilRuler, FaRecycle, FaShieldAlt } from "react-icons/fa";

import HeroSlider from "@/components/HeroSlider";
import HomeCertificates from "@/components/HomeCertificates";
import ManagedSectionImage from "@/components/ManagedSectionImage";
import { loadCategories, loadProducts } from "@/lib/data";
import { siteConfig } from "@/data/site";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: `${siteConfig.name} — Home Textile Manufacturer & Exporter, Karur, India` },
  description: siteConfig.description,
  keywords: [
    "home textile manufacturer India",
    "home textile exporter",
    "table linen manufacturer",
    "kitchen linen exporter",
    "bed linen manufacturer",
    "Karur home textiles",
  ],
  openGraph: {
    title: `${siteConfig.name} — Home Textile Manufacturer & Exporter`,
    description: siteConfig.description,
    type: "website",
    siteName: siteConfig.name,
  },
};

/** Request-a-quote target: the enquiry form section on the contact page. */
const QUOTE_HREF = "/contact#enquiry";

/** Hosts allowed by `images.remotePatterns` in next.config.js can be optimised by next/image. */
const OPTIMISABLE_HOSTS = new Set(["res.cloudinary.com", "images.unsplash.com", "plus.unsplash.com"]);
function canOptimise(src: string) {
  if (src.startsWith("/")) return true;
  try {
    return OPTIMISABLE_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

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

const partnerFeatures = [
  { Icon: FaIndustry, title: "Manufacturing Strength", description: "Modern infrastructure and skilled craftsmanship." },
  { Icon: FaShieldAlt, title: "Quality Assurance", description: "Consistent quality checks throughout production." },
  { Icon: FaPencilRuler, title: "Customized Solutions", description: "Textile collections tailored to buyer requirements." },
  { Icon: FaGlobeAsia, title: "Global Export Capabilities", description: "Reliable manufacturing and export coordination." },
];

/**
 * Testing/inspection standards already stated in the company's existing content
 * (certificate logos themselves come from the CMS via HomeCertificates).
 */
const qualityStandards = ["REACH compliant", "AZO free", "AQL 2.5 / 4.0 inspection"];

export default async function HomePage() {
  const [categoryData, productData] = await Promise.all([loadCategories(), loadProducts()]);

  const categories = (categoryData ?? []).filter((category) => category?.name && category?.slug);
  const heroProducts = (productData ?? [])
    .filter((product) => Boolean(product.images?.[0]))
    .slice(0, 8)
    .map((product) => ({ id: product.id, name: product.name, slug: product.slug, image: product.images[0] }));

  // Only verified figures from the company profile; the category count is shown
  // only when the catalogue has actually loaded.
  const established = Number(siteConfig.established);
  const years = Number.isFinite(established) ? new Date().getFullYear() - established : 0;
  const keyStats = [
    years > 0 && { value: `${years}+`, label: "Years of experience" },
    { value: "Europe & Japan", label: "Export markets" },
    categories.length > 0
      ? { value: String(categories.length), label: "Product categories" }
      : { value: "133,689 sq. ft.", label: "Manufacturing infrastructure" },
    { value: "375,000 m", label: "Monthly production capacity" },
  ].filter((stat): stat is { value: string; label: string } => Boolean(stat));

  return (
    <div className={styles.home}>
      <HeroSlider products={heroProducts} />

      {/* 2. About & key statistics */}
      <section className={styles.section} aria-labelledby="about-title">
        <div className={`${styles.container} ${styles.about}`}>
          <div>
            <p className={styles.label}>About our company</p>
            <h2 id="about-title">Three Decades of <span>Textile Excellence</span></h2>
          </div>
          <div className={styles.aboutCopy}>
            <p>
              Based in Karur, India, {siteConfig.name} manufactures and exports quality home textiles for international
              markets. Combining traditional craftsmanship, modern manufacturing and responsible production, we deliver
              reliable textile solutions tailored to global buyer requirements.
            </p>
            <Link href="/about" className={styles.secondary}>About Our Company <FaArrowRight aria-hidden /></Link>
          </div>
        </div>
        <dl className={`${styles.container} ${styles.stats}`}>
          {keyStats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 3. Product collections */}
      <section className={styles.section} aria-labelledby="collections-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.label}>Our collections</p>
              <h2 id="collections-title">Explore Our <span>Product Collections</span></h2>
              <p className={styles.subtitle}>Thoughtfully crafted home textiles for every space.</p>
            </div>
            <Link href="/products" className={styles.secondary}>View All Products <FaArrowRight aria-hidden /></Link>
          </div>
          {categories.length > 0 ? (
            <div className={styles.collectionGrid}>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products?category=${encodeURIComponent(category.slug)}`}
                  className={styles.collectionCard}
                  aria-label={`Explore the ${category.name} collection`}
                >
                  <span className={styles.collectionMedia}>
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt=""
                        fill
                        sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 400px"
                        className={styles.photo}
                        unoptimized={!canOptimise(category.image)}
                      />
                    ) : (
                      <span className={styles.imagePlaceholder} aria-hidden>{category.name}</span>
                    )}
                  </span>
                  <span className={styles.collectionCaption}>
                    <span className={styles.collectionName}>{category.name}</span>
                    <span className={styles.collectionLink} aria-hidden><span className={styles.collectionLinkText}>Explore Collection</span> <FaArrowRight /></span>
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className={styles.emptyState}>
              Our collections are being updated. <Link href="/products">Browse all products</Link> or{" "}
              <Link href={QUOTE_HREF}>request our latest catalogue</Link>.
            </p>
          )}
        </div>
      </section>

      {/* History & evolution */}
      <section className={styles.section} aria-labelledby="history-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}><div><p className={styles.label}>History &amp; Evolution</p><h2 id="history-title">Three decades of textile excellence,<br /><span>woven one milestone at a time.</span></h2></div></div>
          <p className={styles.intro}>Established in 1996 in Karur, Tamil Nadu, Jai Export Enterprises has grown into a trusted manufacturer and exporter known for craftsmanship, reliability and superior product standards.</p>
          <div className={styles.historyLayout}>
            <div className={styles.legacy}>
              <p className={styles.label}>A legacy in motion · Since 1996</p><strong>30</strong><p>Years of expertise</p><h3>Traditional expertise,<br /><span>guided by modern standards.</span></h3><p>Our textile knowledge, responsible production and exacting quality standards continue to shape every collection we make.</p>
              <div className={styles.legacyDetails}><div><FaGlobeAsia aria-hidden /><h3>Global reach</h3><p>Germany &amp; IHGF Delhi</p></div><div><FaRecycle aria-hidden /><h3>Responsible craft</h3><p>Reduce · Reuse · Recycle</p></div></div>
            </div>
            <div><p className={styles.label}>Our journey · 1996 — 2026</p><h3 className={styles.panelTitle}>Defining moments</h3><ol className={styles.timeline}>{evolutionHighlights.map((item, index) => <li key={item.title}><span className={styles.timelineNumber}>{String(index + 1).padStart(2, "0")}</span><div><span className={styles.marker}>{item.marker}</span><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol></div>
          </div>
          <div className={styles.portfolio}><div><p className={styles.label}>Core portfolio</p><h3>Made for every room.</h3></div><div className={styles.portfolioGrid}>{corePortfolio.map((item, index) => <article key={item.title} className={styles.portfolioItem}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.products}</p></div><FaArrowRight aria-hidden /></article>)}</div></div>
        </div>
      </section>

      {/* 4. Why choose us */}
      <section className={styles.section} aria-labelledby="partner-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.label}>Why choose us</p>
              <h2 id="partner-title">Why Partner <span>With Us?</span></h2>
            </div>
          </div>
          <ul className={styles.features}>
            {partnerFeatures.map(({ Icon, title, description }) => (
              <li key={title}>
                <span className={styles.iconChip}><Icon aria-hidden /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Manufacturing & sustainability */}
      <section className={styles.section} aria-labelledby="manufacturing-title">
        <div className={`${styles.container} ${styles.manufacturing}`}>
          <div className={styles.manufacturingMedia}>
            <ManagedSectionImage
              pageKey="about"
              slotKey="story-primary"
              fallbackImage="https://res.cloudinary.com/ddpfxvydm/image/upload/v1787643040/About_img_1_vwqrzs.png"
              alt="Textile production at the Jai Export Enterprises facility"
              className={styles.photo}
              loading="lazy"
            />
          </div>
          <div className={styles.manufacturingCopy}>
            <p className={styles.label}>Manufacturing &amp; sustainability</p>
            <h2 id="manufacturing-title">Manufactured with Care. <span>Built for Tomorrow.</span></h2>
            <p>
              Combining efficient manufacturing, responsible resource management and quality-focused production to create
              lasting home textile collections.
            </p>
            <div className={styles.inlineActions}>
              <Link href="/about#facilities" className={styles.primary}>Explore Manufacturing <FaArrowRight aria-hidden /></Link>
              <Link href="/sustainability" className={styles.secondary}>Our Sustainability Approach <FaArrowRight aria-hidden /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quality & certifications */}
      <section className={styles.section} aria-labelledby="quality-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.label}>Quality &amp; certifications</p>
              <h2 id="quality-title">Committed to International <span>Quality Standards</span></h2>
            </div>
            <Link href="/certifications" className={styles.secondary}>View Certifications <FaArrowRight aria-hidden /></Link>
          </div>
          <ul className={styles.standards} aria-label="Applicable quality standards">
            {qualityStandards.map((standard) => (
              <li key={standard}><FaCheckCircle aria-hidden />{standard}</li>
            ))}
          </ul>
          <HomeCertificates />
        </div>
      </section>

      {/* 7. Business enquiry */}
      <section className={`${styles.section} ${styles.enquiry}`} aria-labelledby="enquiry-title">
        <div className={styles.container}>
          <div className={styles.enquiryPanel}>
            <div>
              <h2 id="enquiry-title">Your Trusted <span>Home Textile Partner</span></h2>
              <p>Connect with us to discuss your home textile sourcing requirements, customized collections and bulk orders.</p>
            </div>
            <div className={styles.actions}>
              <Link href={QUOTE_HREF} className={styles.primary}>Request a Quote <FaArrowRight aria-hidden /></Link>
              <Link href="/contact" className={styles.secondary}>Contact Us <FaArrowRight aria-hidden /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
