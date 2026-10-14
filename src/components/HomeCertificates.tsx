"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { api, type CertificateApi } from "@/lib/api";
import styles from "@/app/home.module.css";

export default function HomeCertificates() {
  const [items, setItems] = useState<CertificateApi[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    api.publicCertificates().then((data) => { if (!cancelled) setItems(data); }).catch(() => undefined).finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);
  if (loading) return <p role="status">Loading current documentation…</p>;
  if (!items.length) return <Link href="/contact" className={styles.secondary}>Request current certification documents <FaArrowRight aria-hidden /></Link>;
  return <div className={styles.certificates}>{items.slice(0, 4).map((item) => <a key={item.id} href={item.image} target="_blank" rel="noopener noreferrer" className={styles.certificate} aria-label={`View ${item.title} (opens in a new tab)`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={item.image} alt={item.title} loading="lazy" />
  </a>)}</div>;
}
