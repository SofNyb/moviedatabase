import { Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleSignOut = () => {
    authService.logout();
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  if (user) {
    const userId = user.url.split("/").pop();

    return (
      <NavDropdown title={user.name} id="basic-nav-dropdown">
        <NavDropdown.Item as={Link} to={`/profile/${userId}`}>
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/profile">
          Edit your profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={Link} to="/bookmark">
          Your bookmarks
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/rating">
          Your ratings
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/searchhistory">
          Your search history
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
