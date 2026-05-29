import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-wider-x">
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-2">
            {c.href ? (
              <Link
                href={c.href}
                className="text-cream-100/70 hover:text-gold-light transition"
              >
                {c.label}
              </Link>
            ) : (
              <span className="text-cream-50 font-semibold">{c.label}</span>
            )}
            {i < items.length - 1 && (
              <FaChevronRight className="h-2.5 w-2.5 text-cream-100/40" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
