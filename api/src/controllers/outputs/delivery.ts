import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { Delivery } from "../../schema/delivery";

/**
 * Controlador para buscar un distribuidor por id
 */
export const searchDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("deliverys").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ message: "Distribuidor no encontrado" });
    } else {
      const distribuidor = doc.data() as Delivery;
      res.status(201).json(distribuidor);
    }
  } catch (error) {
    console.error("Error al obtener el distribuidor", error);
    res.status(500).json({ message: "Error al obtener el distribuidor" });
  }
};

/**
 * Controlador para obtener todos los distribuidores
 * con paginado
 */

export const getDelivery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, pageSize = 10, ...filters } = req.query;

    const validFilters = Object.entries(filters).filter(([key, _]) => key !== "page" && key !== "pageSize");

    let query: any = db.collection("deliverys");

    validFilters.forEach(([property, value]) => {
      query = query.where(property, "==", value);
    });

    const distributorSnapshot = await query.get();

    const totalItems = distributorSnapshot.docs.length;
    const totalPages = Math.ceil(totalItems / Number(pageSize));

    const startIndex = (Number(page) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);

    const deliverys = distributorSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json({ deliverys, totalPages, totalItems });
  } catch (error) {
    console.error("Error al obtener los distribuidores", error);
    res.status(500).json({ message: "Error al obtener los distribuidores" });
  }
};

