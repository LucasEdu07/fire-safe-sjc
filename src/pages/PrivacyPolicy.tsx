import { Link } from "react-router-dom";
import { SITE_NAME, EMAIL } from "@/lib/constants";

const PrivacyPolicy = () => (
  <main className="min-h-screen bg-background pt-20 pb-16">
    <div className="container max-w-3xl">
      <h1 className="mb-6 text-3xl font-display font-bold">Política de Privacidade</h1>
      <p className="mb-8 text-sm text-muted-foreground">Última atualização: 05 de março de 2026.</p>

      <div className="space-y-6 text-sm leading-relaxed text-foreground">
        <section>
          <h2 className="mb-2 text-lg font-bold">1. Quem somos</h2>
          <p>A {SITE_NAME} atua com serviços de segurança e regularização contra incêndio em São José dos Campos e região.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">2. Quais dados coletamos</h2>
          <p>Coletamos nome, empresa, cidade, telefone, e-mail, tipo de serviço e mensagem para responder solicitações comerciais.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">3. Finalidade do uso</h2>
          <p>Utilizamos os dados para contato comercial, envio de proposta, agendamento técnico e melhoria do atendimento.</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">4. Compartilhamento</h2>
          <p>
            Não vendemos dados pessoais. O compartilhamento pode ocorrer apenas com fornecedores essenciais ao atendimento,
            respeitando a LGPD.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">5. Retenção e segurança</h2>
          <p>
            Mantemos dados pelo período necessário para atendimento comercial e obrigações legais, com controles de acesso e
            proteção adequada.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-bold">6. Seus direitos</h2>
          <p>Você pode solicitar acesso, correção ou exclusão de dados, além de revogar consentimento, pelo e-mail {EMAIL}.</p>
        </section>
      </div>

      <Link to="/" className="mt-10 inline-flex font-semibold text-primary hover:underline">
        Voltar para a página inicial
      </Link>
    </div>
  </main>
);

export default PrivacyPolicy;
