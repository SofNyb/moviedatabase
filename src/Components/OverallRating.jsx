import { useParams } from "react-router-dom";
import { useOverallRating } from "../hooks/useOverallRating";

function OverallRating() {
  const { tconst } = useParams();
  const { rating, loading } = useOverallRating(tconst);

  if (loading || !rating) return null;

  const average = (rating.rating / rating.votes).toFixed(1);

  return (
    <div>
      <h3>Overall Rating</h3>
      <p>Rating: {average}</p>
      <p>Votes: {rating.votes}</p>
    </div>
  );
}

export default OverallRating;
