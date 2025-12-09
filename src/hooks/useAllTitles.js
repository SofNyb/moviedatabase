import { useState, useEffect } from "react";
import { getAllTitles } from "../api/nameApi";

export function useAllTitles(imdbId) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdbId) {
      setError("No IMDb ID");
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    getAllTitles(imdbId)
      .then(res => { if (!cancelled) setData(res); })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true };
  }, [imdbId]);

  return { data, loading, error };
}
