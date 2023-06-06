import { TravelStatus } from "../types/types";

export interface Travel {
  userId: string;
  chauffeurId: string;
  origin: string;
  destination: string;
  price: number;
  status: boolean;
  travel: TravelStatus;
  createdAt: string;
}

export interface TravelToUpdate {
  status: boolean
  travel?: TravelStatus;
  updatedAt?: string;
}
