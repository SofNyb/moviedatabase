// src/pages/Titles/Titles.jsx
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { titleService } from "../../services/titleService";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Poster from "../../Components/Poster";
import Pagination from "../../Components/Pagination";
import { ExtractYear } from "../../Components/FormatDate";

export default function Titles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [titles, setTitles] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const currentPage = parseInt(searchParams.get("page") || "0", 10);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    titleService
      .getTitles(currentPage, 20)
      .then((data) => {
        setTitles(data.items || []);
        setTotalPages(data.numberOfPages || 1);
      })
      .catch((err) => {
        if (!err.name === "CancelledError") {
          console.error(err);
          setTitles([]);
          setTotalPages(1);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [currentPage]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-5">
      <h1 className="h2 mb-5 text-center">All Titles</h1>

      {titles.length === 0 ? (
        <div className="text-center text-muted py-5">No titles found.</div>
      ) : (
        <>
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {titles.map((title) => {
              const tconst = title.tconst || title.url?.split("/").pop();
              const year = ExtractYear(title.startYear || title.releaseDate);
              const titleType = title.titleType
                ? title.titleType.charAt(0).toUpperCase() +
                  title.titleType.slice(1)
                : "";

              return (
                <div className="col" key={tconst}>
                  <Link
                    to={`/titles/${tconst}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="d-flex shadow-sm rounded overflow-hidden bg-white h-100">
                      <div style={{ width: 140, height: 207, flexShrink: 0 }}>
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
                      <div className="p-4 d-flex flex-column justify-content-center">
                        <h5 className="fw-bold mb-1">{title.primaryTitle}</h5>
                        <p className="text-muted mb-0">
                          {year || "Unknown release date"} • {titleType}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
