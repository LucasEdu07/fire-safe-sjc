import { MessageCircle } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";

const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chamar no WhatsApp"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-xl hover:bg-whatsapp/90 hover:scale-105 transition-all"
  >
    <MessageCircle size={28} aria-hidden="true" />
  </a>
);

export default WhatsAppFloat;
