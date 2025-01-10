import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const getAuthToken = () => {
  return Cookies.get('access_token');
};

export const getPotatoes = async () => {
  try {
    const response = await axios.get(`${API_URL}/potatoes`,{
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};