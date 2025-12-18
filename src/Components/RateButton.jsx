// src/components/RateButton.jsx
import { useState, useEffect } from "react";
import { userService } from "../services/userService";
import { titleService } from "../services/titleService";

export default function RateButton({ tconst }) {

  const [userRating, setUserRating] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    userService.getRatings().then(ratings => {
      if (cancelled) return;
      const rating = ratings.find(r => r.tconst === tconst);
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

  const deleteRating = async () => {
    console.log("Deleting rating for tconst:", tconst, "length:", tconst.length);
    if (deleting) return;
    if (!window.confirm("Are you sure you want to delete your rating?")) {
      return;
    }

    setDeleting(true);
    const previous = userRating;
    setUserRating(null); 

    try {
      await titleService.deleteRating(tconst);
    } catch (e) {
      setUserRating(previous); 
      const msg = e.response?.data?.message ||
                  e.response?.data ||
                  e.message ||
                  "Unknown error";
      alert("Delete failed: " + msg);
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="d-flex align-items-center gap-1">
      {[1,2,3,4,5,6,7,8,9,10].map(n => (
        <button
          key={n}
          onClick={() => rate(n)}
          disabled={saving || deleting}
          className={`btn btn-sm ${
            userRating >= n ? "btn-warning text-white" : "btn-outline-warning"
          }`}
          style={{ width: 36 }}
        >
          {n}
        </button>
      ))}
      {userRating !== null && (
        <>
          <small className="ms-2 text-muted">Your rating: {userRating}</small>
          <button
            onClick={deleteRating}
            disabled={deleting || saving}
            className="btn btn-sm btn-outline-danger ms-2"
            title="Delete your rating"
          >
            {deleting ? "..." : "×"}
          </button>
        </>
      )}
    </div>
  );
}
