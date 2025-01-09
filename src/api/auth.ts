import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const setAuthToken = (token: string) => {
  Cookies.set('access_token', token, { secure: true, sameSite: 'Strict' });
};

export const getAuthToken = () => {
  return Cookies.get('access_token');
};

export const removeAuthToken = () => {
  Cookies.remove('access_token');
  delete axios.defaults.headers.common['Authorization'];
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    const { access_token } = response.data;
    setAuthToken(access_token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (userData: any) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`);
    return response.data;
  } catch (error) {
    throw error;
  }
};