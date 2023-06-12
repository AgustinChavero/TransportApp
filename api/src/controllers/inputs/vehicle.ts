import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { VehicleToRegister, Vehicle, VehicleToUpdate } from "../../schema/vehicle";
import firebase from "firebase-admin";

export const newVehicleByChauffeur = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: VehicleToRegister = req.body;
    const dataFormated: Vehicle = {
      ...data,
      deleted: false,
      status: false,
      createdAt: new Date(Date.now()).toISOString(),
    };

    const [chauffeurDoc, ownerDoc] = await Promise.all([
      db.collection("chauffeur").doc(dataFormated.chauffeurId).get(),
      db.collection("owner").doc(dataFormated.ownerId).get(),
    ]);

    if (!chauffeurDoc.exists) {
      throw new Error("El chofer no existe");
    }

    if (!ownerDoc.exists) {
      throw new Error("El dueño no existe");
    }

    const docRef = await db.collection("vehicle").add(dataFormated);

    await db.collection("chauffeur").doc(dataFormated.chauffeurId).update({
      "vehicle.vehicleId": docRef.id,
      "vehicle.patent": data.patent,
    });

    await db
      .collection("owner")
      .doc(dataFormated.ownerId)
      .update({
        vehiclesId: firebase.firestore.FieldValue.arrayUnion(docRef.id),
      });

    res.status(200).json({ message: "Vehículo creado correctamente", id: docRef.id });
  } catch (innerError) {
    console.error("Error al crear el vehículo", innerError);
    res.status(400).json({ message: innerError.message });
  }
};
export const newVehicleByDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: VehicleToRegister = req.body;
    const dataFormated: Vehicle = {
      ...data,
      deleted: false,
      status: false,
      createdAt: new Date(Date.now()).toISOString(),
    };

    const [dealerDoc, ownerDoc] = await Promise.all([
      db.collection("deliverys").doc(dataFormated.deliveryId).get(),
      db.collection("owner").doc(dataFormated.ownerId).get(),
    ]);

    if (!dealerDoc.exists) {
      throw new Error("El repartidor no existe");
    }

    if (!ownerDoc.exists) {
      throw new Error("El dueño no existe");
    }

    const docRef = await db.collection("vehicle").add(dataFormated);

    await db.collection("deliverys").doc(dataFormated.deliveryId).update({
      "vehicle.vehicleId": docRef.id,
      "vehicle.patent": data.patent,
    });

    await db
      .collection("owner")
      .doc(dataFormated.ownerId)
      .update({
        vehiclesId: firebase.firestore.FieldValue.arrayUnion(docRef.id),
      });

    res.status(200).json({ message: "Vehículo creado correctamente", id: docRef.id });
  } catch (innerError) {
    console.error("Error al crear el vehículo", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const updateVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const data: VehicleToUpdate = req.body;
    const updatedAt: string = new Date(Date.now()).toISOString();

    const docRef = await db.collection("vehicle").doc(id).get();

    if (!docRef.exists) {
      throw new Error("El vehículo no se actualizo");
    }

    await db
      .collection("vehicle")
      .doc(id)
      .update({ ...data, updatedAt: updatedAt });
    res.status(200).json({ message: "Vehículo actualizado correctamente" });
  } catch (innerError) {
    console.error("Error al actualizar el vehículo", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const enableVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("vehicle").doc(id).get();
    if (!docRef.exists) {
      throw new Error("El vehículo no se econtró");
    }
    await db.collection("vehicle").doc(id).update({ deleted: false });
    res.status(200).json({ message: "Vehículo habilitado correctamente" });
  } catch (innerError) {
    console.error("Error al habilitar el vehículo", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const deleteVehicle = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const data: VehicleToUpdate = req.body;
    const docRef = await db.collection("vehicle").doc(id).get();
    if (!docRef.exists) {
      throw new Error("El vehículo no se eliminó");
    }
    await db.collection("vehicle").doc(id).update({ deleted: true });
    res.status(200).json({ message: "Vehículo eliminado correctamente" });
  } catch (innerError) {
    console.error("Error al eliminar el vehículo", innerError);
    res.status(400).json({ message: innerError.message });
  }
};
