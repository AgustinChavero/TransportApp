import { Request, Response, NextFunction } from "express";
import { UserToRegister, UserToUpdate } from "../../schema/user";
import { validateDataNewUser, validateDataUpdatedUser } from "./validators";
import createHttpError from "http-errors";

export const newUserValidated = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data: UserToRegister = req.body;

    const { error } = validateDataNewUser(data);
    if (error) {
      throw createHttpError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const updateUserValidated = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data = req.body;
    const { error } = validateDataUpdatedUser(data);
    if (error) {
      throw createHttpError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};
