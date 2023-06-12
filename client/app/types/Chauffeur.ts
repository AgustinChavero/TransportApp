import { Address, Phone, VehicleForChauffeur } from "./GeneralTypes";
import { Payment } from "./Payments";

export interface Chauffeur {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: Phone;
  nationality: string;
  birthday: string;
  gender: string;
  cc?: string;
  ce?: string;
  passport?: string;
  license: string;
  img: string;
  typeChauffeur: string;
  address: Address;
  occupation: string;
  payments: Payment;
  history: string[];
  ownerState: boolean;
  vehicle: VehicleForChauffeur;
  deleted: boolean;
  status: boolean;
  displayName: string;
  createdAt: string;
  rating: number;
  comments: object[];
}

export interface ChauffeurFilters {
  name?: string;
  id?: string;
  cc?: string;
  ce?: string;
  patent?: string;
}
export interface FilteredChauffeurs {
  data: Chauffeur[];
  currentPage: number;
  totalPages: number;
  activeFilters: ChauffeurFilters | null;
}
export type ChauffeurQueryParams = {
  name?: string;
  id?: string;
  cc?: string;
  ce?: string;
  patent?: string;
};
