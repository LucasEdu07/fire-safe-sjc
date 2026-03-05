import { useEffect, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { PHONE_DISPLAY, WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

const navItems = [
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#como-funciona" },
  { label: "Cobertura", href: "#area-atuacao" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/80 bg-background shadow-[0_12px_26px_rgba(15,23,42,0.16)]" role="banner">
      <div className="border-b border-white/10 bg-gradient-to-r from-[#201712] via-[#3b2419] to-[#201712] py-1">
        <div className="container flex items-center justify-between gap-2 text-[0.68rem] font-semibold tracking-[0.05em] text-background/95 sm:text-[0.72rem] sm:tracking-[0.06em]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/24 bg-white/10 px-2.5 py-0.5 text-background/98 sm:gap-2 sm:px-3.5 sm:py-1">
            <span className="h-2 w-2 rounded-full bg-[#ffd5bf]" aria-hidden="true" />
            Operação segura e regularizada
          </span>
          <span className="hidden text-background/92 sm:inline-flex">
            <strong className="font-bold">{PHONE_DISPLAY}</strong>
          </span>
        </div>
      </div>

      <div className="container flex h-14 items-center justify-between sm:h-16 md:h-[4.6rem]">
        <a href="#" className="flex items-center gap-2.5 font-display text-lg font-bold text-foreground sm:text-xl" aria-label="Star Fire - Página inicial">
          <img src="/starfire-logo-transparent.png" alt="Logo Star Fire" className="brand-logo h-9 w-9 sm:h-10 sm:w-10" />
          Star Fire
        </a>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Menu principal">
          {navItems.map(({ label, href }) => (
            <a key={href} href={href} className="nav-link-premium">
              {label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick("header", "header_whatsapp")}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[0_12px_20px_rgba(133,35,24,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_26px_rgba(133,35,24,0.32)]"
            aria-label="Chamar no WhatsApp para solicitar orçamento"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Falar no WhatsApp
          </a>
        </nav>

        <button
          className="rounded-lg border border-border bg-card/80 p-2 text-foreground shadow-sm transition-colors hover:bg-secondary/70 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border/80 bg-background/98 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_16px_28px_rgba(15,23,42,0.12)] backdrop-blur md:hidden"
          aria-label="Menu principal mobile"
        >
          {navItems.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="mx-4 mt-2 block rounded-xl px-4 py-3 text-base font-semibold text-foreground/88 transition-colors hover:bg-secondary/65 hover:text-primary"
            >
              {label}
            </a>
          ))}
          <div className="px-4 pt-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("header_mobile", "menu_whatsapp")}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 text-base font-bold text-primary-foreground shadow-[0_12px_20px_rgba(133,35,24,0.25)]"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Falar no WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
