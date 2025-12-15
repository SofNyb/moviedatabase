// src/services/searchService.js
import api from "./api";

const searchService = {
  searchTitles: async (query, page = 1) => {
    if (!query?.trim()) {
      return { titles: [], total: 0 };
    }

    const res = await api.get("/api/functions/string-search", {
      params: {
        searchString: query.trim(),
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
    const body = {
      TitleText: title?.trim() || null,
      PlotText: plot?.trim() || null,
      CharacterText: character?.trim() || null,
      PersonText: person?.trim() || null,
      Limit: limit,
      PersonId: 0 // JWT supplies real PersonId
    };

    const res = await api.post("/api/functions/structured-search", body);

    const titles = Array.isArray(res.data) ? res.data : [];

    return {
      titles,
      total: titles.length
    };
  },
};


export default searchService;
