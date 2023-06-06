import { TypeProduct } from "../types/types";

export interface Products {
  name: string;
  price: number;
  description: string;
  stock: number;
  type: TypeProduct;
  localId: string;
  img: string;
  createdAt: string,
}

export interface ProductsToUpdate extends Partial<Products> {
  deleted: boolean,
  updatedAt?: string,
}
