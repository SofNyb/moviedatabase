// src/components/BookmarkButton.jsx
import { useState, useEffect } from "react";
import { userService } from "../services/userService";

export default function BookmarkButton({ tconst }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load current bookmark status
  const loadStatus = async () => {
    {
    try {
      const bookmarks = await userService.getTitleBookmarks();
      const exists = bookmarks.some(b => b.tconst === tconst);
      setIsBookmarked(exists);
    } catch (e) {
      setIsBookmarked(false);
    } finally {
      setLoading(false);
    }
      }};

  useEffect(() => {
    loadStatus();
  }, [tconst]);

  const toggleBookmark = async () => {
    setLoading(true);
    try {
      if (isBookmarked) {
        await userService.removeTitleBookmark(tconst);   // no userId
      } else {
        await userService.addTitleBookmark(tconst);       // no userId
      }
      // Success → just flip the UI (optimistic update)
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      alert("Failed to update bookmark");
      // On error, re-sync with server
      loadStatus();
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;
  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className={`btn btn-sm ${
        isBookmarked ? "btn-success" : "btn-outline-success"
      }`}
    >
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}
