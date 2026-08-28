import type { MetadataRoute } from "next";
import { loadBlogs, loadProducts } from "@/lib/data";

const BASE = "https://www.jai-india.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/products",
    "/categories",
    "/blog",
    "/testimonials",
    "/sustainability",
    "/certifications",
    "/care-guide",
    "/contact",
    "/faq",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.7,
  }));

  const [products, blogs] = await Promise.all([loadProducts(), loadBlogs()]);

  const productRoutes = (products ?? []).map((p) => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogRoutes = (blogs ?? []).map((b) => ({
    url: `${BASE}/blog/${b.slug}`,
    lastModified: new Date(b.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
