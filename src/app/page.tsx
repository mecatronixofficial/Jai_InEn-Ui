import Link from "next/link";
import moment from "moment";
import { FaArrowRight, FaWhatsapp, FaIndustry, FaLeaf, FaHandshake, FaShippingFast, FaTshirt, FaWeight, FaGlobeAsia, FaRecycle, FaCheckCircle } from "react-icons/fa";

import HeroSlider from "@/components/HeroSlider";
import SectionTitle from "@/components/SectionTitle";
import CategoryCard from "@/components/CategoryCard";
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
      "Modern sewing machinery, advanced processing facilities and specialized quality-control checks support every stage of production.",
  },
  {
    Icon: FaTshirt,
    number: "02",
    title: "Precision Cutting & Stitching",
    description:
      "A high-capacity stitching floor combines heavy-duty sewing machines, automated cutting tables and specialized folding equipment.",
  },
  {
    Icon: FaCheckCircle,
    number: "03",
    title: "Stringent Quality Control",
    description:
      "Multi-tier inspections—from incoming fabric to final dispatch—help minimize defects and maintain consistent quality across every batch.",
  },
];

const businessTerms = [
  {
    term: "L/C at sight",
    description: "Payment guaranteed by the buyer’s bank after document verification.",
  },
  {
    term: "CAD at sight",
    description: "Payment made upon receipt of the agreed shipping documents.",
  },
  {
    term: "T/T against documents",
    description: "Electronic transfer completed upon receipt of documents.",
  },
];

