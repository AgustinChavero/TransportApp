import { Request, Response } from "express";
import { db } from "../../connection/connection";


export const searchTravel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("travels").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ message: "Viaje no encontrado" });
    } else {
      const usuario = { id: doc.id, ...doc.data() };
      res.json(usuario);
    }
  } catch (error) {
    console.error("Error al obtener el viaje", error);
    res.status(500).json({ message: "Error al obtener el viaje" });
  }
};

export const travelByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId; // obtiene el ID del usuario desde la solicitud

    // Realiza la consulta a la base de datos
    const snapshot = await db.collection("travels").where("userId", "==", userId).get();

    // Crea un array con todos los viajes encontrados

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(snapshot.docs.length / pageSize);

    const travels = snapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    // Envía la respuesta al cliente
    res.status(200).json({ travels, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los viajes del usuario");
  }
};

export const getAllTravel = async (req: Request, res: Response): Promise<void> => {
  try {

    const snapshot = await db.collection("travels").get();

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(snapshot.docs.length / pageSize);

    // Crea un array con todos los viajes encontrados
    const travels = snapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    // Envía la respuesta al cliente
    res.status(200).json({ travels, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los viajes del chofer");
  }
};
export const travelByChauffeur = async (req: Request, res: Response): Promise<void> => {
  try {
    const chauffeurId = req.params.chauffeurId; // obtiene el ID del chofer desde la solicitud

    // Realiza la consulta a la base de datos
    const snapshot = await db.collection("travels").where("chauffeurId", "==", chauffeurId).get();

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(snapshot.docs.length / pageSize);

    // Crea un array con todos los viajes encontrados
    const travels = snapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    // Envía la respuesta al cliente
    res.status(200).json({ travels, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los viajes del chofer");
  }
};


