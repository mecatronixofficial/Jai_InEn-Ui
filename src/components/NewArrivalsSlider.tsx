import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import type { Product } from "@/types";

export default function NewArrivalsSlider({ products }: { products: Product[] }) {
  if (!products.length) return null;

  const renderGroup = (copy: number) => (
    <div aria-hidden={copy === 1} className="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6">
      {products.map((product, index) => {
        const green = index % 2 === 1;
        return (
          <article
            key={`${copy}-${product.id}`}
            className="group relative w-[72vw] shrink-0 overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white p-3 shadow-[0_16px_45px_rgba(17,24,39,0.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(17,24,39,0.12)] sm:w-[40vw] lg:w-[24vw] xl:w-[21vw]"
          >
            <Link href={`/products/${product.slug}`} tabIndex={copy === 1 ? -1 : undefined} className="block" aria-label={`View ${product.name}`}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.images[0] ?? ""}
                  alt={copy === 0 ? product.name : ""}
                  loading={copy === 0 && index < 2 ? "eager" : "lazy"}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-950/15 via-transparent to-white/10" />
              </div>

              <div className="relative px-2 pb-2 pt-5">
                <span className={`absolute left-2 top-0 h-0.5 w-10 rounded-full ${green ? "bg-emerald-500" : "bg-[#FBAA00]"}`} />
                <h3 className="display line-clamp-1 text-base font-semibold text-gray-950 transition group-hover:text-gray-700">
                  {product.name}
                </h3>
                <span className={`mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] ${green ? "text-emerald-600" : "text-[#FBAA00]"}`}>
                  View Product <FaArrowRight className="h-2.5 w-2.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );

  return (
    <div className="relative overflow-hidden py-3">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-20" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none [animation-duration:36s]">
        {renderGroup(0)}
        {renderGroup(1)}
      </div>
    </div>
  );
}
