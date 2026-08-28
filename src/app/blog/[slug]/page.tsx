import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import moment from "moment";
import { FaClock, FaArrowLeft, FaArrowRight, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

import AboutBannerImage from "@/components/AboutBannerImage";
import { loadBlogs, loadBlogBySlug } from "@/lib/data";

export async function generateStaticParams() {
  const blogs = await loadBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
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
  const related = all.filter((b) => b.slug !== slug).slice(0, 4);

  return (
    <main className="overflow-hidden bg-white">
      <section className="relative min-h-[125px] overflow-hidden border-y-2 border-[#FBAA00] bg-[#174D2A] lg:min-h-[145px]">
        <AboutBannerImage pageKey="blog-article" fallbackImage={post.coverImage} />
        <div className="absolute inset-0 bg-[#174D2A]/75" />
        <div className="absolute inset-y-0 left-0 w-2 bg-[#579515]" />
        <div className="container-x relative flex min-h-[125px] flex-col justify-end pb-2.5 pt-8 lg:min-h-[145px] lg:pb-3">
          <div className="mb-1 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
            <Link href="/" className="text-[#FBAA00] transition-colors hover:text-white">Home</Link>
            <span className="text-white/60">/</span>
            <Link href="/blog" className="text-[#FBAA00] transition-colors hover:text-white">Blog</Link>
            <span className="text-white/60">/</span>
            <span className="line-clamp-1">{post.category}</span>
          </div>
          <div className="mb-0.5 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.24em] text-[#FBAA00]">
            <span className="h-0.5 w-8 bg-[#FBAA00]" /> {post.category}
          </div>
          <h1 className="max-w-4xl font-sans text-3xl font-semibold uppercase leading-[1.1] tracking-tight text-white [text-shadow:0_3px_8px_rgba(0,0,0,0.85)] sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-0.5 max-w-2xl text-[9px] font-bold leading-3.5 text-white/90 sm:text-[10px]">
            {post.excerpt}
          </p>
        </div>
      </section>

      <article className="section-y">
        <div className="container-x max-w-3xl">
          {/* Meta */}
          <div className="mb-5 flex flex-wrap items-center gap-4 border-b border-cream-200 pb-4 text-xs text-ink-muted">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#FBAA00] text-sm font-semibold text-white">
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
          <div className="prose max-w-none">
            {post.content.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="mb-4 text-sm font-normal leading-6 text-ink-soft md:text-base"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-cream-200 pt-4">
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
          <div className="mt-4 flex items-center gap-3">
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
                className="grid h-9 w-9 place-items-center rounded-full bg-[#F5F5F5] text-[#666666] transition hover:bg-[#FBAA00] hover:text-white"
                aria-label={label}
              >
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="section-y bg-gradient-to-br from-white via-[#fffaf0] to-[#FBAA00]/10">
        <div className="container-x">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="display text-3xl font-semibold leading-[1.1] text-[#FBAA00] sm:text-4xl">
              Continue reading
            </h2>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#579515] hover:text-[#FBAA00]"
            >
              <FaArrowLeft className="h-3 w-3" /> All articles
            </Link>
          </div>
          <div className="grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((b) => (
              <article key={b.id} className="group relative [perspective:1200px]">
                <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-[#FBAA00]/30 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />
                <Link href={`/blog/${b.slug}`} className="relative block h-full overflow-hidden rounded-lg border border-[#143B32]/25 bg-white p-2 shadow-[0_15px_28px_-22px_rgba(20,59,50,0.55)] transition-[transform,box-shadow] duration-500 [transform-style:preserve-3d] group-hover:[transform:translateY(-5px)_rotateX(2deg)_rotateY(-2deg)] group-hover:shadow-[0_24px_40px_-22px_rgba(20,59,50,0.6)]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F5F5]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={b.coverImage} alt={b.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute right-2.5 top-2.5 grid h-8 w-8 translate-y-2 place-items-center rounded-full bg-[#FBAA00] text-[#174D2A] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><FaArrowRight className="h-2.5 w-2.5 -rotate-45" /></span>
                  </div>
                  <div className="px-1.5 pb-1.5 pt-3 text-center">
                    <div className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#579515]">{moment(b.publishedAt).format("MMM D, YYYY")}</div>
                    <h3 className="display mt-1 text-base font-semibold leading-tight text-black underline decoration-[#FBAA00]/50 underline-offset-4">{b.title}</h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
