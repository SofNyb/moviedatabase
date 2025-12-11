// src/components/Award.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { titleService } from "../services/titleService";

export default function Award() {
  const { tconst } = useParams();
  const [awards, setAwards] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setLoading(false);
      return;
    }
    setLoading(true);
    titleService
      .getAwards(tconst)
      .then((data) => setAwards(data))
      .catch(() => setAwards(null))
      .finally(() => setLoading(false));
  }, [tconst]);

  if (loading || !awards?.awardInfo) return null;

  return (
    <div className="my-5">
      <h4 className="border-bottom pb-2 mb-3">Awards</h4>
      <p className="lead">{awards.awardInfo}</p>
    </div>
  );
}
