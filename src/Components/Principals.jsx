import { useParams } from "react-router-dom";
import { usePrincipals } from "../hooks/usePrincipals";

function Principals() {
  const { tconst } = useParams();
  const { principals, loading } = usePrincipals(tconst);

  if (loading || principals.length === 0) return null;

  return (
    <div className="my-4">
      <h3 className="border-bottom pb-2">Principals</h3>
      {principals.map((principal, i) => (
        <p key={i} className="mb-1">
          {principal.name} — {principal.category}
          {principal.characters && ` as ${principal.characters}`}
        </p>
      ))}
    </div>
  );
}

export default Principals;
