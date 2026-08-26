import type { Metadata } from "next";
import Link from "next/link";
import { FaClock, FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";

import ContactForm from "@/components/ContactForm";
import PremiumPageBanner from "@/components/PremiumPageBanner";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} Textile—visit our facility, WhatsApp us, or send an enquiry.`,
};

const tiles = [
  { Icon: FaMapMarkerAlt, label: "Visit Us", lines: [siteConfig.address.line2, `${siteConfig.address.city}, ${siteConfig.address.state}`, `${siteConfig.address.country} — ${siteConfig.address.pincode}`] },
  { Icon: FaPhoneAlt, label: "Call Us", lines: [siteConfig.phone, "Mon – Sat"], href: `tel:${siteConfig.phone.replace(/\s+/g, "")}` },
  { Icon: FaEnvelope, label: "Email Us", lines: [siteConfig.email, "24×7 response"], href: `mailto:${siteConfig.email}` },
  { Icon: FaClock, label: "Working Hours", lines: [siteConfig.workingHours, "Closed on Sundays"] },
];

export default function ContactPage() {
  return (
    <main className="overflow-hidden bg-white">
      <PremiumPageBanner eyebrow="Get in touch" title={<>Let&apos;s talk <span className="text-[#FBAA00]">textile.</span></>} description="Wholesale orders, custom enquiries, or a question—we're easy to reach." current="Contact" />
      <section
        className="hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/contact/contact-textile-banner-v3.png" alt="Floating woven textile ribbons" width="1862" height="845" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1600ms] group-hover:scale-[1.025]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071d11]/95 via-[#174D2A]/65 to-transparent" />
        <div className="absolute inset-y-0 left-[52%] hidden w-px origin-bottom -rotate-[16deg] bg-gradient-to-b from-transparent via-[#FBAA00]/70 to-transparent shadow-[0_0_18px_rgba(251,170,0,0.5)] md:block" />
        <div className="absolute inset-y-0 left-[55%] hidden w-px origin-bottom -rotate-[16deg] bg-white/10 md:block" />
        <div className="absolute bottom-4 right-6 hidden grid-cols-6 gap-2 opacity-40 lg:grid">
          {Array.from({ length: 24 }).map((_, index) => <span key={index} className="h-1 w-1 rounded-full bg-[#FBAA00]" />)}
        </div>
        <div className="absolute inset-y-0 left-0 w-2 bg-[#579515]" />
        <div className="pointer-events-none absolute inset-2 rounded-[18px] border border-white/20 shadow-[inset_0_0_0_1px_rgba(251,170,0,0.14),inset_0_0_28px_rgba(0,0,0,0.16)] lg:rounded-[25px]" />
        <span className="pointer-events-none absolute left-7 top-0 h-1 w-32 bg-gradient-to-r from-transparent via-[#FBAA00] to-transparent" />
        <span className="pointer-events-none absolute bottom-0 right-7 h-1 w-32 bg-gradient-to-r from-transparent via-[#579515] to-transparent" />
        <div className="container-x relative flex h-[235px] flex-col justify-end pb-7 pt-12 lg:h-[295px] lg:pb-9">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white"><Link href="/" className="text-[#FBAA00] hover:text-white">Home</Link><span className="text-white/60">/</span><span>Contact</span></div>
          <div className="mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#FBAA00]"><span className="h-0.5 w-10 bg-[#FBAA00]" /> Get in touch</div>
          <h1 className="max-w-4xl font-sans text-3xl font-semibold leading-[1.1] tracking-tight text-white [text-shadow:0_3px_8px_rgba(0,0,0,0.85)] sm:text-4xl">Let&apos;s talk <span className="text-[#FBAA00]">textile.</span></h1>
          <p className="mt-2 max-w-2xl text-[15px] font-medium leading-6 text-white/90 sm:text-base">Wholesale orders, custom enquiries, or a question—we&apos;re easy to reach.</p>
        </div>
      </section>

      <section className="section-y bg-gradient-to-br from-white via-[#fffaf0] to-[#FBAA00]/10">
        <div className="container-x grid gap-x-5 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map(({ Icon, label, lines, href }, index) => {
            const tilt = index % 2 === 0
              ? "group-hover:[transform:translateY(-6px)_rotateX(5deg)_rotateY(-5deg)]"
              : "group-hover:[transform:translateY(-6px)_rotateX(5deg)_rotateY(5deg)]";
            const card = <div className="group relative h-full [perspective:900px]">
              <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-[#579515]/25 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-3 group-hover:bg-[#FBAA00]/35" />
              <div className={`relative min-h-[155px] overflow-hidden rounded-lg border border-[#143B32]/25 bg-white p-4 shadow-[0_15px_28px_-22px_rgba(20,59,50,0.55)] transition-[transform,box-shadow,border-color] duration-500 [transform-style:preserve-3d] group-hover:border-[#FBAA00]/70 group-hover:shadow-[12px_18px_28px_-16px_rgba(20,59,50,0.5)] ${tilt}`}>
                <span className="pointer-events-none absolute -left-20 top-0 h-full w-14 -skew-x-12 bg-gradient-to-r from-transparent via-[#FBAA00]/20 to-transparent transition-transform duration-700 group-hover:translate-x-[420px]" />
                <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-[#FBAA00] text-[#174D2A] shadow-[0_5px_0_rgba(87,149,21,0.2)] transition-[transform,background-color,color] duration-500 [transform:translateZ(18px)] group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-[#579515] group-hover:text-white"><Icon className="h-3.5 w-3.5" /></div>
                <div className="mt-3 text-[8px] font-bold uppercase tracking-[0.18em] text-[#579515]">{label}</div>
                <div className="mt-2 space-y-1">{lines.map((line, index) => <p key={line} className={index === 0 ? "text-sm font-semibold text-gray-950" : "text-xs text-ink-muted"}>{line}</p>)}</div>
              </div>
            </div>;
            return href ? <a key={label} href={href}>{card}</a> : <div key={label}>{card}</div>;
          })}
        </div>
      </section>

      <section className="section-y bg-[#F5F5F5]">
        <div className="container-x">
          <Heading eyebrow="Send a message" title="Tell us about your project" copy="Share your requirement and we'll respond. For urgent enquiries, call or WhatsApp." />
          <div className="mt-4 grid gap-5 lg:grid-cols-12">
            <div className="rounded-lg border border-[#143B32]/20 bg-white p-5 shadow-[7px_8px_0_rgba(251,170,0,0.18)] md:p-6 lg:col-span-7"><ContactForm /></div>
            <aside className="space-y-5 lg:col-span-5">
              <div className="relative overflow-hidden rounded-lg border border-[#143B32]/20 bg-white p-5 shadow-[7px_8px_0_rgba(87,149,21,0.16)]">
                <h3 className="display text-base font-semibold">Talk to us directly</h3><p className="mt-1 text-xs text-[#666]">Reach our team instantly.</p>
                <div className="mt-4 space-y-2">
                  <ContactLink href={siteConfig.socials.whatsapp} Icon={FaWhatsapp} label="WhatsApp" value={siteConfig.phone} primary />
                  <ContactLink href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`} Icon={FaPhoneAlt} label="Phone" value={siteConfig.phone} />
                  <ContactLink href={`mailto:${siteConfig.email}`} Icon={FaEnvelope} label="Email" value={siteConfig.email} />
                </div>
              </div>
              <div className="rounded-lg border border-[#143B32]/20 bg-white p-5 shadow-[7px_8px_0_rgba(251,170,0,0.14)]">
                <h3 className="display text-base font-semibold">Follow our work</h3>
                <div className="mt-3 flex gap-3">{[[siteConfig.socials.facebook, FaFacebookF, "Facebook"], [siteConfig.socials.instagram, FaInstagram, "Instagram"], [siteConfig.socials.youtube, FaYoutube, "YouTube"]].map(([href, Icon, label]) => <a key={label as string} href={href as string} target="_blank" rel="noreferrer" aria-label={label as string} className="grid h-9 w-9 place-items-center rounded-full bg-[#F5F5F5] text-[#666] transition hover:bg-[#FBAA00] hover:text-white"><Icon className="h-3.5 w-3.5" /></a>)}</div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-y"><div className="container-x">
        <Heading eyebrow="Find us" title={`Our facility in ${siteConfig.address.city}`} copy="Located in Tamil Nadu's textile manufacturing belt. Scheduled visits are welcome." />
        <div className="overflow-hidden rounded-lg border border-[#143B32]/20 shadow-[7px_8px_0_rgba(251,170,0,0.16)]"><iframe title={`${siteConfig.name} — ${siteConfig.address.city}`} src={siteConfig.locationlink} width="100%" height="320" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="w-full" /></div>
      </div></section>
    </main>
  );
}

function Heading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="mx-auto mb-5 max-w-2xl text-center"><div className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#579515]">{eyebrow}</div><h2 className="display mt-1 text-3xl font-semibold leading-[1.1] text-[#FBAA00] sm:text-4xl">{title}</h2><p className="mt-2 text-sm leading-6 text-[#666] sm:text-base sm:leading-7">{copy}</p></div>;
}

function ContactLink({ href, Icon, label, value, primary = false }: { href: string; Icon: typeof FaPhoneAlt; label: string; value: string; primary?: boolean }) {
  return <a href={href} className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${primary ? "bg-[#FBAA00] text-[#174D2A] hover:bg-[#e89d00]" : "border border-[#ECECEC] bg-white hover:border-[#579515]/40"}`}><Icon className="h-4 w-4" /><div><div className="text-[8px] font-bold uppercase tracking-[0.14em] opacity-70">{label}</div><div className="text-sm font-semibold">{value}</div></div></a>;
}
