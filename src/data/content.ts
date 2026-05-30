import type { Collection, HeroSlide, Testimonial, BlogPost, Offer, OpeningCardData } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "h1",
    eyebrow: "Erode • Since 2017",
    title: "Woven with care.",
    highlight: "Worn across India.",
    description:
      "Premium cotton, authentic handloom and honest pricing — from one of Tamil Nadu's most trusted textile manufacturers.",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1920&auto=format&fit=crop&q=80",
    ctaLabel: "Explore Collection",
    ctaHref: "/products",
    secondaryLabel: "Wholesale Enquiry",
    secondaryHref: "/contact",
  },
  {
    id: "h2",
    eyebrow: "New Collection",
    title: "The Handloom Edit.",
    highlight: "Heritage, hand-woven.",
    description:
      "Authentic Erode-Karur handloom lungis, stoles and petticoats — woven by master craftsmen, finished by us.",
    image:
      "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1920&auto=format&fit=crop&q=80",
    ctaLabel: "Shop Handloom",
    ctaHref: "/categories/handloom",
    secondaryLabel: "View Products",
    secondaryHref: "/products",
  },
  {
    id: "h3",
    eyebrow: "Wholesale Ready",
    title: "Bulk orders.",
    highlight: "Honest pricing.",
    description:
      "From single-piece retail to thousand-piece wholesale — Pan-India despatch with the same care, every time.",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&auto=format&fit=crop&q=80",
    ctaLabel: "Talk on WhatsApp",
    ctaHref: "https://wa.me/919876543210",
    secondaryLabel: "View Catalogue",
    secondaryHref: "/products",
  },
];

export const collections: Collection[] = [
  {
    id: "col1",
    name: "Handloom Heritage",
    slug: "handloom",
    description: "Authentic handloom pieces woven across the Erode-Karur belt.",
    image:
      "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1200&auto=format&fit=crop&q=80",
    badge: "Heritage",
    itemCount: 12,
  },
  {
    id: "col2",
    name: "Festival Edit",
    slug: "festival",
    description: "Dhotis, bordered bed sheets and bright gamcha for festive occasions.",
    image:
      "https://images.unsplash.com/photo-1622043720586-04b9eba47b8d?w=1200&auto=format&fit=crop&q=80",
    badge: "Seasonal",
    itemCount: 18,
  },
  {
    id: "col3",
    name: "Premium Cotton",
    slug: "premium",
    description: "Higher GSM, finer weaves and longer life — our top-tier cotton range.",
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&auto=format&fit=crop&q=80",
    badge: "Premium",
    itemCount: 22,
  },
  {
    id: "col4",
    name: "Wholesale Packs",
    slug: "wholesale",
    description: "Multi-piece packs designed for retailers and bulk buyers.",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=1200&auto=format&fit=crop&q=80",
    badge: "Bulk",
    itemCount: 15,
  },
  {
    id: "col5",
    name: "Trending Now",
    slug: "trending",
    description: "The pieces our customers are loving this season.",
    image:
      "https://images.unsplash.com/photo-1583846783214-7229a91b20ed?w=1200&auto=format&fit=crop&q=80",
    badge: "Trending",
    itemCount: 9,
  },
  {
    id: "col6",
    name: "Daily Essentials",
    slug: "daily",
    description: "Comfortable petticoats, lungis and towels for everyday wear.",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&auto=format&fit=crop&q=80",
    badge: "Everyday",
    itemCount: 28,
  },
];

