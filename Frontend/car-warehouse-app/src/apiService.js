import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your API base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

export const getAllCars = async () => {
  try {
    const response = await api.get('/v1/cars');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCarById = async (id) => {
  try {
    const response = await api.get(`/v1/cars/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCar = async (carData) => {
  try {
    console.log('carData', carData);
    const response = await api.post('/v1/cars', carData);
    console.log('response', response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCar = async (id, carData) => {
  try {
    const response = await api.patch(`/v1/cars/${id}`, carData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await api.delete(`/v1/cars/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
