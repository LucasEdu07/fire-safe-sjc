import { ArrowUpRight, Clock3, Navigation, Route } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { GOOGLE_MAPS_ADDRESS_QUERY } from "@/lib/constants";

const cities = [
  "São José dos Campos",
  "Jacareí",
  "Caçapava",
  "Taubaté",
  "Tremembé",
  "Pindamonhangaba",
  "Guaratinguetá",
  "Campos do Jordão",
];

const segments = ["Condomínios", "Escolas", "Clínicas", "Restaurantes", "Galpões", "Escritórios"];

const coverageStats = [
  {
    icon: Clock3,
    title: "Resposta",
    desc: "Retorno comercial no mesmo dia.",
  },
  {
    icon: Route,
    title: "Cobertura",
    desc: "Atendimento técnico em toda a região.",
  },
  {
    icon: Navigation,
    title: "Suporte",
    desc: "Rota clara para cada unidade.",
  },
] as const;

const CoverageSection = () => {
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${GOOGLE_MAPS_ADDRESS_QUERY}`;

  return (
    <section
      id="area-atuacao"
      className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,rgba(233,224,214,0.94)_0%,rgba(225,214,202,0.82)_100%)]"
      aria-label="Área de atuação"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(133,35,24,0.11),transparent_35%),radial-gradient(circle_at_86%_82%,rgba(90,54,38,0.1),transparent_34%)]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/22 to-transparent" aria-hidden="true" />
      <div className="container relative z-10">
        <div className="section-header">
          <span className="section-kicker">Operação regional</span>
          <h2 className="section-title">Cobertura em São José dos Campos e Vale do Paraíba</h2>
          <p className="section-subtitle">Atendimento regional para vistoria, implantação e suporte técnico.</p>
        </div>

        <div className="section-shell grid items-start gap-6 p-4 sm:p-6 md:gap-8 md:p-8 lg:grid-cols-[1fr_1.02fr] lg:p-10">
          <div className="space-y-4">
            <div className="premium-panel p-5 sm:p-6" data-reveal="slide-left" data-reveal-order="0">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-primary">Cobertura regional sob agendamento</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                As cidades abaixo representam a área de atendimento, não pontos de loja física.
              </p>

              <ul className="mt-4 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2" role="list" aria-label="Cidades atendidas">
                {cities.map((city) => (
                  <li key={city} role="listitem" className="inline-flex items-center gap-2 text-foreground/88">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/80" aria-hidden="true" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            <div className="premium-panel p-5 sm:p-6" data-reveal="zoom" data-reveal-order="1">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-primary">Segmentos atendidos</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {segments.map((segment) => (
                  <span key={segment} className="stat-chip">
                    {segment}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3" data-reveal="blur" data-reveal-order="2">
              {coverageStats.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="premium-panel p-4">
                  <Icon size={16} className="text-primary" aria-hidden="true" />
                  <p className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-foreground/76">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3" data-reveal="blur" data-reveal-order="3">
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_cta_secondary", { section: "cobertura", cta_label: "cobertura_maps" })}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/14"
              >
                Abrir no Google Maps
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a
                href="#contato"
                onClick={() => trackEvent("click_cta_secondary", { section: "cobertura", cta_label: "cobertura_agendar" })}
                className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
              >
                Solicitar avaliação técnica
              </a>
            </div>
          </div>

          <div className="space-y-4" data-reveal="slide-right" data-reveal-order="1">
            <div className="premium-panel p-5 sm:p-6">
              <div className="relative">
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-primary">Base operacional Star Fire</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Base em São José dos Campos com atuação regional contínua.</p>
              </div>
            </div>

            <div className="premium-panel overflow-hidden p-2 sm:p-3">
              <div className="overflow-hidden rounded-[1.2rem] border border-white/55 bg-card shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
                <iframe
                  title="Mapa de atendimento Star Fire"
                  src={`https://www.google.com/maps?q=${GOOGLE_MAPS_ADDRESS_QUERY}&z=17&output=embed`}
                  className="h-[300px] w-full sm:h-[360px] lg:h-[450px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
