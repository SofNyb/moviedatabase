import { useParams } from "react-router-dom";
import { useCast } from "../hooks/useCast";

function Cast() {
  const { tconst } = useParams();
  const { cast, hasMore, loadMore, loading } = useCast(tconst);

  if (loading) return null;
  if (cast.length === 0) return null;

  return (
    <div className="my-4">
      <h4 className="border-bottom pb-2">Cast</h4>
      <div className="row">
        {cast.map((actor, i) => (
          <div key={i} className="col-md-6 mb-2">
            <p className="mb-0 fw-bold">{actor.name}</p>
            <p className="mb-0 text-muted small">{actor.characters}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className="btn btn-sm btn-outline-secondary" onClick={loadMore}>
          Load More Cast
        </button>
      )}
    </div>
  );
}

export default Cast;
