import { Request, Response } from "express";
import { db } from "../../connection/connection";
import bcrypt from "bcrypt";
import { Delivery, DeliveryToRegister } from "../../schema/delivery";
import { successDeliveryRegister } from "../../utils/middelware/sendMail";

/**
 * Controlador para crear distribuidores
 * * @body datos para crear distribuidor tipo DeliveryToRegister
 */
export const newDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: DeliveryToRegister = req.body;
    const dataFormated: Delivery = {
      ...data,
      payments: {
        cardNumber: "",
        expirationDate: "",
        securityCode: "",
      },
      phone: {
        areaCode: "",
        number: "",
        displayPhone: "",
      },
      history: [],
      deleted: false,
      license: "",
      status: false,
      displayName: data.firstName + " " + data.lastName,
      createdAt: new Date(Date.now()).toISOString(),
      rating: 0,
      comments: [{}],
      vehicle: {
        vehicleId: "",
        patent: "",
      },
    };

    // Verificar si ya existe un distribuidor con el correo electrónico dado
    const snapshot = await db
      .collection("deliverys")
      .where("email", "==", dataFormated.email)
      .get();
    if (!snapshot.empty) {
      throw new Error("El correo electrónico ya está registrado");
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(dataFormated.password, 10);
    dataFormated.password = hashedPassword;

    //crear doocumento de distribuidor
    const docRef = await db.collection("deliverys").add(dataFormated);

    await successDeliveryRegister(dataFormated.email, dataFormated.displayName);

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error("Error al crear el distribuidor", error);
    res.status(400).json({ messege: error.message });
  }
};

/**
 * Controlador para actualizar distribuidores
 * @param req Id tipo string
 * @body datos para actualizar distribuidor tipo DeliveryToUpdate
 */
export const updateDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id; // obtener id del distribuidor que se va a actualizar
    const data: Delivery = req.body; //datos de distribuidor a actualizar
    const updatedAt: string = new Date(Date.now()).toISOString();

    //verificar si existe el usuario en la base de datos
    const docRef = await db.collection("deliverys").doc(id).get();
    if (!docRef.exists) {
      throw new Error("No se encontró el distributor");
    }
    // Actualizar el usuario en Firestore
    await db
      .collection("deliverys")
      .doc(id)
      .update({ ...data, updatedAt: updatedAt });
    res.status(201).json({ menssage: "Repartidor actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el Repartidor", error);
    res.status(400).json({ messege: error.message });
  }
};
/**
 *Controlador para habilitar un distribuidor
 * @param id del distribuidor
 *
 */
export const enableDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id; //obtener id del distribuidor a eliminar
    const docRef = await db.collection("deliverys").doc(id).get();
    if (!docRef.exists) {
      throw new Error("No se encontró el distributor");
    }
    // Actualizar el usuario en Firestore
    await db.collection("deliverys").doc(id).update({ deleted: false });
    res.status(201).json({ menssage: "Repartidor habilitado correctamente" });
  } catch (error) {
    console.error("Error al habilitar el Repartidor", error);
    res.status(400).json({ messege: error.message });
  }
};

/**
 * Controlador para eliminar un repa por id
 
 * @param id del distribuidor a eliminar 
 */
export const deleteDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id; //obtener id del distribuidor a eliminar
    const docRef = await db.collection("deliverys").doc(id).get();
    if (!docRef.exists) {
      throw new Error("No se encontró el distributor");
    }
    // Actualizar el usuario en Firestore
    await db.collection("deliverys").doc(id).update({ deleted: true });
    res.status(201).json({ menssage: "Repartidor eliminado correctamente" });
  } catch (error) {
    console.error("Error al borrar el Repartidor", error);
    res.status(400).json({ messege: error.message });
  }
};
