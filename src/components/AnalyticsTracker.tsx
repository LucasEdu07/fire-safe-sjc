import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackEvent } from "@/lib/analytics";

const AnalyticsTracker = () => {
  const location = useLocation();
  const scrollFlags = useRef({ at50: false, at90: false });

  useEffect(() => {
    initAnalytics();
    trackEvent("view_page", { route: location.pathname });

    scrollFlags.current = { at50: false, at90: false };

    const onScroll = () => {
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (documentHeight <= 0) {
        return;
      }

      const scrollPercent = Math.round((window.scrollY / documentHeight) * 100);

      if (scrollPercent >= 50 && !scrollFlags.current.at50) {
        scrollFlags.current.at50 = true;
        trackEvent("scroll_50", { route: location.pathname, percent: 50 });
      }

      if (scrollPercent >= 90 && !scrollFlags.current.at90) {
        scrollFlags.current.at90 = true;
        trackEvent("scroll_90", { route: location.pathname, percent: 90 });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [location.pathname]);

  return null;
};

export default AnalyticsTracker;
