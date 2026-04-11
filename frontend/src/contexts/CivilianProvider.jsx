import { civilianService } from "@/services/civilian.service";
import { setSession } from "@/utils/session";
import { createContext, useContext } from "react";

const CivilianContext = createContext();

export function CivilianProvider({ children }) {

  const register = async (formData) => {
    try {
      const res = await civilianService.register(formData);

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
    <CivilianContext.Provider value={{ register }}>
      {children}
    </CivilianContext.Provider>
  );
}

export const useCivilian = () => {
  const context = useContext(CivilianContext);
  if (!context) {
    throw new Error("useCivilian must be used within a CivilianProvider");
  }
  return context;
};
