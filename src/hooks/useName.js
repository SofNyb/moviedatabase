import { useState, useEffect } from "react";
import { getName, getNameProfession } from "../api/nameApi";

export function useName(nconst) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    Promise.all([
    getName(nconst),
    getNameProfession(nconst)
    ])
      .then(([nameResult, nameProfessionResult]) => {
        if (!cancelled) {
          setData({
            ...nameResult,
            professions: nameProfessionResult
          });
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
