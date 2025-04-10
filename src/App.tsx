
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

// Dashboard Pages
import CitizenDashboard from "./pages/dashboard/CitizenDashboard";
import NGODashboard from "./pages/dashboard/NGODashboard";
import GovernmentDashboard from "./pages/dashboard/GovernmentDashboard";

// Module Pages
import Healthcare from "./pages/modules/Healthcare";
import Funds from "./pages/modules/Funds";
import Food from "./pages/modules/Food";

const queryClient = new QueryClient();

// Route guard for authenticated routes
const ProtectedRoute = ({ children, allowedRoles = [] }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role as string)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === "government") {
      return <Navigate to="/government/dashboard" />;
    } else if (user.role === "ngo") {
      return <Navigate to="/ngo/dashboard" />;
    } else if (user.role === "citizen") {
      return <Navigate to="/citizen/dashboard" />;
    }
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Citizen routes */}
            <Route path="/citizen" element={
              <ProtectedRoute allowedRoles={["citizen"]}>
                <Navigate to="/citizen/dashboard" replace />
              </ProtectedRoute>
            } />
            <Route path="/citizen/dashboard" element={
              <ProtectedRoute allowedRoles={["citizen"]}>
                <AppLayout>
                  <CitizenDashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/citizen/healthcare" element={
              <ProtectedRoute allowedRoles={["citizen"]}>
                <AppLayout>
                  <Healthcare />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/citizen/funds" element={
              <ProtectedRoute allowedRoles={["citizen"]}>
                <AppLayout>
                  <Funds />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/citizen/food" element={
              <ProtectedRoute allowedRoles={["citizen"]}>
                <AppLayout>
                  <Food />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            {/* NGO routes */}
            <Route path="/ngo" element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <Navigate to="/ngo/dashboard" replace />
              </ProtectedRoute>
            } />
            <Route path="/ngo/dashboard" element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <AppLayout>
                  <NGODashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/ngo/healthcare" element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <AppLayout>
                  <Healthcare />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/ngo/funds" element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <AppLayout>
                  <Funds />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/ngo/food" element={
              <ProtectedRoute allowedRoles={["ngo"]}>
                <AppLayout>
                  <Food />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            {/* Government routes */}
            <Route path="/government" element={
              <ProtectedRoute allowedRoles={["government"]}>
                <Navigate to="/government/dashboard" replace />
              </ProtectedRoute>
            } />
            <Route path="/government/dashboard" element={
              <ProtectedRoute allowedRoles={["government"]}>
                <AppLayout>
                  <GovernmentDashboard />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/government/healthcare" element={
              <ProtectedRoute allowedRoles={["government"]}>
                <AppLayout>
                  <Healthcare />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/government/funds" element={
              <ProtectedRoute allowedRoles={["government"]}>
                <AppLayout>
                  <Funds />
                </AppLayout>
              </ProtectedRoute>
            } />
            <Route path="/government/food" element={
              <ProtectedRoute allowedRoles={["government"]}>
                <AppLayout>
                  <Food />
                </AppLayout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
