import { useState, useEffect } from "react";
import { Card, Button, Spinner } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { userService, titleService } from "../../services";
import FormatDate from "../../Components/FormatDate";

const RatingsPage = () => {
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

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Ratings ({ratings.length})</h2>
      {ratings.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">You haven't rated anything yet.</p>
        </div>
      ) : (
        <Row className="g-4">
          {ratings.map((rating) => (
            <Col key={rating.tconst} xs={12} sm={6} md={4} lg={3}>
              <a
                href={`/title/${rating.tconst}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Card className="h-100 rating-card">
                  <Card.Img
                    variant="top"
                    src={
                      rating.titleData?.poster ||
                      "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    style={{ height: "400px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title className="text-truncate">
                      {rating.titleData?.primaryTitle || rating.tconst}
                    </Card.Title>
                    <Card.Text>
                      <strong>Your Rating:</strong>{" "}
                      {rating.ratingValue || "N/A"}/10
                    </Card.Text>
                    <Card.Text className="text-muted small">
                      Rated {FormatDate(rating.createdAt)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default RatingsPage;
