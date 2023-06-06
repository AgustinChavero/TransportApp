import { OrderStatus } from "../types/types";

export interface Order {
  userId: string;
  deliveryId: string;
  productId: string;
  localId: string;
  date: string;
  price: number;
  destination: string;
  status: boolean;
  order: OrderStatus;
  createdAt: string,
}

export interface OrderToUpdate {
  order?: OrderStatus;
  updatedAt?: string;
}
