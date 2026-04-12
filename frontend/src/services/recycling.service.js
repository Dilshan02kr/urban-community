import axiosInstance from "./axiosInstance";
import { getSessionValue } from "@/utils/session";

const API_BASE_URL = "/api/recycling";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getSessionValue("accessToken")}`,
});

export const recyclingService = {
  searchCenters: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.append("search", params.search);
    if (params.city) query.append("city", params.city);
    if (params.wasteType) query.append("wasteType", params.wasteType);
    const qs = query.toString();
    return await axiosInstance.get(
      `${API_BASE_URL}/centers${qs ? `?${qs}` : ""}`,
    );
  },

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
