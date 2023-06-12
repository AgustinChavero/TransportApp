import { Request, Response } from "express";
import { db } from "../../connection/connection";
import { Local } from "../../schema/local";

export const searchLocal = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;

    const doc = await db.collection("locals").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ message: "Local no encontrado" });
    } else {
      const local = doc.data() as Local;
      res.json(local);
    }
  } catch (error) {
    console.error("Error al obtener el local", error);
    res.status(500).json({ message: "Error al obtener el local" });
  }
};

export const getLocals = async (req: Request, res: Response): Promise<void> => {
  try {
    const allProperties = Object.keys(req.query);

    let query: any = db.collection("locals").where("deleted", "==", false)

    allProperties.forEach((property) => {
      if (property === "page" || property === "pageSize") {
        return;
      }
      query = query.where(property, "==", req.query[property]);
    });


    const localsSnapshot = await query.get();


    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const totalPages = Math.ceil(localsSnapshot.docs.length / pageSize);

    const localsData: Object[] = localsSnapshot.docs.slice(startIndex, endIndex).map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    res.status(200).json({ locals: localsData, totalPages });
  } catch (error) {
    console.error("Error al obtener los locales", error);
    res.status(500).json({ message: "Error al obtener los locales" });
  }
};

export const getLocalByProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const productDoc = await db.collection("products").doc(id).get();

    if (!productDoc.exists) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      const product = productDoc.data();

      const localDoc = await db.collection("locals").doc(product.localId[0]).get();
      if (!localDoc.exists) {
        res.status(404).json({ message: "Local no encontrado" });
      } else {
        const local = localDoc.data() as Local;
        res.json(local);
      }
    }
  } catch (error) {
    console.error("Error al obtener el local", error);
    res.status(500).json({ message: "Error al obtener el local" });
  }
};