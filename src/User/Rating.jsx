import { Card } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import { ratings, movies } from "../data/dummyData";

const Rating = () => {
  return (
    <div>
      <p>
        Ratings
        <FaChevronRight />
      </p>

      <Row className="g-3">
        {ratings.map((rating) => {
          const movie = movies.find((m) => m.id === rating.movieId);

          return (
            <Col key={rating.id} md={6}>
              <Card>
                <Card.Body>
                  <Card.Text>{movie?.title}</Card.Text>
                  <Card.Text>Rating: {rating.rating}/10</Card.Text>
                  <Card.Text>{rating.review}</Card.Text>
                  <Card.Text className="text-muted small">
                    {rating.ratedDate}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Rating;
