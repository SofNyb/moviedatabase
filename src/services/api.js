// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5113";

const api = async (inputUrl, options = {}) => {
  let url = inputUrl.startsWith("http") ? inputUrl : `${BASE_URL}${inputUrl}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Handle params manually — fetch doesn't do it
  if (options.params) {
    const searchParams = new URLSearchParams();
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });
    if (searchParams.toString()) {
      url += (url.includes("?") ? "&" : "?") + searchParams.toString();
    }
    delete options.params; // clean it so fetch doesn't see it
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return { data };
};

// Convenience methods
api.get = (url, config = {}) => api(url, { ...config, method: "GET" });
api.post = (url, body, config = {}) => api(url, { ...config, method: "POST", body: JSON.stringify(body) });
api.put = (url, body, config = {}) => api(url, { ...config, method: "PUT", body: JSON.stringify(body) });
api.delete = (url, body, config = {}) => api(url, { ...config, method: "DELETE", body: JSON.stringify(body) });
api.patch = (url, body, config = {}) => api(url, { ...config, method: "PATCH", body: JSON.stringify(body) });

export default api;
