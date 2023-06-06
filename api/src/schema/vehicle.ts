import { TypeVehicle } from "../types/types";

export interface VehicleToRegister {
  patent: string;
  brand: string;
  model: string;
  year: string;
  img: string[];
  ownerId: string;
  chauffeurId?: string;
  deliveryId?: string;
  documents: string[];
  typeVehicle: TypeVehicle;
}

export interface Vehicle extends VehicleToRegister {
  deleted?: boolean;
  createdAt?: string;
  status: boolean;
}

export interface VehicleToUpdate {
  patent?: string;
  brand?: string;
  model?: string;
  year?: string;
  img?: string[];
  ownerId?: string;
  chauffeurId?: string;
  documents?: string[];
  updatedAt?: string;
}
