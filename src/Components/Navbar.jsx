import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsSearch } from "react-icons/bs";

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="px-4">
        <Navbar.Brand href="#home">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            <Form inline>
              <Row>
                <Col xs="auto">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <span className="input-group-text" id="search-icon">
                      <BsSearch />
                    </span>
                  </div>
                </Col>
              </Row>
            </Form>

            <Nav.Link href="#link">Bookmarks</Nav.Link>
            <NavDropdown title="NAME" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Your profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Your bookmarks
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Your ratings
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Your search history
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Sign out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
