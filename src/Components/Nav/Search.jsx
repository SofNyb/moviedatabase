import { BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userService } from "../../services/userService.js";

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
  // useEffect(() => {
  //   const storedSearches = JSON.parse(localStorage.getItem("recentSearches"));
  //   if (storedSearches) {
  //     setRecentSearches(storedSearches);
  //   }
  // }, []);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const searchHistory = await userService.getSearchHistory();
        setRecentSearches(searchHistory);
      } catch (error) {
        console.error("Error fetching recent searches:", error);
      }
    };

    fetchSearchHistory();
  }, []);

  //debounce
  useEffect(() => {
    let timer;
    //timer for 1.5 sec.
    if (search.length > 3) {
      timer = setTimeout(async () => {
        try {
          await userService.saveSearch(search);
          // Then update local state
          setRecentSearches((prev) => {
            const filtered = prev.filter(
              (item) => item.search_string !== search
            );
            return [search, ...filtered].slice(0, 5);
          });
        } catch (error) {
          console.error("Failed to save search:", error);
        }
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
              <Dropdown.Item
                as={Link}
                to={`/search/${item.search_string}`}
                key={index}
              >
                {item.search_string}
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />
            <Dropdown.Item
              className="text-center"
              as={Link}
              to="/searchhistory"
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
