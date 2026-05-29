import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import moment from "moment";
import { FaClock, FaArrowLeft, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import { blogPosts as staticBlogs } from "@/data/content";
import { loadBlogs, loadBlogBySlug } from "@/lib/data";

export function generateStaticParams() {
  return staticBlogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadBlogBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadBlogBySlug(slug);
  if (!post) notFound();

  const all = await loadBlogs();
  const related = all.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        bgImage={post.coverImage}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <article className="section-y">
        <div className="container-x max-w-3xl">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted mb-10 pb-6 border-b border-cream-200">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-maroon-800 text-cream-50 font-semibold text-sm">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-ink">{post.author}</div>
                <div className="text-[10px] uppercase tracking-wider-x">
                  {moment(post.publishedAt).format("MMM D, YYYY")}
                </div>
              </div>
            </div>
            <span className="hidden sm:inline">·</span>
            <span className="flex items-center gap-2">
              <FaClock className="h-3 w-3" /> {post.readTime} min read
            </span>
            <span className="hidden sm:inline">·</span>
            <span>{moment(post.publishedAt).fromNow()}</span>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="display text-xl md:text-[1.35rem] text-ink-soft leading-relaxed mb-7 font-normal"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-cream-200 flex flex-wrap items-center gap-3">
            <span className="text-[11px] uppercase tracking-widest-x text-gold-dark font-semibold">
              Tags:
            </span>
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-cream-100 px-3 py-1 text-xs text-ink-soft"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-widest-x text-gold-dark font-semibold">
              Share:
            </span>
            {[
              { Icon: FaWhatsapp, label: "WhatsApp" },
              { Icon: FaFacebookF, label: "Facebook" },
              { Icon: FaTwitter, label: "Twitter" },
            ].map(({ Icon, label }) => (
              <button
                key={label}
                type="button"
                className="grid h-9 w-9 place-items-center rounded-full bg-cream-100 text-maroon-800 hover:bg-maroon-800 hover:text-cream-50 transition"
                aria-label={label}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="section-y bg-cream-100/50">
        <div className="container-x">
          <div className="flex items-center justify-between mb-10">
            <h2 className="display text-3xl md:text-4xl font-semibold text-maroon-950">
              Continue reading
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wider-x font-semibold text-maroon-800 hover:text-gold-dark"
            >
              <FaArrowLeft className="h-3 w-3" /> All articles
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {related.map((b) => (
              <Link key={b.id} href={`/blog/${b.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="display text-xl font-semibold text-maroon-950 mt-4 leading-tight group-hover:text-maroon-700 transition">
                  {b.title}
                </h3>
                <div className="text-xs text-ink-muted mt-2">
                  {moment(b.publishedAt).format("MMM D, YYYY")}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
