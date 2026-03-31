import { CalendarCheck, ChevronDown, FileCheck2, MapPin, MessageCircle, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackEvent, trackWhatsAppClick } from "@/lib/analytics";
import { sectionImages } from "@/lib/section-images";

const pillars = [
  { icon: ShieldCheck, label: "Diagnóstico" },
  { icon: Wrench, label: "Execução" },
  { icon: FileCheck2, label: "Aprovação" },
];

const MethodPanel = () => (
  <div className="premium-panel-dark hero-panel-enter p-6">
    <div className="relative">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="premium-badge mb-3">
            <Sparkles size={12} aria-hidden="true" />
            Identidade Star Fire
          </span>
          <h2 className="text-[1.12rem] font-display font-bold leading-tight text-white">Diagnóstico, execução e aprovação</h2>
        </div>
        <div className="rounded-2xl border border-white/16 bg-white/8 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
          <img src="/starfire-logo-transparent.png" alt="Identidade Star Fire" className="brand-logo h-10 w-10 object-contain" />
        </div>
      </div>

      <div className="space-y-3">
        {pillars.map(({ icon: Icon, label }, index) => (
          <div key={label} className="hero-pill-enter flex items-center gap-3 rounded-2xl border border-white/12 bg-white/5 px-3.5 py-3" style={{ animationDelay: `${260 + index * 70}ms` }}>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/8 text-[0.7rem] font-bold text-white/88">
              {index + 1}
            </span>
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/18 text-[#f8ddcf]">
              <Icon size={16} aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold leading-relaxed text-white/94">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/84">
        <MapPin size={13} className="text-[#f4d2be]" aria-hidden="true" />
        São José dos Campos e Vale do Paraíba
      </div>
    </div>
  </div>
);

const HeroSection = () => (
  <section
    className="hero-stage relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-14 sm:min-h-[104svh] sm:pt-28 sm:pb-20 md:min-h-[102dvh] md:pb-24"
    id="hero"
    aria-label="Apresentação Star Fire"
  >
    <div className="absolute inset-0 z-0">
      <img
        src={sectionImages.hero.imageSrc}
        alt={sectionImages.hero.alt}
        className="hero-image h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <div className="premium-grid-overlay opacity-15" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,6,0.18)_0%,rgba(8,6,6,0.08)_26%,rgba(8,6,6,0.34)_100%)]" aria-hidden="true" />
      <div className="hero-glow hero-glow-left absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/18 blur-3xl" aria-hidden="true" />
      <div className="hero-glow hero-glow-right absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-accent/18 blur-3xl" aria-hidden="true" />
    </div>

    <div className="container relative z-10 py-10 sm:py-12 md:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="max-w-3xl">
          <span className="premium-badge hero-badge-enter mb-5">
            <Sparkles size={12} aria-hidden="true" />
            Star Fire
          </span>

          <h1 className="hero-title-enter max-w-3xl font-display text-[2.12rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-white sm:text-[2.9rem] md:text-[3.6rem]">
            Segurança contra incêndio com apresentação técnica e comercial no ponto certo
          </h1>

          <p className="hero-copy-enter mt-5 max-w-2xl text-[1rem] leading-relaxed text-[#f3e8df] [text-shadow:0_2px_12px_rgba(0,0,0,0.44)] sm:text-lg">
            AVCB/CLCB, extintores, brigada e projetos com uma condução clara para empresas e condomínios.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("hero", "hero_whatsapp")}
              className="cta-whatsapp-lg hero-cta-enter w-full sm:w-auto"
              aria-label="Solicitar orçamento pelo WhatsApp"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Falar com especialista
            </a>

            <a
              href="#contato"
              onClick={() => trackEvent("click_cta_secondary", { section: "hero", cta_label: "hero_agendar_avaliacao" })}
              className="cta-outline hero-cta-enter w-full sm:w-auto"
              style={{ animationDelay: "340ms" }}
            >
              <CalendarCheck size={18} aria-hidden="true" />
              Agendar avaliação técnica
            </a>
          </div>
        </div>

        <aside className="hidden lg:block">
          <MethodPanel />
        </aside>
      </div>
    </div>

    <a
      href="#servicos"
      onClick={() => trackEvent("click_cta_secondary", { section: "hero", cta_label: "hero_scroll_cue" })}
      className="hero-scroll-cue group absolute bottom-5 left-1/2 z-20 -translate-x-1/2 focus-visible:outline-none"
      aria-label="Ver mais conteúdo abaixo"
    >
      <span className="hero-scroll-cue-label">Role para explorar</span>
      <span className="hero-scroll-cue-button">
        <span className="hero-scroll-cue-ripple" aria-hidden="true" />
        <ChevronDown size={18} className="hero-scroll-cue-icon" aria-hidden="true" />
      </span>
    </a>
  </section>
);

export default HeroSection;
