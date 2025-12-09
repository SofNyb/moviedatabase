// KnownFor.jsx
import { useKnownFor } from "../hooks/useKnownFor";
import { Link } from 'react-router-dom';

export default function KnownFor({ imdbId }) {
  const { data, loading, error } = useKnownFor(imdbId);

  if (loading) return <p>Loading known-for...</p>;
  if (error)   return <p>{error}</p>;
  if (!data?.length) return <p>Not known for anything</p>;

  return (
    <section class="container">
      {data.map(title => (
          <Link to={`/title/${title.url.split("/").pop()}`}>
        <div class="border row m-4" key={title.url}>
            <img class="col-4 p-0" width="80" src={title.poster} alt="" />
        <div class="col">
            {title.primaryTitle}

          <p>Release: {title.releaseDate}</p>
        </div>
        </div>
          </Link>
      ))}
    </section>
  );
}
