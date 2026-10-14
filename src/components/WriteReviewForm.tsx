"use client";

import { useState } from "react";
import { FaCheck, FaStar } from "react-icons/fa";
import { api } from "@/lib/api";
import { cn } from "@/utils";

const empty = {
  name: "", role: "", company: "", location: "",
  rating: 5, review: "", productPurchased: "",
};

const fields = [
  { key: "name", label: "Your name", placeholder: "Ravi Kumar", required: true },
  { key: "role", label: "Role / occupation", placeholder: "Retail owner", required: true },
  { key: "location", label: "Location", placeholder: "Chennai, TN", required: true },
  { key: "company", label: "Company (optional)", placeholder: "Your shop or company", required: false },
] as const;

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
      <div className="lux-card lux-card--flat text-center">
        <span className="lux-icon mx-auto"><FaCheck /></span>
        <h3 className="mt-7 text-2xl">Thank you for your review!</h3>
        <p className="mt-2 text-[15px]">Your review has been submitted and will be visible after our team approves it.</p>
        <button type="button" className="lux-btn lux-btn--ghost mt-7" onClick={() => setStatus("idle")}>
          Write another review
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="lux-card lux-card--flat grid gap-6">
      <div>
        <h3 className="text-2xl">Share your experience</h3>
        <p className="mt-1 text-[15px]">Your review will be visible after approval.</p>
      </div>

      <div>
        <span className="lux-label">Rating <span className="text-[#B57A00]">*</span></span>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={form.rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => set("rating", n)}
              className="transition-transform duration-300 hover:-translate-y-0.5 hover:scale-110"
            >
              <FaStar className={cn("h-7 w-7 transition-colors", n <= (hover || form.rating) ? "text-[#FBAA00]" : "text-[#EEE8DC]")} />
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map(({ key, label, placeholder, required }) => (
          <label key={key} className="block">
            <span className="lux-label">{label}{required && <span className="text-[#B57A00]"> *</span>}</span>
            <input className="lux-field" placeholder={placeholder} value={form[key]} onChange={(e) => set(key, e.target.value)} />
          </label>
        ))}
      </div>

      <label className="block">
        <span className="lux-label">Product purchased (optional)</span>
        <input className="lux-field" placeholder="e.g. Cotton Lungis, Bed Sheets…" value={form.productPurchased} onChange={(e) => set("productPurchased", e.target.value)} />
      </label>

      <label className="block">
        <span className="lux-label">Your review <span className="text-[#B57A00]">*</span></span>
        <textarea rows={5} className="lux-field resize-none" placeholder="Tell us about your experience with our products or service…" value={form.review} onChange={(e) => set("review", e.target.value)} />
      </label>

      {error && <p role="alert" className="rounded-[2px] border-l-2 border-red-500 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div>
        <button type="submit" disabled={status === "saving"} className="lux-btn">
          {status === "saving" ? "Submitting…" : "Submit review"}
        </button>
      </div>
    </form>
  );
}
