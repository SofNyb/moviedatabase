import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { FaCalendar } from "react-icons/fa";

const Profile = () => {
  const { user, loading: authLoading, updateProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email || user.name || "");
      setName(user.name || "");
      setBirthday(user.birthday ? user.birthday.split("T")[0] : "");
      setLocation(user.location || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailRegex.test(email)) {
        setError("Please enter a valid email address");
        setLoading(false);
        return;
      }

      const profileData = {
        name,
        email,
        birthday: birthday
          ? new Date(birthday + "T00:00:00Z").toISOString()
          : null,
        location: location || null,
      };

      await updateProfile(profileData);
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to save profile"
      );
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <LoadingSpinner />;

  return (
    <Container>
      {!user ? (
        <div className="text-center p-4">
          <p>Please log in</p>
          <Button variant="primary" href="/login">
            Login
          </Button>
        </div>
      ) : (
        <Card className="mt-5 p-3">
          <Card.Title>Profile</Card.Title>
          <Card.Body>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="birthday">
                      <Form.Label>
                        Birthday <FaCalendar />
                      </Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Enter your birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="location">
                      <Form.Label>Location</Form.Label>
                      <Form.Select
                        aria-label="Select location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        <option value="">Select your location</option>
                        <option value="DA">DA</option>
                        <option value="UK">UK</option>
                        <option value="US">US</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {error && <p className="text-danger">{error}</p>}

                <div className="d-flex justify-content-between align-items-center">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Profile"}
                  </Button>
                  <Link to="/delete-profile">
                    <Button variant="outline-danger" size="sm">
                      Delete Account
                    </Button>
                  </Link>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Profile;
