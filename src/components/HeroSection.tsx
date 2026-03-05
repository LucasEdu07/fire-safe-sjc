import { Shield, Users, CheckCircle, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import heroBg from "@/assets/hero-bg.jpg";

const trust = [
  { icon: Shield, text: "Atendimento rápido" },
  { icon: Users, text: "Equipe especializada" },
  { icon: CheckCircle, text: "Soluções completas" },
];

const HeroSection = () => (
  <section className="relative min-h-[92vh] flex items-center pt-16" id="hero" aria-label="Apresentação Star Fire">
    <div className="absolute inset-0 -z-10">
      <img src={heroBg} alt="Profissional realizando inspeção de segurança contra incêndio em edifício comercial" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
      <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
    </div>

    <div className="container py-24 md:py-36">
      <div className="max-w-2xl">
        <p className="text-primary-foreground/70 text-sm font-semibold uppercase tracking-widest mb-4">
          Segurança contra incêndio em São José dos Campos
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-[3.25rem] font-display font-extrabold leading-[1.15] text-white mb-6">
          Sua empresa regularizada e protegida contra incêndio
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl">
          AVCB/CLCB, extintores, brigada de incêndio e documentação técnica — tudo para manter sua operação segura e dentro das normas.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-14">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="cta-whatsapp-lg" aria-label="Solicitar orçamento pelo WhatsApp">
            <MessageCircle size={20} aria-hidden="true" />
            Solicitar orçamento no WhatsApp
          </a>
          <a href="#servicos" className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors">
            Ver serviços
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
          {trust.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-white/90">
              <Icon size={20} className="text-primary-foreground shrink-0" aria-hidden="true" />
              <span className="text-sm font-semibold">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
