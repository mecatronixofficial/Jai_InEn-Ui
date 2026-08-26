"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FaHandshake, FaIndustry, FaPalette } from "react-icons/fa";

const roles = [
  { Icon: FaIndustry, role: "MD", title: "Strategic Leadership", focus: "Global vision, compliance and infrastructure scaling", description: "Steers the enterprise through investment in advanced textile technology, fair-trade labour practices and uncompromising international quality benchmarks.", accent: "#FBAA00", position: "md:-rotate-[2deg] md:translate-y-8" },
  { Icon: FaHandshake, role: "Merchandising", title: "The Operational Bridge", focus: "Costing, buyer alignment and timeline enforcement", description: "Acts as the dedicated point of contact for global buyers, managing critical paths, aligning material supply chains and keeping shipments on schedule and within budget.", accent: "#8FCB4A", position: "md:rotate-[1deg]" },
  { Icon: FaPalette, role: "Designers", title: "Creative Trendsetters", focus: "Aesthetic innovation and global market research", description: "Translates evolving interior trends across Europe and North America into commercial weave patterns, prints, motifs and structural concepts for table, kitchen and bed linen.", accent: "#F2C14E", position: "md:rotate-[2deg] md:translate-y-8" },
];

const heading = "Our Synergistic Teamwork & Workflow";

export default function PremiumTeamwork() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-y relative isolate overflow-hidden bg-gradient-to-br from-[#fffaf0] via-[#FBAA00]/15 to-[#FBAA00]/30 text-black">
      <div className="pointer-events-none absolute inset-0 bg-weave-light opacity-35" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full border-[80px] border-[#FBAA00]/10" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#FBAA00]/20 blur-3xl" />

      <div className="container-x relative z-10">
        <motion.div className="mx-auto max-w-4xl text-center" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.5 }}>
          <motion.div className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#FBAA00]" variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.7 }}>
            One Coordinated Team
          </motion.div>
          <h2 className="display mt-4 text-3xl font-semibold leading-[1.1] text-[#FBAA00] sm:text-4xl" aria-label={heading}>
            {heading.split("").map((character, index) => (
              <motion.span key={`${character}-${index}`} className="inline-block" aria-hidden="true" variants={{ hidden: { opacity: 0, y: 24, filter: "blur(7px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)" } }} transition={{ duration: 0.65, delay: 0.16 + index * 0.025 }}>
                {character === " " ? "\u00A0" : character}
              </motion.span>
            ))}
          </h2>
          <motion.p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/70" variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.9, delay: 1.05 }}>
            Strategic leadership, buyer-focused merchandising and creative design work as one connected system—from global market direction to production-ready collections.
          </motion.p>
        </motion.div>

        <div className="relative mt-8 [perspective:1400px] md:mt-10">
          <div className="absolute left-[12%] right-[12%] top-12 hidden h-px bg-gradient-to-r from-transparent via-[#FBAA00]/50 to-transparent md:block" />
          <div className="grid gap-7 md:grid-cols-3 md:gap-5 lg:gap-8">
            {roles.map(({ Icon, role, title, focus, description, accent, position }, index) => (
              <motion.article
                key={role}
                className={`group relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-[#FBAA00]/35 bg-white/85 p-6 shadow-[8px_10px_0_rgba(251,170,0,0.18),0_30px_65px_-38px_rgba(87,149,21,0.55)] backdrop-blur-md [transform-style:preserve-3d] sm:p-7 ${position}`}
                initial={reduceMotion ? false : { opacity: 0, y: 80, rotateX: -18, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduceMotion ? undefined : { y: -12, rotateX: 4, rotateY: index === 1 ? 0 : index === 0 ? 4 : -4, scale: 1.025 }}
              >
                <div className="absolute inset-x-10 -top-16 h-32 rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accent }} />
                <span className="display absolute -right-3 -top-8 text-[8rem] font-semibold leading-none text-[#FBAA00]/[0.07]">0{index + 1}</span>
                <div className="relative [transform:translateZ(34px)]">
                  <div className="flex items-center justify-between">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl text-[#0C2B25] shadow-[0_12px_30px_-10px_rgba(251,170,0,0.55)]" style={{ backgroundColor: accent }}><Icon className="h-5 w-5" /></div>
                    <span className="text-[10px] font-bold tracking-[0.25em] text-black/25">0{index + 1}</span>
                  </div>
                  <div className="mt-8 text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>{role}</div>
                  <h3 className="display mt-2 text-base font-semibold leading-tight text-black">{title}</h3>
                  <p className="mt-5 border-l-2 pl-4 text-xs leading-5 text-black/65" style={{ borderColor: accent }}><strong className="text-black">The Focus:</strong> {focus}.</p>
                  <p className="mt-5 text-xs leading-6 text-black/65"><strong className="text-black">The Action:</strong> {description}</p>
                </div>
                <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" style={{ backgroundColor: accent }} />
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div className="mx-auto mt-10 flex max-w-xl items-center gap-5 text-center text-[9px] font-bold uppercase tracking-[0.28em] text-[#579515]" initial={reduceMotion ? false : { opacity: 0, scaleX: 0.7 }} whileInView={{ opacity: 1, scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.35 }}>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#FBAA00]/60" />
          <span>Vision · Creativity · Execution</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#FBAA00]/60" />
        </motion.div>
      </div>
    </section>
  );
}
