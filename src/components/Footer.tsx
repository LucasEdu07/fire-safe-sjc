import { Flame } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background/80 py-10">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-display font-bold text-lg text-background">
          <Flame size={22} />
          Star Fire
        </div>
        <p className="text-sm text-center">
          Star Fire — Prevenção e Combate a Incêndio. São José dos Campos – SP.
        </p>
        <div className="flex gap-4 text-xs">
          <a href="#" className="hover:text-background transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-background transition-colors">Termos de Uso</a>
        </div>
      </div>
      <p className="text-xs text-center mt-6 text-background/50">
        © {new Date().getFullYear()} Star Fire. Todos os direitos reservados. CNPJ: XX.XXX.XXX/XXXX-XX
      </p>
    </div>
  </footer>
);

export default Footer;
