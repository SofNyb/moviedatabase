import { Row, Col } from "react-bootstrap";
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
        <h2 className="mb-4">Your Ratings ({ratings.length})</h2>
      )}

      {ratings.length === 0 ? (
        <EmptyState message="You haven't rated anything yet." />
      ) : (
        <Row className={isPreview ? "g-3" : "g-4"}>
          {displayRatings.map((rating) => (
            <Col
              key={rating.tconst}
              xs={12}
              sm={6}
              md={isPreview ? 6 : 4}
              lg={isPreview ? 6 : 3}
            >
              <TitleCard
                href={`/titles/${rating.tconst}`}
                imageUrl={rating.titleData?.poster}
                title={rating.titleData?.primaryTitle || rating.tconst}
                badge={{
                  label: "Your Rating",
                  value: `${rating.ratingValue || "N/A"}/10`,
                }}
                subtitle={`Rated ${FormatDate(rating.createdAt)}`}
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default RatingList;
