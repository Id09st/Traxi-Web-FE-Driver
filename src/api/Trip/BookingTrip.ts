import { BookingTripProps } from 'src/types/trip';
import requestWebDriver from 'src/utils/axios';

export const BookingTrip = async ({ driverId, tripId }: BookingTripProps): Promise<any> => {
  try {
    const response = await requestWebDriver.post('/api/v1/apply-driver', {
      driverId,
      tripId,
    });
    return response.data;
  } catch (error) {
    console.error('Error when booking trip:', error);
    throw error;
  }
};
