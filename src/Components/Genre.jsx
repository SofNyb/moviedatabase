// src/components/Genre.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { titleService } from "../services/titleService";

export default function Genre() {
  const { tconst } = useParams();
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!tconst) {
      setLoading(false);
      return;
    }

    setLoading(true);
    titleService
      .getTitleGenres(tconst)
      .then((data) => setGenres(data || []))
      .catch(() => setGenres([]))
      .finally(() => setLoading(false));
  }, [tconst]);

  if (loading || genres.length === 0) return null;

  return (
    <div className="my-5">
      <h4 className="border-bottom pb-2 mb-3">Genres</h4>
      <div className="d-flex flex-wrap gap-2">
        {genres.map((g, i) => (
          <span key={i} className="badge bg-primary-subtle text-primary-emphasis px-3 py-2">
            {g.genreName}
          </span>
        ))}
      </div>
    </div>
  );
}
