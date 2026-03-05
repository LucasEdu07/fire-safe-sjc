export type CookieConsentStatus = "accepted" | "rejected" | "unset";

type CookieConsentStored = {
  status: Exclude<CookieConsentStatus, "unset">;
  updated_at: string;
};

const COOKIE_CONSENT_STORAGE_KEY = "starfire_cookie_consent_v1";

export const COOKIE_CONSENT_CHANGE_EVENT = "starfire:cookie-consent-change";
export const COOKIE_CONSENT_OPEN_EVENT = "starfire:cookie-consent-open";

const isStoredStatus = (value: unknown): value is Exclude<CookieConsentStatus, "unset"> =>
  value === "accepted" || value === "rejected";

const parseStored = (raw: string | null): CookieConsentStored | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<CookieConsentStored>;
    if (!isStoredStatus(parsed.status)) {
      return null;
    }

    return {
      status: parsed.status,
      updated_at: typeof parsed.updated_at === "string" ? parsed.updated_at : new Date().toISOString(),
    };
  } catch {
    return null;
  }
};

export const getCookieConsentStatus = (): CookieConsentStatus => {
  if (typeof window === "undefined") {
    return "unset";
  }

  const stored = parseStored(window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY));
  return stored?.status ?? "unset";
};

export const setCookieConsentStatus = (status: Exclude<CookieConsentStatus, "unset">): void => {
  if (typeof window === "undefined") {
    return;
  }

  const payload: CookieConsentStored = {
    status,
    updated_at: new Date().toISOString(),
  };

  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(payload));

  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, {
      detail: { status },
    }),
  );
};

export const openCookiePreferences = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_OPEN_EVENT));
};

