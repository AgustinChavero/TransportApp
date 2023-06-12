import { Request, Response } from "express";
import { db } from "../../connection/connection";
import bcrypt from "bcrypt";
import { Local, LocalToRegister, LocalToUpdate } from "../../schema/local";

/**
 * Controlador para crear un local en Firestore.
 */
export const newLocal = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: LocalToRegister = req.body;
    const dataFormated: Local = {
      ...data,
      history: [],
      status: false,
      deleted: false,
      bankAccount: {
        bankHolder: "",
        accountNumber: "",
      },
      createdAt: new Date(Date.now()).toISOString(),
    };
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(dataFormated.password, 10);
    dataFormated.password = hashedPassword;
    const docRef = await db.collection("locals").add(dataFormated);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    try {
      throw new Error(error.message);
    } catch (innerError) {
      console.error("Error al crear el local", innerError);
      res.status(400).json({ message: innerError.message });
    }
  }
};

export const updateLocal = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id; // Obtener ID del local a actualizar
    const data: LocalToUpdate = req.body; // Obtener datos actualizados del local
    const updatedAt: string = new Date(Date.now()).toISOString();

    // Verificar si el local existe en Firestore
    const docRef = await db.collection("locals").doc(id).get();
    if (!docRef.exists) {
      throw new Error("No se encontró el local");
    }

    // Actualizar el local en Firestore
    await db
      .collection("locals")
      .doc(id)
      .update({ ...data, updatedAt: updatedAt });

    res.status(200).json({ message: "Local actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el local", error);
    res.status(400).json({ message: error.message });
  }
};

export const enableLocal = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("locals").doc(id).get();
    if (!docRef.exists) {
      throw new Error("El local no se encontró");
    }
    await db.collection("locals").doc(id).update({ deleted: false });
    res.status(200).json({ message: "Local habilitado correctamente" });
  } catch (innerError) {
    console.error("Error al habilitar el local", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const deleteLocal = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("locals").doc(id).get();
    if (!docRef.exists) {
      throw new Error("El local no se eliminó");
    }
    await db.collection("locals").doc(id).update({ deleted: true });
    res.status(200).json({ message: "Local eliminado correctamente" });
  } catch (innerError) {
    console.error("Error al eliminar el local", innerError);
    res.status(400).json({ message: innerError.message });
  }
};
