import { organizationService } from "@/services/organization.service";
import { setSession } from "@/utils/session";
import { createContext, useContext } from "react";

const OrganizationContext = createContext();

export function OrganizationProvider({ children }) {
  const register = async (formData) => {
    try {
      const res = await organizationService.register(formData);

      const data = res.data.data;
      if (res.status === 201) {
        setSession("accessToken", data.token);
        setSession("user", JSON.stringify(data.user));
      }
      return res.data;
    } catch (error) {
      throw (
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  };
  return (
    <OrganizationContext.Provider value={{ register }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error(
      "useOrganization must be used within a OrganizationProvider",
    );
  }
  return context;
};
