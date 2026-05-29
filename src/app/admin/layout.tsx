"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaBlog,
  FaImages,
  FaPercent,
  FaStar,
  FaInbox,
  FaSignOutAlt,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";
import { ToastHost } from "@/components/admin/AdminUI";
import { cn } from "@/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", Icon: FaTachometerAlt, exact: true },
  { href: "/admin/products", label: "Products", Icon: FaBoxOpen },
  { href: "/admin/categories", label: "Categories", Icon: FaTags },
  { href: "/admin/blogs", label: "Blog", Icon: FaBlog },
  { href: "/admin/banners", label: "Banners", Icon: FaImages },
  { href: "/admin/offers", label: "Offers", Icon: FaPercent },
  { href: "/admin/testimonials", label: "Reviews", Icon: FaStar },
  { href: "/admin/orders", label: "Orders", Icon: FaInbox },
];

function Shell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (loading) return;
    if (!user && !isLoginPage) {
      router.replace("/admin/login");
    } else if (user && isLoginPage) {
      router.replace("/admin");
    }
  }, [loading, user, isLoginPage, router]);

  // Login page renders without shell
  if (isLoginPage) return <>{children}</>;

  if (loading || !user) {
    return (
      <div className="min-h-screen grid place-items-center bg-cream-50">
        <div className="h-10 w-10 rounded-full border-4 border-cream-200 border-t-maroon-800 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-maroon-950 text-cream-50 shrink-0">
        <div className="px-6 py-6 border-b border-cream-50/10">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gold text-maroon-950 font-display text-xl">
              T
            </div>
            <div className="leading-tight">
              <div className="display text-lg font-semibold">Thangavel</div>
              <div className="text-[9px] uppercase tracking-widest-x text-gold-light font-semibold">
                Admin Panel
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                  active
                    ? "bg-gold text-maroon-950 font-semibold"
                    : "text-cream-100/80 hover:bg-cream-50/10 hover:text-cream-50",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cream-50/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream-100/70 hover:bg-cream-50/10 hover:text-cream-50 transition"
          >
            <FaExternalLinkAlt className="h-3 w-3" /> View site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-cream-100/70 hover:bg-cream-50/10 hover:text-cream-50 transition"
          >
            <FaSignOutAlt className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-cream-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div>
            <div className="text-[10px] uppercase tracking-widest-x text-gold-dark font-semibold">
              Admin
            </div>
            <h1 className="display text-xl text-maroon-950 font-semibold">
              {navItems.find((n) =>
                n.exact ? pathname === n.href : pathname.startsWith(n.href),
              )?.label || "Admin"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-ink">{user.name}</div>
              <div className="text-[10px] uppercase tracking-wider-x text-ink-muted">
                {user.role}
              </div>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-full bg-maroon-800 text-cream-50 font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Mobile nav strip */}
        <nav className="lg:hidden bg-maroon-950 text-cream-50 overflow-x-auto no-scrollbar">
          <div className="flex gap-1 px-2 py-2">
            {navItems.map(({ href, label, Icon, exact }) => {
              const active = exact ? pathname === href : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs whitespace-nowrap transition",
                    active
                      ? "bg-gold text-maroon-950 font-semibold"
                      : "text-cream-100/80 hover:bg-cream-50/10",
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>

        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <Shell>{children}</Shell>
      <ToastHost />
    </AdminAuthProvider>
  );
}
