import { Link } from "react-router-dom";
import { Cookie, Instagram, Linkedin, Star } from "lucide-react";
import { COMPANY_CNPJ, COMPANY_CITY, COMPANY_STATE, INSTAGRAM_URL, LINKEDIN_URL, GOOGLE_REVIEWS_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { openCookiePreferences } from "@/lib/cookie-consent";

const Footer = () => (
  <footer className="relative overflow-hidden bg-foreground py-12 pb-28 text-background/90 sm:pb-12" role="contentinfo">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.08),transparent_42%),radial-gradient(circle_at_90%_90%,rgba(255,255,255,0.06),transparent_34%)]" aria-hidden="true" />
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" aria-hidden="true" />
    <div className="container">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2 text-lg font-display font-bold text-background">
          <img src="/starfire-logo-transparent.png" alt="Logo Star Fire" className="brand-logo h-10 w-10" />
          Star Fire
        </div>

        <div className="text-sm leading-relaxed">
          <p>
            Star Fire - Prevenção e Combate a Incêndio.
            <br className="sm:hidden" /> {COMPANY_CITY} - {COMPANY_STATE}.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs sm:gap-4">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_cta_secondary", { section: "footer", cta_label: "footer_instagram" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/6 px-3 py-1.5 transition-colors hover:bg-white/12 hover:text-background"
              aria-label="Instagram da Star Fire"
            >
              <Instagram size={14} aria-hidden="true" />
              Instagram
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_cta_secondary", { section: "footer", cta_label: "footer_linkedin" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/6 px-3 py-1.5 transition-colors hover:bg-white/12 hover:text-background"
              aria-label="LinkedIn da Star Fire"
            >
              <Linkedin size={14} aria-hidden="true" />
              LinkedIn
            </a>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_cta_secondary", { section: "footer", cta_label: "footer_google_reviews" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/6 px-3 py-1.5 transition-colors hover:bg-white/12 hover:text-background"
              aria-label="Avaliações da Star Fire no Google"
            >
              <Star size={14} aria-hidden="true" />
              Depoimentos
            </a>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-3 text-xs sm:gap-5" aria-label="Links legais">
          <Link to="/politica-de-privacidade" className="underline-offset-4 transition-colors hover:text-background hover:underline">
            Política de Privacidade
          </Link>
          <Link to="/termos-de-uso" className="underline-offset-4 transition-colors hover:text-background hover:underline">
            Termos de Uso
          </Link>
          <button
            type="button"
            onClick={() => {
              openCookiePreferences();
              trackEvent("click_cta_secondary", { section: "footer", cta_label: "footer_cookie_preferences" });
            }}
            className="inline-flex items-center gap-1 underline-offset-4 transition-colors hover:text-background hover:underline"
            aria-label="Abrir preferências de cookies"
          >
            <Cookie size={13} aria-hidden="true" />
            Cookies
          </button>
        </nav>
      </div>
      <div className="mt-8 flex w-full justify-center">
        <p className="w-full max-w-4xl text-center text-xs leading-relaxed text-background/68">
          Copyright {new Date().getFullYear()} Star Fire. Todos os direitos reservados. CNPJ: {COMPANY_CNPJ}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;