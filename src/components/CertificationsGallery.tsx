"use client";

import { useEffect, useState } from "react";
import { FaCertificate } from "react-icons/fa";

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
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-[240px] rounded-2xl shimmer sm:h-[270px] lg:h-[285px]" />
        ))}
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="card px-6 py-14 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gray-50 text-gray-800">
          <FaCertificate className="h-5 w-5" />
        </div>
        <h3 className="display mt-5 text-base font-semibold text-gray-950">
          Documents available on request
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">
          Contact our team for current registration and certification copies.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 [perspective:1400px]">
      {certificates.map((certificate) => (
        <a
          key={certificate.id}
          href={certificate.image}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${certificate.title}`}
          className="certificate-card group relative h-[240px] rounded-2xl outline-none [perspective:1000px] focus-visible:ring-2 focus-visible:ring-[#FBAA00] focus-visible:ring-offset-4 sm:h-[270px] lg:h-[285px]"
        >
          <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-[#FBAA00]/45 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />
          <div className="certificate-card-inner relative h-full rounded-2xl shadow-[0_18px_35px_-22px_rgba(88,60,0,0.7)] transition-transform duration-700 [transform-style:preserve-3d]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-[#FBAA00]/60 bg-[#fffdf7] p-2.5 [backface-visibility:hidden]">
              <div className="relative h-full overflow-hidden rounded-xl border-2 border-[#FBAA00]/25 bg-white shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={certificate.image} alt={certificate.title} className="h-full w-full object-contain p-2" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#FBAA00]/10 via-transparent to-white/35 opacity-60" />
              </div>
              <span className="absolute left-1/2 top-0 h-1 w-2/3 -translate-x-1/2 rounded-b-full bg-[#FBAA00]" />
            </div>

            <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-[#FBAA00]/60 bg-gradient-to-br from-[#fffdf7] via-[#FBAA00]/20 to-[#FBAA00]/45 p-4 text-[#174D2A] [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <div className="absolute inset-0 bg-weave-light opacity-40" />
              <div className="relative flex h-full flex-col">
                {certificate.issuedAt && (
                  <span className="self-start rounded-full bg-white/70 px-3 py-1 text-[10px] font-bold tracking-wider text-[#D99100]">
                    {new Date(certificate.issuedAt).getFullYear()}
                  </span>
                )}
                <FaCertificate className="mt-3 h-5 w-5 text-[#D99100]" />
                <h3 className="display mt-2 text-base font-semibold leading-tight">{certificate.title}</h3>
                {certificate.description && (
                  <p className="mt-2 line-clamp-4 text-[11px] font-semibold leading-relaxed">{certificate.description}</p>
                )}
                <span className="mt-auto border-t border-[#FBAA00]/30 pt-3 text-[9px] font-bold uppercase tracking-[0.16em] text-[#D99100]">View full certificate</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
