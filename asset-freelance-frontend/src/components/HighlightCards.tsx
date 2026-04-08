import servicosImg from "@/assets/servicos.jpg";
import galeriaImg from "@/assets/galeria.jpg";
import transparenciaImg from "@/assets/transparencia.jpg";

const cards = [
  {
    title: "Serviços",
    description: "Consultoria técnica, laudos de engenharia e acompanhamento de obras rodoviárias.",
    image: servicosImg,
    href: "/servicos",
  },
  {
    title: "Galeria",
    description: "Registros fotográficos de nossos projetos e eventos realizados pela associação.",
    image: galeriaImg,
    href: "/galeria",
  },
  {
    title: "Transparência",
    description: "Relatórios financeiros, atas de reunião e prestação de contas da associação.",
    image: transparenciaImg,
    href: "/transparencia",
  },
];

const HighlightCards = () => (
  <section className="py-16 bg-muted">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                width={640}
                height={512}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm">{card.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default HighlightCards;
