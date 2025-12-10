import { useState, useEffect } from "react";
import { getPrincipals } from "../api/titleApi";

export function usePrincipals(tconst) {
  const [principals, setPrincipals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setPrincipals([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    getPrincipals(tconst)
      .then(setPrincipals)
      .finally(() => setLoading(false));
  }, [tconst]);

  return { principals, loading };
}
