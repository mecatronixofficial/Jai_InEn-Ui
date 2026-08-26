import type { Metadata } from "next";
import Link from "next/link";
import {
  FaArrowRight,
  FaCertificate,
  FaCheck,
  FaShieldAlt,
  FaWhatsapp,
} from "react-icons/fa";

import AboutBannerImage from "@/components/AboutBannerImage";
import PremiumPageBanner from "@/components/PremiumPageBanner";
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
    <main className="certifications-page overflow-hidden bg-white text-gray-700">
      <PremiumPageBanner eyebrow="Proof behind the product" title={<>Standards you can verify. <span className="text-[#FBAA00]">Quality you can feel.</span></>} description="Clear registrations, documented checks and transparent buyer support—because trust should come with evidence." current="Certifications" />
      <section className="hidden">
        <AboutBannerImage pageKey="certifications" fallbackImage="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&auto=format&fit=crop&q=85" />
        <div className="absolute inset-0 bg-[#174D2A]/75" />
        <div className="absolute inset-y-0 left-0 w-2 bg-[#579515]" />

        <div className="container-x relative flex h-[125px] flex-col justify-end pb-2.5 pt-8 lg:h-[145px] lg:pb-3">
          <div className="mb-1 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-white">
            <Link href="/" className="text-[#FBAA00] transition-colors hover:text-white">Home</Link>
            <span className="text-white/60">/</span>
            <span>Certifications</span>
          </div>
          <div className="mb-0.5 flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.24em] text-[#FBAA00]">
            <span className="h-0.5 w-8 bg-[#FBAA00]" /> Proof behind the product
          </div>
          <h1 className="max-w-4xl font-sans text-3xl font-semibold uppercase leading-[1.1] tracking-tight text-white [text-shadow:0_3px_8px_rgba(0,0,0,0.85)] sm:text-4xl">
            Standards you can verify. <span className="text-[#FBAA00]">Quality you can feel.</span>
          </h1>
          <p className="mt-0.5 max-w-2xl text-[9px] font-bold leading-3.5 text-white/90 sm:text-[10px]">
            Clear registrations, documented checks and transparent buyer support—because trust should come with evidence.
          </p>
        </div>
      </section>

      <section className="section-y overflow-hidden">
        <div className="container-x grid items-center gap-7 lg:grid-cols-12 lg:gap-10">
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
                  className="border-l-2 border-gold bg-cream-100/70 px-4 py-3"
                >
                  <div className="display text-2xl font-semibold text-gray-950">
                    {value}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-wider-x text-ink-muted">
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-xs leading-5 text-ink-muted">
              We only publish credentials we can substantiate. Current copies and
              supporting records are shared directly with buyers during enquiry
              or commercial onboarding.
            </p>
          </div>

          <div className="relative lg:col-span-5">
            <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full border border-gold/20" />
            <div className="absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-gold/10" />
            <div className="relative overflow-hidden rounded-2xl border border-[#ECECEC] bg-[#F5F5F5] p-5 text-center text-[#222222] shadow-warm sm:p-6">
              <div className="absolute inset-0 bg-weave-light opacity-60" />
              <div className="relative mx-auto grid h-32 w-32 place-items-center rounded-full border border-gold/40 p-2">
                <div className="grid h-full w-full place-items-center rounded-full border-2 border-dashed border-gold bg-white">
                  <div>
                    <FaCertificate className="mx-auto h-6 w-6 text-gold-light" />
                    <div className="display mt-1.5 text-lg font-semibold">
                      Verified
                    </div>
                    <div className="mt-1 text-[9px] font-semibold uppercase tracking-widest-x text-gold-light">
                      Documentation
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative mt-4 text-[8px] font-semibold uppercase tracking-widest-x text-gold-light">
                Jai Export Enterprises
              </div>
              <p className="relative mx-auto mt-2 max-w-xs text-xs leading-5 text-[#666666]">
                Official registration and order-specific documents are available
                through our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y relative overflow-hidden bg-gradient-to-br from-[#FBAA00]/20 via-[#fff8e8] to-[#FBAA00]/35">
        <div className="absolute inset-0 bg-weave-light opacity-50" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full border-[55px] border-[#FBAA00]/10" />
        <div className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-[#FBAA00]/10 blur-3xl" />
        <div className="container-x relative">
          <div className="[&>div]:!mb-4">
            <SectionTitle
              eyebrow="Certificates"
              title="Our certifications & registrations"
              description="View the current documents published by our team. Select any certificate to open the full-size copy."
              align="center"
            />
          </div>
          <CertificationsGallery />
        </div>
      </section>

      <section className="section-y relative overflow-hidden bg-white">
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-[#FBAA00]/25 to-transparent" />
        <FaShieldAlt className="absolute -right-16 top-2 h-72 w-72 rotate-12 text-[#FBAA00]/[0.045]" />

        <div className="container-x relative">
          <div className="absolute right-0 top-0 hidden items-center gap-3 md:flex">
            <div className="grid h-16 w-16 place-items-center rounded-full border border-[#FBAA00]/45 outline outline-1 outline-offset-4 outline-[#579515]/20">
              <FaShieldAlt className="h-6 w-6 text-[#579515]" />
            </div>
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#FBAA00]">Quality</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#579515]">Assured process</div>
            </div>
          </div>
          <div className="border-b border-[#FBAA00]/30 pb-4 md:pr-40">
            <div className="[&>div]:!mb-3">
              <SectionTitle
                eyebrow="Quality assurance"
                title="Checked from yarn to dispatch"
                description="Our control process follows the product through production, finishing and packing—not just at the final table."
              />
            <p className="max-w-4xl border-l-[3px] border-[#D99100] pl-4 text-xs font-medium leading-5 text-[#444444] sm:text-sm sm:leading-6">
              Custom specifications can be agreed before bulk production,
              including dimensions, weight, composition, colour and packing.
            </p>
            </div>
          </div>

          <ol className="relative mt-5 grid gap-5 before:absolute before:left-[12.5%] before:right-[12.5%] before:top-5 before:hidden before:h-px before:bg-gradient-to-r before:from-[#579515]/30 before:via-[#FBAA00] before:to-[#579515]/30 before:content-[''] sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:before:block">
            {qualityChecks.map(({ step, title, copy }) => (
              <li key={step} className="group relative text-center lg:px-5">
                <div className="relative z-10 mx-auto grid h-10 w-10 place-items-center rounded-full border-2 border-[#FBAA00] bg-white shadow-[0_0_0_5px_white] transition-colors duration-300 group-hover:bg-[#FBAA00]">
                  <span className="text-[10px] font-bold tracking-[0.12em] text-[#579515] transition-colors group-hover:text-[#174D2A]">
                    {step}
                  </span>
                </div>
                <h3 className="display mt-3 text-base font-semibold text-gray-950">
                  {title}
                </h3>
                <p className="mx-auto mt-1.5 max-w-[15rem] text-xs leading-5 text-ink-soft">
                  {copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y relative overflow-hidden bg-[#579515] text-white">
        <div className="absolute inset-0 bg-weave-light opacity-10" />
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[60px] border-[#FBAA00]/10" />
        <div className="container-x relative grid gap-5 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow !text-gold-light">Buyer documentation</div>
            <h2 className="display mt-2 text-3xl font-semibold leading-[1.1] sm:text-4xl">
              Need documents for vendor approval?
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-5 text-white/80">
              Tell us what your procurement team needs. We will confirm what is
              available, share current copies privately and help complete
              applicable buyer forms.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-gold">
                Request documents <FaArrowRight className="h-3 w-3" />
              </Link>
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/55 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#FBAA00] hover:bg-[#FBAA00] hover:text-[#174D2A]"
              >
                <FaWhatsapp className="h-4 w-4" /> WhatsApp us
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-white/20 bg-white/[0.09] p-4 shadow-[0_24px_50px_-30px_rgba(23,77,42,0.8)] backdrop-blur sm:p-5">
              <div className="flex items-center gap-3 border-b border-white/20 pb-3">
                <FaCertificate className="h-5 w-5 text-[#FBAA00]" />
                <h3 className="display text-base font-semibold text-white">
                  Commonly requested
                </h3>
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {documentList.map((document) => (
                  <li key={document} className="flex items-start gap-2.5 text-xs font-medium text-white/90">
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
    </main>
  );
}
