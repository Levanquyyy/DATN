import apiClient from '@/lib/api-client.js';

export const postPayment = async (transformedData) => {
  try {
    const response = await apiClient.post(
      'http://localhost:8000/api/zalopay/payment',
      transformedData
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error posting payment:',
      error.response?.data || error.message
    );
    throw error;
  }
};
