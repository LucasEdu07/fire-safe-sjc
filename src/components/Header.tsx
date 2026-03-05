import { useState } from "react";
import { Menu, X, Flame, MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5512999999999?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.";

const navItems = [
  { label: "Serviços", href: "#servicos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Área de atuação", href: "#area-atuacao" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b" role="banner">
      <div className="container flex items-center justify-between h-16 md:h-[4.5rem]">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-bold text-foreground" aria-label="Star Fire - Página inicial">
          <Flame className="text-primary" size={28} aria-hidden="true" />
          Star Fire
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Menu principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
            aria-label="Chamar no WhatsApp para solicitar orçamento"
          >
            <MessageCircle size={16} aria-hidden="true" />
            Chamar no WhatsApp
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden bg-background border-t pb-4" aria-label="Menu principal mobile">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3.5 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="px-6 pt-3">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-base font-bold text-primary-foreground"
              aria-label="Chamar no WhatsApp"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Chamar no WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
