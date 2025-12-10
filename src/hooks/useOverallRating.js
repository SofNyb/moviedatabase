import { useState, useEffect } from "react";
import { getOverallRating } from "../api/titleApi";

export function useOverallRating(tconst) {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setRating(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getOverallRating(tconst)
      .then(setRating)
      .finally(() => setLoading(false));
  }, [tconst]);

  return { rating, loading };
}
