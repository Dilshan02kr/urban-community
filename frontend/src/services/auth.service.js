import axiosInstance from "./axiosInstance";

const API_BASE_URL = "/api/users";

const headers = {
  "Content-Type": "application/json",
  Authorization: "",
};

const options = {
  headers: headers,
};

export const authService = {
  login: async (email, password) => {
    return await axiosInstance.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
  },
};
