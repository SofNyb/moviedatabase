import { Link } from "react-router-dom";
import { usePersonImages } from "../../hooks/usePersonImages";

const POSTER_WIDTH = 182;
const POSTER_HEIGHT = 268;

const ItemCard = ({
  href,
  imageUrl,
  title,
  subtitle,
  badge,
  isActor = false,
  nconst = null,
}) => {
  const { urls } = usePersonImages(isActor && nconst ? nconst : null);

  // Use TMDB image for actors if available, otherwise fall back to provided imageUrl
  const displayImage =
    isActor && urls.length > 0
      ? `https://image.tmdb.org/t/p/w185${urls[0]}`
      : imageUrl || "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <Link to={href} className="text-decoration-none text-dark">
      <div className="d-flex shadow-sm rounded overflow-hidden bg-white hover-shadow transition">
        {/* Fixed-size poster */}
        <div
          style={{
            width: POSTER_WIDTH,
            height: POSTER_HEIGHT,
            flexShrink: 0,
            backgroundColor: "#f8f9fa",
          }}
        >
          <img
            src={displayImage}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Text content */}
        <div className="p-4 d-flex flex-column justify-content-center flex-grow-1">
          <h6 className="mb-1 fw-bold">{title}</h6>
          {badge && (
            <p className="mb-1 text-warning small">
              <strong>{badge.label}:</strong> {badge.value}
            </p>
          )}
          {subtitle && <p className="mb-0 text-muted small">{subtitle}</p>}
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;
