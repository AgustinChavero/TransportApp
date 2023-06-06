import { Address, Payment, Phone } from "../types/types";

export interface UserToRegister {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
}
export interface User extends UserToRegister {
  address: Address;
  payments: Payment[];
  history: {
    orders: string[];
    travels: string[];
    tickets: string[];
  };
  phone: Phone;
  nationality: string;
  birthday: string;
  gender: string;
  img: string;
  cc?: string;
  ce?: string;
  deleted: boolean;
  createdAt?: string;
}

export interface UserToUpdate {
  address?: Address;
  phone?: Phone;
  img?: string;
  payments?: Payment[];
  nationality?: string;
  birthday?: string;
  gender?: string;
  cc?: string;
  ce?: string;
  updatedAt?: string;
}
