import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout, setAuthHeader } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const initAuth = () => {
      const userData = getCurrentUser();
      if (userData) {
        setUser(userData.user);
        // Set auth header with the token
        setAuthHeader(userData.token);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    // Clear auth header
    setAuthHeader(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    // Update auth header if token is provided
    if (userData?.token) {
      setAuthHeader(userData.token);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, updateUser, handleLogout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
