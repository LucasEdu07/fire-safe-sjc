import { MessageCircle, Search, Wrench, PackageCheck } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5512999999999?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.";

const steps = [
  { icon: MessageCircle, num: "1", title: "Fale conosco", desc: "Chame no WhatsApp e explique sua necessidade. Respondemos rápido." },
  { icon: Search, num: "2", title: "Análise técnica", desc: "Fazemos a análise e vistoria técnica no local da sua edificação." },
  { icon: Wrench, num: "3", title: "Execução", desc: "Executamos as adequações necessárias e organizamos toda a documentação." },
  { icon: PackageCheck, num: "4", title: "Entrega", desc: "Entregamos o serviço completo e orientamos você para manter tudo em dia." },
];

const HowItWorksSection = () => (
  <section id="como-funciona" className="py-20 md:py-28 section-divider" aria-label="Como funciona o processo">
    <div className="container">
      <div className="text-center mb-14">
        <h2 className="text-2xl md:text-[2rem] font-display font-bold mb-3">
          Como Funciona
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
          Um processo simples, transparente e sem burocracia desnecessária.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-14">
        {steps.map(({ icon: Icon, num, title, desc }) => (
          <div key={num} className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-5 text-xl font-bold shadow-md" aria-hidden="true">
              {num}
            </div>
            <h3 className="font-bold text-base mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-muted-foreground italic mb-6">
          "Você acompanha tudo com clareza — sem burocracia desnecessária."
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-whatsapp"
          aria-label="Iniciar processo pelo WhatsApp"
        >
          <MessageCircle size={18} aria-hidden="true" />
          Iniciar pelo WhatsApp
        </a>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
