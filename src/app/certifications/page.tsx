import type { Metadata } from "next";
import Link from "next/link";
import {
  FaArrowRight,
  FaCertificate,
  FaCheck,
  FaShieldAlt,
  FaWhatsapp,
} from "react-icons/fa";

import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import CertificationsGallery from "@/components/CertificationsGallery";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Certifications & Quality Standards",
  description: `Explore the registrations, quality controls and buyer documentation behind ${siteConfig.name}. Current documents are available for verification on request.`,
};

const qualityChecks = [
  {
    step: "01",
    title: "Yarn & material",
    copy: "Fibre composition, yarn count, strength and shade are reviewed before production begins.",
  },
  {
    step: "02",
    title: "Weave & construction",
    copy: "Fabric is inspected for weave consistency, measurements, GSM and avoidable surface defects.",
  },
  {
    step: "03",
    title: "Colour & finish",
    copy: "Shade, hand-feel, finishing and colour performance are checked against the agreed specification.",
  },
  {
    step: "04",
    title: "Packing & dispatch",
    copy: "Quantity, labelling and packing are verified before the order leaves our Karur facility.",
  },
];

const documentList = [
  "GST registration proof",
  "GST-compliant commercial invoice",
  "Product composition and specifications",
  "Batch or order-level quality details",
  "Packing and dispatch documentation",
  "Additional buyer forms, where applicable",
];

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Proof behind the product"
        title="Standards you can verify. Quality you can feel."
        subtitle="Clear registrations, documented checks and transparent buyer support—because trust should come with evidence."
        bgImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&auto=format&fit=crop&q=85"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Certifications" },
        ]}
      />

      <section className="section-y overflow-hidden">
        <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="Trust, documented"
              title="Confidence for every buyer"
              description={`${siteConfig.name} is a registered textile manufacturer based in ${siteConfig.address.city}. We pair statutory documentation with practical controls at each stage of production.`}
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["2017", "GST registered since"],
                ["04", "Quality checkpoints"],
                ["100%", "Batches inspected"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="border-l-2 border-gold bg-cream-100/70 px-5 py-4"
                >
                  <div className="display text-3xl font-semibold text-gray-950">
                    {value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider-x text-ink-muted">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-7 max-w-2xl text-sm leading-relaxed text-ink-muted">
              We only publish credentials we can substantiate. Current copies and
              supporting records are shared directly with buyers during enquiry
              or commercial onboarding.
            </p>
          </div>

          <div className="relative lg:col-span-5">
            <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full border border-gold/20" />
            <div className="absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-gold/10" />
            <div className="relative overflow-hidden rounded-[2rem] bg-gray-950 p-8 text-center text-cream-50 shadow-warm sm:p-10">
              <div className="absolute inset-0 bg-weave-dark opacity-60" />
              <div className="relative mx-auto grid h-44 w-44 place-items-center rounded-full border border-gold/40 p-3">
                <div className="grid h-full w-full place-items-center rounded-full border-2 border-dashed border-gold bg-gray-900">
                  <div>
                    <FaCertificate className="mx-auto h-9 w-9 text-gold-light" />
                    <div className="display mt-2 text-2xl font-semibold">
                      Verified
                    </div>
                    <div className="mt-1 text-[9px] font-semibold uppercase tracking-widest-x text-gold-light">
                      Documentation
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-7 text-[10px] font-semibold uppercase tracking-widest-x text-gold-light">
                Jai Export Enterprises
              </div>
              <p className="relative mx-auto mt-3 max-w-xs text-sm leading-relaxed text-cream-100/75">
                Official registration and order-specific documents are available
                through our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-cream-100/60">
        <div className="container-x">
          <SectionTitle
            eyebrow="Certificates"
            title="Our certifications & registrations"
            description="View the current documents published by our team. Select any certificate to open the full-size copy."
            align="center"
          />
          <CertificationsGallery />
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionTitle
                eyebrow="Quality assurance"
                title="Checked from yarn to dispatch"
                description="Our control process follows the product through production, finishing and packing—not just at the final table."
              />
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                <FaShieldAlt className="h-6 w-6 text-gray-800" />
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Custom specifications can be agreed before bulk production,
                  including dimensions, weight, composition, colour and packing.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <ol className="relative border-l border-cream-300 pl-8 sm:pl-10">
                {qualityChecks.map(({ step, title, copy }, index) => (
                  <li
                    key={step}
                    className={index === qualityChecks.length - 1 ? "relative" : "relative pb-10"}
                  >
                    <span className="absolute -left-[3.2rem] top-0 grid h-10 w-10 place-items-center rounded-full border-4 border-cream-50 bg-gold text-[10px] font-bold text-gray-950 sm:-left-[3.7rem]">
                      {step}
                    </span>
                    <h3 className="display text-2xl font-semibold text-gray-950">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">
                      {copy}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-gray-950 text-cream-50">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow !text-gold-light">Buyer documentation</div>
            <h2 className="display mt-5 text-4xl font-semibold leading-tight md:text-5xl">
              Need documents for vendor approval?
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-cream-100/75">
              Tell us what your procurement team needs. We will confirm what is
              available, share current copies privately and help complete
              applicable buyer forms.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-gold">
                Request documents <FaArrowRight className="h-3 w-3" />
              </Link>
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn border border-cream-50/25 text-cream-50 hover:border-gold hover:text-gold-light"
              >
                <FaWhatsapp className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-cream-50/10 bg-white/[0.06] p-7 backdrop-blur sm:p-9">
              <div className="flex items-center gap-3 border-b border-cream-50/10 pb-5">
                <FaCertificate className="h-5 w-5 text-gold-light" />
                <h3 className="display text-2xl font-semibold">
                  Commonly requested
                </h3>
              </div>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {documentList.map((document) => (
                  <li key={document} className="flex items-start gap-3 text-sm text-cream-100/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold text-gray-950">
                      <FaCheck className="h-2.5 w-2.5" />
                    </span>
                    {document}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
