// src/api/ferremasApi.js
const API_BASE_URL = 'http://localhost:8000/api';

export const ferremasApi = {
  // Productos
  getProductos: async () => {
    const response = await fetch(`${API_BASE_URL}/productos/`);
    return await response.json();
  },

  getProductoById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/productos/${id}/`);
    return await response.json();
  }
};
