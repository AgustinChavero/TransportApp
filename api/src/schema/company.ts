import { Evaluation } from "../types/types";

export interface Company {
  name: string;
  rating: number;
  createdAt: string;
  evaluation: Evaluation[];
}
export interface CompanyToUpdate extends Company {
  updatedAt: string;
}
