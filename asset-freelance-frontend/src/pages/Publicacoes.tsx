import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Download, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PublicationType } from "@/data/publications";
import { Publishes, TransparencyDocuments } from "@/schemas/schemas";
import { fetchPublishes, fetchDocuments } from "@/services/api";

const DOCUMENT_CATEGORIES = ["publicacao", "edital"];

type FilterValue = PublicationType | "all" | "documents";

const filters: { label: string; value: FilterValue }[] = [
  { label: "Todas", value: "all" },
  { label: "Notícias", value: "news" },
  { label: "Serviços Concluídos", value: "services" },
  { label: "Publicações / Editais", value: "documents" },
];

const PAGE_SIZE = 9;

const Publicacoes = () => {
  const [active, setActive] = useState<FilterValue>("all");
  const [publishes, setPublishes] = useState<Publishes>([]);
  const [documents, setDocuments] = useState<TransparencyDocuments>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const [publishData, docData] = await Promise.all([fetchPublishes(), fetchDocuments()]);
      setPublishes(publishData);
      setDocuments(docData);
    };
    fetchData();
  }, []);

  const filteredPublishes =
    active === "all"
      ? publishes
      : active === "documents"
      ? []
      : publishes.filter((p) => p.type === active);

  const filteredDocuments =
    active === "documents" || active === "all"
      ? documents.filter((d) => DOCUMENT_CATEGORIES.includes(d.category))
      : [];

  const handleDownload = async (doc: { file_url: string; title: string }) => {
    const response = await fetch(doc.file_url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${doc.title}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalPages = active === "documents"
    ? Math.ceil(filteredDocuments.length / PAGE_SIZE)
    : Math.ceil(filteredPublishes.length / PAGE_SIZE);

  const paginatedPublishes = filteredPublishes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const paginatedDocuments = filteredDocuments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
              Notícias, serviços concluídos, publicações e editais da associação.
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
                  onClick={() => { setActive(f.value); setPage(1); }}
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

            {/* Publications grid */}
            {active !== "documents" && (
              <div className="grid md:grid-cols-3 gap-8">
                {paginatedPublishes.map((pub) => (
                  <Link
                    key={pub.ref_id}
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
                          {pub.date ? new Date(pub.date).toLocaleDateString("pt-BR") : "—"}
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
            )}

            {/* Documents list */}
            {active === "documents" && (
              <div className="space-y-4 max-w-4xl mx-auto">
                {paginatedDocuments.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-card rounded-lg p-5 shadow-sm border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground">{doc.title}</h3>
                        <div className="flex items-center gap-2">
                          {doc.published_at && (
                            <span className="text-sm text-muted-foreground">
                              {new Date(doc.published_at).toLocaleDateString("pt-BR")}
                            </span>
                          )}
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-primary/20 text-primary capitalize">
                            {doc.category}
                          </span>
                        </div>
                        {doc.description && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{doc.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={doc.file_url} target="_blank" rel="noopener noreferrer">
                        <button className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                          <ExternalLink size={18} />
                        </button>
                      </a>
                      <button
                        className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        onClick={() => handleDownload(doc)}
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                {paginatedDocuments.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">Nenhum documento encontrado.</p>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-md font-heading font-semibold text-sm bg-muted text-muted-foreground hover:bg-muted/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>
                <span className="text-sm text-muted-foreground">
                  Página {page} de {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-md font-heading font-semibold text-sm bg-muted text-muted-foreground hover:bg-muted/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Próximo
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Publicacoes;
