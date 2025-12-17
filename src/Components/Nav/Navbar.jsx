import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router";
import Search from "./Search";
import User from "./User";
import Menu from "./Menu";

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="px-0">
        <Navbar.Brand href="/" className="ms-3">
          Movie Database
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Menu />

            <Search />
            <Link className="nav-link" to="/bookmark">Bookmarks</Link>

            <User />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
