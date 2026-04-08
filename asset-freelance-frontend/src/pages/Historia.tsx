import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Historia = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1">
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-heading font-extrabold text-primary-foreground mb-4">
            PARCERIA:
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
                TERMO DE COLABORAÇÃO Nº 0002-2024/SAOR/SINFRA
Objeto:  O presente Termo de colaboração tem por objeto a formalização de parceria entre as partes, para consecução de finalidade de interesse público e recíproco que envolve a
 transferência de recursos financeiros, consiste na EXECUÇÃO DA MANUTENÇÃO E CONSERVAÇÃO DA RODOVIA NÃO PAVIMENTADA MT-322, trecho: União do Norte Rio Xingu, Início no km 120,30– Lat. 10°35'38.00"S/ Long. 53° 27'5.00"W, Fim no km 162,00– Lat. 10°46'38.00"S/ Long. 53°6'8.00"W, inseridos no Sistema Rodoviário Estadual–S.R.E com o  código(322EMT0110)com todas informações técnicas descritas
 
              </p>
            </div>

            <div>
              {/* <h2 className="text-2xl font-heading font-bold text-primary mb-3">Crescimento — Anos 90</h2> */}
              <p className="text-muted-foreground">
                e com uma extensão total de 41,70 km, no Município Peixoto de Azevedo, conforme PROJETO DE MANUNTENÇÃO DE RODOVIA NÃO PAVIMENTADA MT-332, de competência do Estado de Mato Grosso e/ou a ele delegados, COM FORNECIMENTO, PELAS OSCs, DE MATERIAL, MÃO-DE-OBRA, FERRAMENTAL E TODOS OS EQUIPAMENTOS NECESSÁRIOS À PERFEITA REALIZAÇÃO DOS SERVIÇOS, OBRAS E/OU INVESTIMENTOS
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default Historia;
