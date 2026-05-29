import Link from "next/link";
import moment from "moment";
import { FaArrowRight, FaWhatsapp, FaIndustry, FaLeaf, FaHandshake, FaShippingFast, FaTshirt, FaWeight } from "react-icons/fa";

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
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow mb-5">
              <span>{siteConfig.address.city}, Tamil Nadu</span>
            </div>
            <h2 className="display text-4xl md:text-5xl lg:text-6xl font-semibold text-maroon-950 leading-[1.05]">
              A textile house built on{" "}
              <span className="italic text-gold-dark">honest work</span>, weave by weave.
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              {siteConfig.name} has been manufacturing cotton and handloom textiles
              from Erode since {siteConfig.established}. From single-piece retail
              to thousand-piece wholesale orders, every meter that leaves our facility
              carries the same standard — consistent GSM, fast colours, and an
              attention to detail that keeps customers coming back.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                Our Story
              </Link>
              <Link href="/products" className="btn-outline">
                Browse Catalogue
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <StatsCounter items={stats} />
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
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider-x font-semibold text-maroon-800 hover:text-gold-dark"
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
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider-x font-semibold text-maroon-800 hover:text-gold-dark"
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

      {/* WHY CHOOSE US */}
      <section className="section-y bg-maroon-950 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-weave-dark opacity-40 pointer-events-none" />
        <div className="relative container-x">
          <SectionTitle
            eyebrow={`Why ${siteConfig.name}`}
            title="Built on trade, not marketing"
            description="Six reasons our customers — retailers, boutiques, hotels and households — keep coming back."
            align="center"
            light
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              return (
                <div
                  key={i}
                  className="group rounded-2xl border border-cream-50/10 bg-cream-50/5 backdrop-blur p-7 hover:border-gold/40 hover:bg-cream-50/10 transition"
                >
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gold text-maroon-950 mb-5 group-hover:scale-105 transition-transform">
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>
                  <h3 className="display text-2xl font-semibold text-cream-50 leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-cream-100/75 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
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
                  <h3 className="display text-xl font-semibold text-maroon-950 mt-4">
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
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider-x font-semibold text-maroon-800 hover:text-gold-dark"
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
                    <div className="absolute top-3 left-3 rounded-full bg-cream-50/95 px-3 py-1 text-[10px] uppercase tracking-widest-x font-bold text-maroon-800">
                      {b.category}
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-ink-muted">
                      {moment(b.publishedAt).format("MMM D, YYYY")} · {b.readTime} min read
                    </div>
                    <h3 className="display text-xl md:text-2xl font-semibold text-maroon-950 mt-2 leading-tight group-hover:text-maroon-700 transition">
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
              <div className="rounded-2xl bg-maroon-900 text-cream-50 p-7">
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
          <div className="relative overflow-hidden rounded-3xl bg-maroon-950 text-cream-50 p-10 md:p-16">
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
                  className="btn-outline !border-cream-50/40 !text-cream-50 hover:!bg-cream-50 hover:!text-maroon-900 w-full sm:w-auto justify-center"
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
