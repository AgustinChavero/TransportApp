import { Request, Response } from "express";
import { db } from "../../connection/connection";

export const searchNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;

    const notifications = await db.collection("notifications").where("userId", "==", id).get();
    if (notifications.empty) {
      res.status(404).json({ message: "No hay notificaciones" });
      return;
    }
    const result = notifications.docs.map((doc) => doc.data());

    res.status(200).json({ notifications: result });
  } catch (innerError) {
    console.error("Error al buscar las notificaciones", innerError);
    res.status(400).json({ message: innerError.message });
  }
};
