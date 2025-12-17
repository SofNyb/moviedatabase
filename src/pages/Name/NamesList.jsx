// src/pages/Names/NamesList.jsx
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { nameService } from "../../services/nameService";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Pagination from "../../Components/Pagination";
import ActorPhoto from "../../Components/ActorPhoto";

export default function NamesList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [names, setNames] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [detailedNames, setDetailedNames] = useState({});
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  const page = parseInt(searchParams.get("page") || "0", 10);
  const search = searchParams.get("search") || "";

  const handlePageChange = (newPage) => {
    if (search) {
      setSearchParams({ search, page: newPage.toString() });
    } else {
      setSearchParams({ page: newPage.toString() });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim(), page: "0" });
    } else {
      setSearchParams({ page: "0" });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchParams({ page: "0" });
  };

  useEffect(() => {
    setLoading(true);

    // If there's a search query, use find-names endpoint
    if (search) {
      nameService
        .findNames(search, 20)
        .then(async (data) => {
          const items = data || [];
          setNames(items);
          setTotalPages(1); // Search results don't have pagination

          // Fetch detailed info for each person
          const details = {};
          await Promise.all(
            items.map(async (person) => {
              try {
                const nconst = person.nconst;
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
    } else {
      // Regular paginated list
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
    }
  }, [page, search]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-5 text-start">
      <h1 className="h2 mb-4 text-center">All Names</h1>

      {/* Search Form */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <form onSubmit={handleSearch} className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
              Search
            </button>
            {search && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClearSearch}
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Search indicator */}
      {search && (
        <div className="text-center mb-3 text-muted">
          Showing results for: <strong>{search}</strong>
        </div>
      )}

      {names.length === 0 ? (
        <div className="container py-5 text-center text-muted">
          <p>No names found.</p>
        </div>
      ) : (
        <>
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
                        <h5 className="mb-1 fw-bold">
                          {person.name || person.primaryname}
                        </h5>
                        {details && (
                          <p className="mb-0 text-muted ">
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

          {!search && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
