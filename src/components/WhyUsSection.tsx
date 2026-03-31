import { MessageCircle, MessageSquare, Package, ShieldCheck } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import { sectionImages } from "@/lib/section-images";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Leitura técnica objetiva",
    desc: "Diagnóstico e prioridade definidos sem excesso de ruído.",
  },
  {
    icon: MessageSquare,
    title: "Comunicação para decisão",
    desc: "Equipe, status e próximos passos falam a língua do gestor.",
  },
  {
    icon: Package,
    title: "Frente integrada",
    desc: "Campo, adequações e documentação seguem em uma mesma condução.",
  },
] as const;

const indicators = [
  { value: "Mesmo dia", label: "Retorno inicial" },
  { value: "Equipe técnica", label: "Campo e documentação" },
  { value: "Uma frente", label: "Mais clareza na operação" },
] as const;

const WhyUsSection = () => {
  return (
    <section
      id="diferenciais"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,rgba(231,220,210,0.78)_0%,rgba(223,211,199,0.72)_100%)]"
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
          <span className="section-kicker">Por que Star Fire</span>
          <h2 className="section-title">Uma apresentação mais clara para quem precisa decidir rápido</h2>
          <p className="section-subtitle max-w-3xl">Autoridade técnica sem transformar a landing em explicação longa.</p>
        </div>

        <div className="section-shell p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="relative grid gap-3 pb-1 lg:grid-cols-3 lg:gap-4 lg:pb-0">
            {indicators.map((item, index) => (
              <div
                key={item.value}
                className="premium-panel p-4 md:p-5"
                data-reveal={index === 0 ? "slide-left" : "zoom"}
                data-reveal-order={index}
              >
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-primary">{`0${index + 1}`}</p>
                <p className="mt-2 text-lg font-bold text-foreground">{item.value}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="relative mt-6 grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="grid gap-4">
              {reasons.map(({ icon: Icon, title, desc }, index) => (
                <article
                  key={title}
                  className="card-base p-5 sm:p-6"
                  data-reveal={index % 2 === 0 ? "slide-left" : "slide-right"}
                  data-reveal-order={index + 3}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <span className="metric-pill">Diferencial</span>
                  </div>
                  <h3 className="text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </article>
              ))}
            </div>

            <aside className="editorial-image-frame min-h-[32rem]" data-reveal="media" data-reveal-order="7">
              <div className="editorial-image-wrap">
                <img src={sectionImages["why-us"].imageSrc} alt={sectionImages["why-us"].alt} className="editorial-image" loading="lazy" />
              </div>
              <div className="editorial-caption">
                <span className="premium-badge w-fit">Coordenação técnica</span>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80">
                  A leitura certa encurta o caminho entre exigência, decisão e execução.
                </p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("diferenciais", "diferenciais_whatsapp")}
                  className="cta-whatsapp mt-5 w-full justify-center sm:w-auto"
                  aria-label="Solicitar orçamento pelo WhatsApp"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Falar com especialista
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