const testingStandards = [
  { name: "AZO Free", detail: "No harmful azo dyes" },
  { name: "REACH", detail: "EU chemical-safety compliant" },
  { name: "OEKO-TEX", detail: "Tested for harmful substances" },
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
    <>
      {/* HERO */}
      <HeroSlider />

      {/* INTRO / STATS */}
      <section className="section-y bg-cream-50 weave-bg">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
            <div className="eyebrow mb-5">
              <span>Welcome to our company</span>
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-950 leading-[1.05]">
              Crafting Home Textiles for{" "}
              <span className="italic text-gold-dark">Modern Living</span>
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              At {siteConfig.name}, we transform ideas into beautifully crafted home
              textile collections that inspire modern lifestyles. Based in Karur,
              Tamil Nadu, India—one of the world&apos;s leading home textile manufacturing
              hubs—we are a trusted manufacturer and export partner for global
              retailers, brands, wholesalers and importers.
            </p>

            <p className="mt-4 text-ink-soft leading-relaxed">
              Combining craftsmanship with innovation, we develop high-quality home
              textiles that balance contemporary design, functionality, comfort and
              sustainability. Every collection is thoughtfully created to meet evolving
              international market trends and consumer preferences.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                About Our Company
              </Link>
              <Link href="/products" className="btn-outline">
                Explore Collections
              </Link>
            </div>
            </div>

            <div className="lg:col-span-6">
              <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest-x text-gray-800">
                <span className="h-px w-9 bg-gold" />
                Key Organizational Pillars
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {whyChooseUs.map((item, index) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <article
                      key={item.title}
                      className="group relative min-h-[210px] overflow-hidden rounded-2xl border border-cream-200 bg-white p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-warm"
                    >
                      <span className="absolute right-4 top-2 display text-5xl font-bold text-cream-200/70">
                        0{index + 1}
                      </span>
                      <div className="relative grid h-11 w-11 place-items-center rounded-xl bg-gray-950 text-gold-light transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                        {Icon && <Icon className="h-4 w-4" />}
                      </div>
                      <h3 className="display relative mt-5 text-xl font-semibold text-gray-950">
                        {item.title}
                      </h3>
                      <p className="relative mt-2 text-xs leading-relaxed text-ink-muted">
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-cream-200 bg-white p-5 shadow-soft md:p-7">
            <StatsCounter items={stats} />
          </div>
        </div>
      </section>

      {/* HISTORY & EVOLUTION */}
      <section className="section-y relative overflow-hidden bg-gray-950 text-cream-50">
        <div className="absolute inset-0 bg-weave-dark opacity-50" />
        <div className="absolute -left-28 top-20 h-80 w-80 rounded-full border-[70px] border-white/[0.025]" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-gold/[0.07] blur-3xl" />

        <div className="container-x relative">
          <SectionTitle
            eyebrow="History & Evolutionary Milestone"
            title="Three decades of textile excellence"
            description="Established in 1996 in Karur, Tamil Nadu, Jai Export Enterprises has grown into a trusted manufacturer and exporter known for craftsmanship, reliability and superior product standards."
            align="center"
            light
          />

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-5 lg:col-span-5">
              <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-7 backdrop-blur sm:p-8">
                <div className="text-[10px] font-bold uppercase tracking-widest-x text-gold-light">
                  Leadership & Heritage
                </div>
                <h3 className="display mt-4 text-3xl font-semibold leading-tight">
                  Traditional expertise, guided by modern standards
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-cream-100/70">
                  Established under strategic vision and leadership, the company has
                  grown consistently by combining traditional textile knowledge with
                  modern manufacturing standards. This foundation continues to drive
                  our global export footprint and commitment to excellence.
                </p>
              </article>

              <div className="grid gap-5 sm:grid-cols-2">
                <article className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition hover:border-gold/35 hover:bg-white/[0.08]">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold text-gray-950">
                    <FaGlobeAsia className="h-4 w-4" />
                  </div>
                  <h3 className="display mt-5 text-xl font-semibold">International Footprint</h3>
                  <p className="mt-2 text-xs leading-relaxed text-cream-100/65">
                    Collections showcased at Messe Frankfurt, Germany, and the IHGF Delhi Fair.
                  </p>
                </article>

                <article className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 transition hover:border-[#8ca947]/50 hover:bg-white/[0.08]">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#718b34] text-white">
                    <FaRecycle className="h-4 w-4" />
                  </div>
                  <h3 className="display mt-5 text-xl font-semibold">Sustainable Innovation</h3>
                  <p className="mt-2 text-xs leading-relaxed text-cream-100/65">
                    Reduce, Reuse and Recycle principles are integrated across major production lines.
                  </p>
                </article>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative grid gap-px overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/10 sm:grid-cols-2">
                {evolutionHighlights.map(({ marker, title, description }, index) => (
                  <article
                    key={title}
                    className="group relative min-h-[190px] bg-gray-950/90 p-6 transition hover:bg-gray-900 sm:p-7"
                  >
                    <span className="absolute right-5 top-3 display text-4xl font-bold text-white/[0.05]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="display text-2xl font-semibold text-gold-light">{marker}</div>
                    <h3 className="display mt-5 text-xl font-semibold">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-cream-100/60">{description}</p>
                    <FaCheckCircle className="absolute bottom-5 right-5 h-3.5 w-3.5 text-gold/40 transition group-hover:text-gold-light" />
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-9">
            <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest-x text-gold-light">
              <span className="h-px w-10 bg-gold" /> Core Product Portfolio
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {corePortfolio.map(({ title, products }, index) => (
                <article
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5"
                >
                  <span className="display grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/40 text-sm font-bold text-gold-light">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="display text-xl font-semibold">{title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-cream-100/60">{products}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-y relative overflow-hidden bg-cream-50">
        <div className="absolute inset-0 bg-weave-light opacity-60" />
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[72px] border-gray-900/[0.035]" />

        <div className="container-x relative">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5 [&_h2]:!text-gray-950 [&_span]:!text-gray-600">
              <SectionTitle
                eyebrow="Production confidence"
                title="Why Choose Us?"
                description="Integrated processing, precision manufacturing and layered quality control give every buyer programme a dependable path from fabric to dispatch."
              />
            </div>
            <div className="lg:col-span-7 lg:pb-12">
              <p className="max-w-2xl border-l-2 border-gold pl-5 text-sm leading-relaxed text-ink-muted">
                Our manufacturing systems combine skilled teams with modern equipment,
                clear commercial terms and internationally recognized product-safety
                requirements.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {productionAdvantages.map(({ Icon, number, title, description }) => (
              <article
                key={title}
                className="group relative min-h-[310px] overflow-hidden rounded-[1.75rem] border border-cream-200 bg-white p-7 shadow-soft transition duration-500 hover:-translate-y-1.5 hover:border-gold/35 hover:shadow-warm sm:p-8"
              >
                <span className="absolute right-4 top-1 display text-7xl font-bold text-gray-950/[0.045]">
                  {number}
                </span>
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gray-900 text-white transition duration-500 group-hover:-rotate-6 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="relative mt-7 text-[9px] font-bold uppercase tracking-widest-x text-gold-dark">
                  Manufacturing advantage
                </div>
                <h3 className="display relative mt-2 text-2xl font-semibold leading-tight text-gray-950">
                  {title}
                </h3>
                <p className="relative mt-4 text-sm leading-relaxed text-ink-muted">
                  {description}
                </p>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            ))}
          </div>

          <div className="mt-7 overflow-hidden rounded-[1.75rem] bg-gray-900 text-gray-50 shadow-warm">
            <div className="grid lg:grid-cols-12">
              <div className="border-b border-white/10 p-7 sm:p-9 lg:col-span-7 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest-x text-gold-light">
                  <FaHandshake className="h-4 w-4" /> Terms of Business
                </div>
                <div className="mt-7 grid gap-6 sm:grid-cols-3">
                  {businessTerms.map(({ term, description }, index) => (
                    <div key={term} className="relative">
                      <span className="display text-sm font-semibold text-gold-light">
                        0{index + 1}
                      </span>
                      <h3 className="display mt-2 text-xl font-semibold">{term}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-cream-100/60">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden p-7 sm:p-9 lg:col-span-5">
                <div className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-[#718b34]/20 blur-2xl" />
                <div className="relative flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest-x text-[#b8cc83]">
                  <FaLeaf className="h-4 w-4" /> Product Testing Standards
                </div>
                <div className="relative mt-6 space-y-3">
                  {testingStandards.map(({ name, detail }) => (
                    <div
                      key={name}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.055] px-4 py-3"
                    >
                      <FaCheckCircle className="h-3.5 w-3.5 shrink-0 text-[#a6bf67]" />
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider-x text-cream-50">
                          {name}
                        </div>
                        <div className="mt-0.5 text-[11px] text-cream-100/55">{detail}</div>
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
      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionTitle
              eyebrow="Our Range"
              title="Shop by Category"
              description="Seven core categories. Hundreds of variations. All woven and finished under one roof."
            />
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider-x font-semibold text-gray-800 hover:text-gold-dark"
            >
              View All <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {categories.slice(0, 4).map((c, i) => (
              <CategoryCard key={c.id} category={c} index={i} />
            ))}
          </div>

          {/* Second row: featured 3 wider */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {categories.slice(4).map((c, i) => (
              <CategoryCard key={c.id} category={c} index={i + 4} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section-y bg-cream-100/50">
        <div className="container-x">
          <SectionTitle
            eyebrow="Featured"
            title="Loved by retailers across India"
            description="These are the products our wholesale partners reorder every month — consistency you can build a business on."
            align="center"
          />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products" className="btn-primary">
              View All Products <FaArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* OFFER BANNER */}
      <section className="py-12">
        <div className="container-x">
          <OfferBanner offer={offers[0]} />
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionTitle
              eyebrow="Just In"
              title="New Arrivals"
              description="The latest pieces from our looms."
            />
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider-x font-semibold text-gray-800 hover:text-gold-dark"
            >
              See All <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* MANUFACTURING PROCESS */}
      <section className="section-y">
        <div className="container-x">
          <SectionTitle
            eyebrow="From yarn to your hands"
            title="The making of our cloth"
            description="Five steps. Years of refinement. Every roll passes through this process."
            align="center"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {manufacturingProcess.map((p, i) => (
              <div key={i} className="relative">
                <div className="card p-7 h-full">
                  <div className="display text-5xl text-gold/40 font-semibold leading-none">
                    {p.step}
                  </div>
                  <h3 className="display text-xl font-semibold text-gray-950 mt-4">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    {p.description}
                  </p>
                </div>
                {i < manufacturingProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10 grid h-6 w-6 place-items-center rounded-full bg-gold text-cream-50">
                    <FaArrowRight className="h-2.5 w-2.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-y bg-cream-100/50">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <SectionTitle
              eyebrow="Customer Stories"
              title="What our customers say"
              description="From boutique owners in Chennai to wholesale partners in Salem — real people, real reorders."
            />
            <Link href="/testimonials" className="btn-outline">
              All Reviews <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="lg:col-span-7 card p-8 md:p-12">
            <TestimonialSlider items={testimonials.slice(0, 4)} />
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW + LATEST UPDATES */}
      <section className="section-y">
        <div className="container-x">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionTitle
              eyebrow="From the Journal"
              title="Notes from our looms"
              description="Guides, industry insights and product care advice — written by us, in plain language."
            />
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider-x font-semibold text-gray-800 hover:text-gold-dark"
            >
              All Articles <FaArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            {/* Blog cards */}
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
              {blogPosts.slice(0, 2).map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-cream-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-cream-50/95 px-3 py-1 text-[10px] uppercase tracking-widest-x font-bold text-gray-800">
                      {b.category}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-ink-muted">
                      {moment(b.publishedAt).format("MMM D, YYYY")} · {b.readTime} min read
                    </div>
                    <h3 className="display text-xl md:text-2xl font-semibold text-gray-950 mt-2 leading-tight group-hover:text-gray-700 transition">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft line-clamp-2">
                      {b.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Latest updates */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl bg-gray-900 text-cream-50 p-7">
                <div className="text-[11px] uppercase tracking-widest-x text-gold-light font-semibold">
                  Latest Updates
                </div>
                <div className="mt-5 space-y-5">
                  {latestUpdates.map((u) => (
                    <div key={u.id} className="border-b border-cream-50/10 pb-5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest-x text-gold-light/80">
                        <span>{u.tag}</span>
                        <span>•</span>
                        <span>{moment(u.date).fromNow()}</span>
                      </div>
                      <h4 className="display text-lg font-semibold mt-2 leading-tight">
                        {u.title}
                      </h4>
                      <p className="mt-1.5 text-sm text-cream-100/70 leading-relaxed">
                        {u.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-y bg-cream-100/50">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-4">
            <SectionTitle
              eyebrow="Quick Answers"
              title="Frequently Asked"
              description="Common questions about wholesale, retail and our manufacturing."
            />
            <Link href="/contact" className="btn-outline">
              Ask Your Own
            </Link>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={faqs.slice(0, 5)} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl bg-gray-950 text-cream-50 p-10 md:p-16">
            <div className="absolute inset-0 bg-weave-dark opacity-40 pointer-events-none" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />

            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="eyebrow !text-gold-light mb-5">
                  <span>Get in touch</span>
                </div>
                <h2 className="display text-4xl md:text-5xl font-semibold leading-tight">
                  Ready to place an order or request a quote?
                </h2>
                <p className="mt-5 text-cream-100/80 leading-relaxed max-w-xl">
                  Talk to us directly on WhatsApp for fast quotes, share your
                  requirement, or visit our facility in Erode.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row md:flex-col gap-4 md:items-end">
                <a
                  href={siteConfig.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-gold w-full sm:w-auto justify-center"
                >
                  <FaWhatsapp className="h-4 w-4" /> Order on WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="btn-outline !border-cream-50/40 !text-cream-50 hover:!bg-cream-50 hover:!text-gray-900 w-full sm:w-auto justify-center"
                >
                  Send Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
