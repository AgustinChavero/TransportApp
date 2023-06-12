import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { OwnerToRegister, OwnerToUpdate } from "../../schema/owner";
import { successOwnerRegister } from "../../utils/middelware/sendMail";

export const newOwner = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: OwnerToRegister = req.body;
    const dataFormated = {
      ...data,
      status: false,
      deleted: false,
      vehiclesId: [],
      createdAt: new Date(Date.now()).toISOString(),
    };
    const snapshot = await db.collection("owner").where("cc", "==", dataFormated.cc).get();
    if (!snapshot.empty) {
      throw new Error("El Cc ya está registrado");
    }
    const docRef = await db.collection("owner").add(dataFormated);

    await successOwnerRegister(dataFormated.email, dataFormated.displayName);

    res.status(201).json({ id: docRef.id });
  } catch (innerError) {
    console.error("Error al crear el propietario", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const updateOwner = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const data: OwnerToUpdate = req.body;
    const updatedAt: string = new Date(Date.now()).toISOString();
    const docRef = await db.collection("owner").doc(id).get();
    if (!docRef.exists) {
      throw new Error("No se encontró el propietario");
    }
    await db
      .collection("owner")
      .doc(id)
      .update({ ...data, updatedAt: updatedAt });
    res.status(200).json({ message: "Propietario actualizado correctamente" });
  } catch (innerError) {
    console.error("Error al actualizar el propietario", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const enableOwner = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("owner").doc(id).get();
    if (!docRef.exists) {
      throw new Error("No se encontrón el propietario");
    }
    await db.collection("owner").doc(id).update({ deleted: false });
    res.status(200).json({ message: "Propietario habilitado correctamente" });
  } catch (innerError) {
    console.error("Error al habilitar el propietario", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const deleteOwner = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("owner").doc(id).get();
    if (!docRef.exists) {
      throw new Error("No se encontró el propietario");
    }
    await db.collection("owner").doc(id).update({ deleted: true });
    res.status(200).json({ message: "Propietario eliminado correctamente" });
  } catch (innerError) {
    console.error("Error al eliminar el propietario", innerError);
    res.status(400).json({ message: innerError.message });
  }
};
