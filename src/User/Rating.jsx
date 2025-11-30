import { Card, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import { ratings, movies } from "../data/dummyData";

const Rating = () => {
  return (
    <div>
      <p>
        Ratings {ratings.length}
        <FaChevronRight />
      </p>

      <Row className="g-3">
        {ratings.slice(0, 2).map((rating) => {
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

      {ratings.length > 2 && (
        <div className="mt-3 text-center">
          <Button variant="dark">View All Ratings</Button>
        </div>
      )}
    </div>
  );
};

export default Rating;
