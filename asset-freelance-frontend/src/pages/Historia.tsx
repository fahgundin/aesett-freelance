import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, ExternalLink, FileText } from "lucide-react";

const Historia = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-extrabold text-primary-foreground mb-4">
            QUEM SOMOS:
          </h1>
          {/* <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Conheça a trajetória da Associação de Engenharia de Rodovias.
          </p> */}
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-8 text-foreground leading-relaxed">
            <div>
              {/* <h2 className="text-2xl font-heading font-bold text-primary mb-3">Fundação — 1985</h2> */}
              <p className="text-muted-foreground">
  A Associação Estruturante Santa Emília da rodovia MT 322 é uma entidade sem fins lucrativos, fundada em 2009, com a finalidade de congregar, apoiar, orientar, representar os sócios visando à prestação, pela entidade, de quaisquer serviços que possam contribuir para o fomento e racionalização das atividades agropecuárias e para melhorar as condições de vida de seus integrantes e moradores, como reivindicar energia, saúde, educação, estradas e vicinais junto aos órgãos competentes.
 
              </p>
            </div>

            <div className="space-y-8 text-foreground leading-relaxed">
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">Diretoria:</h2>
              <p className="text-muted-foreground">
                <strong>Presidente: </strong>Nazir Haddad Filho<br></br> 
                <strong>Vice-Presidente: </strong>Jandir Sima<br></br>
                <strong>Tesoureira: </strong>Clarisse Wenzel Sima<br></br>
                <strong>2º Tesoureiro: </strong>Richelli Bruno Galiassi Cotrim<br></br>
                <strong>Secretária: </strong>Adriana Rodrigues Lima Sponchiado<br></br>
                <strong>2º Secretário: </strong>Zaqueu Carrijo Dutra<br></br>
              </p>
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">CONSELHO FISCAL</h2>
              <p className="text-muted-foreground">
                <strong>1º Conselheiro Fiscal: </strong>Miltom Bellincata<br></br> 
                <strong>2º Conselheiro Fiscal: </strong>Marcom Sheid<br></br>
                <strong>3º Conselheiro Fiscal: </strong>Leandro Vettori <br></br>
              </p>
              <h2 className="text-2xl font-heading font-bold text-primary mb-3">CONSELHO FISCAL(SUPLENTES)</h2>
              <p className="text-muted-foreground">
                <strong>1º Conselheiro Fiscal (suplente): </strong>Luiz Munaro<br></br> 
                <strong>2º Conselheiro Fiscal (suplente): </strong>Leonizio Lemos Melo Junior<br></br>
                <strong>3º Conselheiro Fiscal (suplente): </strong>Marcelo Surjos <br></br>
                <br></br>
                A duração do respectivo mandato é até 20 de outubro de 2026.
              </p>
            </div>

          </div>
          <div
                    key="1"
                    className="flex items-center justify-between bg-card rounded-lg p-5 shadow-sm border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FileText size={20} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-foreground">DOCUMENTO DE QUALIFICAÇÃO</h3>
                        <p className="text-sm text-muted-foreground"></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href="http://187.127.20.143:8000/uploads/documents/41e075dcc66f401894b99f56af2c6140.pdf">
                        <button className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                          <ExternalLink size={18} />
                        </button>
                      </a>
                      <a href="http://187.127.20.143:8000/uploads/documents/41e075dcc66f401894b99f56af2c6140.pdf" download={`DOCUMENTO_DE_QUALIFICAÇÃO.pdf`}>
                        <button className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                        onClick={() => handleDownload(doc)}>
                          <Download size={18} />
                        </button>
                      </a>
                    </div>
                  </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Historia;
