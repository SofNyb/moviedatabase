import { useState, useEffect } from "react";
import { getNameTitles } from "../api/nameApi";

export function useNameTitles(nconst) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    getName(nconst)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; }; // cleanup on unmount or nconst change
  }, [nconst]);

  return { data, loading, error };
}

