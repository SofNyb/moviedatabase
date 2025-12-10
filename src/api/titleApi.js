const API_BASE = "http://localhost:5113/api";

export async function getTitles(page, pageSize = 20) {
  const res = await fetch(`${API_BASE}/titles?page=${page}&pageSize=${pageSize}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getAkas(tconst) {
  if (!tconst) return [];
  const res = await fetch(`${API_BASE}/titles/${tconst}/akas`);
  if (!res.ok) return [];
  return res.json();
}

export async function getAwards(tconst) {
  if (!tconst) return null;
  const res = await fetch(`${API_BASE}/titles/${tconst}/awards`);
  if (!res.ok) return null;
  const data = await res.json();
  return data?.awardInfo && data.awardInfo !== "null" ? data : null;
}

export async function getAllCast(tconst) {
  if (!tconst) return [];
  const res = await fetch(`${API_BASE}/titles/${tconst}/allcast`);
  if (!res.ok) return [];
  return res.json();
}

export async function getEpisodes(tconst) {
  if (!tconst) return [];
  const res = await fetch(`${API_BASE}/titles/${tconst}/episodes`);
  if (!res.ok) return [];
  return res.json();
}

export async function getGenres(tconst) {
  if (!tconst) return [];
  const res = await fetch(`${API_BASE}/titles/${tconst}/genres`);
  if (!res.ok) return [];
  return res.json();
}

export async function getOverallRating(tconst) {
  if (!tconst) return null;
  const res = await fetch(`${API_BASE}/titles/${tconst}/overallrating`);
  if (!res.ok) return null;
  return res.json();
}

export async function getPrincipals(tconst) {
  if (!tconst) return [];
  const res = await fetch(`${API_BASE}/titles/${tconst}/principals`);
  if (!res.ok) return [];
  return res.json();
}

export async function getTitle(tconst) {
  if (!tconst) return null;
  const res = await fetch(`${API_BASE}/titles/${tconst}`);
  if (!res.ok) return null;
  return res.json();
}
