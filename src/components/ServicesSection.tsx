import { FileCheck, ShieldCheck, Users, PenTool, Lightbulb, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5512999999999?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.";

const services = [
  {
    icon: FileCheck,
    title: "AVCB / CLCB",
    desc: "Regularização e renovação do Auto de Vistoria e Certificado de Licenciamento junto ao Corpo de Bombeiros.",
  },
  {
    icon: ShieldCheck,
    title: "Extintores",
    desc: "Venda, recarga e manutenção de extintores com laudo e certificado de conformidade.",
  },
  {
    icon: Users,
    title: "Treinamento de Brigada de Incêndio",
    desc: "Formação e reciclagem de brigadistas conforme normas técnicas vigentes.",
  },
  {
    icon: PenTool,
    title: "Projetos e Laudos Técnicos",
    desc: "Elaboração de projetos técnicos e laudos de segurança contra incêndio para sua edificação.",
  },
  {
    icon: Lightbulb,
    title: "Sinalização e Itens de Segurança",
    desc: "Placas de sinalização, iluminação de emergência, detectores de fumaça e mais.",
  },
];

const ServicesSection = () => (
  <section id="servicos" className="py-20 md:py-28 bg-secondary" aria-label="Serviços oferecidos">
    <div className="container">
      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-[2rem] font-display font-bold mb-3">
          Serviços de Segurança contra Incêndio em SJC
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
          Tudo o que sua empresa, comércio ou condomínio precisa para ficar em conformidade com as normas de prevenção e combate a incêndio.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ icon: Icon, title, desc }) => (
          <article
            key={title}
            className="bg-card rounded-xl p-7 border hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
              <Icon size={24} className="text-primary" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">{desc}</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
              aria-label={`Solicitar orçamento para ${title}`}
            >
              <MessageCircle size={14} aria-hidden="true" />
              Quero orçamento →
            </a>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
