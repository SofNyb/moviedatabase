import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaCalendar, FaCog, FaShareAlt, FaUserCircle } from "react-icons/fa";
import { authService, userService } from "../services";

function UserHero() {
  const [user, setUser] = useState(null);
  const [titleBookmarks, setTitleBookmarks] = useState([]);
  const [nameBookmarks, setNameBookmarks] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);

        const [titleBm, nameBm, ratingsData] = await Promise.all([
          userService.getTitleBookmarks(),
          userService.getNameBookmarks(),
          userService.getRatings(),
        ]);

        setTitleBookmarks(titleBm);
        setNameBookmarks(nameBm);
        setRatings(ratingsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (!user) return <div className="text-center p-4">Please log in</div>;

  return (
    <div className="my-4 p-4 border rounded">
      <Row className="align-items-center">
        <Col md={6}>
          <div className="d-flex align-items-start gap-3">
            <FaUserCircle size={80} className="flex-shrink-0" />
            <div>
              <Card.Title>{user.email || user.name}</Card.Title>
              <Card.Text>
                <FaCalendar /> Joined at{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </Card.Text>
              <Button variant="dark">Edit Profile</Button>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <Row className="mb-2">
            <Col xs={11} className="d-flex justify-content-end">
              <FaShareAlt size={20} />
              <FaCog size={20} />
            </Col>
          </Row>

          <Row className="g-3 text-center">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Bookmarks</Card.Title>
                  <Card.Text>
                    {titleBookmarks.length + nameBookmarks.length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Ratings</Card.Title>
                  <Card.Text>{ratings.length}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default UserHero;
