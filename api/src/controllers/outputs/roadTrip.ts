import { Request, Response } from "express";
import { db } from "../../connection/connection";

/**
 * controlador para buscar todos las rutas con opciones de filtrado por query
 * * @query page: numero de pagina
 * @query pageSize: numero de rutas por pagina
 * @query origin: origen del ruta
 * @query destination: destino del ruta
 *  @query stops: array de paradas
 */
export const getRoadTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const allProperties = Object.keys(req.query);
    let query: any = db.collection("roadTrip");
    allProperties.forEach((property) => {
      if (property === "page" || property === "pageSize") {
        return;
      }
      query = query.where(property, "==", req.query[property]);
    });
    const roadTripSnapshot = await query.get();
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 6;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(roadTripSnapshot.size / pageSize);

    const roadTripData = roadTripSnapshot.docs
      .slice(startIndex, endIndex)
      .map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(201).json({ roadTrip: roadTripData, totalPages });
  } catch (error) {
    console.error("Error al obtener las rutas", error);
    res.status(500).json({ message: "Error al obtener las rutas" });
  }
};

/**
 * Controlador para buscar una ruta por id
 * @param id  id del ruta
 */
export const searhBusDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("roadTrip").doc(id).get();
    if (!doc.exists) {
      res.status(404).send({ message: "Ruta no encontrada" });
    } else {
      const conductor = { id: doc.id, ...doc.data() };
      res.json(conductor);
    }
    res.status(201).json();
  } catch (error) {
    console.error("Error al obtener la ruta", error);
    res.status(500).json({ message: "Error al obtener la ruta" });
  }
};
