import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormatDate from "./FormatDate";

const ItemCard = ({ item, type, href, imageUrl, title, subtitle, badge }) => {
  return (
    <Link to={href} style={{ textDecoration: "none", color: "inherit" }}>
      <Card className="h-100 item-card">
        <Card.Img
          variant="top"
          src={imageUrl || "https://via.placeholder.com/300x450?text=No+Image"}
          style={{ height: "400px", objectFit: "cover" }}
          alt={title}
        />
        <Card.Body>
          <Card.Title className="text-truncate">{title}</Card.Title>
          {badge && (
            <Card.Text>
              <strong>{badge.label}:</strong> {badge.value}
            </Card.Text>
          )}
          {subtitle && (
            <Card.Text className="text-muted small">{subtitle}</Card.Text>
          )}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ItemCard;
