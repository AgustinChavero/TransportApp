import { Request, Response, NextFunction } from "express";
import { validateNewRatingAndComment } from "./validators";
import createHttpError from "http-errors";

export const newRatingValidator = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data = req.body;
    const { error } = validateNewRatingAndComment(data);
    if (error) {
      throw createHttpError(400, error.message);
    }
  } catch (error) {
    next(error);
  }
};
