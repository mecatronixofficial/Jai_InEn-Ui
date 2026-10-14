import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsBrowser from "./ProductsBrowser";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our complete textile catalogue — petticoats, lungis, towels, gamcha, bed sheets, handloom and dhotis. Manufactured in Erode.",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center">
          <div className="h-12 w-12 rounded-full border-2 border-[#EEE8DC] border-t-[#FBAA00] animate-spin" />
        </div>
      }
    >
      <ProductsBrowser />
    </Suspense>
  );
}
