// src/components/Search.jsx  (or wherever you keep it)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState("standard");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(
        `/search?q=${encodeURIComponent(query.trim())}&mode=${searchMode}`
      );
      setQuery("");
    }
  };

  return (
    <form className="d-flex align-items-center" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search titles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          className="form-select"
          style={{ maxWidth: "140px", borderLeft: "none" }}
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value)}
        >
          <option value="standard">Reg. search</option>
          <option value="exact">Exact search</option>
          <option value="best">Best search</option>
        </select>
        <button className="btn btn-outline-secondary" type="submit">
          <BsSearch />
        </button>
      </div>
    </form>
  );
};

export default Search;
