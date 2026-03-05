import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const WhatsAppFloat = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chamar no WhatsApp"
    onClick={() => trackWhatsAppClick("float", "float_whatsapp")}
    className="whatsapp-float-motion fixed bottom-[max(0.9rem,env(safe-area-inset-bottom))] right-3 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl ring-1 ring-white/40 transition-all hover:scale-105 hover:bg-whatsapp/90 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
  >
    <WhatsAppIcon size={24} />
  </a>
);

export default WhatsAppFloat;
