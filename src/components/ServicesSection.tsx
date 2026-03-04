import { FileCheck, ShieldCheck, Users, PenTool, Lightbulb } from "lucide-react";

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
    desc: "Venda, recarga e manutenção de extintores com laudo e certificado.",
  },
  {
    icon: Users,
    title: "Treinamento de Brigada de Incêndio",
    desc: "Formação e reciclagem de brigadistas conforme normas técnicas vigentes.",
  },
  {
    icon: PenTool,
    title: "Projetos e Laudos Técnicos",
    desc: "Elaboração de projetos técnicos e laudos de segurança contra incêndio.",
  },
  {
    icon: Lightbulb,
    title: "Sinalização e Itens de Segurança",
    desc: "Placas de sinalização, iluminação de emergência, detectores e mais.",
  },
];

const ServicesSection = () => (
  <section id="servicos" className="py-20 md:py-28 bg-secondary">
    <div className="container">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-4">Nossos Serviços</h2>
      <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
        Tudo o que sua empresa precisa para ficar em conformidade com as normas de segurança contra incêndio.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow flex flex-col"
          >
            <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
              <Icon size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{desc}</p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
            >
              Quero orçamento →
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
