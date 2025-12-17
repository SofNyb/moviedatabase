import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const DeleteProfile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (confirmText !== "DELETE") {
      setError('Please type "DELETE" to confirm');
      return;
    }

    if (email !== user?.email) {
      setError("Email does not match your account");
      return;
    }

    setLoading(true);

    try {
      const { authService } = await import("../../services/authService");
      console.log("Attempting to delete account with email:", email);
      await authService.delete(email, password);
      alert("Your account has been deleted successfully");
      logout();
      navigate("/");
    } catch (err) {
      console.error("Delete account error:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response,
        status: err.response?.status,
      });
      setError(
        err.message ||
          "Failed to delete account. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card className="mt-5 p-3 mx-auto" style={{ maxWidth: "600px" }}>
        <Card.Body>
          <Card.Title className="text-danger">Delete Your Account</Card.Title>
          <Alert variant="warning" className="mt-3">
            <strong>Warning:</strong> This action is permanent and cannot be
            undone. All your data including bookmarks, ratings, and profile
            information will be permanently deleted.
          </Alert>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email to confirm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmText">
              <Form.Label>
                Type <strong>DELETE</strong> to confirm
              </Form.Label>
              <Form.Control
                type="text"
                placeholder='Type "DELETE" here'
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="danger" type="submit" disabled={loading}>
                {loading ? "Deleting..." : "Delete My Account"}
              </Button>
              <Link to="/profile">
                <Button variant="secondary">Cancel</Button>
              </Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeleteProfile;
