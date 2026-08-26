import Link from "next/link";
import { FaHome, FaShoppingBag } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="relative isolate grid min-h-[80vh] place-items-center overflow-hidden bg-[#F5F5F5] text-[#222222]">
      <div className="absolute inset-0 bg-weave-light opacity-50" />

      <div className="container-x relative py-12 text-center lg:py-16">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest-x text-gold-light font-semibold">
          <span className="h-px w-8 bg-gold" /> Error 404
        </span>
        <h1 className="display mt-5 text-3xl font-semibold leading-[1.1] sm:text-4xl">
          Lost in the loom
        </h1>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-[#666666]">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to something useful.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-gold">
            <FaHome className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <Link
            href="/products"
            className="btn-outline"
          >
            <FaShoppingBag className="h-3.5 w-3.5" /> Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}
