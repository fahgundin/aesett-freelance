import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "@/config/api";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  thumbnail_url: string;
  published_at: string | null;
}

const NewsSection = () => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/v1/news/?limit=3`)
      .then((r) => r.json())
      .then(setNews)
      .catch(() => {});
  }, []);

  if (news.length === 0) return null;

  return (
    <section id="noticias" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-2">
          Notícias
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Fique por dentro das últimas novidades do setor rodoviário.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {news.map((n) => (
            <Link
              key={n.id}
              to={`/publicacoes/${n.slug}`}
              className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={n.thumbnail_url}
                  alt={n.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {n.published_at
                    ? new Date(n.published_at).toLocaleDateString("pt-BR")
                    : "—"}
                </span>
                <h3 className="font-heading font-semibold text-foreground mt-1 mb-1">{n.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{n.summary}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/publicacoes"
            className="inline-block bg-primary hover:bg-primary/80 text-primary-foreground font-heading font-semibold px-8 py-3 rounded-md transition-colors text-sm uppercase tracking-wider"
          >
            Veja Mais
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
