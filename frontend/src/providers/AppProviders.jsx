import { AuthProvider } from "@/contexts/AuthProvider";
import { CivilianProvider } from "@/contexts/CivilianProvider";
import { OrganizationProvider } from "@/contexts/OrganizationProvider";

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CivilianProvider>
        <OrganizationProvider>{children}</OrganizationProvider>
      </CivilianProvider>
    </AuthProvider>
  );
}
