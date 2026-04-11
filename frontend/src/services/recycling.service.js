import axiosInstance from "./axiosInstance";
import { getSessionValue } from "@/utils/session";

const API_BASE_URL = "/api/recycling";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getSessionValue("accessToken")}`,
});

export const recyclingService = {
  createPickupRequest: async (data) => {
    return await axiosInstance.post(`${API_BASE_URL}/request-pickup`, data, {
      headers: getAuthHeaders(),
    });
  },

  getMyPickupRequests: async () => {
    return await axiosInstance.get(`${API_BASE_URL}/pickups/my`, {
      headers: getAuthHeaders(),
    });
  },
};
