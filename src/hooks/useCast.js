import { useState, useEffect } from "react";
import { getAllCast } from "../api/titleApi";

export function useCast(tconst) {
  const [cast, setCast] = useState([]);
  const [displayCount, setDisplayCount] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setCast([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getAllCast(tconst)
      .then(setCast)
      .finally(() => setLoading(false));
  }, [tconst]);

  const visibleCast = cast.slice(0, displayCount);
  const hasMore = displayCount < cast.length;
  const loadMore = () => setDisplayCount(c => c + 10);

  return { cast: visibleCast, hasMore, loadMore, loading, totalCount: cast.length };
}
