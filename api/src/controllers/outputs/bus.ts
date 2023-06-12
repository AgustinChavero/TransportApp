import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { query, where, getDocs, collection } from "firebase/firestore";
import { Bus } from "../../schema/bus";

export const getBus = async (req: Request, res: Response): Promise<void> => {
  try {
    const allProperties = Object.keys(req.query);
    let query: any = db.collection("bus").where("deleted", "==", false);

    allProperties.forEach((property) => {
      if (property === "page" || property === "pageSize") {
        return;
      }
      query = query.where(property, "==", req.query[property]);
    });

    const busSnapshot = await query.get();

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(busSnapshot.docs.length / pageSize);

    const buses = busSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json({ buses, totalPages });
  } catch (innerError) {
    console.error("Error al encontrar los buses", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const getBusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("bus").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ message: "Bus no encontrado" });
    } else {
      const bus = { id: doc.id, ...doc.data() };
      res.json(bus);
    }
  } catch (error) {
    console.error("Error al obtener el bus", error);
    res.status(500).json({ message: "Error al obtener el Bus" });
  }
};

export const searchBusByPatent = async (req: Request, res: Response): Promise<void> => {
  try {
    const patent: string = req.params.patent;
    const doc = await db
      .collection("bus")
      .where("patent", "==", patent)
      .where("deleted", "==", false)
      .get();
    if (doc.empty) {
      res.status(404).json({ message: `No se encontró ningún bus con la patente ${patent}` });
    }
    const busData = doc.docs[0].data() as Bus;
    //const { chauffeurId } = busData;
    res.json({ ...busData });
  } catch (innerError) {
    console.error("Error al encontrar el bus por patente", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const searchBusByNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const numberBus: string = req.params.number_bus;
    const doc = await db.collection("bus").where("number_bus", "==", numberBus).get();
    if (doc.empty) {
      res.status(404).json({ message: `No se encontró ningún bus con el numero ${numberBus}` });
    }
    const busData = doc.docs[0].data() as Bus;
    //const { chauffeurId } = busData;
    res.json({ ...busData });
  } catch (innerError) {
    console.error("Error al encontrar el bus por numero", innerError);
    res.status(400).json({ message: innerError.message });
  }
};
