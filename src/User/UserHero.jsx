import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaCalendar, FaCog, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useBookmarks } from "../hooks/useBookmarks";
import { useRatings } from "../hooks/useRatings";
import LoadingSpinner from "../Components/LoadingSpinner";
import FormatDate from "../Components/FormatDate";

function UserHero() {
  const { user, loading: userLoading } = useAuth();
  const { totalBookmarks, loading: bookmarksLoading } = useBookmarks();
  const { ratings, loading: ratingsLoading } = useRatings();

  const loading = userLoading || bookmarksLoading || ratingsLoading;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="my-4 p-4 border rounded">
      <Row className="align-items-center">
        <Col md={6}>
          <div className="d-flex align-items-start gap-3">
            <FaUserCircle size={80} className="flex-shrink-0" />
            <div>
              <Card.Title>{user.name || user.email}</Card.Title>
              <Card.Text>
                <FaCalendar /> Joined at {FormatDate(user.createdAt)}
              </Card.Text>
              <Button variant="dark" href="/profile">
                Edit Profile
              </Button>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <Row className="mb-2">
            <Col xs={11} className="d-flex justify-content-end">
              <a href="/profile" className="ms-3 text-dark">
                <FaCog size={20} />
              </a>
            </Col>
          </Row>

          <Row className="g-3 text-center">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Bookmarks</Card.Title>
                  <Card.Text>{totalBookmarks}</Card.Text>
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
