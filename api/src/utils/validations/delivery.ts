import { Delivery, DeliveryToUpdate } from "../../schema/delivery";
import { Request, Response, NextFunction } from "express";
import {
  arePaymentsValid,
  isAddressValid,
  isBirthdayValid,
  isCcValid,
  isEmailValid,
  isFirstNameValid,
  isImgValid,
  isLicenseValid,
  isNationalityValid,
  isPasswordValid,
  isPhoneValid,
  isVehicleTypeValid,
} from "./validators";

export const newDeliveryValidate = (req: Request, res: Response, next: NextFunction): void => {
  // Validar que todas las propiedades tengan un valor válido
  try {
    const data: Delivery = req.body;
    const allowProperties = [
      "firstName",
      "lastName",
      "address",
      "email",
      "password",
      "phone",
      "nationality",
      "birthday",
      "cc",
      "img",
      "license",
    ];
    if (Object.keys(data).some((key) => !allowProperties.includes(key)))
      throw new Error("Datos no permitidos");
    if (
      !isFirstNameValid(data.firstName) ||
      // !isLastNameValid(data.lastName) ||
      !isAddressValid(data.address) ||
      !isEmailValid(data.email) ||
      !isPasswordValid(data.password) ||
      !isPhoneValid(data.phone) ||
      !isNationalityValid(data.nationality) ||
      !isBirthdayValid(data.birthday) ||
      !isCcValid(data.cc) ||
      !isImgValid(data.img) ||
      !isLicenseValid(data.license)
    )
      throw new Error("Faltan datos");
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDeliveryValidate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data: DeliveryToUpdate = req.body;
    const allowProperties: string[] = [
      "phone",
      "address",
      "vehicleType",
      "img",
      "license",
      "payments",
    ];
    if (Object.keys(data).some((key) => !allowProperties.includes(key))) {
      throw new Error("Datos no permitidos");
    }
    if (
      (data?.address && isAddressValid(data.address)) ||
      (data?.img && !isImgValid(data.img)) ||
      (data?.vehicleType && !isVehicleTypeValid(data.vehicleType)) ||
      (data?.license && !isLicenseValid(data.license)) ||
      (data?.payments && !arePaymentsValid(data.payments))
    ) {
      throw Error("Datos no válidos");
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
