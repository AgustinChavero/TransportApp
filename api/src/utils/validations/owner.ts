import { Request, Response, NextFunction } from "express";
import { OwnerToRegister, OwnerToUpdate } from "../../schema/owner";
import {
  isAddressValid,
  isCcValid,
  isCeValid,
  isDisplayNameValid,
  isEmailValid,
  isFirstNameValid,
  isPhoneValid,
  isVehiclesIdValid,
} from "./validators";

export const newOwnerValidated = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data: OwnerToRegister = req.body;
    const allowProperties = ["firstName", "lastName", "email", "phone", "address", "cc", "ce"];
    if (Object.keys(data).some((key) => !allowProperties.includes(key)))
      throw Error("Datos no permitidos");
    if (
      !isFirstNameValid(data.firstName) ||
      // !isLastNameValid(data.lastName) ||
      !isEmailValid(data.email) ||
      !isPhoneValid(data.phone) ||
      !isAddressValid(data.address) ||
      !isCcValid(data.cc) ||
      (data.ce && !isCeValid(data.ce))
    ) {
      throw new Error("Datos incompletos o no válidos");
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateOwnerValidated = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data: OwnerToUpdate = req.body;
    const allowProperties = ["email", "phone", "address"];
    if (Object.keys(data).some((key) => !allowProperties.includes(key)))
      throw Error("Datos faltantes");
    if (
      (data?.email && !isEmailValid(data.email)) ||
      (data?.phone && !isPhoneValid(data.phone)) ||
      (data?.address && !isAddressValid(data.address))
    ) {
      throw new Error("Datos incompletos o no válidos");
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
