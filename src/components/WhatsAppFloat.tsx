import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5512999999999?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.";

const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chamar no WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-[3.5rem] h-[3.5rem] rounded-full bg-green-600 text-white flex items-center justify-center shadow-xl hover:bg-green-700 hover:scale-105 transition-all"
  >
    <MessageCircle size={28} aria-hidden="true" />
  </a>
);

export default WhatsAppFloat;
