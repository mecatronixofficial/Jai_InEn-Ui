"use client";

import { useEffect, useState } from "react";
import { FaCertificate, FaExternalLinkAlt } from "react-icons/fa";

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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-[28rem] rounded-2xl shimmer" />
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
        <h3 className="display mt-5 text-2xl font-semibold text-gray-950">
          Documents available on request
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">
          Contact our team for current registration and certification copies.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((certificate) => (
        <article
          key={certificate.id}
          tabIndex={0}
          className="group aspect-[4/5] rounded-2xl outline-none [perspective:1200px]"
        >
          <div className="relative h-full w-full rounded-2xl shadow-soft transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)] group-focus-visible:ring-2 group-focus-visible:ring-gray-700 group-focus-visible:ring-offset-4">
            {/* Front */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl border border-cream-200 bg-white [backface-visibility:hidden]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={certificate.image}
                alt={certificate.title}
                className="h-full w-full object-contain p-4 transition duration-700 group-hover:scale-[1.025] group-focus-within:scale-[1.025]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-950 via-gray-950/90 to-transparent px-6 pb-6 pt-16 text-cream-50">
                <div className="text-[9px] font-semibold uppercase tracking-widest-x text-gold-light">
                  Hover or tap for details
                </div>
                <h3 className="display mt-1.5 text-2xl font-semibold leading-tight">
                  {certificate.title}
                </h3>
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl bg-gray-950 p-7 text-cream-50 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-8">
              <div className="absolute inset-0 bg-weave-dark opacity-60" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold-light">
                    <FaCertificate className="h-5 w-5" />
                  </div>
                  <span className="text-[9px] font-semibold uppercase tracking-widest-x text-gold-light">
                    Verified document
                  </span>
                </div>

                <div className="mt-8">
                  <div className="text-[10px] font-semibold uppercase tracking-widest-x text-gold-light">
                    {certificate.issuer || "Official certificate"}
                  </div>
                  <h3 className="display mt-3 text-3xl font-semibold leading-tight">
                    {certificate.title}
                  </h3>
                  {certificate.description && (
                    <p className="mt-4 text-sm leading-relaxed text-cream-100/75">
                      {certificate.description}
                    </p>
                  )}
                  {certificate.issuedAt && (
                    <p className="mt-5 border-l-2 border-gold pl-3 text-xs text-cream-100/70">
                      Issued {new Date(certificate.issuedAt).toLocaleDateString("en-IN", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>

                <a
                  href={certificate.image}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gray-950 transition hover:bg-gold-light focus:outline-none focus:ring-2 focus:ring-cream-50"
                  aria-label={`Open full-size ${certificate.title}`}
                >
                  View full certificate
                  <FaExternalLinkAlt className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
