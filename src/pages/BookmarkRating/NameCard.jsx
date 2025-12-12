// src/components/NameCard.jsx
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const NameCard = ({ href, customImage, title, subtitle, badge }) => {
  return (
    <Link to={href} style={{ textDecoration: "none", color: "inherit" }}>
      <Card className="h-100 item-card">
        {customImage}
        <Card.Body>
          <Card.Title className="text-truncate">{title}</Card.Title>
          {badge && (
            <Card.Text>
              <strong>{badge.label}:</strong> {badge.value}
            </Card.Text>
          )}
          {subtitle && (
            <Card.Text className="text-muted small">{subtitle}>
              {subtitle}
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default NameCard;

