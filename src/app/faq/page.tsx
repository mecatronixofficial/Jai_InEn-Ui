import type { Metadata } from "next";
import Link from "next/link";
import { FaArrowRight, FaEnvelope, FaQuestion, FaWhatsapp } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FAQAccordion from "@/components/FAQAccordion";
import { faqs, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Thangavel Textile — wholesale, ordering, delivery, returns and more.",
};

export default function FAQPage() {
  return (
    <div className="lux-page">
      <PageHero
        pageKey="faq"
        eyebrow="Help Center"
        title={<>Frequently asked <span>questions.</span></>}
        subtitle="Quick answers to the most common questions we receive from retail customers and wholesale partners."
        bgImage="https://images.unsplash.com/photo-1583846552345-d2ce05fbe1c5?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section id="page-content" className="lux-section">
        <div className="lux-container grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionTitle
                eyebrow="Got questions?"
                title={<>We&apos;ve got <span>answers.</span></>}
                description="Browse common questions about ordering, wholesale and our manufacturing."
                className="!mb-8"
              />

              <div className="grid gap-6">
                <div className="lux-card flex items-center gap-5">
                  <span className="lux-icon"><FaQuestion /></span>
                  <div>
                    <div className="lux-stat text-4xl">{faqs.length}</div>
                    <p className="mt-1 text-sm !leading-6">Answered questions covering wholesale, retail, returns and more.</p>
                  </div>
                </div>

                <div className="lux-panel !p-8">
                  <p className="lux-kicker">Talk to us</p>
                  <h3 className="mt-3 text-2xl">Still need help?</h3>
                  <p className="mt-2 text-[15px]">Reach out via WhatsApp or email for a faster response.</p>
                  <div className="mt-6 grid gap-3">
                    <a href={siteConfig.socials.whatsapp} target="_blank" rel="noreferrer" className="lux-btn lux-btn--block">
                      <FaWhatsapp aria-hidden /> WhatsApp
                    </a>
                    <a href={`mailto:${siteConfig.email}`} className="lux-btn lux-btn--ghost lux-btn--block">
                      <FaEnvelope aria-hidden /> Email us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            <FAQAccordion items={faqs} />

            <div className="lux-card lux-card--flat mt-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h3 className="text-xl">Didn&apos;t find what you were looking for?</h3>
                <p className="mt-1 text-[15px]">Send us a message and our team will get back to you.</p>
              </div>
              <Link href="/contact" className="lux-btn shrink-0">Contact our team <FaArrowRight aria-hidden /></Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
