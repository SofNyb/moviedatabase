import { useState, useEffect } from "react";
import { getEpisodes } from "../api/titleApi";

export function useEpisodes(tconst) {
  const [episodes, setEpisodes] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setEpisodes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getEpisodes(tconst)
      .then(setEpisodes)
      .finally(() => setLoading(false));
  }, [tconst]);

  const visibleEpisodes = episodes.slice(0, displayCount);
  const hasMore = displayCount < episodes.length;
  const loadMore = () => setDisplayCount(c => c + 10);

  return { episodes: visibleEpisodes, hasMore, loadMore, loading };
}
