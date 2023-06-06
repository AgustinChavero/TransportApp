export type TravelStatus = "pending" | "progress" | "finished" | "rejected";

export type OrderStatus = "pending" | "progress" | "finished" | "rejected";

export type TypeProduct = "food" | "drink" | "snack" | "other" | "all";

export type TypeVehicle = "motorcycle" | "car" | "bicycle" | "van" | "other";

export type TicketStatus = "pending" | "acepted" | "canceled";

export type Payment = {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
};

export type Address = {
  postalCode: string;
  location: string;
  state: string;
  street: string;
  number: string;
  department: string;
};

export type Phone = {
  areaCode: string;
  number: string;
  displayPhone: string;
};

export type Evaluation = {
  userId: string;
  rating: number;
  comment: string;
};

export type Passenger = {
  firstName: string;
  lastName: string;
  nationality: string;
  cc?: string;
  ce?: string;
  email: string;
  gender: string;
  birthDate: string;
  phone: Phone;
};
