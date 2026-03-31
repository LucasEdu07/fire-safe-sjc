import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const REVEAL_VARIANT_CLASSES = [
  "reveal-zoom",
  "reveal-slide-left",
  "reveal-slide-right",
  "reveal-blur",
  "reveal-media",
  "reveal-quote",
] as const;

const ITEM_SELECTOR = [
  ".section-header",
  ".card-base",
  ".premium-panel",
  ".premium-panel-dark",
  ".editorial-image-frame",
  ".review-feature-card",
  ".review-secondary-card",
  ".review-meta-card",
  ".review-link-card",
  "article",
  ".cta-whatsapp",
  ".cta-whatsapp-lg",
  ".cta-outline",
  "form",
  "iframe",
  "[data-reveal]",
].join(",");

const applyRevealVariant = (element: Element) => {
  element.classList.remove(...REVEAL_VARIANT_CLASSES);

  switch ((element as HTMLElement).dataset.reveal) {
    case "zoom":
      element.classList.add("reveal-zoom");
      break;
    case "slide-left":
      element.classList.add("reveal-slide-left");
      break;
    case "slide-right":
      element.classList.add("reveal-slide-right");
      break;
    case "blur":
      element.classList.add("reveal-blur");
      break;
    case "media":
      element.classList.add("reveal-media");
      break;
    case "quote":
      element.classList.add("reveal-quote");
      break;
    default:
      break;
  }
};

const ScrollMotion = () => {
  const location = useLocation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const sections = Array.from(document.querySelectorAll("main section:not(#hero)"));
    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.08,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    sections.forEach((section, index) => {
      section.classList.remove("is-visible");
      section.classList.add("scroll-reveal");
      (section as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(index * 16, 72)}ms`);

      const items = Array.from(section.querySelectorAll(ITEM_SELECTOR));
      items.forEach((item, itemIndex) => {
        item.classList.add("scroll-reveal-item");
        applyRevealVariant(item);

        const element = item as HTMLElement;
        const explicitOrder = Number.parseInt(element.dataset.revealOrder || "", 10);
        const computedOrder = Number.isFinite(explicitOrder) ? explicitOrder : itemIndex;
        const explicitDelay = element.dataset.revealDelay;

        element.style.setProperty("--item-delay", explicitDelay || `${Math.min(computedOrder * 48, 180)}ms`);
      });

      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default ScrollMotion;
