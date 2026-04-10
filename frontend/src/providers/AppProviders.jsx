import { AuthProvider } from "@/contexts/AuthProvider";

export function AppProviders({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}

