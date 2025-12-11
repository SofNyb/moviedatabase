import api from "./api";

// Name/Person services
export const nameService = {
  // Get all names with pagination
  getNames: async (page = 0, pageSize = 10) => {
    const response = await api.get("/api/names", { params: { page, pageSize } });
    return response.data;
  },

  // Get single name by nconst
  getNameById: async (nconst) => {
    const response = await api.get(`/api/names/${nconst}`);
    return response.data;
  },

  // Get person's known for titles
  getKnownFor: async (nconst) => {
    const response = await api.get(`/api/names/${nconst}/knownfor`);
    return response.data;
  },

  // Get person's professions
  getProfessions: async (nconst) => {
    const response = await api.get(`/api/names/${nconst}/profession`);
    return response.data;
  },

  // Get person's roles
  getRoles: async (nconst) => {
    const response = await api.get(`/api/names/${nconst}/role`);
    return response.data;
  },

  // Search names
  searchNames: async (query) => {
    const response = await api.get("/api/names/search", {
      params: { q: query },
    });
    return response.data;
  },

  // Inside your existing nameService object — add this:
  getAllTitlesByPerson: async (imdbId) => {
    const response = await api.get(`/api/names/${imdbId}/titles`);
    return response.data || [];
  },
};
