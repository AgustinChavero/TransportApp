import { Address, Payment, Phone, TypeVehicle } from "@component/../api/src/types/types";

export interface DistributorToRegister {
  firstName: string;
  lastName: string;
  address: Address;
  email: string;
  password: string;
  phone: Phone;
  nationality: string;
  birthday: string;
  cc?: string;
  ce?: string;
  passport?: string;
  license: string;
  img: string;
}
export interface Distributor extends DistributorToRegister {
  displayName: string;
  license: string;
  payments: Payment;
  vehicleType?: TypeVehicle;
  history: string[];
  deleted: boolean;
  status: boolean;
  createdAt: string;
  rating: number;
  comments: object[];
  id: string;
}

export interface DistributorToUpdate {
  img: string;
  phone: Phone;
  license: string;
  address: Address;
  payments: Payment;
  vehicleType?: TypeVehicle;
  updatedAt: string;
  status?: boolean;
  rating: number;
}
