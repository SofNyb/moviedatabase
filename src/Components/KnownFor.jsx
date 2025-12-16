// src/Components/KnownFor.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { nameService } from "../services/nameService";
import LoadingSpinner from "./LoadingSpinner";
import FormatDate from "./FormatDate";

export default function KnownFor({ imdbId }) {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imdbId) {
      setLoading(false);
      return;
    }

    let isCancelled = false;
    setLoading(true);

    nameService
      .getKnownFor(imdbId)
      .then((data) => {
        if (!isCancelled) {
          setTitles(Array.isArray(data) ? data : []);
        }
      })
      .catch(() => {
        if (!isCancelled) setTitles([]);
      })
      .finally(() => {
        if (!isCancelled) setLoading(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [imdbId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (titles.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <p className="mb-1">No "Known For" titles</p>
        <small>This person isn't associated with major titles yet.</small>
      </div>
    );
  }

  return (
    <div className="row g-3 g-md-4">
      {titles.map((title) => {
        const tconst = title.url?.split("/").pop();
        const formattedDate = title.releaseDate
          ? FormatDate(title.releaseDate)
          : null;

        return (
          <div key={title.url} className="col-6 col-sm-4 col-md-3 col-lg-2">
            <Link
              to={`/titles/${tconst}`}
              className="text-decoration-none text-dark d-block rounded overflow-hidden shadow-sm hover-shadow transition"
            >
              <img
                src={title.poster || "/poster-placeholder.jpg"}
                alt={title.primaryTitle}
                className="w-100"
                style={{ height: "220px", objectFit: "cover" }}
              />
              <div className="p-2 bg-white">
                <div className="fw-bold small text-truncate">
                  {title.primaryTitle}
                </div>
                {formattedDate && (
                  <div className="text-muted small">{formattedDate}</div>
                )}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
