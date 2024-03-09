import requestWebDriver from 'src/utils/axios';

export const getDriverInfo = async (driverId: string) => {
  try {
    const response = await requestWebDriver.get(`/api/v1/driver/${driverId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching driver info:', error);
    throw error;
  }
};
