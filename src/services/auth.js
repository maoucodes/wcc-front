import axios from 'axios';

// API base URL
const API_URL = 'https://wccback.vercel.app/api';

// Configure axios defaults
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.withCredentials = true;

// Intercept responses to handle token expiration
axios.interceptors.response.use(
  (response) => {
    console.log('Axios Response:', response);
    return response;
  },
  (error) => {
    console.error('Axios Error Response:', error.response);
    if (error.response?.status === 401) {
      console.warn('Token expired or invalid. Logging out...');
      logout();
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// Function to register a user
export const register = async (formData) => {
  try {
    console.log('Registering user with data:', formData);
    const response = await axios.post(`${API_URL}/auth/register`, formData);

    console.log('Registration Response:', response.data);

    if (response.data.success) {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      const safeUserData = { ...user };
      delete safeUserData.password;
      localStorage.setItem('userData', JSON.stringify(safeUserData));
      setAuthHeader(token);
      return { token, user: safeUserData };
    } else {
      console.error('Registration failed:', response.data.message);
      throw new Error(response.data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw error;
  }
};

// Function to log in a user
export const login = async (email, password) => {
  try {
    console.log('Logging in with email:', email);
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });

    console.log('Login Response:', response.data);

    if (response.data.success) {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      const safeUserData = { ...user };
      delete safeUserData.password;
      localStorage.setItem('userData', JSON.stringify(safeUserData));
      setAuthHeader(token);
      return { token, user: safeUserData };
    } else {
      console.error('Login failed:', response.data.message);
      throw new Error(response.data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error during login:', error);
    if (error.response?.data) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw error;
  }
};

// Function to log out a user
export const logout = () => {
  console.log('Logging out...');
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  sessionStorage.clear();
  delete axios.defaults.headers.common['Authorization'];
};

// Function to get the current user
export const getCurrentUser = () => {
  console.log('Getting current user...');
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('No token found. User is not authenticated.');
    return null;
  }

  try {
    console.log('Decoding token...');
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const userData = JSON.parse(jsonPayload);

    if (userData.exp && userData.exp * 1000 < Date.now()) {
      console.warn('Token has expired.');
      logout();
      return null;
    }

    console.log('Current user data:', userData);
    return { user: userData, token };
  } catch (error) {
    console.error('Error decoding token:', error);
    logout();
    return null;
  }
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  console.log('Checking if user is authenticated...');
  const user = getCurrentUser();
  const isAuth = !!user;
  console.log('Is user authenticated?', isAuth);
  return isAuth;
};

// Add auth header to all requests
export const setAuthHeader = (token) => {
  if (token) {
    console.log('Setting Authorization header...');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.log('Removing Authorization header...');
    delete axios.defaults.headers.common['Authorization'];
  }
};
