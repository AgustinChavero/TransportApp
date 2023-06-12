import { Request, Response } from "express";
import { db } from "../../connection/connection";

/**
 * Controlador para buscar un conductor por id
 * @param id  id del conductor
 */
export const searhBusDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("busDriver").doc(id).get();
    if (!doc.exists) {
      res.status(404).send({ message: "Conductor no encontrado" });
    } else {
      const conductor = { id: doc.id, ...doc.data() };
      res.json(conductor);
    }
  } catch (error) {
    console.error("Error al obtener conductor", error);
    res.status(500).json({ message: "Error al obtener el conductor" });
  }
};

/**
 * controlador para buscar todos los conductores
 */
export const getBusDriver = async (req: Request, res: Response) => {
  try {
    const allProperties = Object.keys(req.query);

    let query: any = db.collection("busDriver");

    allProperties.forEach((property) => {
      if (property === "page" || property === "pageSize") {
        return;
      }
      query = query.where(property, "==", req.query[property]);
    });

    const busDriversSnapshot = await query.get();
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 6;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(busDriversSnapshot.size / pageSize);

    const busDriversData = busDriversSnapshot.docs
      .slice(startIndex, endIndex)
      .map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(201).json({ busDrivers: busDriversData, totalPages });
  } catch (error) {
    console.error("Error al obtener los conductores", error);
    res.status(500).json({ message: "Error al obtener los conductores" });
  }
};
