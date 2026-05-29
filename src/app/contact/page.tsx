import type { Metadata } from "next";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

import PageHero from "@/components/PageHero";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} Textile — visit our Erode facility, WhatsApp us for quick orders, or send an enquiry.`,
};

const tiles = [
  {
    Icon: FaMapMarkerAlt,
    label: "Visit Us",
    lines: [
      siteConfig.address.line2,
      `${siteConfig.address.city}, ${siteConfig.address.state}`,
      `${siteConfig.address.country} — ${siteConfig.address.pincode}`,
    ],
  },
  {
    Icon: FaPhoneAlt,
    label: "Call Us",
    lines: [siteConfig.phone, "Mon – Sat"],
    href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  },
  {
    Icon: FaEnvelope,
    label: "Email Us",
    lines: [siteConfig.email, "24×7 response"],
    href: `mailto:${siteConfig.email}`,
  },
  {
    Icon: FaClock,
    label: "Working Hours",
    lines: [siteConfig.workingHours, "Closed on Sundays"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let's talk textile."
        subtitle="Wholesale orders, custom enquiries, or just a question — we're easy to reach."
        bgImage="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Contact tiles */}
      <section className="section-y">
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiles.map(({ Icon, label, lines, href }) => {
              const inner = (
                <div className="group card p-6 h-full hover:shadow-warm transition">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-maroon-800 text-cream-50 group-hover:bg-gold group-hover:text-maroon-950 transition">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="mt-4 text-[10px] uppercase tracking-widest-x text-gold-dark font-semibold">
                    {label}
                  </div>
                  <div className="mt-2 space-y-1">
                    {lines.map((l, i) => (
                      <p
                        key={i}
                        className={
                          i === 0
                            ? "text-maroon-950 font-semibold"
                            : "text-ink-muted text-sm"
                        }
                      >
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              );
              return href ? (
                <a key={label} href={href}>
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="section-y bg-cream-100/50">
        <div className="container-x">
          <SectionTitle
            eyebrow="Send a Message"
            title="Tell us about your project"
            description="Share a few details about your requirement and we'll get back with a tailored response. For urgent enquiries, please call or WhatsApp."
            align="center"
          />

          <div className="grid lg:grid-cols-12 gap-8 mt-4">
            <div className="lg:col-span-7 card p-6 md:p-10">
              <ContactForm />
            </div>

            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-maroon-950 text-cream-50 p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-weave-dark opacity-30 pointer-events-none" />
                <div className="relative">
                  <h3 className="display text-2xl font-semibold">
                    Talk to us directly
                  </h3>
                  <p className="mt-2 text-cream-100/80 text-sm">
                    Skip the wait — reach our team instantly.
                  </p>

                  <div className="mt-6 space-y-3">
                    <a
                      href={siteConfig.socials.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-4 rounded-xl bg-gold px-5 py-4 text-maroon-950 hover:bg-gold-light transition"
                    >
                      <FaWhatsapp className="h-6 w-6" />
                      <div>
                        <div className="text-xs uppercase tracking-wider-x font-bold opacity-80">
                          WhatsApp
                        </div>
                        <div className="font-semibold">{siteConfig.phone}</div>
                      </div>
                    </a>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                      className="flex items-center gap-4 rounded-xl bg-cream-50/10 px-5 py-4 hover:bg-cream-50/15 transition"
                    >
                      <FaPhoneAlt className="h-5 w-5 text-gold-light" />
                      <div>
                        <div className="text-xs uppercase tracking-wider-x text-cream-100/70">
                          Phone
                        </div>
                        <div className="font-semibold">{siteConfig.phone}</div>
                      </div>
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-center gap-4 rounded-xl bg-cream-50/10 px-5 py-4 hover:bg-cream-50/15 transition"
                    >
                      <FaEnvelope className="h-5 w-5 text-gold-light" />
                      <div>
                        <div className="text-xs uppercase tracking-wider-x text-cream-100/70">
                          Email
                        </div>
                        <div className="font-semibold">{siteConfig.email}</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <h3 className="display text-xl font-semibold text-maroon-950">
                  Follow our work
                </h3>
                <div className="mt-5 flex items-center gap-3">
                  {[
                    {
                      href: siteConfig.socials.facebook,
                      Icon: FaFacebookF,
                      label: "Facebook",
                    },
                    {
                      href: siteConfig.socials.instagram,
                      Icon: FaInstagram,
                      label: "Instagram",
                    },
                    {
                      href: siteConfig.socials.youtube,
                      Icon: FaYoutube,
                      label: "YouTube",
                    },
                  ].map(({ href, Icon, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="grid h-11 w-11 place-items-center rounded-full bg-cream-100 text-maroon-800 hover:bg-maroon-800 hover:text-cream-50 transition"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-y">
        <div className="container-x">
          <SectionTitle
            eyebrow="Find Us"
            title={`Our facility in ${siteConfig.address.city}`}
            description="Located in the heart of Tamil Nadu's textile manufacturing belt. Scheduled visits welcome."
            align="center"
          />

          <div className="overflow-hidden rounded-2xl border border-cream-200 shadow-soft">
            <iframe
              title={`${siteConfig.name} — ${siteConfig.address.city}`}
              src={siteConfig.locationlink}
              width="100%"
              height="480"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="w-full rounded-2xl"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
