import api from "./api";

// User/Person profile services
export const userService = {
  // Get user profile by ID
  getUserProfile: async (userId) => {
    const response = await api.get(`/api/person/${userId}`);
    return response.data;
  },

  // Get logged-in user's profile
  getCurrentUserProfile: async () => {
    const response = await api.get("/api/person");
    return response.data;
  },

  // Get user's title bookmarks
  getTitleBookmarks: async () => {
    const response = await api.get("/api/person/bookmarks");
    return response.data;
  },

  // Get user's name bookmarks
  getNameBookmarks: async () => {
    const response = await api.get("/api/person/name_bookmarks");
    return response.data;
  },

  // Add title bookmark
  addTitleBookmark: async (userId, tconst) => {
    const response = await api.post("/api/functions/bookmarks/title", {
      userId,
      tconst,
    });
    return response.data;
  },

  // Add name bookmark
  addNameBookmark: async (userId, nconst) => {
    const response = await api.post("/api/functions/bookmarks/name", {
      userId,
      nconst,
    });
    return response.data;
  },

  // Remove title bookmark
  removeTitleBookmark: async (userId, tconst) => {
    const response = await api.delete("/api/functions/bookmarks/title", {
      data: { userId, tconst },
    });
    return response.data;
  },

  // Remove name bookmark
  removeNameBookmark: async (userId, nconst) => {
    const response = await api.delete("/api/functions/bookmarks/name", {
      data: { userId, nconst },
    });
    return response.data;
  },

  // Get user ratings
  getRatings: async () => {
    const response = await api.get("/api/person/ratings");
    return response.data;
  },

  // Add/Update rating
  rateTitle: async (personId, tconst, rating) => {
    const response = await api.post("/api/functions/rate", {
      personId,
      tconst,
      rating,
    });
    return response.data;
  },

  // Get search history
  getSearchHistory: async () => {
    const response = await api.get("/api/person/searchhistory");
    return response.data;
  },
};
