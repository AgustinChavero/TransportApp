import { Request, Response, NextFunction } from "express";
import { LocalToRegister, LocalToUpdate } from "../../schema/local";
import {
  arePaymentsValid,
  isAddressValid,
  isEmailValid,
  isImgValid,
  isNameValid,
  isPasswordValid,
} from "./validators";

export const newLocalValidate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data: LocalToRegister = req.body;
    const allowProperties = ["name", "address", "email", "password", "img"];
    if (Object.keys(data).some((key) => !allowProperties.includes(key)))
      throw Error("Datos no permitidos");
    if (
      !isNameValid(data.name) ||
      !isAddressValid(data.address) ||
      !isEmailValid(data.email) ||
      !isPasswordValid(data.password) ||
      !isImgValid(data.img)
    ) {
      throw new Error("Datos no validos");
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// FALTA TESTEAR DESPUES DE REINICIAR LA BD Y CREAR TODOS LOS MODELOS CON EL CAMPO DE BORRADO LÓGICO
export const updateLocalValidate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data: LocalToUpdate = req.body;
    const allowProperties = ["payments"];
    if (Object.keys(data).some((key) => !allowProperties.includes(key)))
      throw Error("Datos no permitidos");
    if (data?.payments && arePaymentsValid(data.payments)) {
      throw new Error("Datos no validos");
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
