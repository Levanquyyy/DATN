import apiClient from '@/lib/api-client.js';
import Cookies from 'js-cookie';
export const fetchUserInfo = async () => {
  const access_token = Cookies.get('access_token');

  if (access_token) {
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
  } else {
    console.error('No access token found');
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
