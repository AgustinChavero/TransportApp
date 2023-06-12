export type QueryParams = {
  destination?: string;
  origin?: string;
  price?: number;
  departureDate?: string;
  arrivalDate?: string;
};

export type QueryParamsVehicle = {
  patent?: string;
  brand?: string;
  model?: string;
  year?: string;
  ownerId?: string;
  chauffeurId?: string;
  deliveryId?: string;
};
