import { CalendarCheck, ChevronDown, FileCheck2, MapPin, MessageCircle, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackEvent, trackWhatsAppClick } from "@/lib/analytics";
import heroBg from "@/assets/hero-bg.jpg";

const pillars = [
  { icon: ShieldCheck, label: "Diagnóstico técnico" },
  { icon: Wrench, label: "Implementação assistida" },
  { icon: FileCheck2, label: "Gestão documental" },
];

const HeroSection = () => (
  <section
    className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-20 pb-14 sm:min-h-[104svh] sm:pt-24 sm:pb-18 md:min-h-[102dvh] md:pb-20"
    id="hero"
    aria-label="Apresentação Star Fire"
  >
    <div className="absolute inset-0 z-0">
      <img
        src={heroBg}
        alt="Profissional realizando inspeção de segurança contra incêndio em edifício comercial"
        className="h-full w-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-primary/24 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-16 bottom-12 h-64 w-64 rounded-full bg-accent/20 blur-3xl" aria-hidden="true" />
    </div>

    <div className="container relative z-10 py-10 sm:py-12 md:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/28 bg-black/30 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.16em] text-white/95">
            <Sparkles size={13} aria-hidden="true" />
            Consultoria premium em segurança contra incêndio
          </p>

          <h1 className="mb-5 max-w-2xl font-display text-[2rem] font-extrabold leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.6rem] md:text-[3.05rem]">
            Conformidade técnica para proteger sua operação e sustentar seu crescimento
          </h1>

          <p className="max-w-xl text-[0.98rem] leading-relaxed text-[#f3e8df] [text-shadow:0_2px_8px_rgba(0,0,0,0.45)] sm:text-lg">
            AVCB/CLCB, extintores, brigada, projetos e laudos com gestão estratégica e execução consistente do início à aprovação.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("hero", "hero_whatsapp")}
              className="cta-whatsapp-lg w-full sm:w-auto"
              aria-label="Solicitar orçamento pelo WhatsApp"
            >
              <MessageCircle size={20} aria-hidden="true" />
              Falar com especialista
            </a>

            <a
              href="#contato"
              onClick={() => trackEvent("click_cta_secondary", { section: "hero", cta_label: "hero_agendar_avaliacao" })}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/38 bg-black/24 px-7 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-black/34 sm:w-auto"
            >
              <CalendarCheck size={18} aria-hidden="true" />
              Agendar avaliação técnica
            </a>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="group relative ml-auto max-w-[24rem] overflow-hidden rounded-[1.9rem] border border-white/25 bg-[linear-gradient(160deg,rgba(18,18,18,0.55)_0%,rgba(26,21,19,0.42)_55%,rgba(42,22,17,0.5)_100%)] p-6 text-white shadow-[0_22px_46px_rgba(0,0,0,0.34)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_28px_52px_rgba(0,0,0,0.4)]">
            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-accent/30 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" aria-hidden="true" />

            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/10 px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.15em] text-white/90">
                <Sparkles size={12} aria-hidden="true" />
                Identidade Star Fire
              </div>

              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl border border-white/22 bg-white/10 p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]">
                  <img src="/starfire-logo-transparent.png" alt="Identidade Star Fire" className="h-10 w-10 object-contain" />
                </div>
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/80">Método Star Fire</p>
                  <p className="text-[1.02rem] font-bold leading-tight text-white">Plano técnico com foco em resultado</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {pillars.map(({ icon: Icon, label }, index) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-white/20 bg-[linear-gradient(140deg,rgba(255,255,255,0.09)_0%,rgba(255,255,255,0.03)_100%)] px-3.5 py-3 transition-all duration-300 group-hover:border-white/24"
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/14 text-[0.66rem] font-bold text-white/92">{index + 1}</span>
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/24 text-[#f4d2be]">
                      <Icon size={15} aria-hidden="true" />
                    </div>
                    <p className="text-sm font-semibold text-white/95">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-xs font-semibold text-white/85">
                <MapPin size={13} className="text-[#f4d2be]" aria-hidden="true" />
                São José dos Campos e Vale do Paraíba
              </div>
            </div>
          </div>
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
