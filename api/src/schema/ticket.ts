import { Passenger, TicketStatus } from "../types/types";

export interface TicketToRegister {
  userId: string;
  passageId: string;
  price: number;
  quantity: number;
  numberSeat: string[];
  paymentId: number;
  merchantOrden: number;
  statusMp: string;
  passengersData: Passenger[];
}

export interface Ticket extends TicketToRegister {
  status: TicketStatus;
  reviewSent: Boolean;
  createdAt: string;
  updatedAt: string;
  passengersData: Passenger[];
}

export interface TicketToUpdate {
  status: TicketStatus;
}
