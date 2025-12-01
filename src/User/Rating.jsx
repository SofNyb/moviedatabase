import { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";
import { userService, titleService } from "../services";
import FormatDate from "../Components/FormatDate";

const Rating = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsData = await userService.getRatings();

        // Fetch full title details for each rating
        const ratingsWithDetails = await Promise.all(
          ratingsData.map((rating) =>
            titleService
              .getTitleById(rating.tconst)
              .then((titleData) => ({ ...rating, titleData }))
              .catch((err) => {
                console.error(`Error fetching title ${rating.tconst}:`, err);
                return rating;
              })
          )
        );

        console.log("Ratings with details:", ratingsWithDetails);
        setRatings(ratingsWithDetails);
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

      {ratings.length > 2 && (
        <div className="mt-3 text-center">
          <Button variant="dark">View All Ratings</Button>
        </div>
      )}
    </div>
  );
};

export default Rating;
