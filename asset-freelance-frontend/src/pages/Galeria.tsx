import { useDebugValue, useEffect, useState } from "react";
import { X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import obra1 from "@/assets/obra1.jpg";
import obra2 from "@/assets/obra2.jpg";
import obra3 from "@/assets/obra3.jpg";
import heroImg from "@/assets/hero-highway.jpg";
import { Gallery } from "@/schemas/schemas";
import { fetchGallery } from "@/services/api";

const categories = ["Todas", "Obras", "Eventos", "Paisagens"];

const Galeria = () => {
  const [active, setActive] = useState("Todas");
  const [lightbox, setLightbox] = useState<number | null>(null);

  // const filtered = active === "Todas" ? images : images.filter((img) => img.category === active);

  const [images, setImages] = useState<Gallery>([]);

  useEffect(()=> {
    const fetchGalleryImages = async () =>{
      const gallery = await fetchGallery();
      setImages(gallery);
    }
    fetchGalleryImages();
  },[])

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
            {/* <div className="flex flex-wrap gap-3 justify-center mb-10">
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
            </div> */}

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className="overflow-hidden rounded-lg aspect-[4/3] group"
                >
                  <img
                    src={img.image_url}
                    alt={img.title}
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
              src={images[lightbox].image_url}
              alt={images[lightbox].title}
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 text-white text-center font-heading font-semibold">
              {images[lightbox].title}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Galeria;
