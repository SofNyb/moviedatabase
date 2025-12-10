import { useState, useEffect } from "react";
import { getAwards } from "../api/titleApi";

export function useAwards(tconst) {
  const [awards, setAwards] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setAwards(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    getAwards(tconst)
      .then(setAwards)
      .finally(() => setLoading(false));
  }, [tconst]);

  return { awards, loading };
}
