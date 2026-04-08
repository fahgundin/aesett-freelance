import { Mail, Phone, MapPin} from "lucide-react";
import logo from "@/assets/logo-aer.png";

const Footer = () => (
  <footer id="contato" className="bg-navy-dark text-primary-foreground">
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-4 gap-10">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <img src={logo} alt="AER" width={200} height={200} className="object-cover" loading="lazy" />
          <p className="text-sm text-primary-foreground/70 mt-3 text-center md:text-left">
            AESE - Asossiação Estruturante Santa Emília.
          </p>
        </div>

        {/* Contatos */}
        <div>
          <h4 className="font-heading font-bold text-gold mb-4 uppercase text-sm tracking-wider">Contato</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex items-center gap-2"><Phone size={16} /> Gilson (66) 99604-4288</li>
            {/* <li className="flex items-center gap-2"><Mail size={16} /> contato@aer.org.br</li> */}
          </ul>
        </div>

        {/* Endereço */}
        <div>
          <h4 className="font-heading font-bold text-gold mb-4 uppercase text-sm tracking-wider">Endereço</h4>
          <p className="text-sm text-primary-foreground/80 flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0" />
            Peixoto de Azevedo – MT, RODOVIA MT 322<br />
          </p>
        </div>

        {/* Redes Sociais */}
        <div>
          <h4 className="font-heading font-bold text-gold mb-4 uppercase text-sm tracking-wider">Redes Sociais</h4>
          <div className="flex gap-4">
            {/* <a href="#" className="text-primary-foreground/80 hover:text-gold transition-colors" aria-label="Facebook">
              <Facebook size={22} />
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-gold transition-colors" aria-label="Instagram">
              <Instagram size={22} />
            </a>
            <a href="#" className="text-primary-foreground/80 hover:text-gold transition-colors" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a> */}
          </div>
        </div>
      </div>
    </div>

    {/* Direitos reservados */}
    <div className="border-t border-navy-light">
      <div className="container mx-auto px-4 py-4">
        <p className="text-center text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} AESE - Asossiação Estruturante Santa Emília. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
