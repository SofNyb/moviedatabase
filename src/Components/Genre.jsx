import { useParams } from "react-router-dom";
import { useGenres } from "../hooks/useGenres";

function Genre() {
  const { tconst } = useParams();
  const { genres, loading } = useGenres(tconst);

  if (loading || genres.length === 0) return null;

  return (
    <div className="my-4">
      <h4 className="border-bottom pb-2">Genres</h4>
      <div className="d-flex flex-wrap gap-2 mt-2">
        {genres.map((genre, i) => (
          <span key={i} className="badge bg-secondary">
            {genre.genreName}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Genre;
