const API_URL = import.meta.env.VITE_API_URL;

export const AUTH_ENDPOINTS = {
    REGISTER: `${API_URL}/auth/register`,
    LOGIN: `${API_URL}/auth/login`,
    GET_PROFILE: `${API_URL}/auth/me`
}; 