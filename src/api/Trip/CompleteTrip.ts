// Tiếp tục từ các import và cấu hình axios hiện tại của bạn

import requestWebDriver from 'src/utils/axios';

export const tripComplete = async (tripId: string) => {
  try {
    const response = await requestWebDriver.post('/api/v1/trip-complete', {
      tripId: tripId,
    });
    return response.data; // Trả về dữ liệu nhận được từ server
  } catch (error) {
    // Xử lý lỗi ở đây, ví dụ: in lỗi ra console hoặc throw lỗi
    console.error('Error when calling postTripComplete:', error);
    throw error;
  }
};
