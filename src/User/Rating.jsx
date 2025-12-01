import { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import { userService } from "../services";

const Rating = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsData = await userService.getRatings();
        setRatings(ratingsData);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  if (loading) return <Spinner animation="border" />;
  return (
    <div>
      <p>
        Ratings {ratings.length}
        <FaChevronRight />
      </p>

      <Row className="g-3">
        {ratings.slice(0, 2).map((rating) => (
          <Col key={rating.tconst} md={6}>
            <Card>
              <Card.Body>
                <Card.Text>{rating.tconst}</Card.Text>
                <Card.Text className="text-muted small">
                  {new Date(rating.createdAt).toLocaleDateString()}
                </Card.Text>
                <a
                  href={rating.titleURL}
                  className="btn btn-sm btn-outline-dark"
                >
                  View Details
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
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
