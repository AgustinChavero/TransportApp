export type Phone = {
  areaCode: string;
  number: string;
  displayPhone: string;
};

export type Address = {
  postalCode: string;
  location: string;
  state: string;
  street: string;
  number: string;
  department: string;
};

export type Payment = {
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
};

export type VehicleForChauffeur = {
  vehicleId: string;
  patent: string;
};
