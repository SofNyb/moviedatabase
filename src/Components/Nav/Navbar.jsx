import { Container, Nav, Navbar, Row, Col } from "react-bootstrap";
import Search from "./Search";
import User from "./User";
import Menu from "./Menu";

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="px-4">
        <Navbar.Brand href="/">LOGO</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Menu />

            <Row>
              <Col xs="auto">
                <Search />
              </Col>
            </Row>

            <Nav.Link href="/bookmark">Bookmarks</Nav.Link>
            <User />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
