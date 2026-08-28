/**
 * Public data layer for server components.
 *
 * Each loader tries to fetch from the NestJS backend first. If the backend is
 * unreachable or returns an error, it falls back to the static seed data in
 * `src/data/*`. This keeps the site functional whether or not the backend is
 * running, and means the same code paths render both states.
 *
 * Important: these are server-side functions. Do not import from "use client"
 * components — use the client `api` helper from `@/lib/api` for that.
 */

import type {
  Category as CategoryType,
  Product as ProductType,
  HeroSlide,
  BlogPost,
  Testimonial,
  Offer,
  OpeningCardData,
} from "@/types";

const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
const API_BASE = publicApiUrl?.startsWith("http")
  ? publicApiUrl
  : `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"}/api/v1`;

async function tryFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      cache: "no-store",
      // Short timeout so a down backend doesn't slow down page renders
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

interface ApiPaginated<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; pages: number };
}

// ----- Mapping helpers (backend → frontend types) -----

function mapCategory(api: any): CategoryType {
  return {
    id: api.id || api._id,
    name: api.name,
    slug: api.slug,
    image: api.image,
    description: api.description,
    productCount: api.productCount ?? 0,
  };
}

function mapProduct(api: any): ProductType {
  return {
    id: api.id || api._id,
    name: api.name,
    slug: api.slug,
    category: api.category,
    subcategory: api.subcategory,
    images: api.images || [],
    description: api.description,
    clothType: api.clothType,
    colors: api.colors || [],
    sizes: api.sizes || [],
    // Older backend records may not contain inventory yet. Treat a missing
    // value as available; an explicit zero still remains out of stock.
    stock: api.stock ?? 1,
    offerPrice: api.offerPrice,
    originalPrice: api.originalPrice,
    material: api.material,
    gsm: api.gsm,
    pattern: api.pattern,
    washable: api.washable ?? true,
    featured: api.featured ?? false,
    newArrival: api.newArrival ?? false,
    rating: api.rating ?? 4.5,
    reviews: api.reviews ?? 0,
    tags: api.tags || [],
    specifications: api.specifications,
  };
}

function mapHero(api: any): HeroSlide {
  return {
    id: api.id || api._id,
    eyebrow: api.eyebrow || "",
    title: api.title,
    highlight: api.highlight,
    description: api.description,
    image: api.image,
    ctaLabel: api.ctaLabel,
    ctaHref: api.ctaHref,
    secondaryLabel: api.secondaryLabel,
    secondaryHref: api.secondaryHref,
  };
}

function mapBlog(api: any): BlogPost {
  return {
    id: api.id || api._id,
    title: api.title,
    slug: api.slug,
    excerpt: api.excerpt,
    content: api.content,
    coverImage: api.coverImage,
    author: api.author,
    authorImage: api.authorImage,
    publishedAt: api.publishedAt,
    category: api.category,
    tags: api.tags || [],
    readTime: api.readTime ?? 5,
  };
}

function mapTestimonial(api: any): Testimonial {
  return {
    id: api.id || api._id,
    name: api.name,
    role: api.role,
    company: api.company,
    location: api.location,
    rating: api.rating,
    review: api.review,
    image: api.image,
    productPurchased: api.productPurchased,
  };
}

function mapOffer(api: any): Offer {
  return {
    id: api.id || api._id,
    title: api.title,
    description: api.description,
    code: api.code,
    discountPercent: api.discountPercent ?? 0,
    expiresAt: api.expiresAt,
    image: api.image,
    ctaLabel: api.ctaLabel,
    ctaHref: api.ctaHref,
  };
}

function mapOpening(api: any): OpeningCardData {
  return {
    enabled: true,
    title: api.title,
    subtitle: api.subtitle || "",
    description: api.description,
    image: api.image,
    ctaLabel: api.ctaLabel,
    ctaHref: api.ctaHref,
    expiresAt: api.expiresAt,
    badge: api.badge,
  };
}

// ----- Public loaders -----

export async function loadCategories() {
  const res = await tryFetch<any[]>("/categories");
  if (res && res.length > 0) return res.map(mapCategory);
  return [];
}

export async function loadProducts() {
  const res = await tryFetch<ApiPaginated<any>>("/products?limit=100");
  if (res && res.data.length > 0) return res.data.map(mapProduct);
  return [];
}

export async function loadProductBySlug(slug: string) {
  const res = await tryFetch<any>(`/products/${encodeURIComponent(slug)}`);
  if (res) return mapProduct(res);
}

export async function loadRelatedProducts(slug: string){
  const res = await tryFetch<any[]>(`/products/${slug}/related`);
  if (res && res.length > 0) return res.map(mapProduct);
  return [];
}

export async function loadHeroSlides() {
  const res = await tryFetch<any[]>("/banners/hero");
  if (res && res.length > 0) return res.map(mapHero);
}

export async function loadOpeningCard() {
  const res = await tryFetch<any[]>("/banners/opening-card");
  if (res && res.length > 0) return mapOpening(res[0]);
 
}

export async function loadBlogs() {
  const res = await tryFetch<ApiPaginated<any>>("/blogs?limit=100");
  if (res && res.data.length > 0) return res.data.map(mapBlog);
  return [];
}

export async function loadBlogBySlug(slug: string){
  const res = await tryFetch<any>(`/blogs/${slug}`);
  if (res) return mapBlog(res);
}

export async function loadTestimonials() {
  const res = await tryFetch<any[]>("/testimonials");
  if (res && res.length > 0) return res.filter(Boolean).map(mapTestimonial);
  return [];
}

export async function loadOffers() {
  const res = await tryFetch<any[]>("/offers");
  if (res && res.length > 0) return res.map(mapOffer);
  return [];
}
