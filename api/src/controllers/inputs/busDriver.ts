import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { BusDriver, BusDriverToRegister } from "../../schema/busDriver";
/**
 * Controlador para crear Bus Driver
 * * @body datos para crear Bus Driver
 */
export const newBusDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: BusDriverToRegister = req.body;
    const dataFormated: BusDriver = {
      ...data,
      deleted: false,
    };
    const snapshot = await db
      .collection("busDriver")
      .where("cc", "==", dataFormated.cc)
      .get();
    if (!snapshot.empty) {
      throw new Error("El conductor ya está registrado");
    }

    const docRef = await db.collection("busDriver").add(dataFormated);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    try {
      throw new Error(error.message);
    } catch (innerError) {
      console.error("Error al crear el conductor", innerError);
      res.status(400).json({ message: innerError.message });
    }
  }
};
/**
 * Controlador para actualizar el conductor
 * @param id recibe el Id del conductor,
 * @body  trae los datos a actualizar hasta ahora solo la licencia,
 */
export const updateBusDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const licencia: string = req.body.license;

    const docRef = await db.collection("busDriver").doc(id).get();
    if (!docRef) {
      throw new Error("El conductor no existe");
    }
    await db.collection("busDriver").doc(id).update({ license: licencia });
    res.status(201).json({ menssage: "Licencia actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar el conductor", error);
    res.status(400).json({ messege: error.message });
  }
};
