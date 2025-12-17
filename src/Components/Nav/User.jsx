import { Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const User = () => {
  const { user, logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  if (user) {
    const userId = user.url.split("/").pop();

    return (
      <NavDropdown title={user.name} id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to={`/profile`}>
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/profile/edit">
          Edit your profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/bookmark">
          Your bookmarks
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/rating">
          Your ratings
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
      </NavDropdown>
    );
  }

  return (
    <Button as={Link} to="/login" variant="light">
      Sign In
    </Button>
  );
};

export default User;
