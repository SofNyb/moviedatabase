import { useName } from "../../hooks/useName";
import { useParams } from "react-router-dom";
import ImagesFor from "../../Components/ImagesFor";
import KnownFor from "../../Components/KnownFor";
import NameTitles from "../../Components/NameTitles";
import BookmarkButton from "../../Components/BookmarkButton";

export default function NameNconst() {
  const { nconst } = useParams();
  const { data, loading, error } = useName(nconst);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const imdbId = data.url.split("/").pop();

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="row g-4 align-items-start">
          <div className="col-lg-9">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h1 className="display-5 fw-bold mb-1">{data.name}</h1>
              <div className="text-muted mb-3 fs-5">
                {data.birthYear && `${data.birthYear}`}
                {data.birthYear && data.deathYear && " – "}
                {data.deathYear && `${data.deathYear}`}
              </div>

            <BookmarkButton nconst={nconst} />
              {/* Quick facts in a single row */}
              <div className="row g-4 mb-4 align-items-start">
                {data.nameRating && (
                  <div className="col-auto">
                    <strong>IMDb rating</strong>
                    <div className="text-warning fw-bold fs-4">
                      ★ {data.nameRating}
                    </div>
                  </div>
                )}
                <div className="col-auto">
                  <strong>Known for</strong>
                  <div className="mt-1">
                    {data.professions.map((prof, i) => {
                      const formattedName = prof.name
                        .replace(/_/g, " ")
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ");

                      return (
                        <span key={i}>
                          {formattedName}
                          {i < data.professions.length - 1 && " · "}
                        </span>
                      );
                    })}
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

          <div className="col-lg-3">
            <ImagesFor imdbId={imdbId} />
          </div>
        </div>
      </div>
    </div>
  );
}
