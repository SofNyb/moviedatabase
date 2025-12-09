const API_BASE = "http://localhost:5113/api";

export async function getName(nconst) {
  const res = await fetch(`${API_BASE}/names/${nconst}/`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getNameProfession(nconst) {
  const res = await fetch(`${API_BASE}/names/${nconst}/profession`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getKnownFor(imdbId) {
  const res = await fetch(`${API_BASE}/names/${imdbId}/knownfor`);
  if (!res.ok) throw new Error("Failed to load known-for titles");
  return res.json();
}

export async function getAllTitles(imdbId) {
  const res = await fetch(`${API_BASE}/names/${imdbId}/titles`);
  if (!res.ok) throw new Error("Failed to load all titles");
  return res.json();
}
