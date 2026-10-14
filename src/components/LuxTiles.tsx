import Link from "next/link";
import moment from "moment";
import { FaArrowRight, FaClock } from "react-icons/fa";

interface PostTileProps {
  post: { slug: string; title: string; excerpt?: string; coverImage: string; category?: string; publishedAt?: string; readTime?: number };
  showCategory?: boolean;
}

/** Journal / care-guide article card. */
export function PostTile({ post, showCategory = true }: PostTileProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="lux-tile lux-hover">
      <div className="lux-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.coverImage} alt={post.title} loading="lazy" />
        {showCategory && post.category && <span className="lux-tile-badge lux-chip lux-chip--light">{post.category}</span>}
        <span className="lux-tile-cta" aria-hidden>Read article <FaArrowRight /></span>
      </div>
      <div className="lux-tile-body">
        <div className="lux-tile-meta">
          {post.publishedAt && <span>{moment(post.publishedAt).format("MMM D, YYYY")}</span>}
          {post.publishedAt && post.readTime ? <i aria-hidden /> : null}
          {post.readTime ? <span className="inline-flex items-center gap-1.5"><FaClock aria-hidden className="h-3 w-3" /> {post.readTime} min read</span> : null}
        </div>
        <h3>{post.title}</h3>
        {post.excerpt && <p className="line-clamp-2">{post.excerpt}</p>}
        <div className="lux-tile-foot"><span className="lux-link">Read more <FaArrowRight aria-hidden /></span></div>
      </div>
    </Link>
  );
}

/** Empty-state message used when a list has no items. */
export function EmptyState({ title, copy, children }: { title: string; copy?: string; children?: React.ReactNode }) {
  return (
    <div className="lux-card lux-card--flat mx-auto max-w-xl text-center">
      <div className="lux-ornament !justify-center !mt-0" aria-hidden><span /></div>
      <h3 className="mt-5 text-xl">{title}</h3>
      {copy && <p className="mt-2 text-[15px]">{copy}</p>}
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}

interface ProductTileProps {
  product: { slug: string; name: string; images: string[]; material?: string };
  categoryLabel?: string;
}

/** Catalogue product card. */
export function ProductTile({ product, categoryLabel }: ProductTileProps) {
  return (
    <Link href={`/products/${product.slug}`} className="lux-tile lux-hover">
      <div className="lux-media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {product.images[0] ? <img src={product.images[0]} alt={product.name} loading="lazy" /> : <span className="absolute inset-0 grid place-items-center p-6 text-center font-semibold text-[#1c1c1c]">{product.name}</span>}
        <span className="lux-tile-cta" aria-hidden>View details <FaArrowRight /></span>
      </div>
      <div className="lux-tile-body">
        {categoryLabel && <div className="lux-tile-meta"><span>{categoryLabel}</span></div>}
        <h3>{product.name}</h3>
        {product.material && <p>{product.material}</p>}
      </div>
    </Link>
  );
}
