import apiClient from '@/lib/api-client.js'; // Import apiClient

export const fetchLocation = async (type, code) => {
  try {
    // Xây dựng URL với type và code
    const url = `/api/auth/product/get-data-location?type=${type}&code=${code}`;

    // Thực hiện yêu cầu GET sử dụng apiClient
    const res = await apiClient.get(url);

    // Xử lý dữ liệu nhận về (giả sử bạn cần lưu vào state hoặc sử dụng ở nơi khác)
    return res.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
