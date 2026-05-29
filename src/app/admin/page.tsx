"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import {
  FaBoxOpen,
  FaInbox,
  FaBlog,
  FaTags,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

import { api, DashboardStats } from "@/lib/api";
import { AdminCard, StatTile, AdminButton } from "@/components/admin/AdminUI";
import { cn } from "@/utils";

const statusBadgeColor: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  quoted: "bg-purple-100 text-purple-700",
  confirmed: "bg-green-100 text-green-700",
  despatched: "bg-indigo-100 text-indigo-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .stats()
      .then((s) => { if (!cancelled) setStats(s); })
      .catch((e: Error) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl shimmer" />
          ))}
        </div>
        <div className="h-64 rounded-2xl shimmer" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <AdminCard className="p-8 text-center">
        <FaExclamationTriangle className="h-8 w-8 text-amber-500 mx-auto mb-3" />
        <h3 className="display text-xl text-maroon-950">Couldn't load dashboard</h3>
        <p className="text-ink-muted text-sm mt-2">{error || "Unknown error"}</p>
        <p className="text-ink-muted text-xs mt-4">
          Check that the backend is running and reachable at{" "}
          <code>{process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1"}</code>.
        </p>
      </AdminCard>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Stat tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatTile
          label="Products"
          value={stats.products.total}
          hint={`${stats.products.active} active · ${stats.products.outOfStock} out of stock`}
        />
        <StatTile
          label="Orders"
          value={stats.orders.total}
          hint={`${stats.orders.new} new · ${stats.orders.last7Days} this week`}
          accent="gold"
        />
        <StatTile
          label="Blog posts"
          value={stats.blogs.total}
          hint={`${stats.blogs.published} published`}
        />
        <StatTile
          label="Categories"
          value={stats.categories.total}
          hint={`${stats.testimonials.total} testimonials`}
        />
      </div>

      {/* Order pipeline */}
      <AdminCard className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="display text-xl font-semibold text-maroon-950">
            Order pipeline
          </h2>
          <Link href="/admin/orders">
            <AdminButton variant="ghost">View all →</AdminButton>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            "new", "contacted", "quoted", "confirmed",
            "despatched", "delivered", "cancelled",
          ].map((status) => {
            const count = stats.orders.byStatus[status] || 0;
            return (
              <div
                key={status}
                className={cn(
                  "rounded-lg border p-4",
                  count > 0 ? "border-cream-200 bg-cream-50" : "border-cream-100 bg-cream-50/50",
                )}
              >
                <div
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-[9px] uppercase tracking-widest-x font-bold",
                    statusBadgeColor[status],
                  )}
                >
                  {status}
                </div>
                <div className="display text-2xl font-semibold text-maroon-950 mt-2">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </AdminCard>

      {/* Recent orders */}
      <AdminCard>
        <div className="px-6 py-4 border-b border-cream-200 flex items-center justify-between">
          <h2 className="display text-xl font-semibold text-maroon-950">
            Recent enquiries
          </h2>
          <Link href="/admin/orders">
            <AdminButton variant="ghost">All orders →</AdminButton>
          </Link>
        </div>
        {stats.recentOrders.length === 0 ? (
          <div className="p-10 text-center text-ink-muted">
            <FaCheckCircle className="h-8 w-8 mx-auto mb-2 text-cream-300" />
            No orders yet. New enquiries will appear here.
          </div>
        ) : (
          <div className="divide-y divide-cream-200">
            {stats.recentOrders.map((o) => (
              <Link
                key={o.id}
                href={`/admin/orders/${o.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-cream-50 transition"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-ink truncate">
                    {o.customerName}
                  </div>
                  <div className="text-xs text-ink-muted truncate">
                    {o.productName || "General enquiry"} · {o.phone}
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0 ml-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-widest-x font-bold",
                      statusBadgeColor[o.status],
                    )}
                  >
                    {o.status}
                  </span>
                  <span className="text-xs text-ink-muted whitespace-nowrap">
                    {moment(o.createdAt).fromNow()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </AdminCard>

      {/* Quick links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { href: "/admin/products", Icon: FaBoxOpen, label: "Manage Products" },
          { href: "/admin/orders", Icon: FaInbox, label: "Order Inbox" },
          { href: "/admin/blogs", Icon: FaBlog, label: "Publish Article" },
          { href: "/admin/categories", Icon: FaTags, label: "Categories" },
        ].map(({ href, Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl bg-maroon-950 text-cream-50 p-5 flex items-center gap-4 hover:bg-maroon-900 transition group"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gold text-maroon-950 group-hover:scale-105 transition">
              <Icon className="h-4 w-4" />
            </div>
            <span className="font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
