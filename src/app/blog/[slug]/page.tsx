import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import moment from "moment";
import { FaClock, FaArrowLeft, FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";

import PremiumPageBanner from "@/components/PremiumPageBanner";
import SectionTitle from "@/components/SectionTitle";
import { PostTile } from "@/components/LuxTiles";
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
  const related = all.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <div className="lux-page">
      <PremiumPageBanner pageKey="blog-article" eyebrow={post.category} title={post.title} description={post.excerpt} current={post.title} parent={{ label: "Journal", href: "/blog" }} bgImage={post.coverImage} />

      <article id="page-content" className="lux-section">
        <div className="lux-narrow">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 border-b border-[#EEE8DC] pb-7">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-[#FBAA00] font-[family-name:var(--lux-heading)] text-base font-semibold text-[#1C1C1C] shadow-[0_0_0_4px_#fff,0_0_0_5px_#FBAA00]">
                {post.author.charAt(0)}
              </div>
              <div>
                <div className="font-[family-name:var(--lux-heading)] text-[15px] font-semibold text-[#1C1C1C]">{post.author}</div>
                <div className="lux-kicker !text-[10px]">{moment(post.publishedAt).format("MMM D, YYYY")}</div>
              </div>
            </div>
            <span className="lux-chip"><FaClock aria-hidden className="h-3 w-3" /> {post.readTime} min read</span>
            <span className="text-sm text-[#5F5F5F]">{moment(post.publishedAt).fromNow()}</span>
          </div>

          <div className="mt-6">
            {post.content.split("\n\n").map((para, i) => (
              <p
                key={i}
                className={i === 0
                  ? "mb-6 text-[17px] leading-[1.9] text-[#1C1C1C] first-letter:float-left first-letter:mr-3 first-letter:font-[family-name:var(--lux-heading)] first-letter:text-[64px] first-letter:font-bold first-letter:leading-[0.85] first-letter:text-[#FBAA00]"
                  : "mb-6 text-[16px] leading-[1.9]"}
              >
                {para}
              </p>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-[#EEE8DC] pt-6 sm:flex-row sm:items-center sm:justify-between">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="lux-kicker mr-2">Tags</span>
                {post.tags.map((t) => (
                  <span key={t} className="rounded-full border border-[#EEE8DC] px-3.5 py-1.5 text-xs text-[#5F5F5F] transition duration-300 hover:border-[#FBAA00] hover:bg-[#FFF4D9] hover:text-[#B57A00]">#{t}</span>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="lux-kicker mr-2">Share</span>
              {[
                { Icon: FaWhatsapp, label: "WhatsApp" },
                { Icon: FaFacebookF, label: "Facebook" },
                { Icon: FaTwitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={`Share on ${label}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#EEE8DC] text-[#1C1C1C] transition duration-300 hover:-translate-y-1 hover:border-[#FBAA00] hover:bg-[#FBAA00]"
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="lux-section">
          <div className="lux-container">
            <div className="mb-6 flex flex-col gap-4 md:gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionTitle eyebrow="From the journal" title={<>Continue <span>reading</span></>} className="!mb-0" />
              <Link href="/blog" className="lux-link shrink-0"><FaArrowLeft aria-hidden /> All articles</Link>
            </div>
            <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((b) => <PostTile key={b.id} post={b} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
