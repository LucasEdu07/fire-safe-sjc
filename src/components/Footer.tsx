import { Flame } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80 py-12" role="contentinfo">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-display font-bold text-lg text-background">
          <Flame size={22} aria-hidden="true" />
          Star Fire
        </div>
        <p className="text-sm text-center leading-relaxed">
          Star Fire — Prevenção e Combate a Incêndio.<br className="sm:hidden" /> São José dos Campos – SP.
        </p>
        <nav className="flex gap-5 text-xs" aria-label="Links legais">
          <a href="#" className="hover:text-background transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-background transition-colors">Termos de Uso</a>
        </nav>
      </div>
      <p className="text-xs text-center mt-8 text-background/40">
        © {new Date().getFullYear()} Star Fire. Todos os direitos reservados. CNPJ: XX.XXX.XXX/XXXX-XX
      </p>
    </div>
  </footer>
);

export default Footer;
