import { getCookieConsentStatus } from "@/lib/cookie-consent";

type Primitive = string | number | boolean | undefined | null;
type AnalyticsPayload = Record<string, Primitive>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    __starfireAnalyticsInit?: boolean;
  }
}

const GA_SCRIPT_ID = "starfire-ga-script";
const META_SCRIPT_ID = "starfire-meta-script";

const hasTrackingConsent = (): boolean => getCookieConsentStatus() === "accepted";

const sanitizePayload = (payload: AnalyticsPayload = {}): Record<string, string | number | boolean> => {
  const entries = Object.entries(payload).filter(([, value]) => value !== undefined && value !== null);

  return Object.fromEntries(entries) as Record<string, string | number | boolean>;
};

const getBasePayload = (): AnalyticsPayload => {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);

  return {
    page: window.location.pathname,
    utm_source: params.get("utm_source") || undefined,
    utm_medium: params.get("utm_medium") || undefined,
    utm_campaign: params.get("utm_campaign") || undefined,
  };
};

const loadScript = (id: string, src: string): HTMLScriptElement => {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  if (existing) {
    return existing;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);

  return script;
};

const removeScriptById = (id: string): void => {
  const element = document.getElementById(id);
  if (element?.parentNode) {
    element.parentNode.removeChild(element);
  }
};

const removeScriptsBySrc = (srcPart: string): void => {
  document.querySelectorAll(`script[src*="${srcPart}"]`).forEach((node) => node.parentNode?.removeChild(node));
};

export const disableAnalytics = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  removeScriptById(GA_SCRIPT_ID);
  removeScriptById(META_SCRIPT_ID);
  removeScriptsBySrc("googletagmanager.com/gtag/js");
  removeScriptsBySrc("connect.facebook.net/en_US/fbevents.js");

  window.gtag = undefined;
  window.fbq = undefined;
  window.dataLayer = [];
  window.__starfireAnalyticsInit = false;
};

export const initAnalytics = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (!hasTrackingConsent()) {
    disableAnalytics();
    return;
  }

  if (window.__starfireAnalyticsInit) {
    return;
  }

  const gaId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  const pixelId = import.meta.env.VITE_META_PIXEL_ID;

  if (gaId) {
    loadScript(GA_SCRIPT_ID, `https://www.googletagmanager.com/gtag/js?id=${gaId}`);

    window.dataLayer = window.dataLayer || [];

    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };

    window.gtag("js", new Date());
    window.gtag("config", gaId, { send_page_view: true });
  }

  if (pixelId) {
    if (!window.fbq) {
      window.fbq = (...args: unknown[]) => {
        (window.fbq as unknown as { queue?: unknown[] }).queue = (window.fbq as unknown as { queue?: unknown[] }).queue || [];
        (window.fbq as unknown as { queue?: unknown[] }).queue?.push(args);
      };
    }

    const inline = document.createElement("script");
    inline.textContent = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `;

    if (!document.getElementById(META_SCRIPT_ID)) {
      inline.id = META_SCRIPT_ID;
      document.head.appendChild(inline);
    }
  }

  window.__starfireAnalyticsInit = true;
};

export const trackEvent = (eventName: string, payload: AnalyticsPayload = {}): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (!hasTrackingConsent()) {
    return;
  }

  const mergedPayload = sanitizePayload({
    ...getBasePayload(),
    ...payload,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, mergedPayload);
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, mergedPayload);
  }
};

export const trackWhatsAppClick = (section: string, cta_label: string, service?: string): void => {
  trackEvent("click_whatsapp", { section, cta_label, service });
};

export const trackFormStart = (section = "contato"): void => {
  trackEvent("start_form", { section });
};

export const trackFormSubmit = (status: "success" | "error", service?: string): void => {
  const event = status === "success" ? "submit_form_success" : "submit_form_error";
  trackEvent(event, { section: "contato", service });
};