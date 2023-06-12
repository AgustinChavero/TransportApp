import { VehicleForChauffeur } from "../../schema/chauffeur";
import { Address, Passenger, Payment, Phone, TypeVehicle } from "../../types/types";
import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import Joi, { Schema, ValidationResult } from "joi";

const messages = {
  "string.base": "El valor {#label} debe ser una cadena de texto",
  "string.email": "El correo electrónico no es válido",
  "string.max": "El valor de {#label} no puede tener más de {#limit} caracteres",
  "string.min": "El valor de {#label} no puede tener menos de {#limit} caracteres",
  "string.empty": "El valor de {#label} no puede estar vacío",
  "string.valid": "El valor de {#label} no es válido",
  "number.base": "El valor {#label} debe ser un numero",
  "number.min": "El valor de {#label} no puede ser menor a {#limit}",
  "number.max": "El valor de {#label} no puede ser mayor a {#limit}",
};
export const validateDataNewUser = (data: any): ValidationResult => {
  const userSchema: Schema = Joi.object({
    firstName: Joi.string().required().max(1).messages(messages),
    lastName: Joi.string().required().max(1).messages(messages),
    password: Joi.string().required().messages(messages),
    email: Joi.string().email().required().messages(messages),
  });

  return userSchema.validate(data);
};

export const validateDataUpdatedUser = (data: any): ValidationResult => {
  const userSchema: Schema = Joi.object({
    cc: Joi.string().max(8).messages(messages),
    gender: Joi.string().valid("masculino", "femenino", "prefiero no decir").messages(messages),
    address: Joi.object({
      postalCode: Joi.string().required().messages(messages),
      location: Joi.string().required().messages(messages),
      state: Joi.string().required().messages(messages),
      street: Joi.string().required().messages(messages),
      number: Joi.string().required().messages(messages),
      department: Joi.string().required().messages(messages),
    })
      .required()
      .messages(messages),
    phone: Joi.object({
      areaCode: Joi.string().required().messages(messages),
      number: Joi.string().required().messages(messages),
    }),
  });
  return userSchema.validate(data);
};

export const validateNewPassage = (data: any): ValidationResult => {
  const passageSchema: Schema = Joi.object({
    origin: Joi.string().required().max(20).messages(messages),
    stock: Joi.number().required().messages(messages),
    destination: Joi.string().required().min(5).max(50).messages(messages),
    departureDate: Joi.string().required().messages(messages),
    arrivalDate: Joi.string().required().messages(messages),
    duration: Joi.string().required().messages(messages),
    price: Joi.number().required().messages(messages),
    departureTime: Joi.string().required().messages(messages),
    arrivalTime: Joi.string().required().messages(messages),
    companyId: Joi.string().required().messages(messages),
    service: Joi.string().valid("cama", "semi cama", "cama ejecutivo").messages(messages),
    numberSeat: Joi.array().items(Joi.string().min(1).max(2)).required().messages(messages),
  }).options({ abortEarly: false });
  return passageSchema.validate(data);
};

export const validateNewCompany = (data: any): ValidationResult => {
  const companySchema: Schema = Joi.object({
    name: Joi.string().required().min(5).max(20).messages(messages),
  }).options({ abortEarly: false });
  return companySchema.validate(data);
};

export const validateNewRatingAndComment = (data: any): ValidationResult => {
  const ratingAndCommentSchema: Schema = Joi.object({
    rating: Joi.number().min(1).max(5).required().messages(messages),
    comment: Joi.string().min(5).max(50).messages(messages),
  }).options({ abortEarly: false });
  return ratingAndCommentSchema.validate(data);
};

export const isNameValid = (req: Request, res: Response): void => {
  const name: string = req.body.lastName;
  if (typeof name !== "string") {
    throw createHttpError(400, "El nombre debe ser una cadena de texto");
  }
  if (name.length > 50) {
    throw createHttpError(400, "El nombre no puede tener más de 50 caracteres");
  }
};

export const isFirstNameValid = (req: Request, res: Response): void => {
  const name: string = req.body.firstName;

  if (typeof name !== "string") {
    throw createHttpError(400, "El nombre debe ser una cadena de texto");
  }
  if (name.length > 50) {
    throw createHttpError(400, "El nombre no puede tener más de 50 caracteres");
  }
};

export const isPasswordValid = (req: Request, res: Response): void => {
  const password: string = req.body.password;

  if (typeof password !== "string") {
    throw createHttpError(400, "La contraseña debe ser una cadena de texto");
  }
  if (password.length > 50) {
    throw createHttpError(400, "La contraseña no puede tener más de 50 caracteres");
  }
};

export const isEmailValid = (req: Request, res: Response): void => {
  const email: string = req.body.email;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (typeof email !== "string") {
    throw createHttpError(400, "El correo debe ser una cadena de texto");
  }
  if (!emailRegex.test(email)) {
    throw createHttpError(400, "El correo no es válido");
  }
};

