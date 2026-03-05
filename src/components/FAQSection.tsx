import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "O que é AVCB e quando preciso dele?", a: "O AVCB (Auto de Vistoria do Corpo de Bombeiros) é o documento que comprova que sua edificação atende às normas de segurança contra incêndio. Ele é obrigatório para a maioria dos estabelecimentos comerciais, industriais e residenciais multifamiliares em São José dos Campos e região." },
  { q: "Qual a diferença entre AVCB e CLCB?", a: "O AVCB é exigido para edificações de maior porte e complexidade. O CLCB (Certificado de Licenciamento do Corpo de Bombeiros) é para estabelecimentos de menor risco e porte, com um processo mais simplificado." },
  { q: "Com que frequência preciso recarregar extintores?", a: "A recarga deve ser feita anualmente ou sempre que o extintor for utilizado, mesmo parcialmente. Além disso, a cada 5 anos é necessário realizar o teste hidrostático." },
  { q: "Vocês atendem empresas e condomínios?", a: "Sim! Atendemos empresas de todos os portes, comércios, restaurantes, condomínios residenciais e comerciais, além de eventos em São José dos Campos e Vale do Paraíba." },
  { q: "Quanto tempo leva para regularizar minha empresa?", a: "O prazo varia conforme a complexidade do imóvel e as exigências do Corpo de Bombeiros. Em média, o processo pode levar de 30 a 90 dias. Fazemos o acompanhamento completo para agilizar." },
  { q: "Como solicitar um orçamento?", a: "É simples! Basta clicar no botão de WhatsApp em qualquer lugar da página e nos enviar uma mensagem com o tipo de serviço que precisa. Respondemos rapidamente." },
];

const FAQSection = () => (
  <section id="faq" className="section-padding bg-secondary" aria-label="Perguntas frequentes">
    <div className="container max-w-3xl">
      <div className="section-header">
        <h2 className="section-title">Dúvidas Frequentes</h2>
        <p className="section-subtitle">Respondemos as perguntas mais comuns sobre segurança contra incêndio.</p>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="bg-card border rounded-xl px-6">
            <AccordionTrigger className="text-left font-bold text-sm md:text-base hover:no-underline py-5">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQSection;
