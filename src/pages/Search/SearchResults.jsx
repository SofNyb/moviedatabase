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
  const page = Number(searchParams.get("page") || 1);

  const [titles, setTitles] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    setLoading(true);
    searchService
      .searchTitles(query, page)
      .then((res) => {
        setTitles(res.titles);
        setTotal(res.total);
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  if (!query) {
    return <div className="container py-5 text-center">Type something and press Enter</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Search results: "{query}"</h2>
      <Link to="/advanced-search" className="btn btn-outline-primary btn-sm mb-4 d-block">
        Advanced Search
      </Link>

      {loading && <LoadingSpinner />}

      {!loading && titles.length > 0 && (
        <>
          <h4>Titles ({total})</h4>
          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4 mb-5">
            {titles.map((t) => (
              <div className="col" key={t.tconst}>
                  <TitleCard href={`/titles/${t.tconst}`} title={t.primarytitle} customImage={<Poster tconst={t.tconst} />} />
              </div>
            ))}
          </div>

          <Pagination currentPage={page} total={total} baseUrl={`/search?q=${encodeURIComponent(query)}`} />
        </>
      )}

      {!loading && titles.length === 0 && (
        <p className="text-center py-5 fs-4 text-muted">No titles found</p>
      )}
    </div>
  );
}
