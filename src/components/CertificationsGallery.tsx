"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight, FaCertificate, FaExpand } from "react-icons/fa";

import { api, type CertificateApi } from "@/lib/api";

export default function CertificationsGallery() {
  const [certificates, setCertificates] = useState<CertificateApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    api
      .publicCertificates()
      .then((items) => {
        if (!cancelled) setCertificates(items);
      })
      .catch(() => {
        if (!cancelled) setCertificates([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-[340px] rounded-[4px] shimmer md:h-[380px]" />
        ))}
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="lux-card lux-card--flat mx-auto max-w-xl text-center">
        <span className="lux-icon mx-auto"><FaCertificate /></span>
        <h3 className="mt-4 text-lg md:text-xl">Documents available on request</h3>
        <p className="mx-auto mt-2 max-w-lg text-[15px]">Contact our team for current registration and certification copies.</p>
        <Link href="/contact" className="lux-btn mt-4">Request documents <FaArrowRight aria-hidden /></Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((certificate) => (
        <a
          key={certificate.id}
          href={certificate.image}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${certificate.title} (opens in a new tab)`}
          className="lux-card lux-hover group flex flex-col !p-4 md:!p-5"
        >
          <div className="lux-media relative h-[240px] border border-[#EEE8DC] !bg-white md:h-[260px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={certificate.image} alt={certificate.title} className="!object-contain p-4" loading="lazy" />
            <span className="absolute inset-0 grid place-items-center bg-[#1C1C1C]/0 transition duration-500 group-hover:bg-[#1C1C1C]/45">
              <span className="grid h-14 w-14 scale-75 place-items-center rounded-full bg-[#FBAA00] text-[#1C1C1C] opacity-0 transition duration-500 group-hover:scale-100 group-hover:opacity-100">
                <FaExpand aria-hidden className="h-4 w-4" />
              </span>
            </span>
          </div>
          <div className="flex flex-1 flex-col px-1 pt-4">
            {certificate.issuedAt && <span className="lux-kicker">Issued {new Date(certificate.issuedAt).getFullYear()}</span>}
            <h3 className="mt-2 !text-base md:!text-lg">{certificate.title}</h3>
            {certificate.description && <p className="mt-2 line-clamp-3 !text-xs !leading-relaxed md:!text-sm">{certificate.description}</p>}
            <span className="lux-link mt-auto pt-3">View full certificate <FaArrowRight aria-hidden /></span>
          </div>
        </a>
      ))}
    </div>
  );
}
