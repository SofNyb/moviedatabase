import { useState, useEffect } from "react";
import { userService, titleService, nameService } from "../services";

export const useBookmarks = () => {
  const [titleBookmarks, setTitleBookmarks] = useState([]);
  const [nameBookmarks, setNameBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const [titleBm, nameBm] = await Promise.all([
          userService.getTitleBookmarks(),
          userService.getNameBookmarks(),
        ]);

        // Fetch full title details for each bookmark
        const titleDetailsPromises = titleBm.map((bookmark) =>
          titleService
            .getTitleById(bookmark.tconst)
            .then((titleData) => ({ ...bookmark, titleData }))
            .catch((err) => {
              console.error(`Error fetching title ${bookmark.tconst}:`, err);
              return bookmark;
            })
        );

        // Fetch full name details for each bookmark
        const nameDetailsPromises = nameBm.map((bookmark) =>
          nameService
            .getNameById(bookmark.nconst)
            .then((nameData) => ({ ...bookmark, nameData }))
            .catch((err) => {
              console.error(`Error fetching name ${bookmark.nconst}:`, err);
              return bookmark;
            })
        );

        const [titlesWithDetails, namesWithDetails] = await Promise.all([
          Promise.all(titleDetailsPromises),
          Promise.all(nameDetailsPromises),
        ]);

        setTitleBookmarks(titlesWithDetails);
        setNameBookmarks(namesWithDetails);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  return {
    titleBookmarks,
    nameBookmarks,
    loading,
    error,
    totalBookmarks: titleBookmarks.length + nameBookmarks.length,
  };
};
