import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-highway.jpg";

const HeroSection = () => (
  <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
    <img
      src={heroImg}
      alt="Rodovia moderna"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={768}
    />
    <div className="absolute inset-0 bg-navy-dark/75" />
    <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-in-up">
      <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-primary-foreground leading-tight mb-4">
        Associação Estruturante Santa Emília
      </h1>
      <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 font-body">
        MANUTENÇÃO DA RODOVIA MT 322
Trecho: Fim do Pavimento – Rio Xingu, Inicio no km 52,00 – Lat. 10°30'12.99"S / Long. 54° 0'47.13"W, Fim no km 162,00 – Lat. 10°46'38.37"S/ Long. 53°6'10.46"W, com uma extensão total de 110,00 km, no município de Peixoto de Azevedo – MT.
TERMO DE COLABORAÇÃO Nº 0002-2024/SAOR/SINFRA
SECRETARIA DE ESTADO DE INFRAESTRUTURA E LOGISTICA – SINFRA X ASSOCIAÇÃO ESTRUTURANTE SANTA EMÍLIA DA RODOVIA MT 322 – AESE 
SINFRA VALOR:R$ 2.113.986,36   AESE: R$ 373.056,42 
TOTAL R$  R$   2.487.042,78 
PRAZO: 365 dias
EXECUTORA: ASSOCIAÇÃO ESTRUTURANTE SANTA EMÍLIA DA RODOVIA MT 322 – AESE 
      </p>
      <Link
        to="/parceria"
        className="inline-block bg-gold hover:bg-gold-light text-accent-foreground font-heading font-semibold px-8 py-3 rounded-md transition-colors text-sm uppercase tracking-wider"
      >
        Conheça Mais
      </Link>
    </div>
  </section>
);

export default HeroSection;
