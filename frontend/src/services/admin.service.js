import axiosInstance from "./axiosInstance";
import { getSessionValue } from "@/utils/session";

const ADMIN_URL = "/api/admin";
const RECYCLING_URL = "/api/recycling";

const getAdminHeaders = () => ({
  Authorization: `Bearer ${getSessionValue("accessToken")}`,
});

export const adminService = {
  // Auth
  login: async (email, password) => {
    return await axiosInstance.post(`${ADMIN_URL}/login`, { email, password });
  },

  register: async (data) => {
    return await axiosInstance.post(`${ADMIN_URL}/register`, data);
  },

  // Recycling Centers (admin)
  createCenter: async (data) => {
    return await axiosInstance.post(`${RECYCLING_URL}/centers`, data, {
      headers: getAdminHeaders(),
    });
  },

  updateCenter: async (id, data) => {
    return await axiosInstance.put(`${RECYCLING_URL}/centers/${id}`, data, {
      headers: getAdminHeaders(),
    });
  },

  deleteCenter: async (id) => {
    return await axiosInstance.delete(`${RECYCLING_URL}/centers/${id}`, {
      headers: getAdminHeaders(),
    });
  },

  // Pickup Requests (admin)
  getAllPickupRequests: async () => {
    return await axiosInstance.get(`${RECYCLING_URL}/pickups`, {
      headers: getAdminHeaders(),
    });
  },

  updatePickupStatus: async (id, status) => {
    return await axiosInstance.put(
      `${RECYCLING_URL}/pickups/${id}/status`,
      { status },
      { headers: getAdminHeaders() },
    );
  },

  // Recycling Centers (public read)
  getAllCenters: async () => {
    return await axiosInstance.get(`${RECYCLING_URL}/centers`);
  },
};
