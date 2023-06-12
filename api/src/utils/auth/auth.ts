import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response, query } from "express";
import { db } from "../../connection/connection";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization }: any = req.headers;

    if (!authorization) {
      throw createHttpError(401, "Token de acceso no proporcionado");
    }
    const token = authorization.replace("Bearer", "").trim();

    const decodedToken: any = jwt.verify(token, "clavemegasecreta");

    const userId: any = decodedToken?.id;

    const userSnapshot = await db.collection("users").doc(userId).get();
    if (!userSnapshot.exists || userSnapshot.data()?.deleted) {
      throw createHttpError(401, "Acceso no autorizado");
    }

    next();
  } catch (error) {
    next(error);
  }
};
