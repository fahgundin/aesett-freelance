import { useState, useEffect, useCallback } from "react";
import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  news_id: number | null;
  service_id: number | null;
  created_at: string;
  updated_at: string;
}

interface GalleryForm {
  title: string;
  description: string;
  category: string;
  news_id: string;
  service_id: string;
  file: File | null;
}

const emptyForm: GalleryForm = { title: "", description: "", category: "", news_id: "", service_id: "", file: null };

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<GalleryForm>(emptyForm);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try { setItems(await apiGet<GalleryItem[]>("/api/v1/gallery/")); }
    catch { toast.error("Erro ao carregar galeria"); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSave = async () => {
    try {
      if (editing) {
        await apiPatch(`/api/v1/gallery/${editing}`, {
          title: form.title,
          description: form.description || null,
          category: form.category || null,
          news_id: form.news_id ? parseInt(form.news_id) : null,
          service_id: form.service_id ? parseInt(form.service_id) : null,
        });
        toast.success("Imagem atualizada");
      } else {
        if (!form.file) { toast.error("Selecione uma imagem"); return; }
        const fd = new FormData();
        fd.append("file", form.file);
        fd.append("title", form.title);
        if (form.description) fd.append("description", form.description);
        if (form.category) fd.append("category", form.category);
        if (form.news_id) fd.append("news_id", form.news_id);
        if (form.service_id) fd.append("service_id", form.service_id);
        await apiPost("/api/v1/gallery/", fd);
        toast.success("Imagem adicionada");
      }
      setShowForm(false); setEditing(null); setForm(emptyForm);
      fetchItems();
    } catch (err: any) { toast.error(err.message || "Erro ao salvar"); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza?")) return;
    try { await apiDelete(`/api/v1/gallery/${id}`); toast.success("Excluída"); fetchItems(); }
    catch { toast.error("Erro ao excluir"); }
  };

  const openEdit = (item: GalleryItem) => {
    setForm({
      title: item.title, description: item.description || "", category: item.category || "",
      news_id: item.news_id?.toString() || "", service_id: item.service_id?.toString() || "",
      file: null,
    });
    setEditing(item.id); setShowForm(true);
  };

  if (showForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-bold text-foreground">{editing ? "Editar Imagem" : "Nova Imagem"}</h2>
          <Button variant="ghost" onClick={() => { setShowForm(false); setEditing(null); }}><X size={18} /></Button>
        </div>
        <div className="bg-card rounded-lg p-6 space-y-4 max-w-2xl">
          <div><Label>Título</Label><Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} /></div>
          <div><Label>Descrição</Label><Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} /></div>
          <div><Label>Categoria</Label><Input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} placeholder="Ex: obras, eventos" /></div>
          <div><Label>ID da Notícia (opcional)</Label><Input value={form.news_id} onChange={(e) => setForm((f) => ({ ...f, news_id: e.target.value }))} type="number" /></div>
          <div><Label>ID do Serviço (opcional)</Label><Input value={form.service_id} onChange={(e) => setForm((f) => ({ ...f, service_id: e.target.value }))} type="number" /></div>
          {!editing && <div><Label>Imagem</Label><Input type="file" accept="image/*" onChange={(e) => setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))} /></div>}
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Galeria</h2>
        <Button onClick={() => { setForm(emptyForm); setEditing(null); setShowForm(true); }}><Plus size={16} /> Nova Imagem</Button>
      </div>
      {loading ? <p className="text-muted-foreground">Carregando...</p> : items.length === 0 ? <p className="text-muted-foreground">Nenhuma imagem encontrada.</p> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="bg-card rounded-lg overflow-hidden border border-border group">
              <img src={item.image_url} alt={item.title} className="w-full h-40 object-cover" />
              <div className="p-3">
                <p className="text-sm font-medium text-foreground truncate">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.category}</p>
                <div className="flex gap-1 mt-2">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(item)}><Pencil size={14} /></Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}><Trash2 size={14} className="text-destructive" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
