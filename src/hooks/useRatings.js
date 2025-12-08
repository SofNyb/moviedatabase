import { useState, useEffect } from "react";
import { userService, titleService } from "../services";

export const useRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsData = await userService.getRatings();

        // Fetch full title details for each rating
        const ratingsWithDetails = await Promise.all(
          ratingsData.map((rating) =>
            titleService
              .getTitleById(rating.tconst)
              .then((titleData) => ({ ...rating, titleData }))
              .catch((err) => {
                console.error(`Error fetching title ${rating.tconst}:`, err);
                return rating;
              })
          )
        );

        setRatings(ratingsWithDetails);
      } catch (error) {
        console.error("Error fetching ratings:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  return { ratings, loading, error };
};
