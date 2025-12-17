import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import searchService from "../../services/searchService";
import TitleCard from "../BookmarkRating/TitleCard";
import Poster from "../../components/Poster";
import ActorPhoto from "../../components/ActorPhoto";
import Pagination from "../../components/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const mode = searchParams.get("mode") || "standard";
  const page = Number(searchParams.get("page") || 1);
  const limit = 50;

  const [titles, setTitles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // Choose search method based on mode
    let searchPromise;
    if (mode === "exact") {
      searchPromise = searchService.exactMatch(query, limit);
    } else if (mode === "best") {
      searchPromise = searchService.bestMatch(query, limit);
    } else {
      searchPromise = searchService.searchTitles(query, limit);
    }

    searchPromise
      .then((res) => {
        setTitles(res.titles);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [query, mode, page]);

  if (!query) {
    return (
      <div className="container py-5 text-center">
        Type something in the search bar and press Enter
      </div>
    );
  }

  console.log(titles);

  const modeLabel =
    mode === "exact"
      ? "Exact Match"
      : mode === "best"
      ? "Best Match"
      : "Standard";

  return (
    <div className="container py-4">
      <h2 className="mb-2">Search results: "{query}"</h2>
      <p className="text-muted mb-4">Search mode: {modeLabel}</p>
      <Link
        to="/advanced-search"
        className="btn btn-outline-primary btn-sm mb-4 d-block"
      >
        Advanced Search
      </Link>

      {loading && <LoadingSpinner />}

      {!loading && titles.length > 0 && (
        <>
          <h4>Titles ({total})</h4>
          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4 mb-5">
            {titles.map((t) => (
              <div className="col" key={t.tconst}>
                <TitleCard
                  href={`/titles/${t.tconst}`}
                  title={t.primarytitle}
                  customImage={<Poster poster={t.poster} />}
                />
              </div>
            ))}
          </div>

          {/*
          <Pagination currentPage={page} total={total} baseUrl={`/search?q=${encodeURIComponent(query)}`} />
          */}
        </>
      )}

      {!loading && titles.length === 0 && (
        <p className="text-center py-5 fs-4 text-muted">No titles found</p>
      )}
    </div>
  );
}