export const getCollectionBySlug = (slug: string) =>
  collections.find((c) => c.slug === slug);

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rajesh Kumar",
    role: "Retail Owner",
    company: "Kumar Textiles",
    location: "Madurai, TN",
    rating: 5,
    review:
      "I've been ordering wholesale petticoats and lungis from Thangavel Textile for two years now. Quality is consistent, pricing is fair and they always despatch on time. A genuine, trustworthy partner.",
    productPurchased: "Wholesale Petticoats",
  },
  {
    id: "t2",
    name: "Lakshmi Subramanian",
    role: "Boutique Owner",
    location: "Chennai, TN",
    rating: 5,
    review:
      "Their handloom range is exceptional. The stoles especially — beautifully woven, soft on skin, and our customers love the colours. We've made them our default handloom supplier.",
    productPurchased: "Handloom Stoles",
  },
  {
    id: "t3",
    name: "Mohammed Ali",
    role: "Hotel Procurement",
    company: "Sunrise Resorts",
    location: "Coimbatore, TN",
    rating: 5,
    review:
      "We needed bath towels and bed sheets in bulk for our three properties. Thangavel Textile delivered exactly to spec, on time, and the GSM matched the sample. Will reorder.",
    productPurchased: "Bath Towels & Bed Sheets",
  },
  {
    id: "t4",
    name: "Priya Venkatesh",
    role: "Home Customer",
    location: "Bangalore, KA",
    rating: 4,
    review:
      "Ordered the cotton bath towel set and bed sheets through WhatsApp. Easy process, packed well, and the cotton is genuinely soft — not the stiff feel you get with online brands.",
    productPurchased: "Bath Towel Set",
  },
  {
    id: "t5",
    name: "Karthik Raja",
    role: "Wholesale Buyer",
    company: "Raja Cloth Stores",
    location: "Salem, TN",
    rating: 5,
    review:
      "Honest pricing and no surprises on stock. I've expanded my lungi and gamcha range across all three of my shops thanks to their consistent supply.",
    productPurchased: "Lungis & Gamcha",
  },
  {
    id: "t6",
    name: "Anita Reddy",
    role: "Saree Boutique",
    company: "Anita's Collection",
    location: "Hyderabad, TS",
    rating: 5,
    review:
      "Their petticoats are colour-matched well to popular saree shades. Customers come back for the same petticoats — that's the highest compliment I can give.",
    productPurchased: "Cotton Petticoats",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Why Erode is the Heart of South Indian Textile Manufacturing",
    slug: "erode-textile-manufacturing-hub",
    excerpt:
      "From the banks of the Cauvery to thousands of looms — how Erode quietly became the backbone of India's textile industry.",
    content:
      "Erode's textile story goes back generations. Sitting at the confluence of the Cauvery and Bhavani rivers, the region had natural advantages: abundant water for dyeing, fertile land for cotton, and a tradition of weaving that goes back to pre-independence India...\n\nToday, Erode supplies fabrics and finished textiles to every state in India. The combination of powerloom infrastructure, handloom heritage and family-run units like ours creates a manufacturing ecosystem that's hard to replicate elsewhere.",
    coverImage:
      "https://images.unsplash.com/photo-1620713043691-2a6c2c5dd47f?w=1600&auto=format&fit=crop&q=80",
    author: "Thangavel S",
    publishedAt: "2026-05-12T09:00:00Z",
    category: "Industry",
    tags: ["erode", "textile", "manufacturing"],
    readTime: 6,
  },
  {
    id: "b2",
    title: "Handloom vs Powerloom: What's the Real Difference?",
    slug: "handloom-vs-powerloom",
    excerpt:
      "A practical guide to telling the two apart — and why your end-use should decide which one you buy.",
    content:
      "Handloom and powerloom both produce cotton fabric, but the process, feel and price tell two very different stories. Handloom uses no electricity — the weaver controls every thread. The result is a slightly irregular, characterful fabric that softens beautifully with each wash...\n\nPowerloom is faster, more uniform, and produces tighter weaves at scale. For daily-wear products like home lungis and bed sheets, powerloom often makes more practical sense. For premium pieces — stoles, festive dhotis, heirloom petticoats — handloom is unmatched.",
    coverImage:
      "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=1600&auto=format&fit=crop&q=80",
    author: "Thangavel S",
    publishedAt: "2026-04-28T10:00:00Z",
    category: "Guides",
    tags: ["handloom", "powerloom", "weaving"],
    readTime: 5,
  },
  {
    id: "b3",
    title: "How to Care for Your Cotton Petticoat (and Make it Last Years)",
    slug: "cotton-petticoat-care-guide",
    excerpt:
      "Simple, time-tested advice from our team to extend the life of your everyday cotton wear.",
    content:
      "A good cotton petticoat should last you 3–4 years of regular wear. The trick is in the first wash. Always pre-wash in cold water with a teaspoon of salt — it sets the dye and prevents bleeding into your sarees later...\n\nAvoid wringing — squeeze gently and line-dry in the shade. Direct sun fades the colour over time, especially on deeper shades like maroon and navy. Iron on medium heat with a light spray of water.",
    coverImage:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1600&auto=format&fit=crop&q=80",
    author: "Lakshmi T",
    publishedAt: "2026-04-15T08:30:00Z",
    category: "Care Guide",
    tags: ["petticoat", "care", "wash"],
    readTime: 4,
  },
  {
    id: "b4",
    title: "Understanding GSM: What Those Numbers on Your Towel Actually Mean",
    slug: "understanding-gsm-towels",
    excerpt:
      "GSM is the most over-used and under-explained spec in textiles. Here's a no-nonsense breakdown.",
    content:
      "GSM — grams per square metre — is simply how much a square metre of the fabric weighs. Higher GSM means denser, heavier fabric. For towels, anything below 350 GSM is light/budget, 400–500 GSM is the everyday sweet spot, and 600+ GSM is luxury hotel territory...\n\nBut higher isn't always better. A 600 GSM bath towel takes forever to dry. A 450 GSM towel hits the perfect balance of absorbency and quick drying for Indian humidity.",
    coverImage:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1600&auto=format&fit=crop&q=80",
    author: "Thangavel S",
    publishedAt: "2026-03-30T11:00:00Z",
    category: "Guides",
    tags: ["gsm", "towel", "fabric"],
    readTime: 5,
  },
];

