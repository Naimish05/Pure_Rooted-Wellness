import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
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
import RealtimeSubscription from "@/components/RealtimeSubscription";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <RealtimeSubscription />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route
              element={
                <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                  <Layout />
                </ThemeProvider>
              }
            >
              <Route path="/" element={<Index />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/bmi" element={<BMICalculator />} />
              <Route path="/about" element={<About />} />
            </Route>
            
            <Route
              path="/admin/*"
              element={
                <ThemeProvider defaultTheme="dark" storageKey="vite-admin-theme">
                  <Outlet />
                </ThemeProvider>
              }
            >
              <Route path="login" element={<AdminLogin />} />
              <Route index element={<AdminDashboard />} />
              <Route path="post/:id" element={<AdminPostEditor />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <SpeedInsights />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
