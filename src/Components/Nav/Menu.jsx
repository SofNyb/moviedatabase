import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router";

const Menu = () => {
  return (
    <NavDropdown title="Menu" id="basic-nav-dropdown">
      <Link className="dropdown-item" to="/titles">All titles</Link>
      <Link className="dropdown-item" to="/names">All actors</Link>
    </NavDropdown>
  );
};

export default Menu;
