import { NavDropdown } from "react-bootstrap";

const Menu = () => {
  return (
    <NavDropdown title="Menu" id="basic-nav-dropdown">
      <NavDropdown.Item href="/titles">All titles</NavDropdown.Item>
      <NavDropdown.Item href="/names">All actors</NavDropdown.Item>
    </NavDropdown>
  );
};

export default Menu;
