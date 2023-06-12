import { Request, Response, NextFunction } from "express";
import { validateNewCompany } from "./validators";
import createHttpError from "http-errors";

export const newCompanyValidate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data = req.body;
    const { error } = validateNewCompany(data);
    if (error) {
      throw createHttpError(400, error.message);
    }
    next();
  } catch (error) {
    next(error); // Pasar el error al siguiente middleware
  }
};
