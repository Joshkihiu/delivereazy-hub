import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import RoleSelection from "./pages/RoleSelection";
import Customer from "./pages/Customer";
import Account from "./pages/Account";
import Rides from "./pages/Rides";
import NotFound from "./pages/NotFound";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import RequestDelivery from "./pages/RequestDelivery";
import TrackDelivery from "./pages/TrackDelivery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
          <Route path="/request-delivery" element={<RequestDelivery />} />
          <Route path="/track-delivery" element={<TrackDelivery />} />
          <Route path="/account" element={<Account />} />
          <Route path="/rides" element={<Rides />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
