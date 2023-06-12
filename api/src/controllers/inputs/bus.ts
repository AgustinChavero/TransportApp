import { Request, Response } from "express";
import { db } from "../../connection/connection";
import firebase from "firebase-admin";
import { BusToRegister, Bus, BusToUpdate } from "../../schema/bus";

export const newBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: BusToRegister = req.body;
    const dataFormated = {
      ...data,
      deleted: false,
      img: "",
      history: [],
    };

    /* const [busDoc] = await Promise.all([
      db.collection("bus_driver").doc(dataFormated.chauffeurId).get(),
    ]);

    if (!busDoc.exists) {
      throw new Error("El chofer no existe");
    } */

    const docRef = await db.collection("bus").add(dataFormated);

    /* await db.collection("bus_driver").doc(dataFormated.chauffeurId).update({
      "vehicle.vehicleId": docRef.id,
      "vehicle.patent": data.patent,
    }); */

    res.status(200).json({ message: "Bus creado correctamente", id: docRef.id });
  } catch (innerError) {
    console.error("Error al crear el bus", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const updateBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const data: BusToUpdate = req.body;
    const docRef = await db.collection("bus").doc(id).get();
    if (!docRef.exists) {
      throw new Error("El bus no se actualizó");
    }
    await db.collection("bus").doc(id).update(data);
    res.status(200).json({ message: "Bus actualizado correctamente" });
  } catch (innerError) {
    console.error("Error al actualizar el bus", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const deleteBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("bus").doc(id).get();
    if (!docRef.exists) {
      throw new Error("El bus no se econtró");
    }
    await db.collection("bus").doc(id).update({ deleted: true });
    res.status(200).json({ message: "Bus deshabilitado correctamente" });
  } catch (innerError) {
    console.error("Error al deshabilitar el bus", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const enableBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("bus").doc(id).get();
    if (!docRef.exists) {
      throw new Error("El bus no se econtró");
    }
    await db.collection("bus").doc(id).update({ deleted: false });
    res.status(200).json({ message: "Bus habilitado correctamente" });
  } catch (innerError) {
    console.error("Error al habilitar el bus", innerError);
    res.status(400).json({ message: innerError.message });
  }
};
