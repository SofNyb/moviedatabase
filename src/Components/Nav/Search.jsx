import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        aria-label="Search"
      />
      <span className="input-group-text" id="search-icon">
        <BsSearch />
      </span>
    </div>
  );
};

export default Search;
