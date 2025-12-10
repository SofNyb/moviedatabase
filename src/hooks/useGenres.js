import { useState, useEffect } from "react";
import { getGenres } from "../api/titleApi";

export function useGenres(tconst) {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setGenres([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getGenres(tconst)
      .then(setGenres)
      .finally(() => setLoading(false));
  }, [tconst]);

  return { genres, loading };
}
