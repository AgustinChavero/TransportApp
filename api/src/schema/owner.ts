import { Address, Phone } from "../types/types";

export interface OwnerToRegister {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  phone: Phone;
  address: Address;
  cc: string;
  ce?: string;
  vehiclesId?: string[];
  createdAt: string;
}

export interface Owner extends OwnerToRegister {
  address: Address;
  deleted?: boolean;
  status: boolean;
}

export interface OwnerToUpdate {
  email?: string;
  phone?: Phone;
  address?: Address;
  updatedAt?: string;
}
