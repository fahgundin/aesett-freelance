import obra1 from "@/assets/obra1.jpg";
import obra2 from "@/assets/obra2.jpg";
import obra3 from "@/assets/obra3.jpg";

const news = [
  {
    title: "Novo trecho da BR-040 será inaugurado em março",
    description: "A obra de modernização do trecho entre Belo Horizonte e Juiz de Fora será entregue com melhorias na sinalização e pavimentação.",
    date: "15 Mar 2026",
    image: obra1,
  },
  {
    title: "AER participa de seminário internacional de infraestrutura",
    description: "Representantes da associação apresentaram projetos brasileiros no congresso de engenharia rodoviária em Lisboa.",
    date: "02 Fev 2026",
    image: obra2,
  },
  {
    title: "Governo anuncia investimento de R$ 3 bilhões em rodovias",
    description: "Pacote de investimentos contempla duplicações, restaurações e construção de novas vias em 12 estados.",
    date: "20 Jan 2026",
    image: obra3,
  },
];

const NewsSection = () => (
  <section id="noticias" className="py-16 bg-muted">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-2">
        Notícias
      </h2>
      <p className="text-center text-muted-foreground mb-12">
        Fique por dentro das últimas novidades do setor rodoviário.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {news.map((n) => (
          <div key={n.title} className="bg-card rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img
                src={n.image}
                alt={n.title}
                loading="lazy"
                width={640}
                height={512}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">{n.date}</span>
              <h3 className="font-heading font-semibold text-foreground mt-1 mb-1">{n.title}</h3>
              <p className="text-sm text-muted-foreground">{n.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="#"
          className="inline-block bg-primary hover:bg-primary/80 text-primary-foreground font-heading font-semibold px-8 py-3 rounded-md transition-colors text-sm uppercase tracking-wider"
        >
          Veja Mais
        </a>
      </div>
    </div>
  </section>
);

export default NewsSection;
