import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import PremiumPageBanner from "@/components/PremiumPageBanner";

export default function NotFound() {
  return (
    <div className="lux-page">
      <PremiumPageBanner
        pageKey="not-found"
        eyebrow="Page not found · 404"
        title={<>The page you requested is <span>not available.</span></>}
        description="The address may have changed, or the page may no longer exist. Return to our homepage or continue browsing the complete textile collection."
        current="404"
        actions={<>
          <Link href="/" className="lux-btn">Return home</Link>
          <Link href="/products" className="lux-btn lux-btn--light">Browse products <FaArrowRight aria-hidden /></Link>
        </>}
      />
    </div>
  );
}
