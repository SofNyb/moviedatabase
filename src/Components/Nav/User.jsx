import { NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { authService } from "../../services";

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    };

    fetchUser();
  }, []);

  return (
    <NavDropdown title={user ? user.name : "User"} id="basic-nav-dropdown">
      <NavDropdown.Item href="/profile/:id">Profile</NavDropdown.Item>
      <NavDropdown.Item href="/profile">Edit your profile</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/bookmarks">Your bookmarks</NavDropdown.Item>
      <NavDropdown.Item href="/ratings">Your ratings</NavDropdown.Item>
      <NavDropdown.Item href="/searchhistory">
        Your search history
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="/signout">Sign out</NavDropdown.Item>
    </NavDropdown>
  );
};

export default User;
