import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { useRatings } from "../../hooks/useRatings";
import TitleCard from "./TitleCard";
import LoadingSpinner from "../../Components/LoadingSpinner";
import EmptyState from "./EmptyState";
import FormatDate from "../../Components/FormatDate";

const RatingList = ({ isPreview = false, limit = null }) => {
  const { ratings, loading } = useRatings();

  if (loading) return <LoadingSpinner />;

  // Limit items for preview mode
  const displayRatings = limit ? ratings.slice(0, limit) : ratings;

  return (
    <div className={isPreview ? "" : "container py-4"}>
      {isPreview ? (
        <Link to="/rating" className="d-flex align-items-center mb-3 text-dark">
          Ratings {ratings.length}
          <FaChevronRight />
        </Link>
      ) : (
        <h2 className="h4 fw-bold mb-4">Your Ratings ({ratings.length})</h2>
      )}

      <div className="bg-white rounded-3 shadow-sm p-4">
        {ratings.length === 0 ? (
          <EmptyState message="You haven't rated anything yet." />
        ) : (
          <div className="d-flex flex-column gap-3">
            {displayRatings.map((rating) => (
              <TitleCard
                key={rating.tconst}
                href={`/titles/${rating.tconst}`}
                imageUrl={rating.titleData?.poster}
                title={rating.titleData?.primaryTitle || rating.tconst}
                badge={{
                  label: "Your Rating",
                  value: `${rating.ratingValue || "N/A"}/10`,
                }}
                subtitle={`Rated ${FormatDate(rating.createdAt)}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RatingList;
