import { MessageCircle, Search, Wrench, PackageCheck } from "lucide-react";

const steps = [
  { icon: MessageCircle, num: "1", title: "Fale conosco", desc: "Você chama no WhatsApp e explica sua necessidade." },
  { icon: Search, num: "2", title: "Análise técnica", desc: "Fazemos a análise/vistoria técnica no local." },
  { icon: Wrench, num: "3", title: "Execução", desc: "Executamos as adequações e organizamos a documentação." },
  { icon: PackageCheck, num: "4", title: "Entrega", desc: "Entrega do serviço e orientação para manter tudo em dia." },
];

const HowItWorksSection = () => (
  <section id="como-funciona" className="py-20 md:py-28">
    <div className="container">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-4">Como Funciona</h2>
      <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
        Um processo simples, direto e sem burocracia desnecessária.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map(({ icon: Icon, num, title, desc }) => (
          <div key={num} className="text-center">
            <div className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-lg font-bold">
              {num}
            </div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-muted-foreground mt-12 italic">
        "Você acompanha tudo com clareza — sem burocracia desnecessária."
      </p>
    </div>
  </section>
);

export default HowItWorksSection;
