import api from "./api";

// Auth services
export const authService = {
  login: async (email, password) => {
    const response = await api.post("/api/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  },

  register: async (email, password) => {
    const response = await api.post("/api/auth/register", { email, password });
    return response.data;
  },

  delete: async (email, password) => {
    const response = await api.post("/api/auth/delete", { email, password });
    localStorage.removeItem("token");
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: async () => {
    const response = await api.get("/api/person");
    return response.data;
  },
};
