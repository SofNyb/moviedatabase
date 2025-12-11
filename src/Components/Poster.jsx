// src/components/Poster.jsx
export default function Poster({ src, alt = "Movie poster", ...props }) {
  return (
    <img
      {...props}
      src={src || "/poster-placeholder.png"} 
      alt={alt}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "/poster-placeholder.png";
      }}
    />
  );
}