export const getBlogBySlug = (slug: string) =>
  blogPosts.find((b) => b.slug === slug);

export const offers: Offer[] = [
  {
    id: "o1",
    title: "Festival Special — Flat 25% Off",
    description: "Across our entire bed sheet and dhoti range. Limited stock.",
    code: "FESTIVE25",
    discountPercent: 25,
    expiresAt: "2026-06-30T23:59:59Z",
    ctaLabel: "Shop Now",
    ctaHref: "/products",
  },
  {
    id: "o2",
    title: "Wholesale Pricing — Bulk Orders",
    description: "Special rates for orders above 50 pieces. Talk to us on WhatsApp.",
    discountPercent: 15,
    expiresAt: "2026-12-31T23:59:59Z",
    ctaLabel: "Enquire",
    ctaHref: "/contact",
  },
  {
    id: "o3",
    title: "First Order — ₹50 Off",
    description: "New customers get ₹50 off on their first WhatsApp order.",
    code: "FIRST50",
    discountPercent: 0,
    expiresAt: "2026-12-31T23:59:59Z",
    ctaLabel: "Order Now",
    ctaHref: "/products",
  },
];

export const openingCard: OpeningCardData = {
  enabled: true,
  title: "Festival Sale is Live",
  subtitle: "Flat 25% Off",
  description:
    "On bed sheets, dhotis and the handloom range. Use code FESTIVE25 on your WhatsApp order.",
  image:
    "https://images.unsplash.com/photo-1622043720586-04b9eba47b8d?w=900&auto=format&fit=crop&q=80",
  ctaLabel: "Browse Festival Range",
  ctaHref: "/categories/festival",
  expiresAt: "2026-06-30T23:59:59Z",
  badge: "Limited Time",
};

export const faqs = [
  {
    id: "f1",
    question: "Do you offer wholesale pricing?",
    answer:
      "Yes. We have dedicated wholesale rates for orders above 50 pieces. Reach out via WhatsApp or our contact form with your requirement and we'll share a custom quotation within 24 hours.",
  },
  {
    id: "f2",
    question: "What's the minimum order quantity?",
    answer:
      "For retail customers, there's no minimum — you can order even a single piece. For wholesale pricing, the threshold is 50 pieces of any product (or mixed across our range).",
  },
  {
    id: "f3",
    question: "Do you ship pan-India?",
    answer:
      "Yes, we despatch across all states in India. Delivery typically takes 3–7 working days depending on your location. Bulk wholesale orders are shipped via reliable transport partners.",
  },
  {
    id: "f4",
    question: "How do I place an order?",
    answer:
      "The fastest way is to click the 'Order on WhatsApp' button on any product page — it pre-fills the product details so you just need to confirm size, colour and quantity.",
  },
  {
    id: "f5",
    question: "Is the cotton genuine 100%?",
    answer:
      "Absolutely. We source yarn from trusted regional spinning mills and clearly mark blended products (where applicable) as 'Cotton Blend' in their material spec.",
  },
  {
    id: "f6",
    question: "Do you accept returns?",
    answer:
      "Yes, for manufacturing defects we accept returns within 7 days of delivery. Custom-coloured wholesale orders are non-returnable except in case of defects.",
  },
  {
    id: "f7",
    question: "Can I visit your facility in Erode?",
    answer:
      "Yes, we welcome scheduled visits. Please call or WhatsApp at least 24 hours in advance so we can host you properly and show you the manufacturing process.",
  },
  {
    id: "f8",
    question: "Are you GST registered?",
    answer:
      "Yes, we have been GST-registered since July 2017. GST invoices are issued for all wholesale orders.",
  },
];
