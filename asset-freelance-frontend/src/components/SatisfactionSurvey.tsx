import { useState } from "react";
import { toast } from "sonner";

const SatisfactionSurvey = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Por favor, selecione uma nota.");
      return;
    }
    setSubmitted(true);
    toast.success("Obrigado pela sua avaliação!");
  };

  if (submitted) {
    return (
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Obrigado!
          </h2>
          <p className="text-muted-foreground">Sua avaliação foi registrada com sucesso.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4 max-w-xl">
        <h2 className="text-3xl font-heading font-bold text-center text-foreground mb-2">
          Pesquisa de Satisfação
        </h2>
        <p className="text-center text-muted-foreground mb-8">
          Sua opinião é importante para nós. Avalie nossos serviços.
        </p>

        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-md">
          <div className="mb-6">
            <label className="block font-heading font-semibold text-foreground mb-3">
              Como você avalia nossos serviços?
            </label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(n)}
                  className={`w-12 h-12 rounded-full font-heading font-bold text-lg transition-colors ${
                    rating === n
                      ? "bg-gold text-accent-foreground"
                      : "bg-muted text-muted-foreground hover:bg-border"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">1 = Ruim — 5 = Excelente</p>
          </div>

          <div className="mb-6">
            <label className="block font-heading font-semibold text-foreground mb-2">
              Comentários (opcional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="w-full border border-input rounded-md p-3 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Deixe seu comentário..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-navy-light text-primary-foreground font-heading font-semibold py-3 rounded-md transition-colors uppercase tracking-wider text-sm"
          >
            Enviar Avaliação
          </button>
        </form>
      </div>
    </section>
  );
};

export default SatisfactionSurvey;
