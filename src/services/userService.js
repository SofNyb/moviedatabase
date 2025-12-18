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
  addTitleBookmark: async (tconst) => {
    const response = await api.post("/api/functions/bookmarks/title", {
      tconst,
    });
    return response.data;
  },

  // Add name bookmark
  addNameBookmark: async (nconst) => {
    const response = await api.post("/api/functions/bookmarks/name", {
      nconst,
    });
    return response.data;
  },

  // Remove title bookmark
  removeTitleBookmark: async (tconst) => {
    const response = await api.delete("/api/functions/bookmarks/title", {
      tconst,
    });
    return response.data;
  },

  // Remove name bookmark
  removeNameBookmark: async (nconst) => {
    const response = await api.delete("/api/functions/bookmarks/name", {
      nconst,
    });
    console.log(response);
    return response.data;
  },

  // Get user ratings
  getRatings: async () => {
    const response = await api.get("/api/person/ratings");
    return response.data;
  },

  // Add/Update rating
  rateTitle: async (tconst, rating) => {
    await api.post("/api/functions/rate", {
      Rating: parseInt(rating, 10),
      Tconst: tconst,
    });
  },

  getSearchHistory: async () => {
    const response = await api.get("/api/person/searchhistory");
    return response.data;
  },
};
