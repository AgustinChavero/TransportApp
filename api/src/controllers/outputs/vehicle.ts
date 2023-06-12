import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { query, where, getDocs, collection } from "firebase/firestore";
import { Vehicle } from "../../schema/vehicle";

export const getVehicles = async (req: Request, res: Response): Promise<void> => {
  try {
    const allProperties = Object.keys(req.query);

    let query: any = db.collection("vehicle").where("deleted", "==", false);

    allProperties.forEach((property) => {
      if (property === "page" || property === "pageSize") {
        return;
      }
      query = query.where(property, "==", req.query[property]);
    });

    const vehicleSnapshot = await query.get();

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(vehicleSnapshot.docs.length / pageSize);

    const vehicles = vehicleSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json({ vehicles, totalPages });
  } catch (innerError) {
    console.error("Error al encontrar los vehículos", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const getVehicleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("vehicle").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ message: "Vehículo no encontrado" });
    } else {
      const vehicle = { id: doc.id, ...doc.data() };
      res.status(200).json(vehicle);
    }
  } catch (innerError) {
    console.error("Error al encontrar el vehículo por id", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const searchVehicleByPatent = async (req: Request, res: Response): Promise<void> => {
  try {
    const patent: string = req.params.patent;
    const doc = await db
      .collection("vehicle")
      .where("patent", "==", patent)
      .where("deleted", "==", false)
      .get();
    if (doc.empty) {
      res.status(404).json({ message: `No se encontró ningún vehículo con la patente ${patent}` });
    }
    const vehicleData = doc.docs[0].data() as Vehicle;
    const { ownerId, chauffeurId } = vehicleData;
    res.json({ ...vehicleData, ...{ ownerId, chauffeurId } });
  } catch (innerError) {
    console.error("Error al encontrar el vehículo por patente", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const searchVehicleByChauffeur = async (req: Request, res: Response): Promise<void> => {
  try {
    const chauffeur: string = req.params.chauffeurId;
    const doc = await db
      .collection("vehicle")
      .where("chauffeurId", "==", chauffeur)
      .where("deleted", "==", false)
      .get();
    if (doc.empty) {
      res.status(404).json({ message: `No se encontró vehículo asignados a ${chauffeur}` });
    }
    const vehicleData = doc.docs[0].data() as Vehicle;
    const { ownerId, chauffeurId } = vehicleData;
    res.json({ ...vehicleData, ...{ ownerId, chauffeurId } });
  } catch (innerError) {
    console.error("Error al encontrar el vehículo por chofer", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const searchVehicleByOwner = async (req: Request, res: Response): Promise<void> => {
  try {
    const ownerId: string = req.params.ownerId;
    const vehicleSnapshot = await db.collection("vehicle").where("ownerId", "==", ownerId).get();
    if (vehicleSnapshot.empty) {
      res
        .status(404)
        .json({ message: `No se encontró ningún vehículo en propiedad de ${ownerId}` });
    }
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(vehicleSnapshot.docs.length / pageSize);

    const vehicles = vehicleSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json({ vehicles, totalPages });
  } catch (innerError) {
    console.error("Error al encontrar el vehículo por propietario", innerError);
    res.status(400).json;
  }
};

export const searchVehicleByBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const brand: string = req.params.brand;
    const vehicleRef = db.collection("vehicle");
    const vehicleSnapshot = await vehicleRef
      .where("brand", "==", brand)
      .where("deleted", "==", false)
      .get();

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(vehicleSnapshot.docs.length / pageSize);

    const vehicles = vehicleSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json({ vehicles, totalPages });
  } catch (innerError) {
    console.error("Error al encontrar el vehículo por marca", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const searchVehicleByYear = async (req: Request, res: Response): Promise<void> => {
  try {
    const year: string = req.params.year;
    const vehicleRef = db.collection("vehicle");
    const vehicleSnapshot = await vehicleRef
      .where("year", "==", year)
      .where("deleted", "==", false)
      .get();

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(vehicleSnapshot.docs.length / pageSize);

    const vehicles = vehicleSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json({ vehicles, totalPages });
  } catch (innerError) {
    console.error("Error al encontrar el vehículo por año", innerError);
    res.status(400).json;
  }
};
