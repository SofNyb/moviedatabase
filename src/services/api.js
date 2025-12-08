// Base configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";

// Fetch wrapper with interceptor-like functionality
const api = async (url, options = {}) => {
  // Prepare headers
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add auth token if available
  const token = localStorage.getItem("token");
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // Prepare full URL
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  try {
    // Make the fetch request
    const response = await fetch(fullUrl, {
      ...options,
      headers,
    });

    // Handle 401 unauthorized
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }

    // Parse response
    const data = await response.json().catch(() => null);

    // Throw error for non-2xx responses
    if (!response.ok) {
      const error = new Error(data?.message || "Request failed");
      error.response = {
        status: response.status,
        data,
      };
      throw error;
    }

    // Return data in axios-compatible format
    return { data };
  } catch (error) {
    // Re-throw with proper structure
    if (!error.response) {
      error.response = {
        status: 500,
        data: { message: error.message },
      };
    }
    throw error;
  }
};

// Add convenience methods - request helpers
api.get = (url, config = {}) => api(url, { ...config, method: "GET" });
api.post = (url, data, config = {}) =>
  api(url, { ...config, method: "POST", body: JSON.stringify(data) });
api.put = (url, data, config = {}) =>
  api(url, { ...config, method: "PUT", body: JSON.stringify(data) });
api.delete = (url, config = {}) => api(url, { ...config, method: "DELETE" });
api.patch = (url, data, config = {}) =>
  api(url, { ...config, method: "PATCH", body: JSON.stringify(data) });

export default api;
