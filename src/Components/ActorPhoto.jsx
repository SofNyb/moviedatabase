// src/components/ActorPhoto.jsx
import { usePersonImages } from "../hooks/usePersonImages";

export default function ActorPhoto({ nconst, ...props }) {
  const { urls, loading } = usePersonImages(nconst);

  // While loading or no image → show placeholder
  if (loading || urls.length === 0) {
    return <img src="/poster-placeholder.png" alt="Actor" {...props} />;
  }

  // Best TMDB headshot (first one is highest voted)
  const bestPhoto = `https://image.tmdb.org/t/p/w185${urls[0]}`;

  return <img src={bestPhoto} alt="Actor" {...props} />;
}
