import { NextFunction, Request, Response } from "express";
import { Ticket, TicketToRegister } from "../../schema/ticket";
import { db } from "../../connection/connection";
import firebase from "firebase-admin";
import { successTicket } from "../../utils/middelware/sendMail";
import createHttpError from "http-errors";

export const newTicket = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = req.body;

    const [userDoc, passageDoc] = await Promise.all([
      db.collection("users").doc(data.userId).get(),
      db.collection("passages").doc(data.passageId).get(),
    ]);

    if (!userDoc.exists) {
      throw createHttpError(404, "El usuario no existe");
    }

    if (!passageDoc.exists) {
      throw createHttpError(404, "El pasaje no existe");
    }

    const passageData = passageDoc.data();
    const ticketPrice = passageData.price;
    const currentStock = passageData.stock;

    if (currentStock < data.quantity) {
      throw createHttpError(404, "No hay suficiente stock disponible");
    }

    const dataFormatted: Ticket = {
      ...data,
      reviewSent: false,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: "",
      price: ticketPrice,
    };

    const docRef = await db.collection("tickets").add(dataFormatted);

    const updatedStock = currentStock - data.quantity;

    const description = data.passengersData.description;
    const seatRegex = /asiento (\d+)/g;
    const numberSeat = [];
    let match;

    while ((match = seatRegex.exec(description)) !== null) {
      numberSeat.push(match[1]);
    }

    const areSeatsValid = numberSeat.every((seat: string) => passageData.numberSeat.includes(seat));

    if (!areSeatsValid) {
      throw createHttpError(400, "Algunos asientos seleccionados no son válidos");
    }

    const selectedSeats = numberSeat;
    const updatedNumberSeat = passageData.numberSeat.filter(
      (seat: string) => !selectedSeats.includes(seat)
    );

    await Promise.all([
      db
        .collection("users")
        .doc(data.userId)
        .update({
          "history.tickets": firebase.firestore.FieldValue.arrayUnion(docRef.id),
        }),
      db.collection("passages").doc(data.passageId).update({
        stock: updatedStock,
        numberSeat: updatedNumberSeat,
      }),
    ]);

    const userData = userDoc.data();
    //comentamos el mail porq tira errores del token
    //await successTicket(userData.email, userData.name);

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    next(error);
  }
};

export const acceptTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedAt = new Date().toISOString();
    const ticketRef = db.collection("tickets").doc(id);
    const ticketDoc = await ticketRef.get();
    if (!ticketDoc.exists) {
      throw createHttpError(404, "El ticket no existe");
    }
    await ticketRef.update({ status: "acepted", updatedAt });
    res.status(201).json({ message: "Ticket actualizado" });
  } catch (error) {
    next(error);
  }
};

export const cancelTicket = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedAt = new Date().toISOString();
    const ticketDoc = await db.collection("tickets").doc(id).get();

    if (!ticketDoc.exists) {
      throw createHttpError(404, "El ticket no existe");
    }

    await db.collection("tickets").doc(id).update({
      status: "canceled",
      updatedAt,
    });

    res.status(201).json({ message: "Ticket cancelado" });
  } catch (error) {
    next(error);
  }
};
