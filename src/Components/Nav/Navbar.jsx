import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
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
