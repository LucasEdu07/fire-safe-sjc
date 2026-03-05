import type { RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type MobileCarouselControlsProps = {
  targetRef: RefObject<HTMLDivElement>;
  label: string;
  className?: string;
  hideAboveClass?: string;
};

const parseGap = (value: string): number => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const scrollByCard = (targetRef: RefObject<HTMLDivElement>, direction: "prev" | "next") => {
  const container = targetRef.current;
  if (!container) {
    return;
  }

  const firstCard = container.firstElementChild as HTMLElement | null;
  const styles = window.getComputedStyle(container);
  const gap = parseGap(styles.columnGap || styles.gap || "0px");
  const cardWidth = firstCard?.getBoundingClientRect().width || container.getBoundingClientRect().width;
  const step = Math.max(120, cardWidth + gap);

  container.scrollBy({
    left: direction === "next" ? step : -step,
    behavior: "smooth",
  });
};

const MobileCarouselControls = ({
  targetRef,
  label,
  className = "",
  hideAboveClass = "sm:hidden",
}: MobileCarouselControlsProps) => (
  <div className={`mb-3 flex items-center justify-between ${hideAboveClass} ${className}`.trim()}>
    <p className="text-[0.64rem] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => scrollByCard(targetRef, "prev")}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-card/88 text-foreground/85 shadow-sm transition-all duration-300 hover:border-primary/35 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
        aria-label="Ver card anterior"
      >
        <ChevronLeft size={16} aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => scrollByCard(targetRef, "next")}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border/70 bg-card/88 text-foreground/85 shadow-sm transition-all duration-300 hover:border-primary/35 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
        aria-label="Ver próximo card"
      >
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </div>
  </div>
);

export default MobileCarouselControls;
