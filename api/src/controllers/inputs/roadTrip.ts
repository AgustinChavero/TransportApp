import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { RoadTrip, RoadTripToRegister } from "../../schema/roadTrip";

/**
 * Controlador para crear la ruta
 * * @body datos para crear la ruta
 */
export const newRoadTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: RoadTripToRegister = req.body;
    const dataFormated: RoadTrip = {
      ...data,
      deleted: false,
    };
    const docRef = await db.collection("roadTrip").add(dataFormated);
    res.status(201).json({ id: docRef.id });
  } catch (innerError) {
    console.error("Error al crear la ruta", innerError);
    res.status(500).send("Error al crear una nueva ruta");
  }
};

/**
 * Controlador para actualizar la ruta
 * @param id recibe el Id de la ruta,
 * @body  trae los datos a actualizar
 */
export const roadTripUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const data: RoadTrip = req.body;
    const docRef = await db.collection("roadTrip").doc(id).get();
    if (!docRef) {
      throw new Error("La ruta no existe");
    }
    await db.collection("roadTrip").doc(id).update({ data });
    res.status(201).json({ menssage: "Ruta actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la ruta", error);
    res.status(400).json({ messege: error.message });
  }
};
