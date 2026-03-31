import { useRef } from "react";
import { ClipboardList, MessageCircle, Radar, ShieldCheck, Workflow } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import MobileCarouselControls from "@/components/MobileCarouselControls";

const steps = [
  {
    icon: Radar,
    title: "Diagnóstico",
    desc: "Leitura técnica do cenário e das exigências da unidade.",
  },
  {
    icon: ClipboardList,
    title: "Escopo",
    desc: "Definição do que entra no projeto, documentos e adequações.",
  },
  {
    icon: Workflow,
    title: "Execução",
    desc: "Acompanhamento das frentes práticas até a etapa de validação.",
  },
  {
    icon: ShieldCheck,
    title: "Validação",
    desc: "Fechamento da entrega e preparação para aprovação.",
  },
] as const;

const processHighlights = [
  { value: "4 etapas", label: "Fluxo direto" },
  { value: "1 condução", label: "Sem múltiplos repasses" },
  { value: "Fim claro", label: "Preparação para aprovação" },
] as const;

const HowItWorksSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="como-funciona"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,rgba(236,227,218,0.66)_0%,rgba(229,218,207,0.6)_100%)]"
      aria-label="Como funciona o processo"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/24 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_86%_16%,rgba(133,35,24,0.11),transparent_32%),radial-gradient(circle_at_12%_84%,rgba(90,54,38,0.1),transparent_30%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10">
        <div className="section-header">
          <span className="section-kicker">Método Star Fire</span>
          <h2 className="section-title">Como a operação avança com a Star Fire</h2>
          <p className="section-subtitle max-w-3xl">Um processo enxuto para sair do diagnóstico e chegar à validação.</p>
        </div>

        <div className="section-shell mx-auto max-w-6xl p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="section-spotlight" />
          <div className="relative">
            <div className="mb-5 flex flex-wrap gap-2.5" data-reveal="blur" data-reveal-order="0">
              {processHighlights.map((highlight) => (
                <div key={highlight.value} className="premium-panel p-4 text-center">
                  <p className="text-base font-bold text-primary">{highlight.value}</p>
                  <p className="text-xs text-muted-foreground">{highlight.label}</p>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute left-[8%] right-[8%] top-[6rem] hidden h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent lg:block" aria-hidden="true" />

            <MobileCarouselControls targetRef={carouselRef} label="Navegar etapas" hideAboveClass="lg:hidden" className="relative z-10" />
            <div
              ref={carouselRef}
              className="relative flex snap-x snap-mandatory gap-3 overflow-x-hidden scroll-smooth pb-1 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:pb-0"
            >
              {steps.map(({ icon: Icon, title, desc }, index) => (
                <article
                  key={title}
                  className="card-base flex min-w-full snap-start flex-col p-4 sm:min-w-[84%] sm:p-5 lg:min-w-0 lg:p-6"
                  data-reveal={index % 2 === 0 ? "slide-left" : "slide-right"}
                  data-reveal-order={index + 1}
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_12px_24px_rgba(133,35,24,0.22)]">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <span className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-primary">{`Etapa 0${index + 1}`}</span>
                  </div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </article>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]" data-reveal="zoom" data-reveal-order="5">
              <div className="premium-panel p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Cada etapa tem objetivo claro, responsável definido e próximo passo visível.
                </p>
              </div>

              <div className="premium-panel-dark p-5 sm:p-6">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("como_funciona", "processo_whatsapp")}
                  className="cta-whatsapp w-full justify-center sm:w-auto"
                  aria-label="Iniciar processo pelo WhatsApp"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Iniciar diagnóstico no WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
