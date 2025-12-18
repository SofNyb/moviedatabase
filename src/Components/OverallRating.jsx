// src/components/OverallRating.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { titleService } from "../services/titleService";

export default function OverallRating() {
  const { tconst } = useParams();
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tconst) {
      setLoading(false);
      return;
    }

    setLoading(true);
    titleService
      .getOverallRating(tconst)
      .then((data) => setRating(data))
      .catch(() => setRating(null))
      .finally(() => setLoading(false));
  }, [tconst]);

  if (loading || !rating || !rating.votes) return null;

  const average = (rating.rating / rating.votes).toFixed(1);

  return (
    <div className="my-5 p-4 bg-light rounded shadow-sm">
      <h4 className="mb-3">Overall Rating</h4>
      <div className="fs-1 fw-bold text-primary">
        {average}
      </div>
      <p className="text-muted mb-0">
        based on {rating.votes} votes
      </p>
    </div>
  );
}
