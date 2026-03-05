import { useState } from "react";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { WHATSAPP_LINK, PHONE, PHONE_DISPLAY, EMAIL } from "@/lib/constants";

const ContactSection = () => {
  const [form, setForm] = useState({ nome: "", empresa: "", cidade: "", servico: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Meu nome é ${form.nome}, da empresa ${form.empresa} em ${form.cidade}. Preciso de: ${form.servico}. ${form.mensagem}`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const updateField = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section id="contato" className="section-padding" aria-label="Entre em contato">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Fale com a Star Fire agora</h2>
          <p className="section-subtitle max-w-xl">
            Solicite um orçamento ou tire suas dúvidas. Respondemos rapidamente pelo WhatsApp!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-5">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="card-base flex items-center gap-4 p-5 border-2 border-whatsapp/20" aria-label="Contato pelo WhatsApp">
              <div className="contact-icon bg-whatsapp text-white">
                <MessageCircle size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-base">WhatsApp</p>
                <p className="text-sm text-muted-foreground">{PHONE_DISPLAY}</p>
              </div>
            </a>

            <a href={`tel:+${PHONE}`} className="card-base flex items-center gap-4 p-5" aria-label="Ligar para Star Fire">
              <div className="contact-icon bg-primary text-primary-foreground">
                <Phone size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-base">Ligar</p>
                <p className="text-sm text-muted-foreground">{PHONE_DISPLAY}</p>
              </div>
            </a>

            <a href={`mailto:${EMAIL}`} className="card-base flex items-center gap-4 p-5" aria-label="Enviar e-mail para Star Fire">
              <div className="contact-icon bg-foreground text-background">
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

          <form onSubmit={handleSubmit} className="space-y-4" aria-label="Formulário de contato">
            <div>
              <label htmlFor="contact-nome" className="sr-only">Seu nome</label>
              <input id="contact-nome" type="text" placeholder="Seu nome" required value={form.nome} onChange={updateField("nome")} className="input-field" />
            </div>
            <div>
              <label htmlFor="contact-empresa" className="sr-only">Empresa</label>
              <input id="contact-empresa" type="text" placeholder="Empresa" value={form.empresa} onChange={updateField("empresa")} className="input-field" />
            </div>
            <div>
              <label htmlFor="contact-cidade" className="sr-only">Cidade</label>
              <input id="contact-cidade" type="text" placeholder="Cidade" value={form.cidade} onChange={updateField("cidade")} className="input-field" />
            </div>
            <div>
              <label htmlFor="contact-servico" className="sr-only">Serviço desejado</label>
              <select id="contact-servico" value={form.servico} onChange={updateField("servico")} className="input-field">
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
              <textarea id="contact-mensagem" placeholder="Mensagem (opcional)" rows={3} value={form.mensagem} onChange={updateField("mensagem")} className="input-field resize-none" />
            </div>
            <button type="submit" className="cta-whatsapp-lg w-full">
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
