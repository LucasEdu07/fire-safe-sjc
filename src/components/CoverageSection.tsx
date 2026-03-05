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
          <h2 className="section-title">Atuação estratégica em São José dos Campos e Vale do Paraíba</h2>
          <p className="section-subtitle">
            Logística ágil para visitas técnicas, implantação e suporte contínuo com consistência operacional.
          </p>
        </div>

        <div className="premium-surface grid items-start gap-6 p-4 sm:gap-8 sm:p-7 md:gap-10 md:p-9 lg:grid-cols-[1fr_1.04fr]">
          <div>
            <div className="mb-6 rounded-2xl border border-border/70 bg-card/82 p-4 backdrop-blur-[1.5px] sm:p-5">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">Cobertura regional sob agendamento</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Atendemos com equipe técnica itinerante. As cidades abaixo representam área de cobertura e não pontos de loja física.
              </p>
              <ul className="mt-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2" role="list" aria-label="Cidades atendidas">
                {cities.map((city) => (
                  <li key={city} role="listitem" className="inline-flex items-center gap-2 text-foreground/88">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/80" aria-hidden="true" />
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="mb-3 text-base font-bold">Segmentos atendidos</h3>
            <div className="mb-6 flex flex-wrap gap-2">
              {segments.map((segment) => (
                <span key={segment} className="rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                  {segment}
                </span>
              ))}
            </div>

            <div className="mb-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border/70 bg-card/82 p-3 backdrop-blur-[1.5px]">
                <Clock3 size={16} className="mb-1.5 text-primary" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground/85">Resposta</p>
                <p className="text-xs text-muted-foreground">Retorno comercial no mesmo dia.</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card/82 p-3 backdrop-blur-[1.5px]">
                <Route size={16} className="mb-1.5 text-primary" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground/85">Cobertura</p>
                <p className="text-xs text-muted-foreground">Atendimento técnico em toda a região.</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card/82 p-3 backdrop-blur-[1.5px]">
                <Navigation size={16} className="mb-1.5 text-primary" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-foreground/85">Suporte</p>
                <p className="text-xs text-muted-foreground">Acompanhamento com rota clara.</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("click_cta_secondary", { section: "cobertura", cta_label: "cobertura_maps" })}
                className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/8 px-4 py-2 text-xs font-bold text-primary transition-colors hover:bg-primary/14"
              >
                Abrir no Google Maps
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              <a
                href="#contato"
                onClick={() => trackEvent("click_cta_secondary", { section: "cobertura", cta_label: "cobertura_agendar" })}
                className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
              >
                Solicitar avaliação técnica da minha unidade
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-border/70 bg-card/82 px-4 py-3 backdrop-blur-[1.5px]">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Base operacional Star Fire</p>
              <p className="mt-1 text-sm text-muted-foreground">Atendimento em São José dos Campos com cobertura técnica em todo o Vale do Paraíba.</p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[0_14px_30px_rgba(15,23,42,0.12)]">
              <iframe
                title="Mapa de atendimento Star Fire"
                src={`https://www.google.com/maps?q=${GOOGLE_MAPS_ADDRESS_QUERY}&z=17&output=embed`}
                className="h-[290px] w-full sm:h-[340px] lg:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
