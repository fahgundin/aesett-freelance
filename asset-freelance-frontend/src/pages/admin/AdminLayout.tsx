import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Newspaper, Wrench, FileText, Image, Settings } from "lucide-react";
import logo from "@/assets/logo-aer.png";

const navItems = [
  { label: "Notícias", href: "/admin/dashboard/news", icon: Newspaper },
  { label: "Serviços", href: "/admin/dashboard/services", icon: Wrench },
  { label: "Documentos", href: "/admin/dashboard/documents", icon: FileText },
  { label: "Galeria", href: "/admin/dashboard/gallery", icon: Image },
  { label: "Configurações", href: "/admin/dashboard/settings", icon: Settings },
];

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <img src={logo} alt="AER" className="h-10" />
          <span className="font-heading font-bold text-foreground text-sm">Admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={logout}>
            <LogOut size={18} /> Sair
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
