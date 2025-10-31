import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products API
export const productAPI = {
  // Get all products
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Get best sellers
  getBestSellers: async () => {
    try {
      const response = await api.get('/products/filter/bestsellers');
      return response.data;
    } catch (error) {
      console.error('Error fetching best sellers:', error);
      throw error;
    }
  },
};

// Packs API
export const packAPI = {
  // Get all packs
  getAll: async () => {
    try {
      const response = await api.get('/packs');
      return response.data;
    } catch (error) {
      console.error('Error fetching packs:', error);
      throw error;
    }
  },

  // Get pack by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/packs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pack:', error);
      throw error;
    }
  },
};

// Orders API
export const orderAPI = {
  // Create new order
  create: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get order by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },
};

export default api;

