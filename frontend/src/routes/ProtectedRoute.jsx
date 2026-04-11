import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/contexts/AuthProvider";

export function ProtectedRoute() {
  const { isAuthenticated, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return null;
  }
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  return <Outlet />;
}
