export interface RoadTripToRegister {
  origin: string;
  destination: string;
  stops: string[];
  stopsDurations: string[];
  totalDuration: string;
}

export interface RoadTrip {
  origin: string;
  destination: string;
  stops: string[];
  stopsDurations: string[];
  totalDuration: string;
  deleted: boolean;
}
