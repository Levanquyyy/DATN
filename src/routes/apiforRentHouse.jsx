import apiClient from '@/lib/api-client.js';

export const postProduct = async (formData) => {
  try {
    const response = await apiClient.post(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/add-product-rent`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
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

// toi xu ly
// export const filterProductType = async (type) => {
//   try {
//     const response = await apiClient.get(
//       `${import.meta.env.VITE_SERVER_URL}/api/auth/product/get-data-post`,
//       { type_product: type }
//     );
//     if (!response.data) {
//       return null;
//     }
//     return response.data.status;
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || error.message;
//     console.error('Error posting product:', errorMessage);
//     return { message: errorMessage, status: 'error' };
//   }
// };

export const minMaxPrice = async (price_gte, price_lte) => {
  try {
    const response = await apiClient.get(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/get-data-post?type=1`,
      { params: { price_gte, price_lte } } // Sử dụng `params` để truyền query parameters
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
export const bedRoomId = async (bedroom_id) => {
  try {
    const endcodeId = encodeURIComponent(bedroom_id);
    const response = await apiClient.get(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/get-data-post?type=1&bedroom_id=${endcodeId}`
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
export const filterLocation = async (formattedString) => {
  try {
    const response = await apiClient.get(
      `${import.meta.env.VITE_SERVER_URL}/api/auth/product/get-data-post?type=1&location=${formattedString}`
    );
    return response.data; // Return data from API
  } catch (error) {
    console.error(
      'Error fetching product by id:',
      error.response?.data || error.message
    );
    return null;
  }
};
export const getdataTypeOfHouse = async (key) => {
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
export const getDataNextPage = async (page) => {
  try {
    const response = await apiClient.get(page);
    return response.data; // Return data from API
  } catch (error) {
    console.error(
      'Error fetching product by id:',
      error.response?.data || error.message
    );
    return null;
  }
};
