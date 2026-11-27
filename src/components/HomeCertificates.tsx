"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { api, type CertificateApi } from "@/lib/api";
import styles from "@/app/home.module.css";

const MAX_ITEMS = 5;

/** Compact row of CMS-managed certification documents for the home page. */
export default function HomeCertificates() {
  const [items, setItems] = useState<CertificateApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api.publicCertificates()
      .then((data) => { if (!cancelled) setItems((data ?? []).filter((item) => Boolean(item?.image))); })
      .catch(() => undefined)
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className={styles.certificates} role="status" aria-label="Loading certification documents">
        {Array.from({ length: MAX_ITEMS }, (_, index) => <span key={index} className={`${styles.certificate} ${styles.certificateSkeleton}`} aria-hidden />)}
      </div>
    );
  }

  if (!items.length) {
    return (
      <p className={styles.emptyState}>
        Certification documents are available on request. <Link href="/contact#enquiry">Request documents <FaArrowRight aria-hidden /></Link>
      </p>
    );
  }

  return (
    <div className={styles.certificates}>
      {items.slice(0, MAX_ITEMS).map((item) => (
        <a key={item.id} href={item.image} target="_blank" rel="noopener noreferrer" className={styles.certificate} aria-label={`View ${item.title} (opens in a new tab)`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
        </a>
      ))}
    </div>
  );
}
