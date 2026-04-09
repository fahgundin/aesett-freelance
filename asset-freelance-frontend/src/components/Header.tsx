import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-aer.png";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre Nós", href: "/about-us" },
  { label: "Parceria",href: "/parceria"},
  { label: "Transparência", href: "/transparencia" },
  { label: "Publicações", href: "/publicacoes" },
  { label: "Galeria", href: "/galeria" },
  { label: "Contato", href: "#contato" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Logo area */}
      <div className="bg-card flex justify-center py-4 h-50">
        <Link to="/">
          <img className="object-cover -mt-52"src={logo} alt="AESETT - Associação Estruturante Santa Emília" width={500}  />
        </Link>
      </div>

      {/* NavBar */}
      <nav className="bg-nav">
        <div className="container mx-auto flex items-center justify-between px-4 relative">
          <button
            className="text-nav-foreground md:hidden p-3"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <ul className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row w-full md:w-auto absolute md:relative top-full left-0 bg-nav md:bg-transparent z-50`}>
            {navItems.map((item) => (
              <li key={item.label}>
                {item.href.startsWith("/") ? (
                  <Link
                    to={item.href}
                    className="block px-5 py-3 text-nav-foreground text-sm font-heading font-semibold uppercase tracking-wider hover:bg-navy-light transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="block px-5 py-3 text-nav-foreground text-sm font-heading font-semibold uppercase tracking-wider hover:bg-navy-light transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
