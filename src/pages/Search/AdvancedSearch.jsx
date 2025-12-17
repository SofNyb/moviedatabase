import { useState } from "react";
import { Link } from "react-router-dom";
import searchService from "../../services/searchService";
import TitleCard from "../BookmarkRating/TitleCard";
import Poster from "../../components/Poster";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AdvancedSearch() {
  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [character, setCharacter] = useState("");
  const [person, setPerson] = useState("");
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const limit = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    searchService
      .advancedSearch({ title, plot, character, person, limit})
      .then(res => setTitles(res.titles))
      .finally(() => setLoading(false));
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Advanced Search</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-5">
        <div className="col-12 col-md-6">
          <label className="form-label">Title contains</label>
          <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Plot contains</label>
          <input className="form-control" value={plot} onChange={e => setPlot(e.target.value)} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Character name contains</label>
          <input className="form-control" value={character} onChange={e => setCharacter(e.target.value)} />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label">Person name contains</label>
          <input className="form-control" value={person} onChange={e => setPerson(e.target.value)} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Search
          </button>
        </div>
      </form>

      <Link to="/search" className="mb-4 d-block">&larr; Back to simple search</Link>

      {loading && <LoadingSpinner />}

      {!loading && titles.length > 0 && (
        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-4">
          {titles.map(t => (
            <div className="col" key={t.tconst}>
                <TitleCard href={`/title/${t.tconst}`} title={t.primarytitle} customImage={<Poster tconst={t.tconst} />} />
            </div>
          ))}
        </div>
      )}

      {!loading && titles.length === 0 && (
        <p className="text-center py-5 fs-4 text-muted">
          {title || plot || character || person ? "No titles found" : "Fill at least one field and search"}
        </p>
      )}
    </div>
  );
}
