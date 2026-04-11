import axiosInstance from "./axiosInstance";
import { getSessionValue } from "@/utils/session";

const API_BASE_URL = "/api/issues";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getSessionValue("accessToken")}`,
});

/**
 * Create issue — multipart: fields title, description, category, location; optional file field "image".
 * Strips default JSON Content-Type so the browser can set multipart boundaries.
 */
export const issueService = {
  createIssue: async (formData) => {
    return await axiosInstance.post(`${API_BASE_URL}/create`, formData, {
      headers: getAuthHeaders(),
      transformRequest: [
        (data, headers) => {
          if (data instanceof FormData) {
            delete headers["Content-Type"];
          }
          return data;
        },
      ],
    });
  },

  getIssuesByUser: async (userId) => {
    return await axiosInstance.get(`${API_BASE_URL}/user/${userId}`, {
      headers: getAuthHeaders(),
    });
  },
};
