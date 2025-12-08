import { Container, Form, Nav, Navbar, Row, Col } from "react-bootstrap";
import Search from "./Search";
import User from "./User";
import Menu from "./Menu";

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="px-4">
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Menu />

            <Form inline>
              <Row>
                <Col xs="auto">
                  <Search />
                </Col>
              </Row>
            </Form>

            <Nav.Link href="/bookmarks">Bookmarks</Nav.Link>
            <User />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
