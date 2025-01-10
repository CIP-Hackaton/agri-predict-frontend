import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export const getAuthToken = () => {
  return Cookies.get('access_token');
};

export const createPrediction = async (predictionData: any) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, predictionData, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPredictions = async () => {
  try {
    const response = await axios.get(`${API_URL}/predictions`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPredictionById = async (id: string) => {
  try {
    const response = await axios.get(`${API_URL}/predictions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sharePrediction = async (id: string, emails: string[]) => {
  try {
    const response = await axios.put(`${API_URL}/predictions/${id}`, { emails });
    return response.data;
  } catch (error) {
    throw error;
  }
};