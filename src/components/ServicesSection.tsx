import { useRef } from "react";
import { ArrowUpRight, ClipboardCheck, FileCheck, Lightbulb, MessageCircle, PenTool, ShieldCheck, Users } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import MobileCarouselControls from "@/components/MobileCarouselControls";

const services = [
  {
    icon: FileCheck,
    code: "AVCB_CLCB",
    title: "AVCB / CLCB",
    desc: "Regularização inicial, renovação e acompanhamento do processo com o Corpo de Bombeiros.",
    result: "Fluxo documental com direcionamento técnico para aprovação.",
  },
  {
    icon: ShieldCheck,
    code: "EXTINTORES",
    title: "Extintores",
    desc: "Venda, recarga e manutenção preventiva com rastreabilidade e conformidade.",
    result: "Proteção operacional com controle de validade e manutenção.",
  },
  {
    icon: Users,
    code: "BRIGADA",
    title: "Brigada de Incêndio",
    desc: "Treinamento e reciclagem com conteúdo prático para resposta segura em emergência.",
    result: "Equipe preparada para resposta rápida e redução de danos.",
  },
  {
    icon: PenTool,
    code: "PROJETOS_LAUDOS",
    title: "Projetos e Laudos",
    desc: "Projetos técnicos, memoriais e laudos para edificações comerciais e condomínios.",
    result: "Documentação robusta com padrão técnico auditável.",
  },
  {
    icon: Lightbulb,
    code: "SINALIZACAO",
    title: "Sinalização e Itens de Segurança",
    desc: "Sinalização de emergência, iluminação, detectores e itens de apoio operacional.",
    result: "Ambiente adequado para evacuação segura e inspeções.",
  },
  {
    icon: ClipboardCheck,
    code: "OUTRO",
    title: "Consultoria em Conformidade",
    desc: "Diagnóstico técnico para reduzir risco de autuação e priorizar adequações por impacto.",
    result: "Plano executivo com prioridades, investimento e cronograma.",
  },
] as const;

const ServicesSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section id="servicos" className="section-padding relative overflow-hidden bg-secondary" aria-label="Serviços oferecidos">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_14%,rgba(133,35,24,0.08),transparent_35%),radial-gradient(circle_at_88%_10%,rgba(90,54,38,0.08),transparent_30%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10">
        <div className="section-header">
          <span className="section-kicker">Escopo de alta performance</span>
          <h2 className="section-title">Solução completa para segurança contra incêndio</h2>
          <p className="section-subtitle">
            Atendemos empresas, comércios e condomínios com visão consultiva, execução técnica e documentação consistente.
          </p>
        </div>

        <div className="premium-surface p-3 sm:p-6 md:p-8">
          <MobileCarouselControls targetRef={carouselRef} label="Navegar serviços" />
          <div
            ref={carouselRef}
            className="flex snap-x snap-mandatory gap-3 overflow-x-hidden scroll-smooth pb-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
          >
            {services.map(({ icon: Icon, title, desc, result, code }) => (
              <article key={title} className="card-base flex min-w-full snap-start flex-col p-4 sm:min-w-0 sm:p-6">
                <div className="mb-4 flex items-start justify-between gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 sm:h-12 sm:w-12">
                    <Icon size={20} className="text-primary sm:h-6 sm:w-6" aria-hidden="true" />
                  </div>
                  <span className="metric-pill">Consultoria + execução</span>
                </div>
                <h3 className="mb-1.5 text-base font-bold sm:mb-2 sm:text-lg">{title}</h3>
                <p className="mb-3 text-sm leading-relaxed text-muted-foreground sm:mb-4">{desc}</p>
                <p className="mb-4 flex-1 rounded-xl border border-border/70 bg-secondary/45 px-3 py-2.5 text-[11px] font-semibold leading-relaxed text-foreground/85 sm:mb-5 sm:px-3.5 sm:py-3 sm:text-xs">
                  Entregável: {result}
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("servicos", `servico_${code}`, code)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                  aria-label={`Solicitar orçamento para ${title}`}
                >
                  <MessageCircle size={14} aria-hidden="true" />
                  Solicitar proposta
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-2.5 md:grid-cols-3 md:gap-3">
          <div className="rounded-xl border border-border/70 bg-card/75 p-3.5 sm:p-4">
            <p className="text-sm font-bold text-primary">Diagnóstico inicial</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Priorização técnica para evitar retrabalho e acelerar decisões.</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/75 p-3.5 sm:p-4">
            <p className="text-sm font-bold text-primary">Execução acompanhada</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Atualizações claras em cada etapa, com cronograma e próximos passos.</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/75 p-3.5 sm:p-4">
            <p className="text-sm font-bold text-primary">Entrega auditável</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Documentação organizada para validação, renovação e continuidade.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;