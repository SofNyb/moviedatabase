import React from "react";
import UserHero from "./UserHero.jsx";
import Bookmark from "./Bookmark.jsx";
import Rating from "./Rating.jsx";
import { Row, Col, Container } from "react-bootstrap";

const UserPage = () => {
  return (
    <Container>
      <UserHero />
      <Row>
        <Col>
          <Bookmark />
        </Col>
        <Col>
          <Rating />
        </Col>
      </Row>
    </Container>
  );
};

export default UserPage;
