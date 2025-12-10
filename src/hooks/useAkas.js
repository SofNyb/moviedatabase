import { useState, useEffect } from "react";
import { getAkas } from "../api/titleApi";

export function useAkas(tconst) {
  const [akas, setAkas] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setAkas([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getAkas(tconst)
      .then(setAkas)
      .finally(() => setLoading(false));
  }, [tconst]);

  const visibleAkas = akas.slice(0, displayCount);
  const hasMore = displayCount < akas.length;
  const loadMore = () => setDisplayCount(c => c + 4);

  return { akas: visibleAkas, hasMore, loadMore, loading, totalCount: akas.length };
}
