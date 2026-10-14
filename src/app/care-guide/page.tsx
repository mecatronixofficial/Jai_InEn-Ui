import type { Metadata } from "next";
import { FaShieldAlt, FaSun, FaTint, FaBoxOpen } from "react-icons/fa";

import PremiumPageBanner from "@/components/PremiumPageBanner";
import SectionTitle from "@/components/SectionTitle";
import { EmptyState, PostTile } from "@/components/LuxTiles";
import { loadBlogs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Care Guide",
  description: "Practical textile washing, drying and care advice from our team.",
};

const basics = [
  { Icon: FaTint, title: "Wash gently", copy: "Cool or warm water with a mild detergent keeps cotton fibres soft and colours true." },
  { Icon: FaSun, title: "Dry in shade", copy: "Line-dry away from harsh direct sunlight to protect dyes and prevent stiffness." },
  { Icon: FaShieldAlt, title: "Iron with care", copy: "Medium heat on the reverse side preserves prints, weaves and finishing." },
  { Icon: FaBoxOpen, title: "Store dry", copy: "Fold and store fully dry textiles in a ventilated place to keep them fresh." },
];

export default async function CareGuidePage() {
  const posts = (await loadBlogs()).filter((post) =>
    post.category.toLowerCase().includes("care") ||
    post.tags.some((tag) => tag.toLowerCase().includes("care"))
  );

  return (
    <div className="lux-page">
      <PremiumPageBanner pageKey="care-guide" eyebrow="Textile care" title={<>Care that helps textiles <span>last longer.</span></>} description="Practical guidance for washing, drying, storing and protecting your everyday textiles." current="Care Guide" bgImage="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1920&auto=format&fit=crop&q=80" />

      <section id="page-content" className="lux-section">
        <div className="lux-container">
          <SectionTitle eyebrow="The essentials" title={<>Four habits for <span>lasting textiles</span></>} align="center" ornament />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {basics.map(({ Icon, title, copy }, index) => (
              <article key={title} className="lux-card">
                <div className="flex items-center justify-between">
                  <span className="lux-icon"><Icon /></span>
                  <span className="lux-num">0{index + 1}</span>
                </div>
                <h3 className="mt-7 text-xl">{title}</h3>
                <p className="mt-3 text-[15px]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lux-section">
        <div className="lux-container">
          <SectionTitle eyebrow="Helpful advice" title={<>Care <span>guides</span></>} description="Detailed articles from our team on keeping each textile at its best." />
          {posts.length > 0 ? (
            <div className="grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => <PostTile key={post.id} post={post} showCategory={false} />)}
            </div>
          ) : (
            <EmptyState title="Care guides are coming soon" copy="Our team is preparing detailed care articles for every product range." />
          )}
        </div>
      </section>
    </div>
  );
}
