import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

// search as you type / debounced saving¨
// debounce -> waiting for the user to stop typing for x amount of time before doing smt
// 1. set timer every time user types
// 2.  if they type again before the timer finishes -> cancel old timer and start new one
// 3. When timer runs out (paused typing) -> save the searched input

const Search = () => {
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  // recent searches
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
    if (storedSearches) {
      setRecentSearches(storedSearches);
    }
  }, []);

  //debounce
  useEffect(() => {
    let timer;
    //timer for 1.5 sec.
    if (search.length > 3) {
      timer = setTimeout(() => {
        setRecentSearches((prevSearches) => {
          // if theres duplicate searches, dont save
          const filtered = prevSearches.filter((item) => item !== search);
          const updated = [search, ...filtered].slice(0, 5);
          localStorage.setItem("recentSearches", JSON.stringify(updated));
          return updated;
        });
      }, 1500);
    }
    // clears timer if user types again before timer ends
    return () => clearTimeout(timer);
  }, [search]); //runs whenever search changes

  return (
    <div className="position-relative">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowSearch(true)}
        />
        <span className="input-group-text" id="search-icon">
          <BsSearch />
        </span>
      </div>
      {showSearch && recentSearches.length > 0 && (
        <div className="position-absolute">
          <Dropdown.Menu show className="w-100">
            {recentSearches.map((item, index) => (
              <Dropdown.Item as={Link} to={`/search/${item}`} key={index}>
                {item}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item
              className="text-center"
              as={Link}
              to="/search/history"
            >
              All recent searches
            </Dropdown.Item>
          </Dropdown.Menu>
        </div>
      )}
    </div>
  );
};

export default Search;
