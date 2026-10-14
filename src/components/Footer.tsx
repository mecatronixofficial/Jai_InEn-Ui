"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaArrowRight,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import { siteConfig } from "@/data/site";
import { api, type CategoryApi } from "@/lib/api";
import CompanyLogo from "@/components/CompanyLogo";

const companyLinks = [
  ["About", "/about"],
  ["Sustainability", "/sustainability"],
  ["Certifications", "/certifications"],
  ["Categories", "/categories"],
  ["Journal", "/blog"],
  ["Reviews", "/testimonials"],
  ["FAQ", "/faq"],
  ["Contact", "/contact"],
];

const socials = [
  { href: siteConfig.socials.facebook, Icon: FaFacebookF, label: "Facebook" },
  { href: siteConfig.socials.instagram, Icon: FaInstagram, label: "Instagram" },
  { href: siteConfig.socials.youtube, Icon: FaYoutube, label: "YouTube" },
  { href: siteConfig.socials.whatsapp, Icon: FaWhatsapp, label: "WhatsApp" },
];

export default function Footer() {
  const pathname = usePathname();
  const [shopCategories, setShopCategories] = useState<CategoryApi[]>([]);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let active = true;
    api.publicCategories()
      .then((items) => active && setShopCategories(items))
      .catch(() => active && setShopCategories([]));
    return () => {
      active = false;
    };
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-container footer-news">
          <div>
            <p className="footer-eyebrow">Private trade updates</p>
            <h2>New collections &amp; <span>wholesale opportunities.</span></h2>
          </div>
          <form onSubmit={handleSubscribe} className="footer-form">
            <label className="sr-only" htmlFor="footer-email">Email address</label>
            <input id="footer-email" type="email" required placeholder="Your business email address" />
            <button type="submit">
              {subscribed ? "Thank you" : <>Subscribe <FaArrowRight aria-hidden /></>}
            </button>
          </form>
        </div>
      </div>

      <div className="footer-container footer-main">
        <div className="footer-brand">
          <Link href="/" className="footer-logo" aria-label={`${siteConfig.name} home`}>
            <span className="footer-logo-mark">
              {siteConfig.logo ? (
                <CompanyLogo decorative />
              ) : (
                <b>{siteConfig.name.charAt(0)}</b>
              )}
            </span>
            <span>
              <strong>{siteConfig.name}</strong>
              <small>Karur · Tamil Nadu · Since {siteConfig.established}</small>
            </span>
          </Link>
          <p>{siteConfig.description}</p>
          <div className="footer-socials">
            {socials.map(({ href, Icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Collections">
          {shopCategories.length > 0
            ? shopCategories.slice(0, 7).map((category) => (
                <FooterLink key={category.id} href={`/products?category=${category.slug}`} label={category.name} />
              ))
            : <FooterLink href="/products" label="All products" />}
        </FooterColumn>

        <FooterColumn title="Company">
          {companyLinks.map(([label, href]) => (
            <FooterLink key={href} href={href} label={label} />
          ))}
        </FooterColumn>

        <div>
          <h3 className="footer-heading">Reach us</h3>
          <ul className="footer-contact">
            <ContactItem Icon={FaMapMarkerAlt}>
              {siteConfig.address.line2}<br />
              {siteConfig.address.city}, {siteConfig.address.state} – {siteConfig.address.pincode}
            </ContactItem>
            <ContactItem Icon={FaPhoneAlt}>
              <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}>{siteConfig.phone}</a>
            </ContactItem>
            <ContactItem Icon={FaEnvelope}>
              <a href={`mailto:${siteConfig.email}`} className="break-all">{siteConfig.email}</a>
            </ContactItem>
            <ContactItem Icon={FaClock}>{siteConfig.workingHours}</ContactItem>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <span>© {new Date().getFullYear()} <b>{siteConfig.name}</b>. All rights reserved.</span>
          <span className="footer-made">
            <span>Designed by</span>
            <a href="https://www.mecatronix.one" target="_blank" rel="noopener noreferrer" aria-label="Mecatronix Software Development">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/brands/mecatronix-logo.png" alt="Mecatronix" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="footer-heading">{title}</h3>
      <ul className="footer-links">{children}</ul>
    </div>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href}><i aria-hidden />{label}</Link>
    </li>
  );
}

function ContactItem({ Icon, children }: { Icon: typeof FaMapMarkerAlt; children: React.ReactNode }) {
  return (
    <li>
      <span className="footer-contact-icon"><Icon aria-hidden /></span>
      <span>{children}</span>
    </li>
  );
}
