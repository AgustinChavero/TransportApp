import { NextFunction, Request, Response } from "express";
import { db } from "../../connection/connection";
import createHttpError from "http-errors";

export const getCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let query: any = db.collection("companies");

    const companySnap = await query.get();

    if (companySnap.empty) {
      throw createHttpError(404, "No se encontraron companias");
    }

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(companySnap.docs.length / pageSize);

    const companies = companySnap.docs.slice(startIndex, endIndex).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json({ companies, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getCompanyByName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("companies").doc(id).get();
    if (!doc.exists) {
      throw createHttpError(404, "No se encontro la compania");
    } else {
      const company = { id: doc.id, ...doc.data() };
      res.json(company);
    }
  } catch (error) {
    next(error);
  }
};
