import Link from "next/link";
import { FaHome, FaShoppingBag } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="relative isolate overflow-hidden bg-maroon-950 text-cream-50 min-h-[80vh] grid place-items-center">
      <div className="absolute inset-0 bg-weave-dark opacity-50" />

      <div className="relative container-x text-center py-24">
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest-x text-gold-light font-semibold">
          <span className="h-px w-8 bg-gold" /> Error 404
        </span>
        <h1 className="mt-5 display text-7xl md:text-9xl font-semibold leading-none">
          Lost in the loom
        </h1>
        <p className="mt-6 text-cream-100/80 max-w-xl mx-auto leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to something useful.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-gold">
            <FaHome className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <Link
            href="/products"
            className="btn-outline !border-cream-50/30 !text-cream-50 hover:!bg-cream-50 hover:!text-maroon-900"
          >
            <FaShoppingBag className="h-3.5 w-3.5" /> Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}
