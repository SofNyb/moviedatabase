// src/pages/Name/PopularCoplayers.jsx
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { nameService } from "../../services/nameService";
import LoadingSpinner from "../../Components/LoadingSpinner";
import ActorPhoto from "../../Components/ActorPhoto";

export default function PopularCoplayers() {
  const { nconst } = useParams();
  
  const [coplayers, setCoplayers] = useState([]);
  const [originalName, setOriginalName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!nconst) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    nameService.getNameById(nconst)
      .then(async (nameData) => {
        const personName = nameData.primaryName || nameData.name || "Unknown";
        setOriginalName(personName);
        
        const coplayersData = await nameService.getPopularCoplayers(personName, 10);
        
        const coplayerPromises = coplayersData.map(item => 
          nameService.getNameById(item.nconst)
            .catch(err => {
              console.log(`Failed to fetch ${item.nconst}:`, err.message);
              return null;
            })
        );
        
        const coplayerDetails = await Promise.all(coplayerPromises);
        const validCoplayers = coplayerDetails.filter(name => name !== null);
        setCoplayers(validCoplayers);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setCoplayers([]);
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [nconst]);

  if (loading) return <LoadingSpinner />;

  if (!nconst) {
    return (
      <div className="container py-5">
        <div className="text-center text-muted">
          No person specified.
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="h2 mb-5 text-center">
        Popular Co-players with {originalName}
      </h1>

      {coplayers.length === 0 ? (
        <div className="text-center text-muted py-5">
          No popular co-players found.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {coplayers.map((person) => {
            const personNconst = person.nconst || person.url?.split("/").pop();
            const birthYear = person.birthYear || person.birth_year;
            const deathYear = person.deathYear || person.death_year;
            const displayName = person.primaryName || person.name || "Unknown";

            return (
              <div className="col" key={personNconst}>
                <Link
                  to={`/names/${personNconst}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="d-flex shadow-sm rounded overflow-hidden bg-white h-100">
                    <div style={{ width: 140, height: 207, flexShrink: 0 }}>
                      <ActorPhoto
                        nconst={personNconst}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        className="rounded-start"
                      />
                    </div>
                    <div className="p-4 d-flex flex-column justify-content-center align-items-start">
                      <h5 className="fw-bold mb-1">{displayName}</h5>
                      <p className="text-muted mb-0">
                        {birthYear && `Born: ${birthYear}`}
                        {deathYear && ` • Died: ${deathYear}`}
                      </p>
                      {person.nameRating && (
                        <p className="text-muted small mt-2 mb-0">
                          Rating: {person.nameRating}/10
                        </p>
                      )}
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
