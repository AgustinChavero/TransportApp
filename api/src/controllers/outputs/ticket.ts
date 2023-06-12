import { NextFunction, Request, Response } from "express";
import { db } from "../../connection/connection";
import createHttpError from "http-errors";

export const getTicketByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.id;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const [snapshot, passageSnapshots] = await Promise.all([
      db.collection("tickets").where("userId", "==", userId).get(),
      db.collection("passages").get(),
    ]);

    if (snapshot.empty) {
      throw createHttpError(404, "No se encontro el usuarios");
    }
    if (passageSnapshots.empty) {
      throw createHttpError(404, "No se encontro los pasajes");
    }

    const passageMap = new Map<string, any>();
    passageSnapshots.forEach((doc) => passageMap.set(doc.id, doc.data()));

    const tickets = snapshot.docs.slice(startIndex, endIndex).map((doc) => {
      const ticketData = doc.data();
      const passageData = passageMap.get(ticketData.passageId);

      return { id: doc.id, ...ticketData, passageInfo: passageData };
    });

    const totalPages = Math.ceil(snapshot.docs.length / pageSize);

    res.status(200).json({ tickets, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getTicketById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;

  try {
    const doc = await db.collection("tickets").doc(id).get();

    if (!doc.exists) {
      throw createHttpError(404, "El ticket no existe");
    }

    const ticket = { id: doc.id, ...doc.data() };
    res.status(200).json(ticket);
  } catch (error) {
    next(error);
  }
};

export const getAllTickets = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const allProperties = Object.keys(req.query);

    let query: any = db.collection("tickets");

    allProperties.forEach((property) => {
      if (property === "page" || property === "pageSize") {
        return;
      }
      query = query.where(property, "==", req.query[property]);
    });

    const ticketsSnapshot = await query.get();

    if (ticketsSnapshot.empty) {
      throw createHttpError(404, "No se encontraron tickets");
    }

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(ticketsSnapshot.size / pageSize);

    const ticketData = ticketsSnapshot.docs
      .slice(startIndex, endIndex)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(201).json({ tickets: ticketData, totalPages });
  } catch (error) {
    next(error);
  }
};
