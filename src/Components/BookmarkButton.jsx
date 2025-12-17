// src/components/BookmarkButton.jsx
import { useState, useEffect } from "react";
import { userService } from "../services/userService";

export default function BookmarkButton({ tconst, nconst }) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const isTitle = !!tconst;
  const isPerson = !!nconst;
  const id = tconst || nconst;

  const loadStatus = async () => {
    try {
      let bookmarks;
      if (isTitle) {
        bookmarks = await userService.getTitleBookmarks();
      } else if (isPerson) {
        bookmarks = await userService.getNameBookmarks();
      } else {
        return;
      }

      const exists = bookmarks.some(b => 
        isTitle ? b.tconst === tconst : b.nconst === nconst
      );
      setIsBookmarked(exists);
    } catch (e) {
      setIsBookmarked(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
  }, [tconst, nconst]);

  const toggleBookmark = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isBookmarked) {
        if (isTitle) {
          await userService.removeTitleBookmark(tconst);
        } else {
          await userService.removeNameBookmark(nconst);
        }
      } else {
        if (isTitle) {
          await userService.addTitleBookmark(tconst);
        } else {
          await userService.addNameBookmark(nconst);
        }
      }

      setIsBookmarked(prev => !prev);
    } catch (err) {
      alert("Failed to update bookmark");
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
      className={`btn btn-sm ${isBookmarked ? "btn-success" : "btn-outline-success"}`}
      title={isPerson ? "Bookmark this person" : "Bookmark this title"}
    >
      {isBookmarked ? "Remove bookmark" : "Bookmark"}
    </button>
  );
}
