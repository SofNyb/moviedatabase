import { BsSearch } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../../services/userService.js";
import { titleService } from "../../services/titleService.js";
import { nameService } from "../../services/nameService.js";

const Search = () => {
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  // Search as you type
  useEffect(() => {
    if (search.length > 2) {
      const searchPreview = async () => {
        try {
          // Search both titles AND names
          const [titleResults, nameResults] = await Promise.all([
            titleService.searchTitles(search),
            nameService.searchNames(search),
          ]);

          setSearchResults({
            titles: titleResults,
            names: nameResults,
          });
        } catch (error) {
          console.error("Search error:", error);
        }
      };
      searchPreview();
    } else {
      setSearchResults({ titles: [], names: [] });
    }
  }, [search]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      try {
        // This calls string_search which auto-saves
        await userService.searchTitles(search);
        navigate(`/search?q=${search}`);
      } catch (error) {
        console.error("Search failed:", error);
      }
    }
  };

  return (
    <div className="position-relative" ref={searchRef}>
      <form className="d-flex" onSubmit={handleSubmit}>
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
      </form>
      {showSearch &&
        (console.log("searchResults:", searchResults), // 👈 ADD THIS
        console.log("recentSearches:", recentSearches), // 👈 ADD THIS
        (
          <div
            className="position-absolute w-100"
            style={{ top: "100%", zIndex: 1000 }}
          >
            <Dropdown.Menu show className="w-100">
              {search.length > 2 ? (
                <>
                  {searchResults.titles.map((result, index) => (
                    <Dropdown.Item
                      as={Link}
                      to={`/title/${result.tconst}`}
                      key={index}
                    >
                      {result.primarytitle}
                    </Dropdown.Item>
                  ))}
                  {searchResults.names.map((result, index) => (
                    <Dropdown.Item
                      as={Link}
                      to={`/name/${result.nconst}`}
                      key={index}
                    >
                      {result.primaryname}
                    </Dropdown.Item>
                  ))}
                </>
              ) : (
                recentSearches.map((item, index) => (
                  <div className="" key={index}>
                    <Dropdown.Item
                      as={Link}
                      to={`/search/${item.search_string}`}
                    >
                      {item.search_string}
                    </Dropdown.Item>
                  </div>
                ))
              )}
            </Dropdown.Menu>
          </div>
        ))}
    </div>
  );
};

export default Search;
