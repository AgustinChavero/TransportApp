import { Request, Response, NextFunction } from "express";
import { PassageToRegister } from "../../schema/passage";
import { validateNewPassage } from "./validators";
import createHttpError from "http-errors";

export const newPassageValidate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // const data = req.body;
    const dataString: string = req.body.data; // Solo usar cuando se necesite probar con insomia Obtener la cadena JSON de la solicitud
    const data: PassageToRegister = JSON.parse(dataString); // Solo usar cuando se necesite probar con insomia

    const { error } = validateNewPassage(data);
    if (error) {
      throw createHttpError(400, error.message);
    }
    next();
  } catch (error) {
    next(error); // Pasar el error al siguiente middleware
  }
};
