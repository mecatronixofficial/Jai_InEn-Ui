import type { Metadata } from "next";
import { FaArrowRight, FaClock, FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";

import ContactForm from "@/components/ContactForm";
import PremiumPageBanner from "@/components/PremiumPageBanner";
import SectionTitle from "@/components/SectionTitle";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} Textile—visit our facility, WhatsApp us, or send an enquiry.`,
};

const phoneHref = `tel:${siteConfig.phone.replace(/\s+/g, "")}`;

const tiles = [
  { Icon: FaMapMarkerAlt, label: "Visit us", lines: [siteConfig.address.line2, `${siteConfig.address.city}, ${siteConfig.address.state}`, `${siteConfig.address.country} — ${siteConfig.address.pincode}`] },
  { Icon: FaPhoneAlt, label: "Call us", lines: [siteConfig.phone, "Mon – Sat"], href: phoneHref },
  { Icon: FaEnvelope, label: "Email us", lines: [siteConfig.email, "24×7 response"], href: `mailto:${siteConfig.email}` },
  { Icon: FaClock, label: "Working hours", lines: [siteConfig.workingHours, "Closed on Sundays"] },
];

const socials = [
  { href: siteConfig.socials.facebook, Icon: FaFacebookF, label: "Facebook" },
  { href: siteConfig.socials.instagram, Icon: FaInstagram, label: "Instagram" },
  { href: siteConfig.socials.youtube, Icon: FaYoutube, label: "YouTube" },
];

export default function ContactPage() {
  return (
    <div className="lux-page">
      <PremiumPageBanner
        eyebrow="Get in touch"
        title={<>Let&apos;s talk <span>textile.</span></>}
        description="Wholesale orders, custom enquiries, or a question—we're easy to reach."
        current="Contact"
        actions={<>
          <a href={siteConfig.socials.whatsapp} target="_blank" rel="noreferrer" className="lux-btn"><FaWhatsapp aria-hidden /> WhatsApp us</a>
          <a href={phoneHref} className="lux-btn lux-btn--light"><FaPhoneAlt aria-hidden /> {siteConfig.phone}</a>
        </>}
      />

      <section id="page-content" className="lux-section">
        <div className="lux-container">
          <SectionTitle eyebrow="Reach us" title={<> Ways to <span>connect</span></>} align="center" ornament />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tiles.map(({ Icon, label, lines, href }) => {
              const body = (
                <>
                  <span className="lux-icon"><Icon /></span>
                  <p className="lux-kicker mt-8">{label}</p>
                  <div className="mt-3 grid gap-1">
                    {lines.map((line, index) => (
                      <p key={line} className={index === 0 ? "break-words font-[family-name:var(--lux-heading)] text-[16px] font-semibold !leading-snug text-[#1C1C1C]" : "text-sm !leading-6"}>{line}</p>
                    ))}
                  </div>
                </>
              );
              return href
                ? <a key={label} href={href} className="lux-card block">{body}</a>
                : <div key={label} className="lux-card">{body}</div>;
            })}
          </div>
        </div>
      </section>

      <section className="lux-section">
        <div className="lux-container grid gap-4 md:gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionTitle eyebrow="Send a message" title={<>Tell us about <span>your project</span></>} description="Share your requirement and we'll respond. For urgent enquiries, call or WhatsApp." className="!mb-6" />
            <div className="lux-card lux-card--flat"><ContactForm /></div>
          </div>

          <aside className="grid content-start gap-6 lg:col-span-5 lg:pt-4">
            <div className="lux-panel !p-8 sm:!p-10">
              <p className="lux-kicker">Direct line</p>
              <h3 className="mt-3 text-2xl">Talk to us directly</h3>
              <p className="mt-2 text-[15px]">Reach our team instantly.</p>
              <div className="mt-7 grid gap-3">
                <ContactLink href={siteConfig.socials.whatsapp} Icon={FaWhatsapp} label="WhatsApp" value={siteConfig.whatsappDisplay} external />
                <ContactLink href={phoneHref} Icon={FaPhoneAlt} label="Phone" value={siteConfig.phone} />
                <ContactLink href={`mailto:${siteConfig.email}`} Icon={FaEnvelope} label="Email" value={siteConfig.email} />
              </div>
            </div>

            <div className="lux-card">
              <p className="lux-kicker">Follow our work</p>
              <div className="mt-5 flex gap-3">
                {socials.map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-12 w-12 place-items-center rounded-full border border-[#EEE8DC] text-[#1C1C1C] transition duration-300 hover:-translate-y-1 hover:border-[#FBAA00] hover:bg-[#FBAA00] hover:shadow-[0_14px_24px_-14px_rgba(251,170,0,0.9)]">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="lux-section">
        <div className="lux-container">
          <SectionTitle eyebrow="Find us" title={<>Our facility in <span>{siteConfig.address.city}</span></>} description="Located in Tamil Nadu's textile manufacturing belt. Scheduled visits are welcome." align="center" ornament />
          <div className="lux-frame">
            <div className="lux-media aspect-[16/7] min-h-[340px] border border-[#EEE8DC]">
              <iframe title={`${siteConfig.name} — ${siteConfig.address.city}`} src={siteConfig.locationlink} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen className="absolute inset-0 h-full w-full border-0 grayscale-[35%] transition duration-700 hover:grayscale-0" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactLink({ href, Icon, label, value, external = false }: { href: string; Icon: typeof FaPhoneAlt; label: string; value: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="lux-row group flex items-center gap-4 rounded-[2px] border border-[#EEE8DC] bg-white px-4 py-3.5"
    >
      <span className="lux-icon lux-icon--sm"><Icon /></span>
      <span className="min-w-0 flex-1">
        <span className="lux-kicker block !text-[10px]">{label}</span>
        <span className="block truncate font-[family-name:var(--lux-heading)] text-[15px] font-semibold text-[#1C1C1C]">{value}</span>
      </span>
      <FaArrowRight aria-hidden className="h-3 w-3 text-[#FBAA00] transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}
