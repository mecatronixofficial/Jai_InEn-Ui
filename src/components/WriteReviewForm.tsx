"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { api } from "@/lib/api";
import { cn } from "@/utils";

const empty = {
  name: "", role: "", company: "", location: "",
  rating: 5, review: "", productPurchased: "",
};

export default function WriteReviewForm() {
  const [form, setForm] = useState({ ...empty });
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [error, setError] = useState("");

  function set(field: string, value: string | number) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.role || !form.location || !form.review) {
      setError("Name, role, location and review are required.");
      return;
    }
    setError("");
    setStatus("saving");
    try {
      await api.submitReview({
        name: form.name,
        role: form.role,
        location: form.location,
        rating: form.rating,
        review: form.review,
        ...(form.company ? { company: form.company } : {}),
        ...(form.productPurchased ? { productPurchased: form.productPurchased } : {}),
      });
      setStatus("done");
      setForm({ ...empty });
    } catch (err) {
      setError((err as Error).message || "Failed to submit. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="card p-10 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 text-3xl mb-5">
          ✓
        </div>
        <h3 className="display text-2xl font-semibold text-maroon-950 mb-3">
          Thank you for your review!
        </h3>
        <p className="text-ink-soft">
          Your review has been submitted and will be visible after our team approves it.
        </p>
        <button
          className="btn-outline mt-6"
          onClick={() => setStatus("idle")}
        >
          Write Another Review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8 md:p-10 space-y-5">
      <h3 className="display text-2xl font-semibold text-maroon-950">
        Share Your Experience
      </h3>
      <p className="text-sm text-ink-soft -mt-2">
        Your review will be visible after approval.
      </p>

      {/* Star rating */}
      <div>
        <label className="block text-xs uppercase tracking-wider-x font-semibold text-ink-muted mb-2">
          Rating <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => set("rating", n)}
              className="text-2xl transition-transform hover:scale-110"
            >
              <FaStar
                className={cn(
                  "h-7 w-7 transition-colors",
                  n <= (hover || form.rating) ? "text-gold" : "text-cream-300"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider-x font-semibold text-ink-muted mb-1.5">
            Your Name <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-maroon-800/30"
            placeholder="Ravi Kumar"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider-x font-semibold text-ink-muted mb-1.5">
            Role / Occupation <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-maroon-800/30"
            placeholder="Retail Owner"
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider-x font-semibold text-ink-muted mb-1.5">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-maroon-800/30"
            placeholder="Chennai, TN"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider-x font-semibold text-ink-muted mb-1.5">
            Company (optional)
          </label>
          <input
            className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-maroon-800/30"
            placeholder="Your shop or company"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider-x font-semibold text-ink-muted mb-1.5">
          Product Purchased (optional)
        </label>
        <input
          className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-maroon-800/30"
          placeholder="e.g. Cotton Lungis, Bed Sheets…"
          value={form.productPurchased}
          onChange={(e) => set("productPurchased", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-wider-x font-semibold text-ink-muted mb-1.5">
          Your Review <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={5}
          className="w-full rounded-lg border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-maroon-800/30 resize-none"
          placeholder="Tell us about your experience with our products or service…"
          value={form.review}
          onChange={(e) => set("review", e.target.value)}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 rounded-lg bg-red-50 px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "saving"}
        className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "saving" ? "Submitting…" : "Submit Review"}
      </button>
    </form>
  );
}
