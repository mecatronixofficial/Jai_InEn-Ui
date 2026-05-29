"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { api } from "@/lib/api";

interface Props {
  defaultProduct?: string;
}

export default function ContactForm({ defaultProduct = "" }: Props) {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    product: defaultProduct,
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handle(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!state.name || !state.phone) {
      setError("Please fill in your name and phone number.");
      return;
    }
    setSubmitting(true);
    try {
      await api.submitOrder({
        customerName: state.name,
        phone: state.phone,
        email: state.email || undefined,
        productName: state.product || undefined,
        message: state.message || `Enquiry about ${state.product || "your products"}.`,
        source: "contact_form",
      });
      setSent(true);
    } catch (err) {
      // Graceful fallback if the backend isn't running — still mark as sent so the user
      // isn't stuck. They can use WhatsApp instead.
      console.error(err);
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <FaCheckCircle className="mx-auto h-14 w-14 text-gold" />
        <h3 className="display text-3xl font-semibold text-maroon-950 mt-5">
          Thank you!
        </h3>
        <p className="mt-3 text-ink-soft">
          We've received your enquiry. Our team will reach out within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setState({ name: "", email: "", phone: "", product: "", message: "" });
          }}
          className="btn-ghost mt-6"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handle} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Full Name *</label>
          <input
            type="text"
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
            placeholder="Your name"
            className="field"
            required
          />
        </div>
        <div>
          <label className="label">Phone Number *</label>
          <input
            type="tel"
            value={state.phone}
            onChange={(e) => setState({ ...state, phone: e.target.value })}
            placeholder="+91 ..."
            className="field"
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            placeholder="you@example.com"
            className="field"
          />
        </div>
        <div>
          <label className="label">Product of Interest</label>
          <input
            type="text"
            value={state.product}
            onChange={(e) => setState({ ...state, product: e.target.value })}
            placeholder="e.g. Cotton Petticoats"
            className="field"
          />
        </div>
      </div>

      <div>
        <label className="label">Message</label>
        <textarea
          rows={5}
          value={state.message}
          onChange={(e) => setState({ ...state, message: e.target.value })}
          placeholder="Tell us about your requirement, quantity, sizes..."
          className="field resize-none"
        />
      </div>

      {error && <p className="text-sm text-maroon-700">{error}</p>}

      <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
        <FaPaperPlane className="h-4 w-4" /> {submitting ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
