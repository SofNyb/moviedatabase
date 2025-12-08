import React from "react";
import { Link } from "react-router-dom";
import UserHero from "./UserHero.jsx";
import Bookmark from "./Bookmark.jsx";
import Rating from "./Rating.jsx";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import LoadingSpinner from "../Components/LoadingSpinner";

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
              <Bookmark />
            </Col>
            <Col>
              <Rating />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default UserPage;
