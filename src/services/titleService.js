import api from "./api";

// Title/Movie services
export const titleService = {
  // Get all titles with pagination
  getTitles: async (page = 1, limit = 20) => {
    const response = await api.get("/api/titles", { params: { page, limit } });
    return response.data;
  },

  // Get single title by tconst
  getTitleById: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}`);
    return response.data;
  },

  // Get title cast
  getTitleCast: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/cast`);
    return response.data;
  },

  // Get title genres
  getTitleGenres: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/genre`);
    return response.data;
  },

  // Get title episodes
  getTitleEpisodes: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/episode`);
    return response.data;
  },

  // Get title awards
  getTitleAwards: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/award`);
    return response.data;
  },

  // Get title overall rating
  getTitleRating: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/overallrating`);
    return response.data;
  },

  // Get title principals
  getTitlePrincipals: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/principals`);
    return response.data;
  },

  // Search titles
  searchTitles: async (query) => {
    const response = await api.get("/api/titles/search", {
      params: { q: query },
    });
    return response.data;
  },
};
