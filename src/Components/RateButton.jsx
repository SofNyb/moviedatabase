// src/components/RateButton.jsx
import { useState, useEffect } from "react";
import { userService } from "../services/userService";

export default function RateButton({ tconst }) {
  const [userRating, setUserRating] = useState(null);   // null = not loaded, number = loaded
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;


    userService.getRatings().then(ratings => {
      if (cancelled) return;
      const rating = ratings.find(r => r.tconst === tconst);
      console.log({rating})
      setUserRating(rating ? rating.ratingValue : null);
    }).catch(() => {
      if (!cancelled) setUserRating(null);
    });

    return () => { cancelled = true; };
  }, [tconst]);

  const rate = async (newRating) => {
    if (saving) return;

    setSaving(true);
    const previous = userRating;
    setUserRating(newRating);

    try {
      await userService.rateTitle(tconst, newRating);

    } catch (e) {
      setUserRating(previous); 
      const msg = e.response?.data?.title ||
                  e.response?.data ||
                  e.message ||
                  "Unknown error";
      alert("Rating failed: " + msg);
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="d-flex align-items-center gap-1">
      {[1,2,3,4,5,6,7,8,9,10].map(n => (
        <button
          key={n}
          onClick={() => rate(n)}
          disabled={saving}
          className={`btn btn-sm ${
            userRating >= n ? "btn-warning text-white" : "btn-outline-warning"
          }`}
          style={{ width: 36 }}
        >
          {n}
        </button>
      ))}
      {userRating !== null && (
        <small className="ms-2 text-muted">Your rating: {userRating}</small>
      )}
    </div>
  );
}
