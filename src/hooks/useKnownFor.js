// src/hooks/useKnownFor.js
import { useState, useEffect } from "react";
import { getKnownFor } from "../api/nameApi";

export function useKnownFor(imdbId) {
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

    getKnownFor(imdbId)
      .then(res => { if (!cancelled) setData(res); })
      .catch(err => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true };
  }, [imdbId]);

  return { data, loading, error };
}
