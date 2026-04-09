import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { publications, PublicationType } from "@/data/publications";
import { Publishes } from "@/schemas/schemas";
import { fetchPublishes } from "@/services/api";

const filters: { label: string; value: PublicationType | "all" }[] = [
  { label: "Todas", value: "all" },
  { label: "Notícias", value: "news" },
  { label: "Serviços Concluídos", value: "services" },
];

const Publicacoes = () => {
  const [active, setActive] = useState<PublicationType | "all">("all");

  const [publishes, setPublishes] = useState<Publishes>([]);

  useEffect(() =>{
    const fetchPublishesInfo = async () => {
      const publishes = await fetchPublishes();
      setPublishes(publishes);
    }
    fetchPublishesInfo();
  },[])

  const filtered = active === "all" ? publishes : publishes.filter((p) => p.type === active);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-heading font-extrabold text-primary-foreground mb-4">
              Publicações
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Notícias e serviços concluídos pela associação.
            </p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className={`px-5 py-2 rounded-md font-heading font-semibold text-sm uppercase tracking-wider transition-colors ${
                    active === f.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {filtered.map((pub) => (
                <Link
                  key={pub.id}
                  to={`/publicacoes/${pub.slug}`}
                  className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={pub.thumbnail_url}
                      alt={pub.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                        {pub.date}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        pub.type === "news"
                          ? "bg-accent/20 text-accent-foreground"
                          : "bg-primary/20 text-primary"
                      }`}>
                        {pub.type === "news" ? "Notícia" : "Serviço"}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{pub.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{pub.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Publicacoes;
