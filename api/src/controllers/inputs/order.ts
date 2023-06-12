import { Request, Response } from "express";
import { db } from "../../connection/connection";
import firebase from "firebase-admin";
import { Order } from "../../schema/order";
import { OrderStatus } from "../../types/types";

/**
 * Controlador para crear una orden
 *@body Trae los datos para crear la orden
 */
export const newOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderData: Order = req.body;
    const dataFormated: Order = {
      ...orderData,
      status: true,
      order: "pending",
      createdAt: new Date(Date.now()).toISOString(),
    };

    const [userDoc, distributorDoc, productDoc, localDoc] = await Promise.all([
      db.collection("users").doc(dataFormated.userId).get(),
      db.collection("deliverys").doc(dataFormated.deliveryId).get(),
      db.collection("products").doc(dataFormated.productId).get(),
      db.collection("locals").doc(dataFormated.localId).get(),
    ]);


    if (!userDoc.exists)
      throw Error("El usuario no existe")


    if (!distributorDoc.exists)
      throw Error("El repartidor no existe")

    if (!productDoc.exists)
      throw Error("El producto  no existe")

    if (!localDoc.exists)
      throw Error("El local no existe")

    const distributorData = distributorDoc.data();

    if (!distributorData.status)
      throw Error("El repartidor no esta activo")


    if (distributorData.deleted)
      throw Error("El repartidor ya no existe")

    const productData = productDoc.data();

    if (productData.deleted)
      throw Error("El producto ya no existe")

    const localData = localDoc.data();

    if (localData.deleted)
      throw Error("Esta eliminado")

    if (!localData.status)
      throw Error("El local no esta activo")



    const docRef = await db.collection("orders").add(dataFormated);

    await Promise.all([
      db
        .collection("users")
        .doc(orderData.userId)
        .update({
          "history.orders": firebase.firestore.FieldValue.arrayUnion(docRef.id),
        }),
      db
        .collection("deliverys")
        .doc(orderData.deliveryId)
        .update({
          "history.orders": firebase.firestore.FieldValue.arrayUnion(docRef.id),
        }),
      db
        .collection("locals")
        .doc(orderData.localId)
        .update({
          history: firebase.firestore.FieldValue.arrayUnion(docRef.id),
        }),
    ]);

    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error("Error al crear la orden", error);
    res.status(400).json({ messege: error.message });
  }
};

/**
 * Controlador para actualizar las ordenes
 * @param id recibe el Id de la orden,
 * @body data tarae los datos a actualizar,
 */
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const data: Order = req.body;
    const updatedAt: string = new Date(Date.now()).toISOString();

    const docRef = await db.collection("orders").doc(id).get();
    if (!docRef) {
      throw new Error("No se encontró la orden");
    }
    // Actualizar el usuario en Firestore
    await db.collection("orders").doc(id).update({ ...data, updatedAt: updatedAt });
    res.status(201).json({ menssage: "Orden actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la orden", error);
    res.status(400).json({ messege: error.message });
  }
};

/**
 * Controllador para actualizar el estado de las ordenes
 * @param id recibe el Id de la orden,
 * @body newStatus manda el nuevo estado de la orden
 * {"newStatus": "process"} {"newStatus": "approved"} {"newStatus": "rejected"}
 */
export const orderStateUpdate = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId: string = req.params.id;
    const newStatus: OrderStatus = req.body.newStatus;
    const doc = await db.collection("orders").doc(orderId).get();
    const data = doc.data() as Order;
    if (!data) {
      throw new Error("No se encontró la Orden");
    }
    if (data.order !== "pending" && data.order !== "progress") {
      throw new Error("La orden ya se encuentra finalizada");
    }

    data.order = newStatus;
    await db.collection("orders").doc(orderId).update({ order: data.order });
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ messege: error.message });
  }
};
