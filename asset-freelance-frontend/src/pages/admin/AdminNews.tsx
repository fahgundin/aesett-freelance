import { useState, useEffect, useCallback } from "react";
import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/apiClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail_url: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

interface NewsForm {
  title: string;
  slug: string;
  summary: string;
  content: string;
  thumbnail_url: string;
  is_published: boolean;
  published_at: string;
}

const emptyForm: NewsForm = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  thumbnail_url: "",
  is_published: false,
  published_at: "",
};

const AdminNews = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<NewsForm>(emptyForm);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiGet<NewsItem[]>("/api/v1/news/admin/all");
      setItems(data);
    } catch {
      toast.error("Erro ao carregar notícias");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    try {
      const body = {
        ...form,
        published_at: form.published_at ? new Date(form.published_at).toISOString() : null,
      };
      if (editing) {
        await apiPatch(`/api/v1/news/${editing}`, body);
        toast.success("Notícia atualizada");
      } else {
        await apiPost("/api/v1/news/", body);
        toast.success("Notícia criada");
      }
      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
      fetchItems();
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    try {
      await apiDelete(`/api/v1/news/${id}`);
      toast.success("Notícia excluída");
      fetchItems();
    } catch {
      toast.error("Erro ao excluir");
    }
  };

  const openEdit = (item: NewsItem) => {
    setForm({
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      content: item.content,
      thumbnail_url: item.thumbnail_url,
      is_published: item.is_published,
      published_at: item.published_at ? item.published_at.slice(0, 16) : "",
    });
    setEditing(item.id);
    setShowForm(true);
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-heading font-bold text-foreground">
            {editing ? "Editar Notícia" : "Nova Notícia"}
          </h2>
          <Button variant="ghost" onClick={() => { setShowForm(false); setEditing(null); }}>
            <X size={18} />
          </Button>
        </div>
        <div className="bg-card rounded-lg p-6 space-y-4 max-w-2xl">
          <div>
            <Label>Título</Label>
            <Input
              value={form.title}
              onChange={(e) => {
                const title = e.target.value;
                setForm((f) => ({ ...f, title, slug: editing ? f.slug : generateSlug(title) }));
              }}
            />
          </div>
          <div>
            <Label>Slug</Label>
            <Input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} />
          </div>
          <div>
            <Label>Resumo</Label>
            <Textarea value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} rows={3} />
          </div>
          <div>
            <Label>Conteúdo</Label>
            <Textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} rows={8} />
          </div>
          <div>
            <Label>URL da Thumbnail</Label>
            <Input value={form.thumbnail_url} onChange={(e) => setForm((f) => ({ ...f, thumbnail_url: e.target.value }))} />
          </div>
          <div>
            <Label>Data de Publicação</Label>
            <Input
              type="datetime-local"
              value={form.published_at}
              onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={form.is_published}
              onCheckedChange={(checked) => setForm((f) => ({ ...f, is_published: checked }))}
            />
            <Label>Publicado</Label>
          </div>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Notícias</h2>
        <Button onClick={openCreate}><Plus size={16} /> Nova Notícia</Button>
      </div>
      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma notícia encontrada.</p>
      ) : (
        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-3 font-medium text-foreground">id</th>
                <th className="text-left p-3 font-medium text-foreground">Título</th>
                <th className="text-left p-3 font-medium text-foreground">Status</th>
                <th className="text-left p-3 font-medium text-foreground">Data</th>
                <th className="text-right p-3 font-medium text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-border">
                  <td className="p-3 text-foreground">{item.id}</td>
                  <td className="p-3 text-foreground">{item.title}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.is_published ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"
                    }`}>
                      {item.is_published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                      <Pencil size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 size={16} className="text-destructive" />
                    </Button>
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

export default AdminNews;
