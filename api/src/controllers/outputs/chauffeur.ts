import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { Chauffeur } from "../../schema/chauffeur";

export const searchChauffeur = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("chauffeur").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ message: "Chofer no encontrado" });
    } else {
      const chauffeur = doc.data() as Chauffeur;
      res.json(chauffeur);
    }
  } catch (error) {
    console.error("Error al obtener el chofer", error);
    res.status(500).json({ message: "Error al obtener el chofer" });
  }
};

export const allChauffeur = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, pageSize = 10, ...filters } = req.query;

    const validFilters = Object.entries(filters).filter(([key, _]) => key !== "page" && key !== "pageSize");

    let query: any = db.collection("chauffeur").where("deleted", "==", false);

    validFilters.forEach(([property, value]) => {
      query = query.where(property, "==", value);
    });

    const chauffeurSnapshot = await query.get();

    const totalItems = chauffeurSnapshot.docs.length;
    const totalPages = Math.ceil(totalItems / Number(pageSize));

    const startIndex = (Number(page) - 1) * Number(pageSize);
    const endIndex = startIndex + Number(pageSize);


    const chauffeur = chauffeurSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json({ chauffeur, totalPages });
  } catch (error) {
    console.error("Error al obtener los distribuidores", error);
    res.status(500).json({ message: "Error al obtener los distribuidores" });
  }
};

export const searchChauffeurByPatent = async (req: Request, res: Response): Promise<void> => {
  try {
    const patent: string = req.params.patent;
    const doc = await db.collection("chauffeur").where("vehicle.patent", "==", patent).get();

    if (doc.empty) {
      res.status(404).json({ message: `No se encontró ningún chofer con la patente ${patent}` });
    }
    const chauffeurData = doc.docs[0].data() as Chauffeur;
    res.json(chauffeurData);
  } catch (error) {
    console.error("Error al obtener el chofer", error);
    res.status(500).json({ message: "Error al obtener el chofer" });
  }
};

export const searchChauffeurName = async (req: Request, res: Response): Promise<void> => {
  try {
    const name: string = req.params.name;
    const doc = await db.collection("chauffeur").where("displayname", "==", name).get();

    if (doc.empty) {
      res.status(404).json({ message: `No se encontró ningún chofer con el nombre ${name}` });
    }
    const chauffeurData = doc.docs[0].data() as Chauffeur;
    res.json(chauffeurData);
  } catch (error) {
    console.error("Error al obtener el chofer", error);
    res.status(500).json({ message: "Error al obtener el chofer" });
  }
};
export const searchChauffeurCe = async (req: Request, res: Response): Promise<void> => {
  try {
    const ce: string = req.params.ce;
    const doc = await db.collection("chauffeur").where("ce", "==", ce).get();

    if (doc.empty) {
      res.status(404).json({ message: `No se encontró ningún chofer con esat cedula de extranjero ${ce}` });
    }
    const chauffeurData = doc.docs[0].data() as Chauffeur;
    res.json(chauffeurData);
  } catch (error) {
    console.error("Error al obtener el chofer", error);
    res.status(500).json({ message: "Error al obtener el chofer" });
  }
};

export const searchChauffeurCc = async (req: Request, res: Response): Promise<void> => {
  try {
    const cc: string = req.params.cc;
    const doc = await db.collection("chauffeur").where("cc", "==", cc).get();

    if (doc.empty) {
      res.status(404).json({ message: `No se encontró ningún chofer con el documento de identidad ${cc}` });
    }
    const chauffeurData = doc.docs[0].data() as Chauffeur;
    res.json(chauffeurData);
  } catch (error) {
    console.error("Error al obtener el chofer", error);
    res.status(500).json({ message: "Error al obtener el chofer" });
  }
};
