// src/components/NameTitles.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { nameService } from "../services/nameService";
import LoadingSpinner from "./LoadingSpinner";
import Poster from "./Poster";
import FormatDate from "./FormatDate";

const POSTER_WIDTH = 182;
const POSTER_HEIGHT = 268;

const capitalizeFirst = (str) => {
  if (!str) return null;
  // Split camelCase or PascalCase into words
  const words = str.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  // Capitalize first letter of each word
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default function NameTitles({ imdbId }) {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imdbId) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    nameService
      .getAllTitlesByPerson(imdbId)
      .then((data) => !cancelled && setTitles(Array.isArray(data) ? data : []))
      .catch(() => !cancelled && setTitles([]))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [imdbId]);

  if (loading) return <LoadingSpinner />;

  if (titles.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <p className="mb-1">No credits found</p>
        <small>This person has no titles in our database yet.</small>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {titles.map((title) => {
        const tconst = title.url?.split("/").pop();

        return (
          <Link
            key={title.url}
            to={`/titles/${tconst}`}
            className="text-decoration-none text-dark"
          >
            <div className="d-flex shadow-sm rounded overflow-hidden bg-white hover-shadow transition">
              {/* Fixed-size poster */}
              <div
                style={{
                  width: POSTER_WIDTH,
                  height: POSTER_HEIGHT,
                  flexShrink: 0,
                  backgroundColor: "#f8f9fa",
                }}
              >
                <Poster
                  src={title.poster}
                  alt={title.primaryTitle}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Text content */}
              <div className="p-4 d-flex flex-column justify-content-center flex-grow-1">
                <h6 className="mb-1 fw-bold">{title.primaryTitle}</h6>
                <p className="mb-1 text-muted small">
                  {capitalizeFirst(title.titleType)}
                  {title.releaseDate && ` • ${FormatDate(title.releaseDate)}`}
                </p>
                {title.characters && (
                  <p className="mb-0 text-primary small fst-italic">
                    as {title.characters}
                  </p>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
