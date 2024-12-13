import apiClient from '@/lib/api-client.js';
import Cookies from 'js-cookie';
import axios from 'axios';
export const fetchUserInfo = async () => {
  try {
    const response = await apiClient.get(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/user`
    );
    return response.data;
  } catch (error) {
    console.error(
      'Error fetching user info:',
      error.response?.data || error.message
    );
    return null;
  }
};
export const signOut = async () => {
  try {
    const res = await apiClient.post(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`
    );

    return res.data;
  } catch (error) {
    console.error('Error signing out:', error.response?.data || error.message);
    return false;
  }
};
export const updateUser = async (values, id) => {
  try {
    const res = await apiClient.post(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/update/${id}`,
      values
    );

    return res.data;
  } catch (error) {
    console.error(
      'Error updating user:',
      error.response?.data || error.message
    );
    return false;
  }
};

export const forgotPassword = async (values) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/forgot-password`,
      { email: values }
    );

    return res.data;
  } catch (error) {
    console.error(
      'Error forgot password:',
      error.response?.data || error.message
    );
    return false;
  }
};
export const confirmPasswordReset = async ({ password, id }) => {
  try {
    const response = await axios.post(
      `http://127.0.0.1:8000/api/password/reset/${id}`,
      {
        password,
        id,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
