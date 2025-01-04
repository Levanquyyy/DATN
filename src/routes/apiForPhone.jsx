import apiClient from '@/lib/api-client.js';

export const getdataPhone = async (key) => {
  try {
    const response = await apiClient.get(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/categories/get-data/?type=${key}`
    );
    return response.data.data; // Return data from API
  } catch (error) {
    console.error(
      'Error fetching product by id:',
      error.response?.data || error.message
    );
    return null;
  }
};
