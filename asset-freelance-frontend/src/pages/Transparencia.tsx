import { FileText, Download, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { TransparencyDocuments } from "@/schemas/schemas";
import { fetchDocuments } from "@/services/api";

// const documents = [
//   { title: "Estatuto Social da AER", year: "2025", type: "PDF" },
//   { title: "Relatório Anual de Atividades 2025", year: "2025", type: "PDF" },
//   { title: "Demonstrações Financeiras 2025", year: "2025", type: "PDF" },
//   { title: "Ata da Assembleia Geral Ordinária", year: "2025", type: "PDF" },
//   { title: "Relatório de Gestão 2024", year: "2024", type: "PDF" },
//   { title: "Demonstrações Financeiras 2024", year: "2024", type: "PDF" },
//   { title: "Plano de Ação 2024-2026", year: "2024", type: "PDF" },
//   { title: "Certificado de Regularidade Fiscal", year: "2024", type: "PDF" },
// ];



const Transparencia = () => {
  const [documents, setDocuments] = useState<TransparencyDocuments>([])
  
  useEffect(() => {
    const fetchAPIDocuments = async () => {
      const documents = await fetchDocuments();
      setDocuments(documents);
    }
    fetchAPIDocuments();
  
  },[])

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
    <>
    
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
              <div className="space-y-4">
                {documents.map((doc, i) => (
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
                        <p className="text-sm text-muted-foreground">{doc.updated_at.getFullYear} · {doc.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={doc.file_url}>
                        <button className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                          <ExternalLink size={18} />
                        </button>
                      </a>
                      <a href={doc.file_url} download={`${doc.title}.pdf`}>
                        <button className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        onClick={() => handleDownload(doc)}>
                          <Download size={18} />
                        </button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
};

export default Transparencia;
function async(arg0: () => void) {
  throw new Error("Function not implemented.");
}

