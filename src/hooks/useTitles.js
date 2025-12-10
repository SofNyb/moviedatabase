import { useState, useEffect } from "react";
import { getTitles } from "../api/titleApi";

export function useTitles(initialPage = 0) {
  const [titles, setTitles] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    getTitles(page)
      .then((data) => setTitles(data.items || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page]);

  return { titles, page, setPage, loading, error };
}
