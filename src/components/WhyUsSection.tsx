import { useRef } from "react";
import { ChartNoAxesCombined, FileText, MessageCircle, MessageSquare, Package, ShieldCheck } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import MobileCarouselControls from "@/components/MobileCarouselControls";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Conformidade com visão estratégica",
    desc: "Atuamos para reduzir risco regulatório e fortalecer a continuidade da sua operação.",
  },
  {
    icon: MessageSquare,
    title: "Comunicação objetiva para decisores",
    desc: "Status claros, prioridades definidas e próximos passos sem ruído técnico.",
  },
  {
    icon: Package,
    title: "Operação integrada",
    desc: "Diagnóstico, adequações, treinamento e documentação no mesmo fluxo.",
  },
  {
    icon: FileText,
    title: "Documentação pronta para auditoria",
    desc: "Checklist, histórico e trilha técnica organizados para fiscalizações e renovações.",
  },
];

const indicators = [
  { value: "SLA no mesmo dia", label: "Retorno comercial para iniciar o diagnóstico" },
  { value: "Equipe multidisciplinar", label: "Projetos, campo e documentação técnica" },
  { value: "Ritmo previsível", label: "Gestão com cronograma e checkpoints claros" },
];

const WhyUsSection = () => {
  const indicatorsRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="diferenciais"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,rgba(229,219,209,0.74)_0%,rgba(224,212,200,0.7)_100%)]"
      aria-label="Diferenciais da Star Fire"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/22 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(133,35,24,0.1),transparent_34%),radial-gradient(circle_at_86%_76%,rgba(90,54,38,0.1),transparent_32%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10">
        <div className="section-header">
          <span className="section-kicker">Posicionamento premium</span>
          <h2 className="section-title">Por que empresas exigentes escolhem a Star Fire</h2>
          <p className="section-subtitle max-w-3xl">
            Mais do que executar serviços, estruturamos uma jornada técnica para blindar sua operação e manter previsibilidade.
          </p>
        </div>

        <div className="premium-surface mb-8 p-3 sm:p-6 md:p-8">
          <MobileCarouselControls targetRef={indicatorsRef} label="Navegar diferenciais" hideAboveClass="md:hidden" />
          <div
            ref={indicatorsRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-hidden scroll-smooth pb-1 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0"
          >
            {indicators.map((item) => (
              <div key={item.value} className="card-base min-w-full snap-start p-4 md:min-w-0 md:p-5">
                <p className="text-base font-bold text-primary md:text-lg">{item.value}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mb-12 grid max-w-5xl gap-3.5 sm:grid-cols-2 sm:gap-5">
          {reasons.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="card-base p-4 sm:p-6">
              <div className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 sm:h-11 sm:w-11">
                  <Icon size={20} className="sm:h-[22px] sm:w-[22px]" aria-hidden="true" />
                </div>
                <span className="metric-pill">Diferencial estratégico</span>
              </div>
              <h3 className="mb-1.5 text-[0.98rem] font-bold sm:mb-2 sm:text-lg">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mb-8 grid max-w-5xl gap-2.5 sm:grid-cols-2 sm:gap-3">
          <div className="rounded-xl border border-border/70 bg-card/75 p-3.5 sm:p-4">
            <p className="text-sm font-bold text-primary">Governança técnica</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Controle de prazos, evidências e histórico para reduzir risco operacional.</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/75 p-3.5 sm:p-4">
            <p className="text-sm font-bold text-primary">Relacionamento consultivo</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Orientação objetiva para decisões rápidas, sem depender de múltiplos fornecedores.</p>
          </div>
        </div>

        <div className="premium-surface mx-auto max-w-4xl p-4 text-center sm:p-8">
          <ChartNoAxesCombined size={20} className="mx-auto mb-3 text-primary" aria-hidden="true" />
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            "Nosso compromisso é transformar exigências técnicas em segurança operacional real para o seu negócio."
          </p>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("diferenciais", "diferenciais_whatsapp")}
            className="cta-whatsapp w-full sm:w-auto"
            aria-label="Solicitar orçamento pelo WhatsApp"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Falar com especialista
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;