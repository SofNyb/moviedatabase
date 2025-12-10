import { useParams } from "react-router-dom";
import { useEpisodes } from "../hooks/useEpisodes";

function Episode() {
  const { tconst } = useParams();
  const { episodes, hasMore, loadMore, loading } = useEpisodes(tconst);

  if (loading || episodes.length === 0) return null;

  return (
    <div className="my-4">
      <h4 className="border-bottom pb-2">Episodes</h4>
      <div className="row">
        {episodes.map((episode, i) => (
          <div key={i} className="col-md-6 mb-2">
            <p className="mb-0 fw-bold">{episode.primaryTitle}</p>
            <p className="mb-0 text-muted small">
              Season {episode.seasonNumber}, Episode {episode.episodeNumber}
            </p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className="btn btn-sm btn-outline-secondary" onClick={loadMore}>
          Load More Episodes
        </button>
      )}
    </div>
  );
}

export default Episode;
