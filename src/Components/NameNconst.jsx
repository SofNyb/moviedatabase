import { useName } from "../hooks/useName";
import { useParams } from "react-router-dom";
import ImagesFor from "../components/ImagesFor";
import KnownFor from "../components/KnownFor";
import NameTitles from "../components/NameTitles";

export default function NameNconst() {
  const { nconst } = useParams();
  const { data, loading, error } = useName(nconst);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const imdbId = data.url.split("/").pop();

  return (
    <div className="container-fluid" style={{ backgroundColor: "#f5f5f1" }}>
      <div className="container">
        {/* Hero section: poster + name + quick facts side by side */}
        <div className="row g-4 align-items-start">
          <div className="col-lg-3">
            <div className="sticky-top" style={{ top: "80px" }}>
              <ImagesFor imdbId={imdbId} />
            </div>
          </div>

          <div className="col-lg-9">
            <div className="bg-white rounded-3 shadow-sm p-4">
              {/* Name and basic info right next to the poster */}
              <h1 className="display-5 fw-bold mb-1">{data.name}</h1>
              <div className="text-muted mb-3 fs-5">
                {data.birthYear && `${data.birthYear}`}
                {data.birthYear && data.deathYear && " – "}
                {data.deathYear && `${data.deathYear}`}
              </div>

              {/* Quick facts in a single row */}
              <div className="row g-4 mb-4">
                {data.nameRating && (
                  <div className="col-auto">
                    <strong>IMDb rating</strong>
                    <div className="text-warning fw-bold fs-4">★ {data.nameRating}</div>
                  </div>
                )}
                <div className="col-auto">
                  <strong>Known for</strong>
                  <div className="mt-1">
                    {data.professions.map((prof, i) => (
                      <span key={i}>
                        {prof.name}
                        {i < data.professions.length - 1 && " · "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Known For carousel */}
            <section className="mt-5">
              <h2 className="h4 fw-bold mb-3">Known for</h2>
              <KnownFor imdbId={imdbId} />
            </section>

            {/* Full credits */}
            <section className="mt-5">
              <h2 className="h4 fw-bold mb-4">Credits</h2>
              <div className="bg-white rounded-3 shadow-sm p-4">
                <NameTitles imdbId={imdbId} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
