// ImagesFor.jsx
import { useState } from "react";
import { usePersonImages } from "../hooks/usePersonImages";

export default function ImagesFor({ imdbId }) {
  const [showAll, setShowAll] = useState(false);
  const { urls, loading, error } = usePersonImages(imdbId);

  if (loading) return <p className="text-muted">Loading images...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!urls.length) return <p className="text-muted">No images found</p>;

  const mainImage = urls[0];
  const extraImages = urls.slice(1);

  return (
    <div>
      {/* Main image - medium size, centered */}
      <div className="text-center mb-4">
        <img
          src={`https://image.tmdb.org/t/p/w185${mainImage}`}
          className="rounded shadow-sm"
          alt="Profile"
        />
      </div>

      {/* Button */}
      {extraImages.length > 0 && (
        <div className="text-center mb-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="btn btn-outline-dark btn-sm px-4 rounded-pill"
          >
            {showAll ? "Hide" : `View all ${urls.length} photos`} ({extraImages.length} more)
          </button>
        </div>
      )}

      {/* Gallery - only rendered when open */}
      {showAll && (
        <div className="row row-cols-3 g-2">
          {extraImages.map((path, i) => (
            <div key={i} className="col">
              <img
                src={`https://image.tmdb.org/t/p/w185${path}`}
                className="img-fluid rounded shadow-sm"
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                alt=""
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
