import { useParams, Link } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import Cast from "./Cast";
import Genre from "./Genre";
import Episode from "./Episode";
import Award from "./Award";
import Akas from "./Akas";
import Principals from "./Principals";
import OverallRating from "./OverallRating";

function Title() {
  const { tconst } = useParams();
  const { title, loading, averageRating } = useTitle(tconst);

  if (loading) return <div className="container my-5 text-center">Loading...</div>;
  if (!title) return <div className="container my-5 text-center">Title not found</div>;

  return (
    <div className="container text-start my-4">
      <Link to="/titles" className="btn btn-sm btn-outline-primary mb-4">← Back to titles</Link>

      <div className="row">
        <div className="col-md-8">
          <h1>{title.primaryTitle}</h1>
          {title.originalTitle && title.originalTitle !== title.primaryTitle && (
            <h5 className="text-muted">{title.originalTitle}</h5>
          )}

          <div className="d-flex align-items-center gap-3 my-3">
            <span className="fw-bold">Rating ⭐ {averageRating}</span>
            <button className="btn btn-sm btn-outline-primary">Rate yourself</button>
            <button className="btn btn-sm btn-outline-secondary">Bookmark</button>
          </div>

          <p className="mb-2">
            {title.releaseDate?.split("-")[0]} • {title.titleType}
            {title.runtimeMinutes && ` • ${title.runtimeMinutes} min`}
          </p>

          {title.plot && <p className="my-4 lead">{title.plot}</p>}

          <Cast />
          <Principals />
          <Genre />
          <Episode />
          <Award />
          <Akas />
          <OverallRating />
        </div>

        <div className="col-md-4">
          {title.poster ? (
            <img src={title.poster} alt={title.primaryTitle} className="img-fluid rounded shadow" />
          ) : (
            <div className="bg-light border rounded d-flex align-items-center justify-content-center text-muted"
                 style={{ height: "600px" }}>
              <span className="fs-4">No Poster Available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Title;
