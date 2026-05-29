import type { Metadata } from "next";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import TestimonialSlider from "@/components/TestimonialSlider";
import SectionTitle from "@/components/SectionTitle";
import { loadTestimonials } from "@/lib/data";
import { cn } from "@/utils";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "What boutique owners, wholesale partners and customers across India say about Thangavel Textile.",
};

export default async function TestimonialsPage() {
  const testimonials = await loadTestimonials();
  return (
    <>
      <PageHero
        eyebrow="Customer Stories"
        title="Trade built on real relationships."
        subtitle="Honest reviews from retailers, boutique owners, hotels and households we've served."
        bgImage="https://images.unsplash.com/photo-1583846552345-d2ce05fbe1c5?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
      />

      {/* Featured slider */}
      <section className="section-y bg-cream-100/50">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4">
            <SectionTitle
              eyebrow="Featured Review"
              title="Heard around the country"
              description="Hover through some of our most thoughtful customer notes."
            />
            <div className="flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className="h-5 w-5" />
              ))}
              <span className="ml-2 text-sm text-ink-soft">
                4.8 avg · {testimonials.length} reviews
              </span>
            </div>
          </div>
          <div className="lg:col-span-8 card p-8 md:p-12">
            <TestimonialSlider items={testimonials} />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-y">
        <div className="container-x">
          <SectionTitle
            eyebrow="All Reviews"
            title="What customers say"
            align="center"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.id}
                className={cn(
                  "card p-7 relative",
                  i % 3 === 1 ? "md:mt-12" : ""
                )}
              >
                <FaQuoteLeft className="absolute -top-3 left-7 h-7 w-7 text-gold bg-cream-50 px-1.5" />
                <div className="flex items-center gap-1 text-gold mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <FaStar
                      key={j}
                      className={cn(
                        "h-3.5 w-3.5",
                        j < Math.floor(t.rating) ? "text-gold" : "text-cream-300"
                      )}
                    />
                  ))}
                </div>
                <p className="text-ink-soft leading-relaxed">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="mt-6 pt-5 border-t border-cream-200 flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-maroon-800 text-cream-50 display text-lg font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-ink text-sm">{t.name}</div>
                    <div className="text-[10px] uppercase tracking-wider-x text-ink-muted">
                      {t.role}
                      {t.company ? ` · ${t.company}` : ""}
                    </div>
                  </div>
                </div>
                {t.productPurchased && (
                  <div className="absolute top-5 right-5 rounded-full bg-cream-100 px-2.5 py-1 text-[10px] uppercase tracking-wider-x text-gold-dark font-semibold">
                    {t.productPurchased}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