export const isAddressValid = (req: Request, res: Response): void => {
  const address: Address = req.body.address;

  const allowProperties = ["postalCode", "location", "state", "street", "number", "department"];
  if (
    typeof address === "object" &&
    Object.keys(address).every((key) => allowProperties.includes(key)) &&
    Object.values(address).every((value) => typeof value === "string")
  ) {
    return; // Sin errores
  }
  throw createHttpError(400, "La dirección no es válida");
};

export const isPhoneValid = (req: Request, res: Response): void => {
  const phone: Phone = req.body.phone;

  const allowProperties = ["number", "areaCode"];
  if (
    typeof phone === "object" &&
    Object.keys(phone).every((key) => allowProperties.includes(key)) &&
    Object.values(phone).every((value) => typeof value === "string")
  ) {
    return; // Sin errores
  }
  throw createHttpError(400, "El teléfono no es válido");
};

export const isCcValid = (req: Request, res: Response): void => {
  const cc: string = req.body.cc;

  if (typeof cc !== "string") {
    throw createHttpError(400, "El cc debe ser una cadena de texto");
  }
  if (cc.length > 8) {
    throw createHttpError(400, "El cc no puede tener más de 8 caracteres");
  }
};

export const isCeValid = (req: Request, res: Response): void => {
  const ce: string = req.body.ce;

  if (typeof ce !== "string") {
    throw createHttpError(400, "El ce debe ser una cadena de texto");
  }
  if (ce.length > 8) {
    throw createHttpError(400, "El ce no puede tener más de 8 caracteres");
  }
};

export const isGenderValid = (req: Request, res: Response): void => {
  const gender: string = req.body.gender;
  if (gender !== "male" && gender !== "female") {
    throw createHttpError(400, "El género debe ser 'male' o 'female'");
  }
};

export const isDisplayNameValid = (displayName: string): string | null => {
  if (typeof displayName === "string" && displayName.length <= 50) return null;
  return "El nombre de usuario no es válido";
};

export const isNationalityValid = (req: Request, res: Response): void => {
  const nationality: string = req.body.nationality;

  if (typeof nationality !== "string") {
    throw createHttpError(400, "La nacionalidad debe ser una cadena de texto");
  }
  if (nationality.length > 50) {
    throw createHttpError(400, "La nacionalidad no puede tener más de 50 caracteres");
  }
};

export const isBirthdayValid = (req: Request, res: Response): void => {
  const birthday: Date = req.body.birthday;

  if (typeof birthday !== "object") {
    throw createHttpError(400, "La fecha de nacimiento debe ser una fecha");
  }
  if (birthday.getFullYear() < 1900) {
    throw createHttpError(400, "La fecha de nacimiento no puede ser anterior a 1900");
  }
};

export const isPassportValid = (passport: string): string | null => {
  if (typeof passport === "string" && passport.length <= 50) return null;
  return "El pasaporte no es válido";
};

// IMPORTANTE! comprobar el formato de las licencias de Colombia
//actualmente permite string entre 5 y 20 caracteres
export const isLicenseValid = (license: string): string | null => {
  if (typeof license === "string" && license.length >= 5 && license.length <= 20) return null;
  return "La licencia no es válida";
};

export const isTypeChauffeurValid = (typeChauffeur: string): string | null => {
  if (typeof typeChauffeur === "string" && typeChauffeur.length <= 50) return null;
  return "El tipo de chauffeur no es válido";
};

// string de entre 5 y 1000 caracteres (por si se usan links)
export const isImgValid = (img: string): String | Boolean => {
  if (typeof img === "string" && img.length >= 5 && img.length <= 1000) return null;
  return "La imagen no es válida";
};

export const isArrayImgValid = (imgs: string[]): string | Boolean => {
  if (imgs.every((i) => typeof i === "string")) return null;
  return "La imagen no es válida";
};

// string de entre 5 y 50 caracteres
export const isVehicleTypeValid = (vehicleType: string): string | null => {
  if (typeof vehicleType === "string" && vehicleType.length >= 5 && vehicleType.length <= 50)
    return null;
  return "El tipo de vehículo no es válido";
};

// IMPORTANTE! => por ahora solo verifica que es un objeto (falta definir el formato)
export const arePaymentsValid = (payments: Payment): string | null => {
  const allowProperties = ["cardNumber", "expirationDate", "securityCode"];
  if (
    typeof payments === "object" &&
    Object.keys(payments).every((key) => allowProperties.includes(key)) &&
    Object.values(payments).every((value) => typeof value === "string")
  ) {
    return null;
  }
  return "Los pagos no son válidos";
};

export const isUserIdValid = (req: Request, res: Response): void => {
  const userId = req.body.userId;
  if (typeof userId !== "string") {
    throw createHttpError(400, "El id del usuario no es válido");
  }
};

