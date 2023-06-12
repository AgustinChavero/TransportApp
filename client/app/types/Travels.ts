export enum TravelStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELED = "canceled",
}

export type Status = {
  [key in TravelStatus]: JSX.Element;
};

// 
export interface Travel {
  userId: string;
  chauffeurId: string;
  origin: string;
  destination: string;
  price: number;
  status: boolean;
  travel: TravelStatus;
  createdAt: Date;
  id: string;
}

export interface TravelToUpdate {
  travel?: TravelStatus;
  updateAd?: Date;
}
