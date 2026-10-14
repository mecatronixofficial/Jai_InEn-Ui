import type { Metadata } from "next";
import Link from "next/link";
import {
  FaArrowRight,
  FaCertificate,
  FaCheck,
  FaWhatsapp,
} from "react-icons/fa";

import PremiumPageBanner from "@/components/PremiumPageBanner";
import SectionTitle from "@/components/SectionTitle";
import CertificationsGallery from "@/components/CertificationsGallery";
import { siteConfig } from "@/data/site";
import styles from "./certifications.module.css";

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

const trustStats = [
  ["2017", "GST registered since"],
  ["04", "Quality checkpoints"],
  ["100%", "Batches inspected"],
];

export default function CertificationsPage() {
  return (
    <div className={`lux-page ${styles.certifications}`}>
      <PremiumPageBanner eyebrow="Proof behind the product" title={<>Standards you can verify. <span>Quality you can feel.</span></>} description="Clear registrations, documented checks and transparent buyer support—because trust should come with evidence." current="Certifications" />

      <section id="page-content" className="lux-section">
        <div className="lux-container grid items-center gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionTitle
              eyebrow="Trust, documented"
              title={<>Confidence for <span>every buyer</span></>}
              description={`${siteConfig.name} is a registered textile manufacturer based in ${siteConfig.address.city}. We pair statutory documentation with practical controls at each stage of production.`}
              className="!mb-4"
            />
            <div className="grid gap-4 md:gap-6 sm:grid-cols-3">
              {trustStats.map(([value, label]) => (
                <div key={label} className="lux-card !p-4 md:!p-5">
                  <div className="lux-stat text-3xl">{value}</div>
                  <div className="lux-kicker mt-2 !text-[10px]">{label}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-2xl border-l-2 border-[#FBAA00] pl-4 text-sm md:text-base">
              We only publish credentials we can substantiate. Current copies and supporting records are shared directly with buyers during enquiry or commercial onboarding.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="lux-panel text-center">
              <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-full border border-[#FBAA00]/45 p-2.5 md:h-40 md:w-40">
                <div className="grid h-full w-full place-items-center rounded-full border-2 border-dashed border-[#FBAA00] bg-white transition duration-700 [.lux-panel:hover_&]:rotate-[30deg]">
                  <div className="transition duration-700 [.lux-panel:hover_&]:-rotate-[30deg]">
                    <FaCertificate aria-hidden className="mx-auto h-8 w-8 text-[#FBAA00]" />
                    <div className="mt-2 font-[family-name:var(--lux-heading)] text-xl font-semibold text-[#1C1C1C]">Verified</div>
                    <div className="lux-kicker mt-1 !text-[9px]">Documentation</div>
                  </div>
                </div>
              </div>
              <p className="lux-kicker mt-4">{siteConfig.name}</p>
              <p className="mx-auto mt-2 max-w-xs text-sm md:text-base">Official registration and order-specific documents are available through our team.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="lux-section">
        <div className="lux-container">
          <SectionTitle
            eyebrow="Certificates"
            title={<>Our certifications &amp; <span>registrations</span></>}
            description="View the current documents published by our team. Select any certificate to open the full-size copy."
            align="center"
            ornament
          />
          <CertificationsGallery />
        </div>
      </section>

      <section className="lux-section">
        <div className="lux-container">
          <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle
              eyebrow="Quality assurance"
              title={<>Checked from yarn <span>to dispatch</span></>}
              description="Our control process follows the product through production, finishing and packing—not just at the final table."
              className="!mb-0"
            />
            <p className="max-w-md border-l-2 border-[#FBAA00] pl-5 text-[15px]">
              Custom specifications can be agreed before bulk production, including dimensions, weight, composition, colour and packing.
            </p>
          </div>

          <ol className="relative mt-6 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-[62px] hidden border-t border-dashed border-[#FBAA00]/70 lg:block" />
            {qualityChecks.map(({ step, title, copy }) => (
              <li key={step} className="lux-card text-center">
                <span className="lux-icon relative z-10 mx-auto font-[family-name:var(--lux-heading)] text-[15px] font-bold">{step}</span>
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm !leading-relaxed">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lux-section">
        <div className="lux-container">
          <div className="lux-panel grid gap-4 md:gap-6 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-6">
              <p className="lux-eyebrow">Buyer documentation</p>
              <h2 className="lux-title">Need documents for <span>vendor approval?</span></h2>
              <p className="lux-lead max-w-xl">
                Tell us what your procurement team needs. We will confirm what is available, share current copies privately and help complete applicable buyer forms.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Link href="/contact" className="lux-btn">Request documents <FaArrowRight aria-hidden /></Link>
                <a href={siteConfig.socials.whatsapp} target="_blank" rel="noreferrer" className="lux-btn lux-btn--ghost"><FaWhatsapp aria-hidden /> WhatsApp us</a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[4px] border border-[#EEE8DC] bg-white p-4 md:p-5">
                <div className="flex items-center gap-3 border-b border-[#EEE8DC] pb-4">
                  <span className="lux-icon lux-icon--sm"><FaCertificate /></span>
                  <h3 className={`${styles.subheading} text-xl`}>Commonly requested</h3>
                </div>
                <ul className="mt-2 grid sm:grid-cols-2">
                  {documentList.map((document) => (
                    <li key={document} className="lux-row group flex items-start gap-3 px-3 py-3.5 text-sm text-[#1C1C1C]">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#FFF4D9] text-[#B57A00] transition group-hover:bg-[#FBAA00] group-hover:text-[#1C1C1C]">
                        <FaCheck aria-hidden className="h-2.5 w-2.5" />
                      </span>
                      {document}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
