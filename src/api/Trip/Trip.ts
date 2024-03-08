import { Trip, TripResult } from 'src/types/trip';
import requestWebDriver from 'src/utils/axios';

export const postApplyDriver = async (driverId: string, tripId: string) => {
  try {
    const response = await requestWebDriver.post('/api/v1/apply-driver', {
      driverId,
      tripId,
    });
    return response.data;
  } catch (error) {
    console.error('Error when calling postApplyDriver:', error);
    throw error;
  }
};

export const getActiveTrips = async (): Promise<Trip[]> => {
  try {
    const response = await requestWebDriver.get(`/api/v1/trip-all-no-driver`);
    if (Array.isArray(response.data.result)) {
      const trips = response.data.result.map((tripResult: TripResult) => tripResult.trip);
      return trips;
    }
    console.error('Expected an array for result, but did not find one.');
    return [];
  } catch (error) {
    console.error('Error when calling getActiveTrips:', error);
    throw error;
  }
};

export const getDetailTrip = async (tripId: string) => {
  try {
    const response = await requestWebDriver.get(`/api/v1/trip-no-driver/${tripId}`);
    return response.data.result;
  } catch (error) {
    console.error('Error when calling getDetailTrip:', error);
    throw error;
  }
};

export const getDetailVehiclesByTrip = async (tripId: string) => {
  try {
    const response = await requestWebDriver.get(`/api/v1/trip-no-driver/${tripId}`);
    if (response.data && response.data.result) {
      const vehicleInfo = response.data.result.TripDetail.Vehicle;
      return vehicleInfo;
    }
    console.error('No result found for this tripId:', tripId);
    return null;
  } catch (error) {
    console.error('Error when calling getDetailTrip:', error);
    throw error;
  }
};

export const getDetailTripByDriver = async (driverId: string) => {
  try {
    const response = await requestWebDriver.get(`/api/v1/trip-driver/${driverId}`);
    return response.data.result;
  } catch (error) {
    console.error('Error when calling getDetailTrip:', error);
    throw error;
  }
};
