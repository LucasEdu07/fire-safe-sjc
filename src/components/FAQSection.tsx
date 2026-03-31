import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

const faqs = [
  {
    q: "Quando minha empresa precisa de AVCB ou CLCB?",
    a: "Quando a atividade, o porte e o risco do imóvel exigem regularização junto ao Corpo de Bombeiros.",
  },
  {
    q: "Qual diferença entre AVCB e CLCB?",
    a: "O CLCB atende operações mais simples. O AVCB é exigido quando a edificação tem requisitos mais robustos.",
  },
  {
    q: "Quanto tempo leva para regularizar?",
    a: "Depende do estado do imóvel e das exigências aplicáveis. O diagnóstico inicial define o prazo mais realista.",
  },
  {
    q: "Vocês fazem só a documentação?",
    a: "Não. A atuação pode incluir diagnóstico, adequações, treinamento e documentação.",
  },
  {
    q: "Como recebo uma orientação inicial?",
    a: "Pelo WhatsApp ou formulário. A equipe retorna com leitura inicial e próximos passos.",
  },
] as const;

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

      <div className="grid items-start gap-6 lg:grid-cols-[0.86fr_1.14fr]">
        <aside className="premium-panel space-y-4 p-5 sm:p-6" data-reveal="slide-left" data-reveal-order="0">
          <div className="relative">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-primary">Suporte direto</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Se o seu cenário tiver particularidades, a orientação segue no WhatsApp.
            </p>

            <div className="mt-5 rounded-[1.2rem] border border-[var(--line-soft)] bg-white/54 p-4">
              <div className="mb-2 inline-flex rounded-xl bg-primary/10 p-2.5">
                <ShieldCheck size={16} className="text-primary" aria-hidden="true" />
              </div>
              <p className="text-sm font-bold">Leitura inicial objetiva</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Risco, escopo e próximos passos em uma conversa.</p>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("faq", "faq_whatsapp")}
              className="cta-whatsapp mt-5 w-full justify-center"
              aria-label="Falar com especialista no WhatsApp"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Falar com especialista
            </a>
          </div>
        </aside>

        <Accordion type="single" collapsible className="section-shell space-y-3 p-3 sm:p-4" data-reveal="slide-right" data-reveal-order="1">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="card-base rounded-[1.1rem] border bg-card/88 px-4 sm:px-6">
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
