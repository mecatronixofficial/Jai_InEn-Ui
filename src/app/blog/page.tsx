import type { Metadata } from "next";

import PremiumPageBanner from "@/components/PremiumPageBanner";
import SectionTitle from "@/components/SectionTitle";
import { EmptyState, PostTile } from "@/components/LuxTiles";
import { loadBlogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Journal",
  description: "Textile industry insights, fabric care guides and stories from our Erode looms — written by the team at Thangavel Textile.",
};

export default async function BlogPage() {
  const blogPosts = await loadBlogs();

  return (
    <div className="lux-page">
      <PremiumPageBanner eyebrow="The Journal" title={<>Stories woven with <span>experience.</span></>} description="Textile insights, fabric care, craftsmanship, and stories from inside our facility." current="Journal" bgImage="https://images.unsplash.com/photo-1620713043691-2a6c2c5dd47f?w=1920&auto=format&fit=crop&q=80" />

      <section id="page-content" className="lux-section">
        <div className="lux-container">
          <SectionTitle
            eyebrow="From the journal"
            title={<>Latest <span>articles</span></>}
            description="Explore fabric guides, textile trends, manufacturing insights, and stories shaped by years of experience."
            align="center"
            ornament
          />

          {blogPosts.length > 0 ? (
            <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => <PostTile key={post.id} post={post} />)}
            </div>
          ) : (
            <EmptyState title="More journal articles are coming soon" />
          )}
        </div>
      </section>
    </div>
  );
}
