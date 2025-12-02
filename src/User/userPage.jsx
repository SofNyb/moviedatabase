import React, { useState, useEffect } from "react";
import UserHero from "./UserHero.jsx";
import Bookmark from "./Bookmark.jsx";
import Rating from "./Rating.jsx";
import { Row, Col, Container, Button } from "react-bootstrap";
import { authService } from "../services";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <Container className="text-center p-4">
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container>
      {!user ? (
        <div className="text-center p-4">
          <p>Please log in</p>
          <Button variant="primary" href="/login">
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
