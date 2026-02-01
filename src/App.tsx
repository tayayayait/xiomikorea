import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Gallery from "./pages/Gallery";
import GalleryDetail from "./pages/GalleryDetail";
import Notice from "./pages/Notice";
import NoticeDetail from "./pages/NoticeDetail";
import Faq from "./pages/Faq";
import Top50 from "./pages/Top50";
import Forum from "./pages/Forum";
import Exhibition from "./pages/Exhibition";
import Monthly from "./pages/Monthly";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/:id" element={<GalleryDetail />} />
                <Route path="/notice" element={<Notice />} />
                <Route path="/notice/:id" element={<NoticeDetail />} />
                
                {/* New Routes */}
                <Route path="/faq" element={<Faq />} />
                <Route path="/top50" element={<Top50 />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/exhibition" element={<Exhibition />} />
                <Route path="/monthly" element={<Monthly />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
