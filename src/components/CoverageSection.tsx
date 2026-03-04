import { MapPin } from "lucide-react";

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

const CoverageSection = () => (
  <section id="area-atuacao" className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-4">
        Atendimento em SJC e Vale do Paraíba
      </h2>
      <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
        Estamos prontos para atender sua empresa em toda a região.
      </p>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div>
          <div className="flex flex-wrap gap-3 mb-6">
            {cities.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 bg-card border rounded-full px-4 py-2 text-sm font-medium"
              >
                <MapPin size={14} className="text-primary" />
                {city}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Se sua cidade não estiver na lista, <a href="#contato" className="text-primary font-semibold hover:underline">fale com a gente</a>.
          </p>
        </div>

        {/* Google Maps placeholder */}
        <div className="w-full aspect-video bg-muted rounded-lg border flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin size={32} className="mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">Google Maps</p>
            <p className="text-xs">Insira o embed do mapa aqui</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CoverageSection;
