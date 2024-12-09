import Cookies from 'js-cookie';
import apiClient from '@/lib/api-client.js';

export const postProduct = async (transformedData, forsale = false) => {
  try {
    const response = await apiClient.post(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/add-product-rent`,
      transformedData
    );
    if (!response.data.data.id) {
      return null;
    }
    return response.data.data.id;
  } catch (error) {
    console.error(
      'Error posting product:',
      error.response?.data || error.message
    );
  }
};
export const getDataProductByIdRent = async (id) => {
  try {
    const response = await apiClient.get(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/get-product-rent-detail/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching product by id:',
      error.response?.data || error.message
    );
    return null;
  }
};
export const getFilterData = async () => {
  try {
    const response = await apiClient.get(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/get-data-post?type=1`
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching product by id:',
      error.response?.data || error.message
    );
    return null;
  }
};

export const hiddenPost = async (id, status) => {
  try {
    const response = await apiClient.post(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/change-status-post`,
      { id: id, status: status }
    );
    if (!response.data) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(
      'Error posting product:',
      error.response?.data || error.message
    );
  }
};
export const loadPost = async (id) => {
  try {
    const response = await apiClient.post(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/change-load-btn-post`,
      { id: id }
    );
    if (!response.data) {
      return null;
    }
    return response.data.status;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error posting product:', errorMessage);
    return { message: errorMessage, status: 'error' };
  }
};
export const showHiddenPost = async (id, status) => {
  try {
    const response = await apiClient.post(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/change-status-post`,
      { id: id, status: status }
    );
    if (!response.data) {
      return null;
    }
    return response.data.status;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Error posting product:', errorMessage);
    return { message: errorMessage, status: 'error' };
  }
};
