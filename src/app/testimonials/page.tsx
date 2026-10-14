import type { Metadata } from "next";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import TestimonialSlider from "@/components/TestimonialSlider";
import SectionTitle from "@/components/SectionTitle";
import WriteReviewForm from "@/components/WriteReviewForm";
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
    <div className="lux-page">
      <PageHero
        pageKey="testimonials"
        eyebrow="Customer Stories"
        title={<>Trade built on <span>real relationships.</span></>}
        subtitle="Honest reviews from retailers, boutique owners, hotels and households we've served."
        bgImage="https://images.unsplash.com/photo-1583846552345-d2ce05fbe1c5?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}
      />

      <section id="page-content" className="lux-section">
        <div className="lux-container grid items-center gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionTitle
              eyebrow="Featured review"
              title={<>Heard around <span>the country</span></>}
              description="Some of our most thoughtful customer notes."
              className="!mb-8"
            />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} aria-hidden className="h-5 w-5 text-[#FBAA00]" />
              ))}
              <span className="ml-3 text-sm text-[#5F5F5F]">4.8 avg · {testimonials.length} reviews</span>
            </div>
          </div>
          <div className="lux-frame lg:col-span-8">
            <div className="lux-card lux-card--flat !p-8 md:!p-12">
              <TestimonialSlider items={testimonials} />
            </div>
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="lux-section">
          <div className="lux-container">
            <SectionTitle eyebrow="All reviews" title={<>What customers <span>say</span></>} align="center" ornament />
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <article key={t.id} className={cn("lux-card flex flex-col", i % 3 === 1 && "lg:mt-6")}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="lux-icon lux-icon--sm"><FaQuoteLeft /></span>
                    {t.productPurchased && <span className="lux-chip">{t.productPurchased}</span>}
                  </div>
                  <div className="mt-6 flex items-center gap-1" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <FaStar key={j} aria-hidden className={cn("h-3.5 w-3.5", j < Math.floor(t.rating) ? "text-[#FBAA00]" : "text-[#EEE8DC]")} />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-[15px]">&ldquo;{t.review}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-[#EEE8DC] pt-5">
                    {t.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.image} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                    ) : (
                      <div className="grid h-11 w-11 place-items-center rounded-full bg-[#FFF4D9] font-[family-name:var(--lux-heading)] text-lg font-semibold text-[#B57A00]">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-[15px]">{t.name}</h3>
                      <div className="lux-kicker !text-[10px]">
                        {t.role}
                        {t.company ? ` · ${t.company}` : ""}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="lux-section">
        <div className="lux-container grid items-start gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <SectionTitle
              eyebrow="Your turn"
              title={<>Leave us a <span>review</span></>}
              description="Bought from us? Share your experience — honest feedback helps other customers and helps us improve."
              className="!mb-8"
            />
            <ul className="lux-list">
              <li>Reviews are verified by our team before publishing.</li>
              <li>Usually approved within 1–2 business days.</li>
              <li>No account needed — just fill in the form.</li>
            </ul>
          </div>
          <div className="lg:col-span-8">
            <WriteReviewForm />
          </div>
        </div>
      </section>
    </div>
  );
}
