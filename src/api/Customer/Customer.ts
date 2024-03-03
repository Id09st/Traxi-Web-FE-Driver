import { ICustomerInfo } from "src/types/customer";
import requestWebDriver from "src/utils/axios";

export const getCustomerInfo = async (customerId: string): Promise<ICustomerInfo> => {
    try {
      const response = await requestWebDriver.get(`/api/v1/customer-info/${customerId}`);
      return response.data.result;
    } catch (error) {
      console.error('Error when calling getCustomerInfo:', error);
      throw error;
    }
  };