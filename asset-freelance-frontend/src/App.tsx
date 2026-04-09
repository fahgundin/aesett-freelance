import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Historia from "./pages/Historia.tsx";
import NotFound from "./pages/NotFound.tsx";
import Transparencia from "./pages/Transparencia.tsx";
import Publicacoes from "./pages/Publicacoes.tsx";
import Galeria from "./pages/Galeria.tsx";
import AdminLogin from "./pages/admin/AdminLogin.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminNews from "./pages/admin/AdminNews.tsx";
import AdminServices from "./pages/admin/AdminServices.tsx";
import AdminDocuments from "./pages/admin/AdminDocuments.tsx";
import AdminGallery from "./pages/admin/AdminGallery.tsx";
import AdminSettings from "./pages/admin/AdminSettings.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import Parceria from "./pages/Parceria.tsx";
import PublicacaoDetalhe from "./pages/PublicacaoDetalhe.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about-us" element={<Historia />} />
            <Route path="parceria" element={<Parceria/>}/>
            <Route path="/transparencia" element={<Transparencia />} />
            <Route path="/publicacoes" element={<Publicacoes />} />
            <Route path="/publicacoes/:slug" element={<PublicacaoDetalhe />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="*" element={<NotFound />} />
            {/* Admin */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminLayout />}>
                <Route index element={<AdminNews />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="documents" element={<AdminDocuments />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