export const isDistributorIdValid = (dealerId: string): string | null => {
  if (typeof dealerId === "string") return null;
  return "El id del distribuidor no es válido";
};

export const isRatingValid = (rating: number): string | null => {
  if (typeof rating === "number" && rating >= 0 && rating <= 5) return null;
  return "El rating no es válido";
};

export const isCommentValid = (comment: string): string | null => {
  if (typeof comment === "string" && comment.length <= 200) return null;
  return "El comentario no es válido";
};

export const isProductIdValid = (productId: string): string | null => {
  if (typeof productId === "string") return null;
  return "El id del producto no es válido";
};

export const isCompanyIdValid = (req: Request, res: Response): void => {
  const companyId = req.body.companyId;
  if (typeof companyId !== "string") {
    throw createHttpError(400, "El id de la compañía no es válido");
  }
};

export const isLocalIdValid = (localId: string): string | null => {
  if (typeof localId === "string") return null;
  return "El id del local no es válido";
};

export const isPassageIdValid = (req: Request, res: Response): void => {
  const passageId = req.body.passageId;
  if (typeof passageId !== "string") {
    throw createHttpError(400, "El id del pasaje no es válido");
  }
};

export const areVehiclesIdValid = (vehiclesId: string[]): string | null => {
  if (vehiclesId.every((id) => typeof id === "string")) return null;
  return "El id del vehículo no es válido";
};

//IMPORTANTE: definir formato de fecha
export const isDateValid = (date: string): string | null => {
  if (typeof date === "string") return null;
  return "La fecha no es válida";
};

export const isDepartureDateValid = (req: Request, res: Response): void => {
  const departureDate = req.body.departureDate;
  if (typeof departureDate !== "string") {
    throw createHttpError(400, "La fecha de salida no es válida");
  }
};

export const iCheckInValid = (checkIn: string): string | null => {
  if (typeof checkIn === "string") return null;
  return "El check in no es válido";
};

export const isDepartureTimeValid = (req: Request, res: Response): void => {
  const departureTime = req.body.departureTime;
  if (typeof departureTime !== "string") {
    throw createHttpError(400, "La hora de salida no es válida");
  }
  return;
};

export const isArrivalTimeValid = (req: Request, res: Response): void => {
  const arrivalTime = req.body.arrivalTime;
  if (typeof arrivalTime !== "string") {
    throw createHttpError(400, "La hora de llegada no es válida");
  }
};

export const isArrivalDateValid = (req: Request, res: Response): void => {
  const arrivalDate = req.body.arrivalDate;
  if (typeof arrivalDate !== "string") {
    throw createHttpError(400, "La fecha de llegada no es válida");
  }
};

export const isDurationValid = (req: Request, res: Response): void => {
  const duration = req.body.duration;
  if (typeof duration !== "string") {
    throw createHttpError(400, "La duración no es válida");
  }
};

export const isNumberSeatValid = (req: Request, res: Response): void => {
  const numberSeat = req.body.numberSeat;
  if (!Array.isArray(numberSeat)) {
    throw createHttpError(400, "El nÚmero de asientos no es válido");
  }
};

export const isPriceValid = (req: Request, res: Response): void => {
  const price = req.body.price;
  if (typeof price !== "number") {
    throw createHttpError(400, "El precio no es válido");
  }
};

export const isDestinationValid = (req: Request, res: Response): void => {
  const destination = req.body.destination;
  if (typeof destination !== "string") {
    throw createHttpError(400, "La destino no es válido");
  }
  if (destination.length >= 5 && destination.length <= 50) {
    throw createHttpError(400, "La destino no es válido");
  }
};

export const isDescriptionValid = (description: string): string | null => {
  if (typeof description === "string" && description.length >= 5 && description.length <= 1000)
    return null;
  return "La descripción no es válida";
};

export const isStockValid = (req: Request, res: Response): void => {
  const stock = req.body.stock;
  if (typeof stock !== "number") return;
  throw createHttpError(400, "El stock no es válido");
};

//IMPORTANTE: verificar funcionamiento
export const isProductTypeValid = (type: string): string | null => {
  const allowProductTypes = ["food", "drink", "snack", "other", "all"];
  if (typeof type === "string" && allowProductTypes.includes(type)) return null;
  return "El tipo de producto no es válido";
};

//IMPORTANTE: verificar funcionamiento
export const isTravelTravelValid = (travel: string): string | null => {
  const allowTravelTypes = ["food", "drink", "snack", "other", "all"];
  if (typeof travel === "string" && allowTravelTypes.includes(travel)) return null;
  return "El tipo de viaje no es válido";
};

export const isDeletedValid = (deleted: boolean): string | null => {
  if (typeof deleted === "boolean") return null;
  return "El estado no es válido";
};

