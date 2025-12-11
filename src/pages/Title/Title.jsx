// src/pages/Title/Title.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { titleService } from "../../services/titleService";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Poster from "../../Components/Poster";
import Cast from "../../Components/Cast";
import Genre from "../../Components/Genre";
import Episode from "../../Components/Episode";
import Award from "../../Components/Award";
import Akas from "../../Components/Akas";
import OverallRating from "../../Components/OverallRating";
import BookmarkButton from "../../Components/BookmarkButton";
import RateButton from "../../Components/RateButton";

export default function Title() {
  const { tconst } = useParams();
  const [title, setTitle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setLoading(false);
      return;
    }

    setLoading(true);
    titleService
      .getTitleById(tconst)
      .then((data) => setTitle(data))
      .catch((err) => {
        console.error("Failed to load title:", err);
        setTitle(null);
      })
      .finally(() => setLoading(false));
  }, [tconst]);

  if (loading) return <LoadingSpinner />;
  if (!title)
    return <div className="container py-5 text-center">Title not found</div>;

  const year = title.startYear || title.releaseDate?.slice(0, 4);
  const averageRating = title.overallRating
    ? (title.overallRating.rating / title.overallRating.votes).toFixed(1)
    : "N/A";

  return (
    <div className="container text-start my-4">
      <Link to="/titles" className="btn btn-sm btn-outline-primary mb-4">
        ← Back to titles
      </Link>

      <div className="row">
        <div className="col-md-8">
          <h1>{title.primaryTitle}</h1>
          {title.originalTitle &&
            title.originalTitle !== title.primaryTitle && (
              <h5 className="text-muted">{title.originalTitle}</h5>
            )}

          <div className="d-flex align-items-center gap-3 my-3">
            <span className="fw-bold">Rating ⭐ {averageRating}</span>
            <RateButton tconst={tconst} />
            <BookmarkButton tconst={tconst} />
          </div>

          <p className="mb-2">
            {title.releaseDate?.split("-")[0]} • {title.titleType}
            {title.runtimeMinutes && ` • ${title.runtimeMinutes} min`}
          </p>

          {title.plot && <p className="my-4 lead">{title.plot}</p>}

          <Cast />
          <Genre />
          <Episode />
          <Award />
          <Akas />
          <OverallRating />
        </div>

        <div className="col-md-4">
          {title.poster ? (
            <img
              src={title.poster}
              alt={title.primaryTitle}
              className="img-fluid rounded shadow"
            />
          ) : (
            <div
              className="bg-light border rounded d-flex align-items-center justify-content-center text-muted"
              style={{ height: "600px" }}
            >
              <span className="fs-4">No Poster Available</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
