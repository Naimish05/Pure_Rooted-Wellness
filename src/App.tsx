import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import CategoryPage from "@/pages/CategoryPage";
import ArticlePage from "@/pages/ArticlePage";
import BMICalculator from "@/pages/BMICalculator";
import About from "@/pages/About";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminPostEditor from "@/pages/AdminPostEditor";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const { dark, toggle } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout dark={dark} toggle={toggle} />}>
              <Route path="/" element={<Index />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/bmi" element={<BMICalculator />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/post/:id" element={<AdminPostEditor />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <SpeedInsights />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
