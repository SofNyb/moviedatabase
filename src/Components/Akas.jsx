// src/components/Akas.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { titleService } from "../services/titleService";

export default function Akas() {
  const { tconst } = useParams();
  const [akas, setAkas] = useState([]);
  const [displayCount, setDisplayCount] = useState(6); // show 6 initially (looks better)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setAkas([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    titleService
      .getAkas(tconst)
      .then((data) => setAkas(data || []))
      .catch(() => setAkas([]))
      .finally(() => setLoading(false));
  }, [tconst]);

  // Hide entirely while loading or if no AKAs
  if (loading || akas.length === 0) return null;

  const visibleAkas = akas.slice(0, displayCount);
  const hasMore = displayCount < akas.length;

  return (
    <div className="my-5">
      <h4 className="border-bottom pb-2 mb-3">Alternate Titles ({akas.length})</h4>

      <div className="row g-3">
        {visibleAkas.map((aka, i) => (
          <div key={i} className="col-md-6">
            <p className="mb-0 fw-semibold">{aka.title}</p>
            <p className="mb-0 text-muted small">
              {aka.region && `${aka.region}`}
              {aka.language && ` • ${aka.language}`}
              {aka.types && ` • ${aka.types}`}
            </p>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          className="btn btn-sm btn-outline-secondary mt-3"
          onClick={() => setDisplayCount(c => c + 6)}
        >
          Show more titles
        </button>
      )}
    </div>
  );
}
