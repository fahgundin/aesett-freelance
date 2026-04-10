import { useState } from "react";
import { toast } from "sonner";
import { submitSatisfaction } from "@/services/api";

const RESPONSE_TIME_OPTIONS = [
  "Ótimo",
  "Bom",
  "Regular",
  "Ruim",
  "Péssimo",
];

const STAFF_ATTITUDE_OPTIONS = [
  "Sim, completamente",
  "Sim, parcialmente",
  "Não",
];

const SatisfactionSurvey = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [senderEmail, setSenderEmail] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [staffAttitude, setStaffAttitude] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Por favor, selecione uma nota.");
      return;
    }
    if (!senderEmail) {
      toast.error("Por favor, informe seu e-mail.");
      return;
    }
    if (!responseTime) {
      toast.error("Por favor, avalie o tempo de resposta.");
      return;
    }
    if (!staffAttitude) {
      toast.error("Por favor, responda sobre o atendimento da equipe.");
      return;
    }

    setLoading(true);
    try {
      await submitSatisfaction({
        sender_email: senderEmail,
        rating,
        response_time: responseTime,
        staff_attitude: staffAttitude,
        comment,
      });
      setSubmitted(true);
      toast.success("Obrigado pela sua avaliação!");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao enviar avaliação.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
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

        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg shadow-md space-y-6">
          {/* E-mail do remetente */}
          <div>
            <label className="block font-heading font-semibold text-foreground mb-2">
              Seu e-mail
            </label>
            <input
              type="email"
              required
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full border border-input rounded-md p-3 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="seu@email.com"
            />
          </div>

          {/* Nota geral */}
          <div>
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

          {/* Tempo de resposta */}
          <div>
            <label className="block font-heading font-semibold text-foreground mb-2">
              Como você avalia o tempo de resposta para suas solicitações ou dúvidas?
            </label>
            <select
              value={responseTime}
              onChange={(e) => setResponseTime(e.target.value)}
              className="w-full border border-input rounded-md p-3 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Selecione a opção desejada</option>
              {RESPONSE_TIME_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Atitude da equipe */}
          <div>
            <label className="block font-heading font-semibold text-foreground mb-2">
              A equipe da AESE se mostrou prestativa e educada em suas interações?
            </label>
            <select
              value={staffAttitude}
              onChange={(e) => setStaffAttitude(e.target.value)}
              className="w-full border border-input rounded-md p-3 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Selecione a opção desejada</option>
              {STAFF_ATTITUDE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Comentários */}
          <div>
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
            disabled={loading}
            className="w-full bg-primary hover:bg-navy-light text-primary-foreground font-heading font-semibold py-3 rounded-md transition-colors uppercase tracking-wider text-sm disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar Avaliação"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SatisfactionSurvey;
