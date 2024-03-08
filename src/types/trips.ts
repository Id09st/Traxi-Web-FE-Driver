import { IAuthorProps } from './author';
import { ISocialLinks } from './socials';

// ----------------------------------------------------------------------

export interface Result {
  TripId: string;
  BookingDate: string;
  Status: string;
  UpDate: string;
  CustomerId: string;
  DriverId: string | null;
  TripDetail: TripDetail;
}

export interface TripDetail {
  Distance: number;
  TotalPrice: number;
  InsDate: string;
  EndTime: string;
  StartTime: string;
  StartLocation: string;
  EndLocation: string;
  TripId: string;
  Vehicle: Vehicle;
}

export interface Vehicle {
  Id: string;
  RegistrationDate: string;
  LicensePlate: string;
  Mode: string;
  Level: number;
  Type: string;
  Color: string;
  Capacity: string;
  Deflag: boolean;
  CustomerId: string;
  ImgURL: string;
}

export interface TripsDriver {
  Id: string;
  BookingDate: string;
  Status: string;
  UpDate: string;
  CustomerId: string;
  DriverId: string;
}
