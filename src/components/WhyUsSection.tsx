import { ChartNoAxesCombined, FileText, MessageCircle, MessageSquare, Package, ShieldCheck } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

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

const WhyUsSection = () => (
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

      <div className="premium-surface mb-8 p-4 sm:p-6 md:p-8">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {indicators.map((item) => (
            <div key={item.value} className="card-base min-w-[84%] snap-start p-5 md:min-w-0">
              <p className="text-lg font-bold text-primary">{item.value}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-12 grid max-w-5xl gap-5 sm:grid-cols-2">
        {reasons.map(({ icon: Icon, title, desc }) => (
          <article key={title} className="card-base p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Icon size={22} className="text-primary" aria-hidden="true" />
              </div>
              <span className="metric-pill">Diferencial estratégico</span>
            </div>
            <h3 className="mb-2 text-base font-bold sm:text-lg">{title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </article>
        ))}
      </div>

      <div className="mx-auto mb-8 grid max-w-5xl gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border/70 bg-card/75 p-4">
          <p className="text-sm font-bold text-primary">Governança técnica</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Controle de prazos, evidências e histórico para reduzir risco operacional.</p>
        </div>
        <div className="rounded-xl border border-border/70 bg-card/75 p-4">
          <p className="text-sm font-bold text-primary">Relacionamento consultivo</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Orientação objetiva para decisões rápidas, sem depender de múltiplos fornecedores.</p>
        </div>
      </div>

      <div className="premium-surface mx-auto max-w-4xl p-5 text-center sm:p-8">
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

export default WhyUsSection;
