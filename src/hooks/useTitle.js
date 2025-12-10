import { useState, useEffect } from "react";
import { getTitle } from "../api/titleApi";

export function useTitle(tconst) {
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setTitle(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getTitle(tconst)
      .then(setTitle)
      .finally(() => setLoading(false));
  }, [tconst]);

  const averageRating = title?.overallRating?.rating && title?.overallRating?.votes
    ? (title.overallRating.rating / title.overallRating.votes).toFixed(1)
    : "N/A";

  return { title, loading, averageRating };
}
