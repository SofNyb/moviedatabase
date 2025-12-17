// src/pages/Title/RelatedTitles.jsx
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { titleService } from "../../services/titleService";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Poster from "../../Components/Poster";
import { ExtractYear } from "../../Components/FormatDate";

export default function RelatedTitles() {
  const { tconst } = useParams();
  
  const [movies, setMovies] = useState([]);
  const [originalTitle, setOriginalTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    Promise.all([
      titleService.getTitleById(tconst),
      titleService.getRelatedMovies(tconst, 10)
    ])
      .then(async ([titleData, relatedData]) => {
        setOriginalTitle(titleData.primaryTitle || "Unknown");
        
        const moviePromises = relatedData.map(item => 
          titleService.getTitleById(item.tconst)
            .catch(err => {
              console.log(`Failed to fetch ${item.tconst}:`, err.message);
              return null; 
            })
        );
        
        const movieDetails = await Promise.all(moviePromises);
        
        // Filter out the episodes we accidentally get with the badly made db function 
        const validMovies = movieDetails.filter(movie => movie !== null);
        setMovies(validMovies);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setMovies([]);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [tconst]);

  if (loading) return <LoadingSpinner />;

  if (!tconst) {
    return (
      <div className="container py-5">
        <div className="text-center text-muted">
          No movie specified.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="h2 mb-5 text-center">
        Titles related to {originalTitle}
      </h1>

      {movies.length === 0 ? (
        <div className="text-center text-muted py-5">
          No related titles found.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {movies.map((title) => {
            const movieTconst = title.tconst || title.url?.split("/").pop();
            const year = ExtractYear(title.startYear || title.releaseDate);
            const titleType = title.titleType
              ? title.titleType.charAt(0).toUpperCase() +
                title.titleType.slice(1)
              : "";

            return (
              <div className="col" key={movieTconst}>
                <Link
                  to={`/titles/${movieTconst}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="d-flex shadow-sm rounded overflow-hidden bg-white h-100">
                    <div style={{ width: 140, height: 207, flexShrink: 0 }}>
                      <Poster
                        src={title.poster}
                        alt={title.primaryTitle}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="p-4 d-flex flex-column justify-content-center align-items-start">
                      <h5 className="fw-bold mb-1">{title.primaryTitle}</h5>
                      <p className="text-muted mb-0">
                        {year || "Unknown release date"} • {titleType}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
