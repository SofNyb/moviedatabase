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
    const user = await userService.getCurrentUserProfile();
    const response = await api.post("/api/functions/bookmarks/title", {
      tconst,
      UserId: user.url.split("/").pop(),
    });
    return response.data;
  },

  // Add name bookmark
  addNameBookmark: async (nconst) => {
    const user = await userService.getCurrentUserProfile();
    const response = await api.post("/api/functions/bookmarks/name", {
      nconst,
      UserId: user.url.split("/").pop(),
    });
    return response.data;
  },

  // Remove title bookmark
  removeTitleBookmark: async (tconst) => {
    const user = await userService.getCurrentUserProfile();
    const response = await api.delete("/api/functions/bookmarks/title", {
      tconst,
      UserId: user.url.split("/").pop(),
    });
    return response.data;
  },

  // Remove name bookmark
  removeNameBookmark: async (nconst) => {
    const user = await userService.getCurrentUserProfile();
    const response = await api.delete("/api/functions/bookmarks/name", {
      nconst,
      UserId: user.url.split("/").pop(),
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
    const user = await userService.getCurrentUserProfile();
    await api.post("/api/functions/rate", {
      Rating: parseInt(rating, 10),
      Tconst: tconst,
      PersonId: user.url.split("/").pop(),
    });
  },

  getSearchHistory: async () => {
    const response = await api.get("/api/person/searchhistory");
    return response.data;
  },
};
