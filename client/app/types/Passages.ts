import { NumericLiteral } from "typescript";
import { Company } from "./Company";

export interface Passage {
  companyId: string;
  companyData: Company;
  id: string;
  origin: string;
  destination: string;
  description: string;
  duration: string;
  arrivalDate: string;
  departureDate: string;
  departureTime: string;
  arrivalTime: string;
  quantity: number;
  numberSeat: string[];
  price: number;
  stock: number;
  img: string;
  service: string;
  createdAt: string;
  deleted: boolean;
  status: boolean;
}

export interface PassagePayload {
  passageId: string;
  quantity: number;
}

export interface PassageResponse {
  passages: Passage[];
  totalPages: number;
}
export interface PassageToRegister extends Passage {
  departureTime: string;
}

export interface PassageToUpdate extends Partial<PassageToRegister> {
  updatedAt: string;
}

export interface CardProfilePropsPassage {
  selectedPassage: Passage | null;
  newSeats?: string[];
  disabledSeats?: string[];
  onSeatToggle?: (seat: string) => void;
  onDisableSeatToggle?: (seat: string) => void;
}

export interface CardProfilePropsEnabledSeats {
  enabledSeats: Passage | null;
}

export interface Passagers {
  enabledSeats: Passage | null;
  passangers: Number;
}
