import { useParams } from "react-router-dom";
import { useAwards } from "../hooks/useAwards";

function Award() {
  const { tconst } = useParams();
  const { awards, loading } = useAwards(tconst);

  if (loading || !awards) return null;

  return (
    <div className="my-4">
      <h4 className="border-bottom pb-2">Awards</h4>
      <p className="mt-2">{awards.awardInfo}</p>
    </div>
  );
}

export default Award;
