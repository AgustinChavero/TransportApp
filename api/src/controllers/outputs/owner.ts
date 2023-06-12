import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { query, where, collection, getDocs } from "firebase/firestore";

export const searchAllOwners = async (req: Request, res: Response): Promise<void> => {
  try {
    const allProperties = Object.keys(req.query);
    let query: any = db.collection("owner").where("deleted", "==", false);

    allProperties.forEach((property) => {
      if (property === "page" || property === "pageSize") {
        return;
      }
      query = query.where(property, "==", req.query[property]);
    });

    const ownerSnapshot = await query.get();

    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(ownerSnapshot.docs.length / pageSize);

    const owners = ownerSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json({ owners, totalPages });
  } catch (innerError) {
    console.error("Error al encontrar propietarios", innerError);
    res.status(400).json({ message: innerError.message });
  }
};

export const searchOwner = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("owner").doc(id).get();
    if (!doc.exists) {
      throw new Error("Propietario no encontrado");
    } else {
      const ownerData = { id: doc.id, ...doc.data() };
      res.json(ownerData);
    }
  } catch (innerError) {
    console.error("Error al encontrar el propietario", innerError);
    res.status(400).json({ message: innerError.message });
  }
};
