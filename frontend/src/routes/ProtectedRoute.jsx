import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./routes";
import { useAuth } from "../context/AuthProvider";

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
