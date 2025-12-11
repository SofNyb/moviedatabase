// src/components/Cast.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { titleService } from "../services/titleService";
import { Link } from "react-router-dom";

export default function Cast() {
  const { tconst } = useParams();
  const [cast, setCast] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setCast([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    titleService
      .getAllCast(tconst)
      .then((data) => setCast(data || []))
      .catch(() => setCast([]))
      .finally(() => setLoading(false));
  }, [tconst]);

  if (loading || cast.length === 0) return null;

  const visibleCast = cast.slice(0, displayCount);
  const hasMore = displayCount < cast.length;

  return (
    <div className="my-5">
      <h4 className="border-bottom pb-2 mb-3">
        Cast <span className="text-muted fs-6">({cast.length})</span>
      </h4>

      <div className="row g-3">
        {visibleCast.map((actor, i) => (

          <div key={i} className="col-md-6">
                      <Link
              key={i}
              to={`/names/${actor.url.split('/').pop()}`}
              className="text-decoration-none text-dark"
            >

            <p className="mb-0 fw-semibold">{actor.name}</p>
            <p className="mb-0 text-muted small">{actor.characters || "—"}</p>
    </Link>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          className="btn btn-sm btn-outline-secondary mt-3"
          onClick={() => setDisplayCount(c => c + 10)}
        >
          Show more cast
        </button>
      )}
    </div>
  );
}
