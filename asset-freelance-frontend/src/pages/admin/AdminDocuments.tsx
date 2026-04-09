import { useState, useEffect, useCallback } from "react";
import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface DocItem {
  id: number;
  title: string;
  description: string | null;
  file_url: string;
  category: string;
  service_id: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface DocForm {
  title: string;
  description: string;
  category: string;
  service_id: string;
  published_at: string;
  file: File | null;
}

const emptyForm: DocForm = { title: "", description: "", category: "", service_id: "", published_at: "", file: null };

const AdminDocuments = () => {
  const [items, setItems] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<DocForm>(emptyForm);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiGet<DocItem[]>("/api/v1/documents/");
      setItems(data);
    } catch { toast.error("Erro ao carregar documentos"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = async () => {
    try {
      if (editing) {
        await apiPatch(`/api/v1/documents/${editing}`, {
          title: form.title,
          description: form.description || null,
          category: form.category,
          service_id: form.service_id ? parseInt(form.service_id) : null,
          published_at: form.published_at ? new Date(form.published_at + "T00:00:00").toISOString() : null,
        });
        toast.success("Documento atualizado");
      } else {
        if (!form.file) { toast.error("Selecione um arquivo"); return; }
        const fd = new FormData();
        fd.append("file", form.file);
        fd.append("title", form.title);
        fd.append("category", form.category);
        if (form.description) fd.append("description", form.description);
        if (form.service_id) fd.append("service_id", form.service_id);
        if (form.published_at) fd.append("published_at", new Date(form.published_at).toISOString());
        await apiPost("/api/v1/documents/", fd);
        toast.success("Documento criado");
      }
      setShowForm(false); setEditing(null); setForm(emptyForm);
      fetchItems();
    } catch (err: any) { toast.error(err.message || "Erro ao salvar"); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza?")) return;
    try { await apiDelete(`/api/v1/documents/${id}`); toast.success("Excluído"); fetchItems(); }
    catch { toast.error("Erro ao excluir"); }
  };

  const openEdit = (item: DocItem) => {
    setForm({
      title: item.title, description: item.description || "", category: item.category,
      service_id: item.service_id?.toString() || "", published_at: item.published_at ? item.published_at.slice(0, 10) : "",
      file: null,
    });
    setEditing(item.id); setShowForm(true);
  };

  if (showForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-bold text-foreground">{editing ? "Editar Documento" : "Novo Documento"}</h2>
          <Button variant="ghost" onClick={() => { setShowForm(false); setEditing(null); }}><X size={18} /></Button>
        </div>
        <div className="bg-card rounded-lg p-6 space-y-4 max-w-2xl">
          <div><Label>Título</Label><Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} /></div>
          <div><Label>Descrição</Label><Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} /></div>
          <div><Label>Categoria</Label><Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Ex: relatorio, ata, balanco" /></div>
          <div><Label>ID do Serviço (opcional)</Label><Input value={form.service_id} onChange={(e) => setForm((f) => ({ ...f, service_id: e.target.value }))} type="number" /></div>
          <div><Label>Data de Publicação</Label><Input type="date" value={form.published_at} onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))} /></div>
          {!editing && (
            <div><Label>Arquivo</Label><Input type="file" onChange={(e) => setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))} /></div>
          )}
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Documentos</h2>
        <Button onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }}><Plus size={16} /> Novo Documento</Button>
      </div>
      {loading ? <p className="text-muted-foreground">Carregando...</p> : items.length === 0 ? <p className="text-muted-foreground">Nenhum documento encontrado.</p> : (
        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50"><tr>
              <th className="text-left p-3 font-medium text-foreground">Título</th>
              <th className="text-left p-3 font-medium text-foreground">Categoria</th>
              <th className="text-left p-3 font-medium text-foreground">Data</th>
              <th className="text-right p-3 font-medium text-foreground">Ações</th>
            </tr></thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-border">
                  <td className="p-3 text-foreground">{item.title}</td>
                  <td className="p-3 text-muted-foreground">{item.category}</td>
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

export default AdminDocuments;
