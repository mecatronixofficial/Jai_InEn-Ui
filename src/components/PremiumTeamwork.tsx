import { FaHandshake, FaIndustry, FaPalette } from "react-icons/fa";

import SectionTitle from "@/components/SectionTitle";

const roles = [
  { Icon: FaIndustry, role: "MD", title: "Strategic Leadership", focus: "Global vision, compliance and infrastructure scaling", description: "Steers the enterprise through investment in advanced textile technology, fair-trade labour practices and uncompromising international quality benchmarks." },
  { Icon: FaHandshake, role: "Merchandising", title: "The Operational Bridge", focus: "Costing, buyer alignment and timeline enforcement", description: "Acts as the dedicated point of contact for global buyers, managing critical paths, aligning material supply chains and keeping shipments on schedule and within budget." },
  { Icon: FaPalette, role: "Designers", title: "Creative Trendsetters", focus: "Aesthetic innovation and global market research", description: "Translates evolving interior trends across Europe and North America into commercial weave patterns, prints, motifs and structural concepts for table, kitchen and bed linen." },
];

export default function PremiumTeamwork() {
  return (
    <section className="lux-section">
      <div className="lux-container">
        <SectionTitle
          eyebrow="One coordinated team"
          title={<>Our synergistic teamwork <span>&amp; workflow</span></>}
          description="Strategic leadership, buyer-focused merchandising and creative design work as one connected system—from global market direction to production-ready collections."
          align="center"
          ornament
        />

        <div className="relative grid gap-4 md:grid-cols-3 md:gap-6">
          <span aria-hidden className="absolute left-[16%] right-[16%] top-[66px] hidden border-t border-dashed border-[#FBAA00]/70 md:block" />
          {roles.map(({ Icon, role, title, focus, description }, index) => (
            <article key={role} className="lux-card flex flex-col">
              <div className="flex items-center justify-between">
                <span className="lux-icon"><Icon /></span>
                <span className="lux-num">0{index + 1}</span>
              </div>
              <p className="lux-kicker mt-5">{role}</p>
              <h3 className="mt-2 text-lg md:text-xl">{title}</h3>
              <p className="mt-3 border-l-2 border-[#FBAA00] pl-3 text-sm !leading-relaxed"><strong className="font-semibold text-[#1C1C1C]">The focus:</strong> {focus}.</p>
              <p className="mt-3 text-sm !leading-relaxed"><strong className="font-semibold text-[#1C1C1C]">The action:</strong> {description}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-xl items-center gap-3 text-center font-[family-name:var(--lux-heading)] text-[9px] font-semibold uppercase tracking-[0.24em] text-[#B57A00]">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FBAA00]" />
          <span>Vision · Creativity · Execution</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FBAA00]" />
        </div>
      </div>
    </section>
  );
}
