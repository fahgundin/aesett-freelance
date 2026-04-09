import { useParams, Link } from "react-router-dom";
import { Share2, ArrowLeft, Calendar } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { publications } from "@/data/publications";
import { New } from "@/schemas/schemas";
import { useEffect, useState } from "react";
import { fetchPublicationNew } from "@/services/api";

const PublicacaoDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const[news, setNews] = useState<New>();

  useEffect(() => {
    const fetchNew = async () => {
      const news = await fetchPublicationNew(slug);
      setNews(news);
      console.log(news)
    } 
    fetchNew();

  }, [])

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Publicação não encontrada</h1>
            <Link to="/publicacoes" className="text-primary hover:underline">
              ← Voltar às publicações
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // const recent = publications.filter((p) => p.id !== pub.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: news.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-72 md:h-96 overflow-hidden">
          <img src={news.thumbnail_url} alt={news.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                "news" === "news"
                  ? "bg-accent text-accent-foreground"
                  : "bg-primary text-primary-foreground"
              }`}>
                {"noticia" === "noticia" ? "Notícia" : "Serviço Concluído"}
              </span>
              <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-white mt-3">
                {news.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar size={16} />
                {/* <span>{news.published_at}</span> */}
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/70 rounded-md text-sm font-semibold text-foreground transition-colors"
              >
                <Share2 size={16} />
                Compartilhar
              </button>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              {news.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>
              ))}
            </div>

            {/* Image gallery placeholder */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
              <img src={news.thumbnail_url} alt={news.title} className="rounded-lg w-full h-40 object-cover" />
            </div>

            <div className="mt-10">
              <Link
                to="/publicacoes"
                className="inline-flex items-center gap-2 text-primary hover:underline font-semibold"
              >
                <ArrowLeft size={18} />
                Voltar às publicações
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Posts
        <section className="py-12 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8 text-center">
              Publicações Recentes
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {recent.map((r) => (
                <Link
                  key={r.id}
                  to={`/publicacoes/${r.id}`}
                  className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-accent">{r.date}</span>
                    <h3 className="font-heading font-semibold text-foreground mt-1 text-sm">{r.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  );
};

export default PublicacaoDetalhe;
