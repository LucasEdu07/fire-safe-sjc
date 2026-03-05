import { ShieldCheck, MessageSquare, Package, FileText, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

const reasons = [
  { icon: ShieldCheck, title: "Foco em conformidade e segurança", desc: "Garantimos que sua empresa atenda todas as exigências legais de prevenção contra incêndio." },
  { icon: MessageSquare, title: "Atendimento ágil e comunicação clara", desc: "Respondemos rápido e você acompanha cada etapa do processo sem complicações." },
  { icon: Package, title: "Serviço completo, do diagnóstico à entrega", desc: "Cuidamos de tudo: análise, execução, documentação e orientação final." },
  { icon: FileText, title: "Documentação organizada e sem dor de cabeça", desc: "Toda a papelada em ordem para você não ter problemas com fiscalização." },
];

const WhyUsSection = () => (
  <section className="section-padding" aria-label="Diferenciais da Star Fire">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Por que escolher a Star Fire?</h2>
        <p className="section-subtitle">
          Nosso trabalho é deixar sua operação segura e regular — sem complicar sua rotina.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
        {reasons.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card-base p-6">
            <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Icon size={22} className="text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-bold text-base mb-1.5">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="cta-whatsapp" aria-label="Solicitar orçamento pelo WhatsApp">
          <MessageCircle size={18} aria-hidden="true" />
          Fale com a Star Fire
        </a>
      </div>
    </div>
  </section>
);

export default WhyUsSection;
