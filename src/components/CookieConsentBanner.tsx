import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  COOKIE_CONSENT_OPEN_EVENT,
  getCookieConsentStatus,
  setCookieConsentStatus,
  type CookieConsentStatus,
} from "@/lib/cookie-consent";

const CookieConsentBanner = () => {
  const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>(() => getCookieConsentStatus());
  const [isOpen, setIsOpen] = useState<boolean>(() => getCookieConsentStatus() === "unset");

  useEffect(() => {
    const onOpen = () => {
      setConsentStatus(getCookieConsentStatus());
      setIsOpen(true);
    };

    const onConsentChange = () => {
      setConsentStatus(getCookieConsentStatus());
    };

    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key.includes("starfire_cookie_consent_v1")) {
        setConsentStatus(getCookieConsentStatus());
      }
    };

    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen as EventListener);
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, onConsentChange as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, onOpen as EventListener);
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, onConsentChange as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const onAccept = () => {
    setCookieConsentStatus("accepted");
    setConsentStatus("accepted");
    setIsOpen(false);
  };

  const onReject = () => {
    setCookieConsentStatus("rejected");
    setConsentStatus("rejected");
    setIsOpen(false);
  };

  const canDismiss = consentStatus !== "unset";

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-[calc(max(0.9rem,env(safe-area-inset-bottom))+4.6rem)] z-50 px-3 sm:bottom-4 sm:px-4">
      <div className="mx-auto max-w-5xl rounded-xl border border-border bg-background p-3.5 shadow-lg sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-foreground sm:max-w-3xl sm:text-sm">
            {consentStatus === "unset"
              ? "Usamos cookies essenciais para funcionamento do site e cookies analíticos para melhorar a experiência."
              : "Você pode alterar suas preferências de cookies a qualquer momento."}{" "}
            <Link to="/politica-de-privacidade" className="font-semibold text-primary hover:underline">
              Política de Privacidade
            </Link>
          </p>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <button
              type="button"
              onClick={onAccept}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Aceitar
            </button>
            <button
              type="button"
              onClick={onReject}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-bold text-foreground transition-colors hover:bg-secondary/65"
            >
              Rejeitar
            </button>
            {canDismiss ? (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-lg border border-border/70 bg-transparent px-3 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary/60"
              >
                Fechar
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
