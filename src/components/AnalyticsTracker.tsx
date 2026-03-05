import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { disableAnalytics, initAnalytics, trackEvent } from "@/lib/analytics";
import { COOKIE_CONSENT_CHANGE_EVENT, getCookieConsentStatus, type CookieConsentStatus } from "@/lib/cookie-consent";

const AnalyticsTracker = () => {
  const location = useLocation();
  const scrollFlags = useRef({ at50: false, at90: false });
  const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>(() => getCookieConsentStatus());

  useEffect(() => {
    const onConsentChange = (event: Event) => {
      const detail = (event as CustomEvent<{ status?: CookieConsentStatus }>).detail;

      if (detail?.status) {
        setConsentStatus(detail.status);
        return;
      }

      setConsentStatus(getCookieConsentStatus());
    };

    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key.includes("starfire_cookie_consent_v1")) {
        setConsentStatus(getCookieConsentStatus());
      }
    };

    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, onConsentChange as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, onConsentChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (consentStatus !== "accepted") {
      disableAnalytics();
      return;
    }

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
  }, [consentStatus, location.pathname]);

  return null;
};

export default AnalyticsTracker;