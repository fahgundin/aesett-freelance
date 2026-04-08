import { useState, useEffect, useCallback } from "react";
import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface ServiceItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  client_name: string | null;
  tags: string | null;
  thumbnail_url: string;
  is_concluded: boolean;
  concluded_at: string | null;
  created_at: string;
  updated_at: string;
}

interface ServiceForm {
  title: string;
  slug: string;
  description: string;
  client_name: string;
  tags: string;
  thumbnail_url: string;
  is_concluded: boolean;
  concluded_at: string;
}

const emptyForm: ServiceForm = {
  title: "", slug: "", description: "", client_name: "", tags: "",
  thumbnail_url: "", is_concluded: false, concluded_at: "",
};

const AdminServices = () => {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<ServiceForm>(emptyForm);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiGet<ServiceItem[]>("/api/v1/services/");
      setItems(data);
    } catch {
      toast.error("Erro ao carregar serviços");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const generateSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    try {
      const body = {
        ...form,
        client_name: form.client_name || null,
        tags: form.tags || null,
        concluded_at: form.concluded_at ? new Date(form.concluded_at).toISOString() : null,
      };
      if (editing) {
        await apiPatch(`/api/v1/services/${editing}`, body);
        toast.success("Serviço atualizado");
      } else {
        await apiPost("/api/v1/services/", body);
        toast.success("Serviço criado");
      }
      setShowForm(false); setEditing(null); setForm(emptyForm);
      fetchItems();
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza?")) return;
    try {
      await apiDelete(`/api/v1/services/${id}`);
      toast.success("Serviço excluído");
      fetchItems();
    } catch { toast.error("Erro ao excluir"); }
  };

  const openEdit = (item: ServiceItem) => {
    setForm({
      title: item.title, slug: item.slug, description: item.description,
      client_name: item.client_name || "", tags: item.tags || "",
      thumbnail_url: item.thumbnail_url, is_concluded: item.is_concluded,
      concluded_at: item.concluded_at ? item.concluded_at.slice(0, 16) : "",
    });
    setEditing(item.id); setShowForm(true);
  };

  if (showForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-bold text-foreground">
            {editing ? "Editar Serviço" : "Novo Serviço"}
          </h2>
          <Button variant="ghost" onClick={() => { setShowForm(false); setEditing(null); }}><X size={18} /></Button>
        </div>
        <div className="bg-card rounded-lg p-6 space-y-4 max-w-2xl">
          <div><Label>Título</Label>
            <Input value={form.title} onChange={(e) => {
              const title = e.target.value;
              setForm((f) => ({ ...f, title, slug: editing ? f.slug : generateSlug(title) }));
            }} />
          </div>
          <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} /></div>
          <div><Label>Descrição</Label><Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={6} /></div>
          <div><Label>Cliente</Label><Input value={form.client_name} onChange={(e) => setForm((f) => ({ ...f, client_name: e.target.value }))} /></div>
          <div><Label>Tags (separadas por vírgula)</Label><Input value={form.tags} onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))} /></div>
          <div><Label>URL da Thumbnail</Label><Input value={form.thumbnail_url} onChange={(e) => setForm((f) => ({ ...f, thumbnail_url: e.target.value }))} /></div>
          <div><Label>Data de Conclusão</Label>
            <Input type="datetime-local" value={form.concluded_at} onChange={(e) => setForm((f) => ({ ...f, concluded_at: e.target.value }))} />
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={form.is_concluded} onCheckedChange={(c) => setForm((f) => ({ ...f, is_concluded: c }))} />
            <Label>Concluído</Label>
          </div>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Serviços</h2>
        <Button onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }}><Plus size={16} /> Novo Serviço</Button>
      </div>
      {loading ? <p className="text-muted-foreground">Carregando...</p> : items.length === 0 ? <p className="text-muted-foreground">Nenhum serviço encontrado.</p> : (
        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr>
              <th className="text-left p-3 font-medium text-foreground">Título</th>
              <th className="text-left p-3 font-medium text-foreground">Status</th>
              <th className="text-left p-3 font-medium text-foreground">Data</th>
              <th className="text-right p-3 font-medium text-foreground">Ações</th>
            </tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-border">
                  <td className="p-3 text-foreground">{item.title}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${item.is_concluded ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"}`}>
                      {item.is_concluded ? "Concluído" : "Em andamento"}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{new Date(item.created_at).toLocaleDateString("pt-BR")}</td>
                  <td className="p-3 text-right space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil size={16} /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}><Trash2 size={16} className="text-destructive" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
