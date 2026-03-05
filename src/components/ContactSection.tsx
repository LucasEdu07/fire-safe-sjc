import { useState } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5512999999999?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.";
const PHONE = "5512999999999";
const EMAIL = "contato@starfire.com.br";

const ContactSection = () => {
  const [form, setForm] = useState({ nome: "", empresa: "", cidade: "", servico: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Meu nome é ${form.nome}, da empresa ${form.empresa} em ${form.cidade}. Preciso de: ${form.servico}. ${form.mensagem}`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const inputClass = "w-full rounded-lg border bg-card px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-colors";

  return (
    <section id="contato" className="py-20 md:py-28 section-divider" aria-label="Entre em contato">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-[2rem] font-display font-bold mb-3">
            Fale com a Star Fire agora
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            Solicite um orçamento ou tire suas dúvidas. Respondemos rapidamente pelo WhatsApp!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact buttons */}
          <div className="space-y-5">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-xl border-2 border-green-600/20 p-5 hover:shadow-md transition-shadow bg-card"
              aria-label="Contato pelo WhatsApp"
            >
              <div className="w-13 h-13 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0 w-[3.25rem] h-[3.25rem]">
                <MessageCircle size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-base">WhatsApp</p>
                <p className="text-sm text-muted-foreground">(12) 99999-9999</p>
              </div>
            </a>

            <a
              href={`tel:+${PHONE}`}
              className="flex items-center gap-4 rounded-xl border p-5 hover:shadow-md transition-shadow bg-card"
              aria-label="Ligar para Star Fire"
            >
              <div className="w-[3.25rem] h-[3.25rem] rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Phone size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-base">Ligar</p>
                <p className="text-sm text-muted-foreground">(12) 99999-9999</p>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 rounded-xl border p-5 hover:shadow-md transition-shadow bg-card"
              aria-label="Enviar e-mail para Star Fire"
            >
              <div className="w-[3.25rem] h-[3.25rem] rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                <Mail size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-base">E-mail</p>
                <p className="text-sm text-muted-foreground">{EMAIL}</p>
              </div>
            </a>

            <p className="text-sm text-muted-foreground pt-2">
              <strong>Horário de atendimento:</strong> Seg. a Sex., 8h às 18h · Sáb., 8h às 12h.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulário de contato">
            <div>
              <label htmlFor="contact-nome" className="sr-only">Seu nome</label>
              <input
                id="contact-nome"
                type="text"
                placeholder="Seu nome"
                required
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-empresa" className="sr-only">Empresa</label>
              <input
                id="contact-empresa"
                type="text"
                placeholder="Empresa"
                value={form.empresa}
                onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-cidade" className="sr-only">Cidade</label>
              <input
                id="contact-cidade"
                type="text"
                placeholder="Cidade"
                value={form.cidade}
                onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-servico" className="sr-only">Serviço desejado</label>
              <select
                id="contact-servico"
                value={form.servico}
                onChange={(e) => setForm({ ...form, servico: e.target.value })}
                className={inputClass}
              >
                <option value="">Selecione o serviço</option>
                <option>AVCB / CLCB</option>
                <option>Extintores</option>
                <option>Brigada de Incêndio</option>
                <option>Projetos e Laudos</option>
                <option>Sinalização e Segurança</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-mensagem" className="sr-only">Mensagem</label>
              <textarea
                id="contact-mensagem"
                placeholder="Mensagem (opcional)"
                rows={3}
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                className={`${inputClass} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="cta-whatsapp-lg w-full"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Enviar pelo WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
