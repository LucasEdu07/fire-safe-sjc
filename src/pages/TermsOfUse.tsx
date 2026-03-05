import { Link } from "react-router-dom";
import { SITE_NAME, EMAIL } from "@/lib/constants";

const TermsOfUse = () => (
  <main className="min-h-screen bg-background pt-20 pb-16">
    <div className="container max-w-3xl">
      <h1 className="mb-6 text-3xl font-display font-bold">Termos de Uso</h1>
      <p className="mb-8 text-sm text-muted-foreground">Última atualização: 05 de março de 2026.</p>

      <div className="space-y-6 text-sm leading-relaxed text-foreground">
        <section>
          <h2 className="mb-2 text-lg font-bold">1. Aceitação</h2>
          <p>Ao utilizar este site, você concorda com estes termos e com a Política de Privacidade da {SITE_NAME}.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">2. Uso permitido</h2>
          <p>O site deve ser usado para consulta de informações e solicitação de atendimento comercial legítimo.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">3. Propriedade intelectual</h2>
          <p>Conteúdos, textos, marcas e materiais do site são protegidos e não podem ser reproduzidos sem autorização.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">4. Limites de responsabilidade</h2>
          <p>As informações do site são institucionais e podem ser atualizadas. Prazo e escopo de serviços dependem de análise técnica.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">5. Contato</h2>
          <p>Para dúvidas jurídicas ou comerciais, entre em contato pelo e-mail {EMAIL}.</p>
        </section>
      </div>

      <Link to="/" className="mt-10 inline-flex font-semibold text-primary hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  </main>
);

export default TermsOfUse;
