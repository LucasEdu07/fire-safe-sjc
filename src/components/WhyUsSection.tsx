import { ShieldCheck, MessageSquare, Package, FileText } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Foco em conformidade e segurança" },
  { icon: MessageSquare, title: "Atendimento ágil e comunicação clara" },
  { icon: Package, title: "Serviço completo (do diagnóstico à entrega)" },
  { icon: FileText, title: "Documentação organizada para evitar dores de cabeça" },
];

const WhyUsSection = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-4">Por que a Star Fire?</h2>
      <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
        Nosso trabalho é deixar sua operação segura e regular — sem complicar sua rotina.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map(({ icon: Icon, title }) => (
          <div key={title} className="bg-card border rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon size={24} className="text-primary" />
            </div>
            <p className="font-semibold text-sm">{title}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
