import obra1 from "@/assets/obra1.jpg";
import obra2 from "@/assets/obra2.jpg";
import obra3 from "@/assets/obra3.jpg";

const services = [
  {
    title: "Duplicação da BR-101 — Trecho Norte",
    description: "Obra de duplicação com 45 km de extensão, incluindo acostamentos e sinalização moderna.",
    image: obra1,
  },
  {
    title: "Ponte sobre o Rio Paraná",
    description: "Construção de ponte estaiada com 800 metros de vão, conectando dois estados.",
    image: obra2,
  },
  {
    title: "Túnel Rodoviário Serra do Mar",
    description: "Execução de túnel com 2,3 km de extensão, reduzindo o trajeto em 40 minutos.",
    image: obra3,
  },
];

const CompletedServices = () => (
  <section id="servicos" className="py-16 bg-background">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-2">
        Serviços Concluídos
      </h2>
      <p className="text-center text-muted-foreground mb-12">
        Conheça alguns dos projetos realizados com o apoio da nossa associação.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mb-10">
        {services.map((s) => (
          <div key={s.title} className="bg-card rounded-lg overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                width={640}
                height={512}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-heading font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <a
          href="#"
          className="inline-block bg-primary hover:bg-navy-light text-primary-foreground font-heading font-semibold px-8 py-3 rounded-md transition-colors text-sm uppercase tracking-wider"
        >
          Veja Mais
        </a>
      </div>
    </div>
  </section>
);

export default CompletedServices;
