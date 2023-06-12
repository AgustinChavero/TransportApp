import { TicketStatus } from "@component/../api/src/types/types";
import { Passage } from "./Passages";

export interface TicketToRegister {
  userId: string;
  passageId: string;
  price: number;
}

export interface Ticket extends TicketToRegister {
  passageInfo: Passage;
  id: string;
  reviewSent: Boolean;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  quantity?: number;
  paymentId?: string;
  merchantOrder?: string;
  statusMp?: string;
  passengersData?: {
    description: string;
  };
}

export interface TicketToUpdate {
  status: TicketStatus;
}
