import type { Metadata } from "next";
import Link from "next/link";
import { FaWhatsapp, FaEnvelope, FaQuestionCircle } from "react-icons/fa";

import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import FAQAccordion from "@/components/FAQAccordion";
import { faqs } from "@/data/content";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Thangavel Textile — wholesale, ordering, delivery, returns and more.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked Questions."
        subtitle="Quick answers to the most common questions we receive from retail customers and wholesale partners."
        bgImage="https://images.unsplash.com/photo-1583846552345-d2ce05fbe1c5?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <section className="section-y">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionTitle
                eyebrow="Got questions?"
                title="We've got answers."
                description="Browse common questions about ordering, wholesale and our manufacturing."
              />

              <div className="space-y-4">
                <div className="card p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-cream-100 text-gray-800">
                    <FaQuestionCircle className="h-5 w-5" />
                  </div>
                  <h3 className="display mt-4 text-base font-semibold text-gray-950">
                    {faqs.length} answered
                  </h3>
                  <p className="text-sm text-ink-muted mt-1">
                    Covering wholesale, retail, returns and more.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-[#ECECEC] bg-[#F5F5F5] p-7 text-[#222222] shadow-soft">
                  <div className="absolute inset-0 bg-weave-light opacity-40" />
                  <div className="relative">
                    <div className="text-[11px] uppercase tracking-widest-x text-gold-light font-semibold">
                      Talk to us
                    </div>
                    <h3 className="display mt-2 text-base font-semibold leading-tight">
                      Still need help?
                    </h3>
                    <p className="mt-2 text-sm text-[#666666]">
                      Reach out via WhatsApp or email for a faster response.
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                      <a
                        href={siteConfig.socials.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-gold w-full justify-center"
                      >
                        <FaWhatsapp className="h-4 w-4" /> WhatsApp
                      </a>
                      <a
                        href={`mailto:${siteConfig.email}`}
                        className="btn-outline w-full justify-center"
                      >
                        <FaEnvelope className="h-4 w-4" /> Email Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Accordion */}
          <div className="lg:col-span-8">
            <FAQAccordion items={faqs} />

            <div className="mt-12 rounded-2xl border border-dashed border-cream-300 p-8 text-center bg-cream-50">
              <p className="text-ink-soft">
                Didn't find what you were looking for?
              </p>
              <Link href="/contact" className="btn-primary mt-5 inline-flex">
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
