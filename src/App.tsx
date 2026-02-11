import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BusinessProfileProvider, useBusinessProfile } from "@/contexts/BusinessProfileContext";
import Index from "./pages/Index";
import Conversations from "./pages/Conversations";
import Content from "./pages/Content";
import Feedback from "./pages/Feedback";
import Roadmap from "./pages/Roadmap";
import KnowledgeBase from "./pages/KnowledgeBase";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { profile } = useBusinessProfile();

  if (!profile.completedOnboarding) {
    return (
      <Routes>
        <Route path="*" element={<Onboarding />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/conversations" element={<Conversations />} />
      <Route path="/content" element={<Content />} />
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/roadmap" element={<Roadmap />} />
      <Route path="/knowledge-base" element={<KnowledgeBase />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BusinessProfileProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </BusinessProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
