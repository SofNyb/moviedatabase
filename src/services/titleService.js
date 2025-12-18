import api from "./api";

// Title/Movie services
export const titleService = {
  // Get all titles with pagination
  getTitles: async (page = 0, pageSize = 10) => {
    const response = await api.get("/api/titles", { params: { page, pageSize } });
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
    const response = await api.get(`/api/titles/${tconst}/genres`);
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

  getAkas: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/akas`);
    return response.data || []; 
  },

  getAwards: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/awards`);
    return response.data;
  },

  getAllCast: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/allcast`);
    return response.data || [];
  },

    getOverallRating: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/overallrating`);
    return response.data; 
  },

  getEpisodes: async (tconst) => {
    const response = await api.get(`/api/titles/${tconst}/episodes`);
    return response.data || []; 
  },

  getRelatedMovies: async (tconst, limit = 10) => {
    const response = await api.get(`/api/functions/related-movies`, {
      params: { tconst, limit }
    });
    return response.data;
  },

  deleteRating: async (tconst) => {
    const response = await api.delete(`/api/titles/ratings/${tconst}`);
    return response.data;
  },
};
