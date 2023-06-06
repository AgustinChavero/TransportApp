import { Address, Payment, Phone, TypeVehicle } from "../types/types";
export interface DeliveryToRegister {
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
export interface Delivery extends DeliveryToRegister {
  displayName: string;
  license: string;
  payments: Payment;
  vehicle: VehicleForDelivery;
  history: string[];
  deleted: boolean;
  status: boolean;
  createdAt: string;
  rating: number;
  comments: object[];
}

export interface DeliveryToUpdate {
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

export interface VehicleForDelivery {
  vehicleId: string;
  patent: string;
}
