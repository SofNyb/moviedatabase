import { NavDropdown } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services";

const User = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    fetchUser();

    // Listen for auth changes
    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleSignOut = () => {
    authService.logout();
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
    navigate("/");
  };

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
      <NavDropdown.Item onClick={handleSignOut}>Sign out</NavDropdown.Item>
    </NavDropdown>
  );
};

export default User;
