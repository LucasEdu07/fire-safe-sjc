import { CalendarCheck, FileCheck2, MessageCircle, ShieldCheck, Sparkles, Wrench } from "lucide-react";
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
          <div className="relative ml-auto max-w-[23.5rem] overflow-hidden rounded-[1.7rem] border border-white/22 bg-black/34 p-6 text-white shadow-[0_20px_44px_rgba(0,0,0,0.32)] backdrop-blur-md">
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/25 blur-3xl" aria-hidden="true" />

            <div className="relative">
              <div className="mb-5 flex items-center gap-3">
                <img src="/starfire-logo-transparent.png" alt="Identidade Star Fire" className="h-11 w-11 object-contain" />
                <div>
                  <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/78">Método Star Fire</p>
                  <p className="text-base font-bold leading-tight text-white">Plano técnico com foco em resultado</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {pillars.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 rounded-xl border border-white/18 bg-black/22 px-3.5 py-3">
                    <Icon size={16} className="text-[#f4d2be]" aria-hidden="true" />
                    <p className="text-sm font-semibold text-white/95">{label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-xs font-semibold text-white/72">São José dos Campos e Vale do Paraíba</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>
);

export default HeroSection;
