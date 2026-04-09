import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { API_BASE_URL } from "@/config/api";

const AdminSettings = () => {
  const [apiUrl, setApiUrl] = useState(API_BASE_URL);

  useEffect(() => {
    const saved = localStorage.getItem("aer_api_url");
    if (saved) setApiUrl(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem("aer_api_url", apiUrl);
    toast.success("URL da API salva. Recarregue a página para aplicar.");
  };

  return (
    <div>
      <h2 className="text-xl font-heading font-bold text-foreground mb-6">Configurações</h2>
      <div className="bg-card rounded-lg p-6 max-w-lg space-y-4">
        <div>
          <Label>URL Base da API</Label>
          <Input
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            placeholder="https://api.example.com"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Atual: {API_BASE_URL}
          </p>
        </div>
        <Button onClick={handleSave}>Salvar</Button>
      </div>
    </div>
  );
};

export default AdminSettings;
