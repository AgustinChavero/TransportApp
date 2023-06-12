import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { Order } from "../../schema/order";

import { query, where, getDocs, collection } from "firebase/firestore";

/**
 * Controlador para buscar una orden por id
 */
export const searchOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("orders").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ message: "Orden no encontrado" });
    } else {
      const orden = doc.data() as Order;
      res.status(201).json(orden);
    }
  } catch (error) {
    console.error("Error al obtener la orden", error);
    res.status(500).json({ message: "Error al obtener la orden" });
  }
};
/**
 * controlador para buscar todas las ordenes
 */
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const allProperties = Object.keys(req.query);

    let query: any = db.collection("orders")

    allProperties.forEach((property) => {
      if (property === "page" || property === "pageSize") {
        return;
      }
      query = query.where(property, "==", req.query[property]);
    });

    const ordersSnapshot = await query.get();

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(ordersSnapshot.size / pageSize);

    const ordersData = ordersSnapshot.docs
      .slice(startIndex, endIndex)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(201).json({ orders: ordersData, totalPages });
  } catch (error) {
    console.error("Error al obtener las ordenes", error);
    res.status(500).json({ message: "Error al obtener las ordenes" });
  }
};
export const getOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const allProperties = Object.keys(req.query);

    let query: any = db.collection("orders")

    allProperties.forEach((property) => {
      if (property === "page" || property === "pageSize") {
        return;
      }
      query = query.where(property, "==", req.query[property]);
    });

    // Se agrega una cláusula adicional para filtrar por el userId
    query = query.where("userId", "==", req.params.userId);

    const ordersSnapshot = await query.get();

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(ordersSnapshot.size / pageSize);

    const ordersData = ordersSnapshot.docs
      .slice(startIndex, endIndex)
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    res.status(201).json({ orders: ordersData, totalPages });
  } catch (error) {
    console.error("Error al obtener las ordenes", error);
    res.status(500).json({ message: "Error al obtener las ordenes" });
  }
};
