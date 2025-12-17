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
    // Don't redirect, just throw the error
    // Let the calling component decide what to do
    const error = new Error("Unauthorized");
    error.response = { status: 401, data };
    throw error;
  } 

  // Try to parse response as JSON, fallback to text
  let data = null;
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    data = await response.json().catch(() => null);
  } else {
    const text = await response.text().catch(() => "");
    data = text ? { message: text } : null;
  }

  if (!response.ok) {
    const errorMessage =
      data?.message || data || `Request failed with status ${response.status}`;
    console.error("API Error:", { status: response.status, data, url });
    throw new Error(errorMessage);
  }

  return { data };
};

// Convenience methods
api.get = (url, config = {}) => api(url, { ...config, method: "GET" });
api.post = (url, body, config = {}) =>
  api(url, { ...config, method: "POST", body: JSON.stringify(body) });
api.put = (url, body, config = {}) =>
  api(url, { ...config, method: "PUT", body: JSON.stringify(body) });
api.delete = (url, body, config = {}) =>
  api(url, { ...config, method: "DELETE", body: JSON.stringify(body) });
api.patch = (url, body, config = {}) =>
  api(url, { ...config, method: "PATCH", body: JSON.stringify(body) });

export default api;
