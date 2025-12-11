// src/components/RateButton.jsx
import { useState, useEffect } from "react";
import { userService } from "../services/userService";

export default function RateButton({ tconst }) {
  const [userRating, setUserRating] = useState(null);
  const [saving, setSaving] = useState(false);

  // Load current rating once
  useEffect(() => {
    userService.getRatings().then(ratings => {
      const found = ratings.find(r => r.tconst === tconst);
      if (found) setUserRating(found.rating);
    }).catch(() => {});
  }, [tconst]);

  const rate = async (value) => {
    setSaving(true);
    try {
      await userService.rateTitle(null, tconst, value); // personId = null → taken from token
      setUserRating(value);
    } catch (e) {
      alert("Failed to save rating");
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
      {userRating && <small className="ms-2 text-muted">Your rating: {userRating}</small>}
    </div>
  );
}
