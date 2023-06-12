import { Vehicle, VehicleToUpdate } from "../../schema/vehicle";
import { Request, Response, NextFunction } from "express";
import {
  isPatentValid,
  isBrandValid,
  isModelValid,
  isYearValid,
  isChauffeurIdValid,
  isOwnerIdValid,
  isArrayImgValid,
  isDealerIdValid,
  isTypeVehicleValidByChauffeur,
  isTypeVehicleValidByDealer,
} from "./validators";

export const newVehicleValidateByDealer = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Validar que todas las propiedades tengan un valor válido
  try {
    const data: Vehicle = req.body;
    const allowProperties = [
      "patent",
      "brand",
      "model",
      "year",
      "img",
      "ownerId",
      "deliveryId",
      "documents",
      "typeVehicle",
    ];
    if (Object.keys(data).some((key) => !allowProperties.includes(key)))
      throw Error("Datos no permitidos");
    if (
      !isPatentValid(data.patent) ||
      !isBrandValid(data.brand) ||
      !isModelValid(data.model) ||
      !isYearValid(data.year) ||
      !isOwnerIdValid(data.ownerId) ||
      !isDealerIdValid(data.deliveryId) ||
      !isArrayImgValid(data.img) ||
      !isArrayImgValid(data.documents) ||
      !isTypeVehicleValidByDealer(data.typeVehicle)
    ) {
      throw new Error("Datos incompletos o no válidos");
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const newVehicleValidateByChauffeur = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Validar que todas las propiedades tengan un valor válido
  try {
    const data: Vehicle = req.body;
    const allowProperties = [
      "patent",
      "brand",
      "model",
      "year",
      "ownerId",
      "chauffeurId",
      "documents",
      "typeVehicle",
    ];
    if (Object.keys(data).some((key) => !allowProperties.includes(key)))
      throw Error("Datos no permitidos");
    if (
      !isPatentValid(data.patent) ||
      !isBrandValid(data.brand) ||
      !isModelValid(data.model) ||
      !isYearValid(data.year) ||
      !isOwnerIdValid(data.ownerId) ||
      !isChauffeurIdValid(data.chauffeurId) ||
      !isArrayImgValid(data.documents) ||
      !isTypeVehicleValidByChauffeur(data.typeVehicle)
    ) {
      throw new Error("Datos incompletos o no válidos");
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVehicleValidate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data: VehicleToUpdate = req.body;
    const allowProperties: string[] = [
      "patent",
      "brand",
      "model",
      "year",
      "ownerId",
      "chauffeurId",
      "documents",
    ];
    if (Object.keys(data).some((key) => !allowProperties.includes(key)))
      throw new Error("Datos no permitidos");
    if (
      (data?.patent && !isPatentValid(data.patent)) ||
      (data?.brand && !isBrandValid(data.brand)) ||
      (data?.model && !isModelValid(data.model)) ||
      (data?.year && !isYearValid(data.year)) ||
      (data?.ownerId && !isOwnerIdValid(data.ownerId)) ||
      (data?.chauffeurId && !isChauffeurIdValid(data.chauffeurId)) ||
      (data?.documents && !isArrayImgValid(data.documents))
    ) {
      throw new Error("Datos incompletos o no válidos");
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
