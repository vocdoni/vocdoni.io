import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SectionScrollerProps {
  children: React.ReactNode[];
  activeSection: number;
  //  // Not used in this version
  sectionClassName?: string;
  containerClassName?: string;
}

export function SectionScroller({
  children,
  activeSection,

  sectionClassName = "",
  containerClassName = "",
}: SectionScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to active section when it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    const target = sectionRefs.current[activeSection];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeSection]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "h-screen w-full overflow-y-scroll scroll-snap-y-mandatory", // Tailwind v4 syntax
        "scrollbar-hide", // Hide scrollbar (custom utility)
        containerClassName,
      )}
      style={{ scrollSnapType: "y mandatory" }}
    >
      {children.map((child, i) => (
        <div
          key={i}
          ref={(el) => {
            sectionRefs.current[i] = el;
          }}
          className={cn(
            "h-screen w-full flex items-center justify-center scroll-snap-start", // Tailwind v4 syntax
            sectionClassName,
          )}
          id={`section-${i}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
