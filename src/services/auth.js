import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Configure axios defaults
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

// Intercept responses to handle token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      logout();
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const register = async (formData) => {
  try {
    const { username, name, email, password, year, class: userClass, branch, mobile } = formData;
    
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      name,
      email,
      password,
      year,
      class: userClass,
      branch,
      mobile
    });

    if (response.data.success) {
      const { token, user } = response.data;
      // Store token securely
      localStorage.setItem('token', token);
      // Store user data without sensitive info
      const safeUserData = { ...user };
      delete safeUserData.password;
      localStorage.setItem('userData', JSON.stringify(safeUserData));
      // Set auth header
      setAuthHeader(token);
      return { token, user: safeUserData };
    } else {
      throw new Error(response.data.message || 'Registration failed');
    }
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    });

    if (response.data.success) {
      const { token, user } = response.data;
      // Store token securely
      localStorage.setItem('token', token);
      // Store user data without sensitive info
      const safeUserData = { ...user };
      delete safeUserData.password;
      localStorage.setItem('userData', JSON.stringify(safeUserData));
      // Set auth header
      setAuthHeader(token);
      return { token, user: safeUserData };
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw error;
  }
};

export const logout = () => {
  // Clear all auth related data
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  // Clear any other sensitive data
  sessionStorage.clear();
  // Remove auth header
  delete axios.defaults.headers.common['Authorization'];
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  try {
    // Decode the JWT token
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const userData = JSON.parse(jsonPayload);
    
    // Check token expiration
    if (userData.exp && userData.exp * 1000 < Date.now()) {
      logout();
      return null;
    }

    return { user: userData, token };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  return !!user;
};

// Add auth header to all requests
export const setAuthHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}; 