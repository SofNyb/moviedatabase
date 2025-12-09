import { useAllTitles } from "../hooks/useAllTitles";
import { Link } from 'react-router-dom';

export default function NameTitles({ imdbId }) {
  const { data, loading, error } = useAllTitles(imdbId);

  if (loading) return <p>Loading filmography...</p>;
  if (error) return <p>{error}</p>;
  if (!data?.length) return <p>No titles found</p>;

  return (
    <section className="container">
      {data.map(title => (
        <Link key={title.url} to={`/title/${title.url.split("/").pop()}`}>
          <div className="border row m-4">
            {title.poster ? (
              <img style={{width: "182px", height: "270px"}} className="col-4 p-0" width="80" src={title.poster} alt={title.primaryTitle} />
            ) : (
              <div className="col-4 bg-light d-flex align-items-center justify-content-center" style={{width: "182px", height: "270px"}}>
                <span className="text-muted">No poster</span>
              </div>
            )}
            <div className="col">
              <strong>{title.primaryTitle}</strong>
              <p className="mb-0">{title.titleType} • {title.releaseDate}</p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
