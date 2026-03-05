import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const VISIBILITY_THRESHOLD = 240;

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      setIsVisible(window.scrollY > VISIBILITY_THRESHOLD);
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-[calc(max(0.9rem,env(safe-area-inset-bottom))+3.6rem)] right-3 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-primary/35 bg-background/95 text-primary shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 sm:bottom-24 sm:right-6 sm:h-12 sm:w-12 ${
        isVisible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ChevronUp size={20} aria-hidden="true" />
    </button>
  );
};

export default BackToTopButton;
