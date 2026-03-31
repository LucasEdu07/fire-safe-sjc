import { useRef } from "react";
import { ArrowUpRight, FileCheck, MessageCircle, PenTool, ShieldCheck, Users } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import MobileCarouselControls from "@/components/MobileCarouselControls";
import { sectionImages } from "@/lib/section-images";

const services = [
  {
    icon: FileCheck,
    code: "AVCB_CLCB",
    title: "AVCB / CLCB",
    desc: "Regularização e renovação com condução técnica direta.",
    result: "Aprovação com menos atrito para a operação.",
  },
  {
    icon: ShieldCheck,
    code: "EXTINTORES",
    title: "Extintores",
    desc: "Venda, recarga e manutenção preventiva.",
  },
  {
    icon: Users,
    code: "BRIGADA",
    title: "Brigada de Incêndio",
    desc: "Treinamento e reciclagem para resposta segura.",
  },
  {
    icon: PenTool,
    code: "PROJETOS_LAUDOS",
    title: "Projetos e Laudos",
    desc: "Projetos técnicos e laudos para unidades comerciais e residenciais.",
  },
] as const;

const deliveryHighlights = [
  { title: "Leitura rápida", desc: "O que entra, o que sai e o que priorizar." },
  { title: "Ação prática", desc: "Frente técnica e operacional no mesmo ritmo." },
] as const;

const [featuredService, ...secondaryServices] = services;
const FeaturedIcon = featuredService.icon;

const ServicesSection = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="servicos"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,rgba(239,231,223,0.84)_0%,rgba(232,221,210,0.74)_100%)]"
      aria-label="Serviços oferecidos"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_16%,rgba(133,35,24,0.1),transparent_34%),radial-gradient(circle_at_88%_18%,rgba(90,54,38,0.1),transparent_30%)]"
        aria-hidden="true"
      />
      <div className="container relative z-10">
        <div className="section-header">
          <span className="section-kicker">Serviços</span>
          <h2 className="section-title">Frentes centrais para regularizar e operar com tranquilidade</h2>
          <p className="section-subtitle">O essencial, sem dispersão.</p>
        </div>

        <div className="section-shell p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="relative mb-6 grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
            <article className="premium-panel-dark p-5 sm:p-6 lg:p-7" data-reveal="slide-left" data-reveal-order="0">
              <div className="relative">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="mt-2 text-2xl font-display font-bold text-white sm:text-[2rem]">{featuredService.title}</h3>
                  </div>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/8 text-[#f8ddcf]">
                    <FeaturedIcon size={24} aria-hidden="true" />
                  </div>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-white/74 sm:text-base">{featuredService.desc}</p>

                <div className="mt-5 rounded-[1.35rem] border border-white/14 bg-black/16 p-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#f8ddcf]">Foco principal</p>
                  <p className="mt-2 text-sm leading-relaxed text-white/82">{featuredService.result}</p>
                </div>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("servicos", `servico_${featuredService.code}`, featuredService.code)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#f8ddcf] hover:text-white"
                  aria-label={`Solicitar orçamento para ${featuredService.title}`}
                >
                  <MessageCircle size={15} aria-hidden="true" />
                  Solicitar proposta
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </article>

            <div className="grid content-center gap-3" data-reveal="slide-right" data-reveal-order="1">
              <div className="editorial-image-frame min-h-[24rem]" data-reveal="media">
                <div className="editorial-image-wrap">
                  <img src={sectionImages.services.imageSrc} alt={sectionImages.services.alt} className="editorial-image" loading="lazy" />
                </div>
                <div className="editorial-caption">
                  <span className="premium-badge w-fit">Atendimento em campo</span>
                  <div className="mt-4 grid gap-3">
                    {deliveryHighlights.map((highlight) => (
                      <div key={highlight.title} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#f8ddcf]" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold text-white">{highlight.title}</p>
                          <p className="text-sm leading-relaxed text-white/78">{highlight.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <MobileCarouselControls targetRef={carouselRef} label="Navegar serviços" hideAboveClass="lg:hidden" className="relative z-10" />
          <div
            ref={carouselRef}
            className="relative flex snap-x snap-mandatory gap-3 overflow-x-hidden scroll-smooth pb-1 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:pb-0"
          >
            {secondaryServices.map(({ icon: Icon, title, desc, code }, index) => (
              <article
                key={title}
                className="card-base flex min-w-full snap-start flex-col p-4 sm:min-w-[84%] sm:p-5 lg:min-w-0"
                data-reveal={index % 2 === 0 ? "zoom" : "blur"}
                data-reveal-order={index + 2}
              >
                <div className="mb-4 flex items-start justify-between gap-2.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className="metric-pill">Serviço</span>
                </div>
                <h3 className="mb-2 text-base font-bold">{title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("servicos", `servico_${code}`, code)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                  aria-label={`Falar com especialista sobre ${title}`}
                >
                  Ver com especialista
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
