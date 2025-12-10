import { useParams } from "react-router-dom";
import { useAkas } from "../hooks/useAkas";

function Akas() {
  const { tconst } = useParams();
  const { akas, hasMore, loadMore, loading } = useAkas(tconst);

  if (loading) return null;
  if (akas.length === 0) return null;

  return (
    <div className="my-4">
      <h4 className="border-bottom pb-2">Alternate Titles</h4>
      <div className="row">
        {akas.map((aka, i) => (
          <div key={i} className="col-md-6 mb-2">
            <p className="mb-0 fw-bold">{aka.title}</p>
            <p className="mb-0 text-muted small">
              {aka.region && `${aka.region}`}
              {aka.language && ` (${aka.language})`}
            </p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className="btn btn-sm btn-outline-secondary" onClick={loadMore}>
          Load More Titles
        </button>
      )}
    </div>
  );
}

export default Akas;
