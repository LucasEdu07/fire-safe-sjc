import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ITEM_SELECTOR = [
  ".section-header",
  ".card-base",
  "article",
  ".cta-whatsapp",
  ".cta-whatsapp-lg",
  "form",
  "iframe",
  "[data-reveal]",
].join(",");

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
      (section as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(index * 20, 100)}ms`);

      const items = Array.from(section.querySelectorAll(ITEM_SELECTOR));
      items.forEach((item, itemIndex) => {
        item.classList.add("scroll-reveal-item");
        (item as HTMLElement).style.setProperty("--item-delay", `${Math.min(itemIndex * 30, 180)}ms`);
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
