import { Row, Col } from "react-bootstrap";
import { useRatings } from "../../hooks/useRatings";
import ItemCard from "../../Components/ItemCard";
import LoadingSpinner from "../../Components/LoadingSpinner";
import EmptyState from "../../Components/EmptyState";
import FormatDate from "../../Components/FormatDate";

const RatingsPage = () => {
  const { ratings, loading } = useRatings();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Ratings ({ratings.length})</h2>
      {ratings.length === 0 ? (
        <EmptyState message="You haven't rated anything yet." />
      ) : (
        <Row className="g-4">
          {ratings.map((rating) => (
            <Col key={rating.tconst} xs={12} sm={6} md={4} lg={3}>
              <ItemCard
                href={`/title/${rating.tconst}`}
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

export default RatingsPage;
