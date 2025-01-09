import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'; 
// Prediction requests
export const createPrediction = async (predictionData: any) => {
  try {
    const response = await axios.post(`${API_URL}/predictions`, predictionData);
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

export const getPredictionById = async (id: any) => {
  try {
    const response = await axios.get(`${API_URL}/predictions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Potato varieties requests
export const getPotatoVarieties = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/varieties?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPotatoVarietyById = async (id: any) => {
  try {
    const response = await axios.get(`${API_URL}/varieties/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};