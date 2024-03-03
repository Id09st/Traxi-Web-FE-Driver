export interface TripDetail {
  Id: string;
  Distance: number | null;
  TotalPrice: number | null;
  InsDate: string;
  EndTime: string | null;
  StartTime: string;
  StartLocation: string;
  EndLocation: string;
  TripId: string;
  VehicleId: string | null;
}

export interface Trip {
  Id: string;
  BookingDate: string;
  Status: string;
  UpDate: string;
  CustomerId: string;
  DriverId: string | null;
  tripDetails: TripDetail;
}

export interface TripResult {
  trip: Trip;
}

export interface BookingTripProps {
  driverId: string;
  tripId: string;
}
