import Image from "next/image";
import Link from "next/link";
import { Montserrat, Poppins } from "next/font/google";
import styles from "./home.module.css";
import moment from "moment";
import { FaArrowRight, FaWhatsapp, FaIndustry, FaLeaf, FaHandshake, FaShippingFast, FaTshirt, FaWeight, FaGlobeAsia, FaRecycle, FaCheckCircle } from "react-icons/fa";

import HeroSlider from "@/components/HeroSlider";
import HomeCertificates from "@/components/HomeCertificates";





import OfferBanner from "@/components/OfferBanner";

import {
  loadCategories,
  loadProducts,
  loadBlogs,

  loadOffers,
} from "@/lib/data";
import { siteConfig, stats, whyChooseUs, manufacturingProcess } from "@/data/site";

const heading = Montserrat({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--home-heading", display: "swap" });
const body = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--home-body", display: "swap" });

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

const pillarSummaries = [
  "Modern production supported by careful checks.",
  "Home textiles across key living categories.",
  "Consistent standards from material to inspection.",
  "Reliable coordination for every delivery.",
];

export default async function HomePage() {
  const [categoryData, productData, blogData, offerData] = await Promise.all([
    loadCategories(),
    loadProducts(),
    loadBlogs(),

    loadOffers(),
  ]);

  const categories = categoryData ?? [];
  const products = productData ?? [];
  const blogPosts = blogData ?? [];

  const offers = offerData ?? [];
  const heroProducts = products
    .filter((product) => Boolean(product.images?.[0]))
    .slice(0, 8)
    .map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
    }));

  return (
    <div className={`${styles.home} ${heading.variable} ${body.variable}`}>
      <HeroSlider products={heroProducts} />
      <section className={`${styles.section} ${styles.welcomeSection}`} aria-labelledby="welcome-title">
        <div className={`${styles.container} ${styles.split} ${styles.welcomeGrid}`}>
          <div className={`${styles.copy} ${styles.welcomePanel}`}>
            <p className={styles.label}>Welcome to our company</p>
            <h2 id="welcome-title">Crafting Home Textiles for <span>Modern Living</span></h2>
            <p>Based in Karur, {siteConfig.name} creates thoughtfully crafted home textiles for global retailers, brands, wholesalers and importers. We combine skilled craftsmanship, modern production and responsible material choices in every collection.</p>
            <div className={styles.inlineActions}><Link href="/about" className={styles.primary}>About Our Company <FaArrowRight aria-hidden /></Link><Link href="/products" className={styles.secondary}>Explore Collections <FaArrowRight aria-hidden /></Link></div>
          </div>
          <div className={styles.welcomePanel}>
            <p className={styles.label}>What drives us</p>
            <h3 className={styles.panelTitle}>Key Organizational Pillars</h3>
            <div className={styles.pillars}>{whyChooseUs.map((item, index) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return <article key={item.title} className={styles.featureCard}><div className={styles.featureTop}><span className={styles.iconChip}>{Icon && <Icon aria-hidden />}</span><span className={styles.featureNumber}>0{index + 1}</span></div><h3>{item.title}</h3><p>{pillarSummaries[index] || item.description}</p></article>;
            })}</div>
          </div>
        </div>
        <div className={`${styles.container} ${styles.stats}`}>{stats.map((stat) => <div key={stat.label}><strong>{stat.value.toLocaleString("en-IN")}{stat.suffix}</strong><p>{stat.label}</p></div>)}</div>
      </section>
 {categories.length > 0 && <section className={styles.section} aria-labelledby="collections-title"><div className={styles.container}>
        <div className={styles.sectionHeader}><div><p className={styles.label}>Our range · {categories.length} collections</p><h2 id="collections-title">Find the right textile for<br /><span>every space and purpose.</span></h2></div><Link href="/categories" className={styles.secondary}>View all categories <FaArrowRight aria-hidden /></Link></div>
        <p className={styles.intro}>Browse every category currently available in our product catalogue.</p>
        <div className={styles.collectionGrid}>{categories.map((category) => <Link key={category.id} href={`/products?category=${encodeURIComponent(category.slug)}`} className={styles.rangeCard} aria-label={`${category.name} — view products`}>
          {category.image ? <Image src={category.image} alt="" fill sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 33vw" className={styles.photo} unoptimized /> : <span className={styles.imagePlaceholder} aria-hidden>{category.name}</span>}
          <span className={styles.rangeButton} aria-hidden>View products <FaArrowRight /></span>
        </Link>)}</div>
      </div></section>}


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
      
      <section className={styles.section} aria-labelledby="advantages-title">
        <div className={styles.container}>
          <div className={styles.sectionHeader}><div><p className={styles.label}>Production confidence</p><h2 id="advantages-title">Why <span>Choose Us?</span></h2></div><p className={styles.headerDescription}>Integrated processing, precision manufacturing and layered quality control give every buyer programme a dependable path from fabric to dispatch.</p></div>
          <p className={styles.intro}>Our manufacturing systems combine skilled teams with modern equipment, clear commercial terms and internationally recognized product-safety requirements.</p>
          <div className={styles.advantages}>{productionAdvantages.map(({ Icon, number, title, description }) => <article key={title} className={styles.featureCard}><div className={styles.featureTop}><span className={styles.iconChip}><Icon aria-hidden /></span><span className={styles.featureNumber}>{number}</span></div><p className={styles.smallLabel}>Manufacturing advantage</p><h3>{title}</h3><p>{description}</p></article>)}</div>
          <div className={styles.businessLayout}>
            <div><p className={styles.label}>Terms of Business</p><div className={styles.terms}>{businessTerms.map((item, index) => <article key={item.term}><span className={styles.marker}>0{index + 1}</span><div><h3>{item.term}</h3><p>{item.description}</p></div></article>)}</div></div>
            <div><p className={styles.label}>Product Testing Standards</p><div className={styles.testing}>{testingStandards.map((item) => <article key={item.name}><FaCheckCircle aria-hidden /><div><h3>{item.name}</h3><p>{item.detail}</p></div></article>)}</div><Link href="/certifications" className={styles.textLink}>View certification documents <FaArrowRight aria-hidden /></Link></div>
          </div>
        </div>
      </section>
     
      {offers.length > 0 && <section className={styles.section} aria-label="Current offer"><div className={`${styles.container} ${styles.offer}`}><OfferBanner offer={offers[0]} /></div></section>}
      <section className={`${styles.section} ${styles.processSection}`} aria-labelledby="manufacturing-title"><div className={styles.container}>
        <div className={styles.sectionHeader}><div><p className={styles.label}>From yarn to your hands</p><h2 id="manufacturing-title">The making of <span>our cloth.</span></h2></div><div className={styles.stageCount}><strong>{String(manufacturingProcess.length).padStart(2, "0")}</strong><p>Refined stages behind every finished textile.</p></div></div>
        <ol className={styles.process}>{manufacturingProcess.map((step) => <li key={step.step}><span>{step.step}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
      </div></section>
      <section className={`${styles.section} ${styles.certificationSection}`} aria-labelledby="home-certifications-title"><div className={styles.container}>
        <div className={styles.sectionHeader}><div><p className={styles.label}>Certified confidence</p><h2 id="home-certifications-title">Documents that support <span>our standards.</span></h2></div><Link href="/certifications" className={styles.secondary}>View all certifications <FaArrowRight aria-hidden /></Link></div>
        <HomeCertificates />
      </div></section>
      {blogPosts.length > 0 && <section className={styles.section} aria-labelledby="journal-title"><div className={styles.container}>
        <div className={styles.sectionHeader}><div><p className={styles.label}>From the journal · {blogPosts.length} articles</p><h2 id="journal-title">Stories, guidance and<br /><span>notes from our looms.</span></h2></div><Link href="/blog" className={styles.secondary}>View all articles <FaArrowRight aria-hidden /></Link></div><p className={styles.intro}>Explore our latest textile insights, product stories and care advice.</p>
        <div className={styles.journal}>{blogPosts.slice(0, 3).map((blog, index) => <Link key={blog.id} href={`/blog/${blog.slug}`} className={`${styles.collection} ${index === 0 ? styles.featuredStory : ""}`}>
          <div className={styles.storyImage}>{blog.coverImage ? <Image src={blog.coverImage} alt={blog.title} fill sizes="(max-width: 767px) 100vw, 50vw" className={styles.photo} unoptimized /> : <span className={styles.imagePlaceholder}>Journal · {String(index + 1).padStart(2, "0")}</span>}</div>
          <p className={styles.storyMeta}>{blog.category}{blog.publishedAt && ` · ${moment(blog.publishedAt).format("MMM D, YYYY")}`}{blog.readTime > 0 && ` · ${blog.readTime} min read`}</p><h3>{blog.title}</h3><p>{blog.excerpt}</p><span className={styles.textLink}>{index === 0 ? "Read featured story" : "Read article"} <FaArrowRight aria-hidden /></span>
        </Link>)}</div>
      </div></section>}
      <section className={`${styles.section} ${styles.partnership}`} aria-labelledby="enquiry-title"><div className={styles.container}>
        <div className={styles.enquiryCopy}><p className={styles.label}>Get in touch</p><h2 id="enquiry-title">Ready to discuss <span>your next order?</span></h2><p>Share your requirements for a fast response from our team.</p></div><div className={styles.actions}><a href={siteConfig.socials.whatsapp} target="_blank" rel="noopener noreferrer" className={styles.primary}><FaWhatsapp aria-hidden />WhatsApp <FaArrowRight aria-hidden /></a><Link href="/contact" className={styles.secondary}>Send Enquiry <FaArrowRight aria-hidden /></Link></div>
      </div></section>
    </div>
  );
}
