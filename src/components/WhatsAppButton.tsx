// components/WhatsAppButton.tsx
"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton({ url }: { url: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        window.open(url, "_blank", "noreferrer");
      }}
      className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#25D366] text-white py-3 text-sm font-semibold hover:bg-[#1ea952] transition"
    >
      <FaWhatsapp className="h-4 w-4" /> Reply on WhatsApp
    </button>
  );
}