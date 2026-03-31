import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/constants";
import { trackWhatsAppClick } from "@/lib/analytics";

const navItems = [
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Depoimentos", href: "#depoimentos-clientes" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 18);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4" role="banner">
      <div className="container">
        <div
          className={`premium-panel overflow-hidden transition-all duration-300 ${
            scrolled
              ? "bg-white/88 shadow-[0_24px_52px_rgba(20,16,14,0.18)] backdrop-blur-2xl"
              : "bg-white/80 shadow-[0_18px_38px_rgba(20,16,14,0.12)] backdrop-blur-xl"
          }`}
        >
          <div className={`flex items-center justify-between px-4 transition-all duration-500 sm:px-5 ${scrolled ? "py-3" : "py-3.5 sm:py-4"}`}>
            <a href="#hero" className="flex items-center gap-3 font-display text-lg font-bold text-foreground sm:text-xl" aria-label="Star Fire - Página inicial">
              <div className="rounded-2xl border border-white/55 bg-white/70 p-1.5 shadow-[0_10px_20px_rgba(20,16,14,0.08)]">
                <img src="/starfire-logo-transparent.png" alt="Logo Star Fire" className="brand-logo h-8 w-8 sm:h-9 sm:w-9" />
              </div>
              <span className="block leading-none">Star Fire</span>
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
                className="cta-whatsapp inline-flex px-5 py-2.5 text-sm"
                aria-label="Chamar no WhatsApp para solicitar orçamento"
              >
                <MessageCircle size={16} aria-hidden="true" />
                Falar no WhatsApp
              </a>
            </nav>

            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/55 bg-white/72 text-foreground shadow-[0_10px_20px_rgba(20,16,14,0.08)] transition-colors hover:bg-white md:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {open ? (
            <nav className="border-t border-[var(--line-soft)] bg-white/84 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-xl md:hidden" aria-label="Menu principal mobile">
              <div className="space-y-2">
                {navItems.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-[1.1rem] border border-white/55 bg-white/70 px-4 py-3 text-base font-semibold text-foreground/88 shadow-[0_10px_20px_rgba(20,16,14,0.06)] transition-colors hover:bg-white"
                  >
                    <span>{label}</span>
                  </a>
                ))}
              </div>

              <div className="mt-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick("header_mobile", "menu_whatsapp")}
                  className="cta-whatsapp flex w-full justify-center"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Falar no WhatsApp
                </a>
              </div>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
