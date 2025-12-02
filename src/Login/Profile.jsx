import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService, userService } from "../services";
import { FaCalendar } from "react-icons/fa";
import React from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();

        setUser(userData);
        setEmail(userData.email || userData.name || "");
        setName(userData.name || "");
        setBirthday(userData.birthday ? userData.birthday.split("T")[0] : "");
        setLocation(userData.location || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const profileData = {
        name,
        email,
        birthday: birthday
          ? new Date(birthday + "T00:00:00Z").toISOString()
          : null,
        location: location || null,
      };

      const response = await authService.updateProfile(profileData);

      alert("Profile saved successfully!");

      // Refresh user data
      const updatedUser = await authService.getCurrentUser();
      setUser(updatedUser);
      setEmail(updatedUser.email || updatedUser.name || "");
      setName(updatedUser.name || "");
      setBirthday(
        updatedUser.birthday ? updatedUser.birthday.split("T")[0] : ""
      );
      setLocation(updatedUser.location || "");
    } catch (err) {
      console.error("=== UPDATE FAILED ===");
      console.error("Error object:", err);
      console.error("Response data:", err.response?.data);
      console.error("Status:", err.response?.status);
      setError(
        err.response?.data?.message || err.message || "Failed to save profile"
      );
    } finally {
      setLoading(false);
    }
  };

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

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Profile"}
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Profile;
