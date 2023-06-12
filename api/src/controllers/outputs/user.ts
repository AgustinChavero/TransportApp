import { NextFunction, Request, Response, query } from "express";
import { db } from "../../connection/connection";
import jwt from "jsonwebtoken";
import firebase from "firebase-admin";
import createHttpError from "http-errors";

export const searchUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("users").doc(id).get();
    if (!doc.exists) {
      throw createHttpError(404, "El usuario no existe");
    } else {
      const usuario = { id: doc.id, ...doc.data() };
      res.status(200).json(usuario);
    }
  } catch (error) {
    next(error);
  }
};

export const allUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    let usersRef: firebase.firestore.Query<firebase.firestore.DocumentData> =
      db.collection("users");

    //let deletedFilter = false; // Valor predeterminado de deleted en false

    if (Object.keys(req.query).length > 2) {
      const filters = Object.keys(req.query).filter((key) => key !== "page" && key !== "pageSize");
      filters.forEach((key) => {
        usersRef = usersRef.where(key, "==", req.query[key]);
        // if (key === "deleted") {
        //   // Si se proporciona el parámetro "deleted" en la consulta, se sobrescribe el valor predeterminado
        //   deletedFilter = req.query.deleted === "true";
        // } else {
        //   usersRef = usersRef.where(key, "==", req.query[key]);
        // }
      });
    }

    //usersRef = usersRef.where("deleted", "==", deletedFilter);

    const totalUsersSnapshot = await usersRef.get();
    if (totalUsersSnapshot.empty) {
      throw createHttpError(404, "No hay usuarios registrados");
    }

    const totalFilteredUsers = totalUsersSnapshot.size;
    const totalPages = Math.ceil(totalFilteredUsers / pageSize);

    const usersSnapshot = await usersRef.limit(endIndex).get();
    const usersData = usersSnapshot.docs
      .slice(startIndex, endIndex)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    res.json({ users: usersData, totalPages });
  } catch (error) {
    next(error);
  }
};

export const decodingUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { authorization }: any = req.headers;
    const token = authorization.slice(7);
    const decoded: any = jwt.verify(token, "clavemegasecreta");
    const doc = await db.collection("users").doc(decoded.id).get();
    if (!doc.exists) {
      throw createHttpError(404, "Usuario no encontrado");
    } else {
      const usuario = { id: doc.id, ...doc.data() };
      res.json(usuario);
    }
  } catch (error) {
    next(error);
  }
};
