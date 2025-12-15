import { Link } from "react-router-dom";

const POSTER_WIDTH = 182;
const POSTER_HEIGHT = 268;

const NameCard = ({ href, customImage, title, subtitle, badge }) => {
  return (
    <Link to={href} className="text-decoration-none text-dark">
      <div className="d-flex shadow-sm rounded overflow-hidden bg-white hover-shadow transition h-100">
        {/* Fixed-size image area */}
        <div
          style={{
            width: POSTER_WIDTH,
            height: POSTER_HEIGHT,
            flexShrink: 0,
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {customImage || (
            <span className="text-muted small">No Image</span>
          )}
        </div>

        {/* Text content */}
        <div className="p-4 d-flex flex-column justify-content-center flex-grow-1">
          <h6 className="mb-1 fw-bold text-truncate">{title}</h6>

          {badge && (
            <p className="mb-1 text-warning small">
              <strong>{badge.label}:</strong> {badge.value}
            </p>
          )}

          {subtitle && (
            <p className="mb-0 text-muted small">{subtitle}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NameCard;

