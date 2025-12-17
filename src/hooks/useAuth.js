import { useState, useEffect } from "react";
import { authService } from "../services";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setUser(null);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
        // Token is invalid, clear it
        localStorage.removeItem("token");
        setError(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Listen for auth state changes
    const handleAuthChange = () => {
      setRefreshTrigger((prev) => prev + 1);
    };

    window.addEventListener("authStateChanged", handleAuthChange);

    return () => {
      window.removeEventListener("authStateChanged", handleAuthChange);
    };
  }, [refreshTrigger]);

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      console.error("Error refreshing user:", error);
      setError(error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(
        credentials.email,
        credentials.password
      );
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      window.dispatchEvent(new Event("authStateChanged"));
      return response;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // First, register the user
      await authService.register(userData.email, userData.password);
      // Then, automatically log them in to get the token
      const loginResponse = await authService.login(
        userData.email,
        userData.password
      );
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      window.dispatchEvent(new Event("authStateChanged"));
      return loginResponse;
    } catch (error) {
      console.error("Error in register hook:", error);
      setError(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("authStateChanged"));
    window.location.href = "/login";
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authService.updateProfile(profileData);
      await refreshUser();
      window.dispatchEvent(new Event("authStateChanged"));
      return response;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    refreshUser,
    login,
    register,
    logout,
    updateProfile,
  };
};
