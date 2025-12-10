import { Link } from "react-router-dom";
import { useTitles } from "../hooks/useTitles";

function Titles() {
  const { titles, page, setPage, loading, error } = useTitles();

  if (loading) return <div className="container text-center my-5">Loading...</div>;
  if (error) return <div className="container text-center my-5 text-danger">Error: {error}</div>;

  return (
    <div className="container text-start">
      <h2 className="my-4">All Titles</h2>

      {titles.map((title) => {
        const tconst = title.url?.split("/").pop();
        return (
          <div key={title.url} className="row border-bottom py-3">
            <div className="col-auto">
              <img
                src={title.poster}
                alt={title.primaryTitle}
                className="img-thumbnail"
                style={{ width: "100px" }}
              />
            </div>
            <div className="col">
              <h5>
                <Link to={`/title/${tconst}`} className="text-decoration-none">
                  {title.primaryTitle}
                </Link>
              </h5>
              <p className="mb-2 text-muted">
                {title.releaseDate?.split("-")[0]} • {title.titleType}
              </p>
              <div className="d-flex align-items-center gap-2">
                <button className="btn btn-sm btn-outline-primary">Rate</button>
                <button className="btn btn-sm btn-outline-secondary">Bookmark</button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="my-4">
        <button
          className="btn btn-primary me-2"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Titles;
