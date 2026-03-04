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

  return (
    <section id="contato" className="py-20 md:py-28">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-4">
          Fale com a Star Fire agora
        </h2>
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          Solicite um orçamento ou tire suas dúvidas. Respondemos rapidamente!
        </p>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact buttons */}
          <div className="space-y-6">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg border p-4 hover:shadow-md transition-shadow bg-card"
            >
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle size={22} />
              </div>
              <div>
                <p className="font-semibold text-sm">WhatsApp</p>
                <p className="text-xs text-muted-foreground">(12) 99999-9999</p>
              </div>
            </a>

            <a
              href={`tel:+${PHONE}`}
              className="flex items-center gap-4 rounded-lg border p-4 hover:shadow-md transition-shadow bg-card"
            >
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <p className="font-semibold text-sm">Ligar</p>
                <p className="text-xs text-muted-foreground">(12) 99999-9999</p>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-4 rounded-lg border p-4 hover:shadow-md transition-shadow bg-card"
            >
              <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <p className="font-semibold text-sm">E-mail</p>
                <p className="text-xs text-muted-foreground">{EMAIL}</p>
              </div>
            </a>

            <p className="text-xs text-muted-foreground">
              <strong>Horário de atendimento:</strong> Seg. a Sex., 8h às 18h. Sáb., 8h às 12h.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Seu nome"
              required
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="w-full rounded-md border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="text"
              placeholder="Empresa"
              value={form.empresa}
              onChange={(e) => setForm({ ...form, empresa: e.target.value })}
              className="w-full rounded-md border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
            <input
              type="text"
              placeholder="Cidade"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
              className="w-full rounded-md border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
            <select
              value={form.servico}
              onChange={(e) => setForm({ ...form, servico: e.target.value })}
              className="w-full rounded-md border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            >
              <option value="">Selecione o serviço</option>
              <option>AVCB / CLCB</option>
              <option>Extintores</option>
              <option>Brigada de Incêndio</option>
              <option>Projetos e Laudos</option>
              <option>Sinalização e Segurança</option>
              <option>Outro</option>
            </select>
            <textarea
              placeholder="Mensagem (opcional)"
              rows={3}
              value={form.mensagem}
              onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
              className="w-full rounded-md border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Enviar pelo WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
