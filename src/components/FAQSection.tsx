import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

const faqs = [
  {
    q: "Quando minha empresa precisa de AVCB ou CLCB?",
    a: "Sempre que a atividade e o porte do imóvel exigirem regularização junto ao Corpo de Bombeiros. A regra muda por ocupação e risco, por isso a análise técnica inicial é essencial.",
  },
  {
    q: "Qual diferença entre AVCB e CLCB?",
    a: "O CLCB atende cenários de menor risco e menor complexidade. O AVCB é exigido em edificações com requisitos técnicos mais robustos.",
  },
  {
    q: "Quanto tempo leva para regularizar?",
    a: "Depende do estado atual do imóvel e do tipo de exigência. Em média, projetos simples podem levar algumas semanas, enquanto cenários mais complexos exigem mais etapas.",
  },
  {
    q: "A Star Fire atende apenas empresas grandes?",
    a: "Não. Atendemos desde pequenos comércios até operações maiores, incluindo condomínios e unidades com múltiplos pontos de risco.",
  },
  {
    q: "Vocês fazem apenas documentação?",
    a: "Não. Entregamos diagnóstico, adequação, treinamento e suporte documental, para você não depender de múltiplos fornecedores.",
  },
  {
    q: "Como recebo o orçamento?",
    a: "Você pode chamar no WhatsApp ou preencher o formulário. Nossa equipe retorna com direcionamento inicial e próximos passos.",
  },
];

const FAQSection = () => (
  <section
    id="faq"
    className="section-padding relative overflow-hidden bg-[linear-gradient(180deg,rgba(229,219,208,0.74)_0%,rgba(234,225,216,0.82)_100%)]"
    aria-label="Perguntas frequentes"
  >
    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" aria-hidden="true" />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/18 to-transparent" aria-hidden="true" />
    <div
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_6%_16%,rgba(133,35,24,0.1),transparent_34%),radial-gradient(circle_at_92%_88%,rgba(90,54,38,0.1),transparent_32%)]"
      aria-hidden="true"
    />
    <div className="container relative z-10">
      <div className="section-header">
        <span className="section-kicker">Decisão com clareza</span>
        <h2 className="section-title">Perguntas frequentes</h2>
        <p className="section-subtitle">Respostas diretas para acelerar sua tomada de decisão.</p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="premium-surface space-y-4 p-5 sm:p-6">
          <div className="rounded-xl border border-primary/18 bg-primary/8 p-4">
            <p className="text-sm font-bold text-primary">Suporte consultivo</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Se sua dúvida não estiver aqui, nossa equipe orienta o melhor caminho técnico para sua operação.
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl border border-border/70 bg-card/75 p-4">
              <div className="mb-1 inline-flex rounded-lg bg-primary/10 p-2">
                <ShieldCheck size={16} className="text-primary" aria-hidden="true" />
              </div>
              <p className="text-sm font-bold">Avaliação inicial sem ruído</p>
              <p className="mt-1 text-xs text-muted-foreground">Direcionamento prático com foco em risco, prazo e conformidade.</p>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("faq", "faq_whatsapp")}
              className="cta-whatsapp w-full"
              aria-label="Falar com especialista no WhatsApp"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Falar com especialista
            </a>
          </div>
        </aside>

        <Accordion type="single" collapsible className="premium-surface space-y-3 p-3 sm:p-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="card-base rounded-xl border bg-card px-4 sm:px-6">
              <AccordionTrigger className="py-4 text-left text-sm font-bold hover:no-underline md:text-base">{faq.q}</AccordionTrigger>
              <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground sm:pb-5">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQSection;
