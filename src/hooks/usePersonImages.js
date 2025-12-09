// src/hooks/usePersonImages.js   (for the TMDB part)
import { useState, useEffect } from "react";

const TMDB_KEY = "eb2e777daf947b9346f0ae573ecacf83";
const BASE = "https://api.themoviedb.org/3";

export function usePersonImages(imdbId) {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdbId) {
      setError("No IMDb ID");
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    async function load() {
      try {
        const find = await fetch(`${BASE}/find/${imdbId}?external_source=imdb_id&api_key=${TMDB_KEY}`);
        const { person_results } = await find.json();
        if (!person_results?.[0]) throw new Error("Person not found");

        const images = await fetch(`${BASE}/person/${person_results[0].id}/images?api_key=${TMDB_KEY}`);
        const { profiles } = await images.json();

        if (!cancelled) setUrls(profiles.map(p => p.file_path));
      } catch (e) {
        if (!cancelled) setError("Failed to load images");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true };
  }, [imdbId]);

  return { urls, loading, error };
}
