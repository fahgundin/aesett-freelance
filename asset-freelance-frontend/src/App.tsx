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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/parceria" element={<Historia />} />
          <Route path="/transparencia" element={<Transparencia />} />
          <Route path="/publicacoes" element={<Publicacoes />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
