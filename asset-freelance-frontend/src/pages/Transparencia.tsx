import { FileText, Download, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { TransparencyDocuments } from "@/schemas/schemas";
import { fetchDocuments } from "@/services/api";

const Transparencia = () => {
  const [documents, setDocuments] = useState<TransparencyDocuments>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const fetchAPIDocuments = async () => {
      const docs = await fetchDocuments();
      setDocuments(docs);
    };
    fetchAPIDocuments();
  }, []);

  const categories = Array.from(new Set(documents.map((d) => d.category))).filter(Boolean);
  const filtered = activeCategory === "all" ? documents : documents.filter((d) => d.category === activeCategory);

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-heading font-extrabold text-primary-foreground mb-4">
              Transparência
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Acesso a documentos, relatórios e informações institucionais da associação.
            </p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Category filters */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center mb-10">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-5 py-2 rounded-md font-heading font-semibold text-sm uppercase tracking-wider transition-colors ${
                    activeCategory === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  Todos
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-md font-heading font-semibold text-sm uppercase tracking-wider transition-colors ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {filtered.map((doc, i) => (
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
                      <p className="text-sm text-muted-foreground capitalize">{doc.category}</p>
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
              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Nenhum documento encontrado.</p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Transparencia;
