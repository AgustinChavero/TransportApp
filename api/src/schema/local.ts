import { Address, Payment } from "../types/types";

export interface LocalToRegister {
  name: string;
  address: Address;
  email: string;
  password: string;
  img: string;
}

export interface Local extends LocalToRegister {
  bankAccount: {
    bankHolder: string;
    accountNumber: string;
  };
  history: string[];
  status: boolean;
  deleted: boolean;
  createdAt: string;
}

// Partial hace que las props extendidas sean opcionales
export interface LocalToUpdate extends Partial<LocalToRegister> {
  payments: Payment; // provisional
  updatedAt: string;
}
