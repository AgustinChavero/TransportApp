import { Request, Response } from "express";
import { Notifications } from "../../schema/notifications";
import { db } from "../../connection/connection";


export const newNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Notifications = req.body;
    const dataFormated: Notifications = {
      ...data,
      createdAt: new Date(Date.now()).toISOString(),
    }
    const docRef = await db.collection("notifications").add(dataFormated);
    res.status(201).json({ id: docRef.id });
  } catch (innerError) {
    console.error("Error al crear el usuario", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

