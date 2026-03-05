import { MapPin } from "lucide-react";

const cities = [
  "São José dos Campos", "Jacareí", "Caçapava", "Taubaté",
  "Tremembé", "Pindamonhangaba", "Guaratinguetá", "Campos do Jordão",
];

const CoverageSection = () => (
  <section id="area-atuacao" className="section-padding bg-secondary" aria-label="Área de atuação">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Atendimento em São José dos Campos e Vale do Paraíba</h2>
        <p className="section-subtitle">
          Estamos prontos para atender empresas, comércios e condomínios em toda a região do Vale do Paraíba.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="flex flex-wrap gap-3 mb-8" role="list" aria-label="Cidades atendidas">
            {cities.map((city) => (
              <span key={city} role="listitem" className="inline-flex items-center gap-1.5 bg-card border rounded-full px-4 py-2.5 text-sm font-medium shadow-sm">
                <MapPin size={14} className="text-primary shrink-0" aria-hidden="true" />
                {city}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Se sua cidade não estiver na lista, <a href="#contato" className="text-primary font-bold hover:underline">fale com a gente</a>. Atendemos diversas localidades do Vale do Paraíba.
          </p>
        </div>

        <div className="w-full aspect-video bg-muted rounded-xl border flex items-center justify-center" aria-label="Localização no mapa (placeholder)">
          <div className="text-center text-muted-foreground">
            <MapPin size={32} className="mx-auto mb-2 text-primary" aria-hidden="true" />
            <p className="text-sm font-medium">Google Maps</p>
            <p className="text-xs">Insira o embed do mapa aqui</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CoverageSection;
