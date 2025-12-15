import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import { nameService } from "./services/nameService";
import { titleService } from "./services/titleService";
import LoadingSpinner from "./Components/LoadingSpinner";
import ActorPhoto from "./Components/ActorPhoto";
import Poster from "./Components/Poster";
import { ExtractYear } from "./Components/FormatDate";

function App() {
  const [names, setNames] = useState([]);
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailedNames, setDetailedNames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [namesData, titlesData] = await Promise.all([
          nameService.getNames(0, 10),
          titleService.getTitles(0, 10),
        ]);
        setNames(namesData.items || []);
        setTitles(titlesData.items || []);

        // Fetch detailed info for each person
        const details = {};
        const nameItems = namesData.items || [];
        await Promise.all(
          nameItems.map(async (person) => {
            try {
              const nconst = person.url?.split("/").pop() || person.nconst;
              const [fullData, professions] = await Promise.all([
                nameService.getNameById(nconst),
                nameService.getProfessions(nconst),
              ]);
              details[nconst] = {
                ...fullData,
                professions: professions,
              };
            } catch (error) {
              console.error("Error fetching person details:", error);
            }
          })
        );
        setDetailedNames(details);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-5">
      <h1 className="h2 mb-5 text-center">Movie Database</h1>

      <div className="row g-4">
        {/* Titles Column - Left */}
        <div className="col-md-6">
          <h2 className="h3 mb-4">All Titles</h2>
          <div className="d-flex flex-column gap-3">
            {titles.map((title) => {
              const tconst = title.tconst || title.url?.split("/").pop();
              const year = ExtractYear(title.startYear || title.releaseDate);
              const titleType = title.titleType
                ? title.titleType.charAt(0).toUpperCase() +
                  title.titleType.slice(1)
                : "";

              return (
                <Link
                  key={tconst}
                  to={`/titles/${tconst}`}
                  className="text-decoration-none text-dark text-start"
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
              );
            })}
          </div>
          <div className="text-center mt-4">
            <Link to="/titles" className="btn btn-primary">
              View All Titles →
            </Link>
          </div>
        </div>

        {/* Names Column - Right */}
        <div className="col-md-6">
          <h2 className="h3 mb-4">All Names</h2>
          <div className="d-flex flex-column gap-3">
            {names.map((person) => {
              const nconst = person.url?.split("/").pop() || person.nconst;
              const details = detailedNames[nconst];
              const birthYear = details?.birthYear;
              const profession = details?.professions?.[0]?.name;
              const professionName = profession
                ? profession.charAt(0).toUpperCase() + profession.slice(1)
                : null;

              return (
                <Link
                  key={nconst}
                  to={`/names/${nconst}`}
                  className="text-decoration-none text-dark"
                >
                  <div className="d-flex shadow-sm rounded overflow-hidden bg-white h-100 text-start">
                    <div style={{ width: 140, height: 207, flexShrink: 0 }}>
                      <ActorPhoto
                        nconst={nconst}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        className="rounded-start"
                      />
                    </div>
                    <div className="p-4 flex-grow-1 d-flex flex-column justify-content-center">
                      <h5 className="mb-1 fw-bold">{person.name}</h5>
                      {details && (
                        <p className="mb-0 text-muted">
                          {birthYear
                            ? `Born ${birthYear}`
                            : "Birth year unknown"}
                          {birthYear && professionName && " • "}
                          {professionName}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center mt-4">
            <Link to="/names" className="btn btn-primary">
              View All Names →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
