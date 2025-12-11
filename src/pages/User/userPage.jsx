import { Link } from "react-router-dom";
import UserHero from "./UserHero.jsx";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth.js";
import LoadingSpinner from "../../Components/LoadingSpinner.jsx";
import BookmarkList from "../BookmarkRating/BookmarkList.jsx";
import RatingList from "../BookmarkRating/RatingList.jsx";

const UserPage = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <Container>
      {!user ? (
        <div className="text-center p-4">
          <p>Please log in</p>
          <Button variant="primary" as={Link} to="/login">
            Login
          </Button>
        </div>
      ) : (
        <>
          <UserHero />
          <Row>
            <Col>
              <BookmarkList isPreview={true} limit={2} />
            </Col>
            <Col>
              <RatingList isPreview={true} limit={2} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default UserPage;
