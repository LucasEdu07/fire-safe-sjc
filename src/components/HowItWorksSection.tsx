import { useRef } from "react";
import { ClipboardList, MessageCircle, Radar, ShieldCheck, Workflow } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import MobileCarouselControls from "@/components/MobileCarouselControls";

const steps = [
  {
    icon: Radar,
    title: "Diagnóstico executivo",
    desc: "Levantamos cenário, criticidades e exigências para estruturar o plano mais eficiente para sua operação.",
  },
  {
    icon: ClipboardList,
    title: "Projeto e priorização",
    desc: "Definimos escopo, documentação e fases de implementação conforme impacto e urgência.",
  },
  {
    icon: Workflow,
    title: "Implementação assistida",
    desc: "Executamos adequações e treinamentos com comunicação contínua para sua equipe acompanhar tudo.",
  },
  {
    icon: ShieldCheck,
    title: "Validação e continuidade",
    desc: "Entregamos checklist final, documentação organizada e plano de manutenção preventiva.",
  },
];

const HowItWorksSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="como-funciona"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,rgba(236,227,218,0.64)_0%,rgba(230,219,208,0.56)_100%)]"
      aria-label="Como funciona o processo"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/22 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/18 to-transparent" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_14%,rgba(133,35,24,0.11),transparent_34%),radial-gradient(circle_at_10%_82%,rgba(90,54,38,0.1),transparent_34%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10">
        <div className="section-header">
          <span className="section-kicker">Método Star Fire</span>
          <h2 className="section-title">Processo premium, transparente e orientado a resultado</h2>
          <p className="section-subtitle max-w-3xl">
            Você tem clareza de prazos, decisões e investimentos em cada etapa, sem ruído técnico e sem perda operacional.
          </p>
        </div>

        <div className="premium-surface relative mx-auto mb-10 max-w-6xl p-3 sm:mb-12 sm:p-7 md:p-9">
          <div className="pointer-events-none absolute left-[2.15rem] top-20 hidden h-[calc(100%-6.8rem)] w-px bg-gradient-to-b from-primary/50 via-primary/25 to-transparent lg:block" aria-hidden="true" />
          <MobileCarouselControls targetRef={carouselRef} label="Navegar etapas" />
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-hidden scroll-smooth pb-1 sm:grid sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-2"
          >
            {steps.map(({ icon: Icon, title, desc }, index) => (
              <article key={title} className="card-base flex min-w-full snap-start gap-3 p-4 sm:min-w-0 sm:gap-4 sm:p-6">
                <div className="shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_18px_rgba(133,35,24,0.28)] sm:h-12 sm:w-12">
                    <Icon size={18} className="sm:h-5 sm:w-5" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary sm:text-xs">Etapa {index + 1}</p>
                  <h3 className="mb-1.5 text-[0.98rem] font-bold sm:mb-2 sm:text-lg">{title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mb-10 grid max-w-5xl gap-2.5 sm:grid-cols-3 sm:gap-3">
          <div className="rounded-xl border border-border/70 bg-card/75 p-3.5 text-center sm:p-4">
            <p className="text-base font-bold text-primary sm:text-lg">4 etapas</p>
            <p className="text-xs text-muted-foreground">Fluxo técnico estruturado</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/75 p-3.5 text-center sm:p-4">
            <p className="text-base font-bold text-primary sm:text-lg">Visibilidade total</p>
            <p className="text-xs text-muted-foreground">Status e decisões sem ruído</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/75 p-3.5 text-center sm:p-4">
            <p className="text-base font-bold text-primary sm:text-lg">Entrega contínua</p>
            <p className="text-xs text-muted-foreground">Do diagnóstico à manutenção</p>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-6 text-sm font-semibold text-muted-foreground sm:text-base">
            "Nossa prioridade é proteger sua empresa com previsibilidade, sem burocracia e com alta qualidade técnica."
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("como_funciona", "processo_whatsapp")}
            className="cta-whatsapp"
            aria-label="Iniciar processo pelo WhatsApp"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Iniciar diagnóstico no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;