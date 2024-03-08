import requestWebDriver from 'src/utils/axios';

export const tripComplete = async (tripId: string) => {
  try {
    const response = await requestWebDriver.post('/api/v1/trip-complete', {
      tripId,
    });
    return response.data;
  } catch (error) {
    console.error('Error when calling postTripComplete:', error);
    throw error;
  }
};
