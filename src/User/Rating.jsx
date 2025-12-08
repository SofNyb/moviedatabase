import { Card, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import { useRatings } from "../hooks/useRatings";
import LoadingSpinner from "../Components/LoadingSpinner";
import FormatDate from "../Components/FormatDate";

const Rating = () => {
  const { ratings, loading } = useRatings();

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <a href="/rating" className="d-flex align-items-center mb-3 text-dark">
        Ratings {ratings.length}
        <FaChevronRight />
      </a>

      <Row className="g-3">
        {ratings.slice(0, 2).map((rating) => (
          <Col key={rating.tconst} md={6}>
            <a href={`/title/${rating.tconst}`}>
              <Card>
                <Card.Img
                  variant="top"
                  src={
                    rating.titleData?.poster ||
                    "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Text>
                    {rating.titleData?.primaryTitle || rating.tconst}
                  </Card.Text>
                  <Card.Text>
                    Rating: {rating.ratingValue || "N/A"}/10
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    {FormatDate(rating.createdAt)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Rating;
