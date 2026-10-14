import type { ReactNode } from "react";
import { cn } from "@/utils";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  ornament?: boolean;
  className?: string;
}

/** Shared inner-page section heading: eyebrow, title (gold <span> highlights) and lead copy. */
export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  ornament = false,
  className,
}: Props) {
  return (
    <div className={cn("lux-head lux-reveal", align === "center" && "lux-head--center", className)}>
      {eyebrow && <p className="lux-eyebrow">{eyebrow}</p>}
      <h2 className="lux-title">{title}</h2>
      {ornament && <div className="lux-ornament" aria-hidden><span /></div>}
      {description && <p className="lux-lead">{description}</p>}
    </div>
  );
}
