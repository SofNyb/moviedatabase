import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaCalendar, FaCog, FaShareAlt, FaUserCircle } from "react-icons/fa";

function UserHero() {
  return (
    <div className="my-4 p-4 border rounded">
      <Row className="align-items-center">
        <Col md={6}>
          <div className="d-flex align-items-start gap-3">
            <FaUserCircle size={80} className="flex-shrink-0" />
            <div>
              <Card.Title>User name</Card.Title>
              <Card.Text>
                <FaCalendar /> Joined at DATE
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

          <Row className="g-3">
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Bookmarks</Card.Title>
                  <Card.Text>Antal</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Ratings</Card.Title>
                  <Card.Text>Antal</Card.Text>
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
