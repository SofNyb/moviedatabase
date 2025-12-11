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
  const [detailedNames, setDetailedNames] = useState({});

  useEffect(() => {
    setLoading(true);
    nameService
      .getNames(page, 20)
      .then(async (data) => {
        const items = data.items || [];
        setNames(items);
        setTotalPages(data.numberOfPages || 1);

        // Fetch detailed info for each person
        const details = {};
        await Promise.all(
          items.map(async (person) => {
            try {
              const nconst = person.url?.split("/").pop() || person.nconst;
              const [fullData, professions] = await Promise.all([
                nameService.getNameById(nconst),
                nameService.getProfessions(nconst),
              ]);
              details[nconst] = {
                ...fullData,
                professions: professions,
              };
            } catch (error) {
              console.error("Error fetching person details:", error);
            }
          })
        );
        setDetailedNames(details);
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
    <div className="container py-5 text-start">
      <h1 className="h2 mb-5 text-center">All Names</h1>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {names.map((person) => {
          const nconst = person.url?.split("/").pop() || person.nconst;
          const details = detailedNames[nconst];
          const birthYear = details?.birthYear;
          const profession = details?.professions?.[0]?.name;
          const professionName = profession
            ? profession.charAt(0).toUpperCase() + profession.slice(1)
            : null;

          return (
            <div className="col" key={nconst}>
              <Link
                to={`/names/${nconst}`}
                className="text-decoration-none text-dark"
              >
                <div className="d-flex shadow-sm rounded overflow-hidden bg-white hover-shadow transition h-100">
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
                    {details && (
                      <p className="mb-0 text-muted small">
                        {birthYear ? `Born ${birthYear}` : "Birth year unknown"}
                        {birthYear && professionName && " • "}
                        {professionName}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </div>
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
