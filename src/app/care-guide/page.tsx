import type { Metadata } from "next";
import Link from "next/link";
import moment from "moment";
import { FaArrowRight, FaClock } from "react-icons/fa";

import AboutBannerImage from "@/components/AboutBannerImage";
import { loadBlogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Care Guide",
  description: "Practical textile washing, drying and care advice from our team.",
};

export default async function CareGuidePage() {
  const posts = (await loadBlogs()).filter((post) =>
    post.category.toLowerCase().includes("care") ||
    post.tags.some((tag) => tag.toLowerCase().includes("care"))
  );

  return (
    <main className="overflow-hidden bg-white">
      <section className="relative min-h-[125px] overflow-hidden border-y-2 border-[#FBAA00] bg-[#174D2A] lg:min-h-[145px]">
        <AboutBannerImage pageKey="care-guide" fallbackImage="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&auto=format&fit=crop&q=80" />
        <div className="absolute inset-0 bg-[#174D2A]/75" />
        <div className="absolute inset-y-0 left-0 w-2 bg-[#579515]" />
        <div className="container-x relative flex min-h-[125px] flex-col justify-end pb-2.5 pt-8 lg:min-h-[145px] lg:pb-3">
          <div className="mb-1 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
            <Link href="/" className="text-[#FBAA00] transition-colors hover:text-white">Home</Link>
            <span className="text-white/60">/</span>
            <span>Care Guide</span>
          </div>
          <div className="mb-0.5 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.24em] text-[#FBAA00]">
            <span className="h-0.5 w-8 bg-[#FBAA00]" /> Textile care
          </div>
          <h1 className="max-w-4xl font-sans text-3xl font-semibold uppercase leading-[1.1] tracking-tight text-white [text-shadow:0_3px_8px_rgba(0,0,0,0.85)] sm:text-4xl">
            Care that helps textiles <span className="text-[#FBAA00]">last longer.</span>
          </h1>
          <p className="mt-0.5 max-w-2xl text-[9px] font-bold leading-3.5 text-white/90 sm:text-[10px]">
            Practical guidance for washing, drying, storing and protecting your everyday textiles.
          </p>
        </div>
      </section>

      <section className="section-y relative bg-gradient-to-br from-white via-[#fffaf0] to-[#FBAA00]/10">
        <div className="container-x relative">
          <div className="mb-1 flex items-center gap-2 text-[7px] font-bold uppercase tracking-[0.24em] text-[#579515]">
            <span className="h-0.5 w-8 bg-[#579515]" /> Helpful advice
          </div>
          <h2 className="display text-3xl font-semibold leading-[1.1] text-[#FBAA00] sm:text-4xl">Care guides</h2>

          {posts.length > 0 ? (
            <div className="mt-6 grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
              {posts.map((post) => (
                <article key={post.id} className="group relative [perspective:1200px]">
                  <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-[#FBAA00]/30 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />
                  <Link href={`/blog/${post.slug}`} className="relative flex h-full flex-col overflow-hidden rounded-lg border border-[#143B32]/25 bg-white p-2 shadow-[0_15px_28px_-22px_rgba(20,59,50,0.55)] transition-[transform,box-shadow] duration-500 [transform-style:preserve-3d] group-hover:[transform:translateY(-5px)_rotateX(2deg)_rotateY(-2deg)] group-hover:shadow-[0_24px_40px_-22px_rgba(20,59,50,0.6)]">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F5F5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.coverImage} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <span className="absolute right-2.5 top-2.5 grid h-8 w-8 translate-y-2 place-items-center rounded-full bg-[#FBAA00] text-[#174D2A] opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100"><FaArrowRight className="h-2.5 w-2.5 -rotate-45" /></span>
                    </div>
                    <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-3 text-center">
                      <div className="flex items-center justify-center gap-2 text-[7px] font-bold uppercase tracking-[0.12em] text-[#579515]">
                        <span>{moment(post.publishedAt).format("MMM D, YYYY")}</span>
                        <span className="h-1 w-1 rounded-full bg-[#FBAA00]" />
                        <span className="flex items-center gap-1"><FaClock className="h-2 w-2" /> {post.readTime} min</span>
                      </div>
                      <h3 className="display mt-1 text-base font-semibold leading-tight text-black underline decoration-[#FBAA00]/50 underline-offset-4">{post.title}</h3>
                      <p className="mt-2 line-clamp-2 text-[9px] font-medium leading-4 text-black/55">{post.excerpt}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-12 max-w-xl border-y border-[#FBAA00]/30 py-14 text-center">
              <h3 className="display text-base font-semibold text-black">Care guides are coming soon</h3>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
