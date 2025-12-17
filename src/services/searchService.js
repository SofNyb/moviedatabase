// src/services/searchService.js
import api from "./api";

const searchService = {
  searchTitles: async (query, limit = 50) => {
    if (!query?.trim()) {
      return { titles: [], total: 0 };
    }
    const res = await api.get("/api/functions/string-search", {
      params: {
        searchString: query.trim(),
        limit,
      },
    });
    const titles = Array.isArray(res.data) ? res.data : [];
    return {
      titles,
      total: titles.length,
    };
  },

  // Advanced structured search – titles only
  advancedSearch: async ({ title, plot, character, person, limit = 50 }) => {
    const params = {
      titleText: title?.trim() || undefined,
      plotText: plot?.trim() || undefined,
      characterText: character?.trim() || undefined,
      personText: person?.trim() || undefined,
      limit,
    };
    const res = await api.get("/api/functions/structured-search", { params });
    const titles = Array.isArray(res.data) ? res.data : [];
    return {
      titles,
      total: titles.length,
    };
  },

  // Exact match search
  exactMatch: async (input, limit = 50) => {
    if (!input?.trim()) {
      return { titles: [], total: 0 };
    }
    const res = await api.get("/api/functions/exact-match", {
      params: {
        input: input.trim(),
        limit,
      },
    });
    const titles = Array.isArray(res.data) ? res.data : [];
    return {
      titles,
      total: titles.length,
    };
  },

  // Best match search with keywords
  bestMatch: async (query, limit = 50) => {
    if (!query?.trim()) {
      return { titles: [], total: 0 };
    }
    // Convert space-separated words to comma-separated keywords
    const keywords = query.trim().replace(/\s+/g, ",");
    const res = await api.get("/api/functions/best-match", {
      params: {
        keywords,
        limit,
      },
    });
    const titles = Array.isArray(res.data) ? res.data : [];
    return {
      titles,
      total: titles.length,
    };
  },
};

export default searchService;
