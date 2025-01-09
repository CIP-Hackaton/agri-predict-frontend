import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const getAuthToken = () => {
  const access_token = Cookies.get('access_token');
  if (!access_token) {
    throw new Error('No access token found');
  }
  return access_token;
}


export const validateUserToken = async () => { 

  const token = getAuthToken();
  if (!token) {
    return false;
  }

  const response = await axios.get(`${API_URL}/user/validate`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200)
    return true

  return false
} 

export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/user/me`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    });
    const data = response.data;

    return data;
    
  } catch (error) {
    //console.error('Error fetching user info:', error);
    return null;
  }
};