import { useState } from "react";
import { X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import obra1 from "@/assets/obra1.jpg";
import obra2 from "@/assets/obra2.jpg";
import obra3 from "@/assets/obra3.jpg";
import heroImg from "@/assets/hero-highway.jpg";


const images = [
  { src: obra1, alt: "Duplicação da BR-101", category: "Obras" },
  { src: obra2, alt: "Ponte sobre o Rio Paraná", category: "Obras" },
  { src: obra3, alt: "Túnel Serra do Mar", category: "Obras" },
  { src: obra1, alt: "Inauguração BR-040", category: "Eventos" },
  { src: obra2, alt: "Seminário Internacional", category: "Eventos" },
  { src: obra3, alt: "Coletiva de Imprensa", category: "Eventos" },
  { src: heroImg, alt: "Rodovia panorâmica", category: "Paisagens" },
  { src: obra1, alt: "Vista aérea de rodovia", category: "Paisagens" },
  { src: obra2, alt: "Canteiro de obras", category: "Obras" },
];

const categories = ["Todas", "Obras", "Eventos", "Paisagens"];

const Galeria = () => {
  const [active, setActive] = useState("Todas");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "Todas" ? images : images.filter((img) => img.category === active);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-primary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-heading font-extrabold text-primary-foreground mb-4">
              Galeria
            </h1>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto">
              Registros fotográficos de obras, eventos e atividades da associação.
            </p>
          </div>
        </section>

        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-5 py-2 rounded-md font-heading font-semibold text-sm uppercase tracking-wider transition-colors ${
                    active === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className="overflow-hidden rounded-lg aspect-[4/3] group"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
              onClick={() => setLightbox(null)}
            >
              <X size={32} />
            </button>
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 text-white text-center font-heading font-semibold">
              {filtered[lightbox].alt}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Galeria;
