import requestWebDriver from "src/utils/axios";

export const loginDriver = async (phone: string, password: string) => {
    try {
      const response = await requestWebDriver.post('/api/v1/login/driver', {
        phone,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error when calling loginDriver:', error);
      throw error;
    }
  };