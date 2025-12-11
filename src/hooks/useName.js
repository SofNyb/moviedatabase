// src/hooks/useName.js
import { useState, useEffect } from "react";
import { nameService } from "../services/nameService";

export function useName(nconst) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!nconst) {
      setData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      nameService.getNameById(nconst),
      nameService.getProfessions(nconst),
    ])
      .then(([nameResult, professionsResult]) => {
        if (!cancelled) {
          setData({
            ...nameResult,
            professions: professionsResult || [],
          });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Failed to load person");
          setData(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nconst]);

  return { data, loading, error };
}
