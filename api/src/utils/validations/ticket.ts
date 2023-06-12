import { Request, Response, NextFunction } from "express";
import { TicketToRegister } from "../../schema/ticket";
import {
  isPassageIdValid,
  isPassengersDataValid,
  isPriceValid,
  isQuantityValid,
  isUserIdValid,
} from "./validators";

export const newTicketValidate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const data: TicketToRegister = req.body;
    const validations = [
      { field: "userId", validator: isUserIdValid },
      { field: "passageId", validator: isPassageIdValid },
      { field: "price", validator: isPriceValid },
      { field: "quantity", validator: isQuantityValid },
      { field: "passengersData", validator: isPassengersDataValid },
    ];
    for (const validation of validations) {
      validation.validator(req, res);
    }
  } catch (error) {
    next(error);
  }
};
