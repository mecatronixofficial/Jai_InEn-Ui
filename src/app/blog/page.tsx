import type { Metadata } from "next";
import Link from "next/link";
import moment from "moment";
import { FaArrowRight, FaClock } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import { loadBlogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Textile industry insights, fabric care guides and stories from our Erode looms — written by the team at Thangavel Textile.",
};

export default async function BlogPage() {
  const blogPosts = await loadBlogs();
  const [first, ...rest] = blogPosts;
  return (
    <>
      <PageHero
        eyebrow="The Journal"
        title="Notes from our looms."
        subtitle="Industry guides, fabric care advice, and stories from inside our Erode facility."
        bgImage="https://images.unsplash.com/photo-1620713043691-2a6c2c5dd47f?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <section className="section-y">
        <div className="container-x">
          {/* Featured */}
          {first && (
            <Link href={`/blog/${first.slug}`} className="group block mb-16">
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={first.coverImage}
                    alt={first.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-5 left-5 rounded-full bg-cream-50/95 px-3 py-1.5 text-[10px] uppercase tracking-widest-x font-bold text-maroon-800">
                    Featured · {first.category}
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="text-xs text-ink-muted mb-3 flex items-center gap-3">
                    <span>{moment(first.publishedAt).format("MMMM D, YYYY")}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <FaClock className="h-2.5 w-2.5" /> {first.readTime} min read
                    </span>
                  </div>
                  <h2 className="display text-3xl md:text-4xl lg:text-5xl font-semibold text-maroon-950 leading-tight group-hover:text-maroon-700 transition">
                    {first.title}
                  </h2>
                  <p className="mt-4 text-ink-soft leading-relaxed">
                    {first.excerpt}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm uppercase tracking-wider-x font-semibold text-maroon-800 group-hover:gap-3 transition-all">
                    Read article <FaArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          <SectionTitle eyebrow="More Articles" title="Recent posts" align="center" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {rest.map((b) => (
              <Link key={b.id} href={`/blog/${b.slug}`} className="group">
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
                  <div className="text-xs text-ink-muted flex items-center gap-2">
                    <span>{moment(b.publishedAt).format("MMM D, YYYY")}</span>
                    <span>·</span>
                    <span>{b.readTime} min read</span>
                  </div>
                  <h3 className="display text-2xl font-semibold text-maroon-950 mt-2 leading-tight group-hover:text-maroon-700 transition">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft line-clamp-2">
                    {b.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
