// src/pages/Names/NamesList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { nameService } from "../../services/nameService";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Pagination from "../../Components/Pagination";
import ActorPhoto from "../../Components/ActorPhoto";

export default function NamesList() {
  const [names, setNames] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    nameService
      .getNames(page, 20)
      .then((data) => {
        setNames(data.items || []);
        setTotalPages(data.numberOfPages || 1);
      })
      .catch(() => {
        setNames([]);
        setTotalPages(1);
      })
      .finally(() => setLoading(false));
  }, [page]);

  if (loading) return <LoadingSpinner />;

  if (names.length === 0) {
    return (
      <div className="container py-5 text-center text-muted">
        <p>No names found.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="h2 mb-5 text-center">All Names</h1>

      <div className="d-flex flex-column gap-4">
        {names.map((person) => {
          const nconst = person.url?.split("/").pop() || person.nconst;
          const year = person.birthYear;

          return (
            <Link
              key={nconst}
              to={`/names/${nconst}`}
              className="text-decoration-none text-dark"
            >
              <div className="d-flex shadow-sm rounded overflow-hidden bg-white hover-shadow transition">
                {/* This now shows real photos even when person.poster is null */}
                <div style={{ width: 140, height: 207, flexShrink: 0 }}>
                  <ActorPhoto
                    nconst={nconst}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    className="rounded-start"
                  />
                </div>

                <div className="p-4 flex-grow-1 d-flex flex-column justify-content-center">
                  <h5 className="mb-1 fw-bold">{person.name}</h5>
                  <p className="mb-0 text-muted small">
                    {year ? `Born ${year}` : "Birth year unknown"}
                    {person.professions?.length > 0 &&
                      ` • ${person.professions[0].name}`}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
}
