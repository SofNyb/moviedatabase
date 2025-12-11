// src/components/Episode.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { titleService } from "../services/titleService";

export default function Episode() {
  const { tconst } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setEpisodes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    titleService
      .getEpisodes(tconst)
      .then((data) => setEpisodes(data || []))
      .catch(() => setEpisodes([]))
      .finally(() => setLoading(false));
  }, [tconst]);

  // Hide completely if loading or no episodes (most movies have none)
  if (loading || episodes.length === 0) return null;

  const visibleEpisodes = episodes.slice(0, displayCount);
  const hasMore = displayCount < episodes.length;

  return (
    <div className="my-5">
      <h4 className="border-bottom pb-2 mb-3">
        Episodes <span className="text-muted fs-6">({episodes.length})</span>
      </h4>

      <div className="row g-3">
        {visibleEpisodes.map((ep, i) => (
          <div key={i} className="col-md-6">
            <p className="mb-0 fw-semibold">
              S{ep.seasonNumber}E{ep.episodeNumber} – {ep.primaryTitle}
            </p>
            {ep.plot && <p className="mb-0 text-muted small">{ep.plot}</p>}
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          className="btn btn-sm btn-outline-secondary mt-3"
          onClick={() => setDisplayCount(c => c + 10)}
        >
          Show more episodes
        </button>
      )}
    </div>
  );
}
