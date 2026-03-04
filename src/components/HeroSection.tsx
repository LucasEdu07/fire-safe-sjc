import { Shield, Users, CheckCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const WHATSAPP_LINK = "https://wa.me/5512999999999?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.";

const trust = [
  { icon: Shield, text: "Atendimento rápido" },
  { icon: Users, text: "Equipe especializada" },
  { icon: CheckCircle, text: "Soluções completas" },
];

const HeroSection = () => (
  <section className="relative min-h-[90vh] flex items-center pt-16" id="hero">
    {/* Background */}
    <div className="absolute inset-0 -z-10">
      <img src={heroBg} alt="Segurança contra incêndio" className="w-full h-full object-cover" loading="eager" />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
    </div>

    <div className="container py-20 md:py-32">
      <div className="max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold leading-tight text-white mb-5">
          Prevenção e Combate a Incêndio em São José dos Campos e Região
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
          AVCB/CLCB, extintores, brigada de incêndio e documentação técnica para sua empresa ficar regular e segura.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-12">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Solicitar orçamento no WhatsApp
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Ver serviços
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {trust.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/90">
              <Icon size={20} className="text-primary-foreground" />
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