export const isTravelStatusValid = (status: boolean): string | null => {
  if (typeof status === "boolean") return null;
  return "El estado no es válido";
};

export const isChauffeurIdValid = (req: Request, res: Response): void => {
  const chauffeurId = req.body.chauffeurId;
  if (typeof chauffeurId !== "string") {
    throw createHttpError(400, "El id del chofer no es válido");
  }
};

export const isDealerIdValid = (chauffeurId: string): string | null => {
  if (typeof chauffeurId === "string") return null;
  return "El id del chofer no es válido";
};

export const isOriginValid = (req: Request, res: Response): void => {
  const origin = req.body.origin;
  if (typeof origin === "string") {
    throw createHttpError(400, "El origen debe ser una cadena de texto");
  }
  if (origin.length >= 5 && origin.length <= 50) {
    throw createHttpError(400, "El origen debe tener entre 5 y 50 caracteres");
  }
};

export const isOcupationValid = (ocupation: string): string | null => {
  if (typeof ocupation === "string" && ocupation.length >= 5 && ocupation.length <= 50) return null;
  return "La ocupación no es válido";
};

export const isOwnerIdValid = (ownerId: string): string | null => {
  if (typeof ownerId === "string") return null;
  return "El id del propietario no es válido";
};

export const isVehiclesIdValid = (vehiclesId: any): string | null => {
  if (Array.isArray(vehiclesId)) return null;
  return "Los id de los vehículos no son válidos";
};

export const isPatentValid = (patent: string): string | null => {
  if (typeof patent === "string" && patent.length >= 5 && patent.length <= 10) return null;
  return "El patente no es válido";
};

export const isBrandValid = (brand: string): string | null => {
  if (typeof brand === "string" && brand.length >= 5 && brand.length <= 50) return null;
  return "La marca no es válida";
};

export const isModelValid = (model: string): string | null => {
  if (typeof model === "string" && model.length >= 5 && model.length <= 50) return null;
  return "El modelo no es válido";
};

export const isYearValid = (year: string): string | null => {
  if (typeof year === "string" && year.length >= 2 && year.length <= 4) return null;
  return "El año no es válido";
};

export const isVehicleToChauffeurValid = (vehicle: VehicleForChauffeur): string | null => {
  const allowProperties = ["vehicleId", "patent"];
  if (
    typeof vehicle === "object" &&
    Object.keys(vehicle).every((key) => allowProperties.includes(key)) &&
    Object.values(vehicle).every((value) => typeof value === "string")
  )
    return null;
  return "Los datos para el vehiculo no son correctos";
};

export const isTypeVehicleValidByChauffeur = (value: string): string | null => {
  const validTypes: TypeVehicle[] = ["motorcycle", "car", "bicycle"];
  if (validTypes.includes(value as TypeVehicle)) return null;
  return "El tipo de vehiculo no es válido";
};

export const isTypeVehicleValidByDealer = (value: string): string | null => {
  const validTypes: TypeVehicle[] = ["motorcycle", "car", "bicycle", "van", "other"];
  if (validTypes.includes(value as TypeVehicle)) return null;
  return "El tipo de vehiculo no es válido";
};

export const isServiceValid = (req: Request, res: Response): void => {
  const service = req.body.service;
  if (typeof service !== "string") {
    throw createHttpError(400, "El servicio no es válido");
  }
  const validServices = ["semi cama", "cama", "cama ejecutivo"];
  if (!validServices.includes(service.toLowerCase())) {
    throw createHttpError(400, "El servicio no es válido");
  }
};

export const isValidNumberSeat = (numberSeat: string[], stock: number): string | null => {
  if (!Array.isArray(numberSeat)) {
    return "El número de asientos debe ser un array";
  }

  if (numberSeat.length !== stock) {
    return "La longitud del número de asientos debe ser igual al stock";
  }

  for (const seat of numberSeat) {
    if (typeof seat !== "string") {
      return "Cada valor del número de asientos debe ser una cadena de texto";
    }
  }

  return null; // El número de asientos es válido
};

export const isQuantityValid = (req: Request, res: Response): void => {
  const quantity = req.body.quantity;
  if (typeof quantity !== "number") {
    throw createHttpError(400, "La cantidad no es válida");
  }
};

export const isPassengersDataValid = (req: Request, res: Response): void => {
  const passengersData: Passenger[] = req.body.passengersData;

  for (const passenger of passengersData) {
    const { cc, ce } = passenger;

    isFirstNameValid(req, res);
    isNameValid(req, res);
    isNationalityValid(req, res);

    if (cc) {
      isCcValid(req, res);
    }

    if (ce) {
      isCeValid(req, res);
    }

    isEmailValid(req, res);
    isGenderValid(req, res);
    isBirthdayValid(req, res);
    isPhoneValid(req, res);
  }
};
