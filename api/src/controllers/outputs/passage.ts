import { Request, Response, NextFunction } from "express";
import { db } from "../../connection/connection";
import { Passage } from "../../schema/passage";
import createHttpError from "http-errors";

/**
 * Funcion que traer los pasajes con opciones de filtrado por query
 * @query page: numero de pagina
 * @query pageSize: numero de pasajes por pagina
 * @query origin: origen del pasaje
 * @query destination: destino del pasaje
 *  @query departureDate: fecha de partida del pasaje
 * @query arrivalDate: fecha de llegada del pasaje
 *  */
export const getAllPassages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page = 1, pageSize = 5, ...filters } = req.query;

    const startIndex = (Number(page) - 1) * Number(pageSize);
    const endIndex = Number(page) * Number(pageSize);
    let passagesRef: any = db.collection("passages");

    if (Object.keys(filters).length > 0) {
      Object.keys(filters).forEach((key) => {
        passagesRef = passagesRef.where(key, "==", filters[key]);
      });
    }

    passagesRef = passagesRef.where("deleted", "==", false);

    const totalPassagesSnapshot = await passagesRef.get();

    if (totalPassagesSnapshot.empty) {
      throw createHttpError(404, "No se encontraron pasajes");
    }

    const totalFilteredPassages = totalPassagesSnapshot.size;
    const totalPages = Math.ceil(totalFilteredPassages / Number(pageSize));

    const passagesData = await Promise.all(
      totalPassagesSnapshot.docs.slice(startIndex, endIndex).map(async (doc) => {
        const passageData = { id: doc.id, ...doc.data() };

        // Obtener información de la compañía
        const companyId = passageData.companyId;
        const companyDoc = await db.collection("companies").doc(companyId).get();
        const companyData = companyDoc.exists ? companyDoc.data() : null;

        return { ...passageData, companyId, companyData: companyData };
      })
    );

    res.json({ passages: passagesData, totalPages });
  } catch (error) {
    next(error);
  }
};

export const getPassageById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = req.params.id;

  try {
    const passageDoc = await db.collection("passages").doc(id).get();

    if (!passageDoc.exists) {
      throw createHttpError(404, "Pasaje no encontrado");
    }

    const passage = { id: passageDoc.id, ...passageDoc.data() };

    const passageSnapshot = passageDoc.data();

    const companyDoc = await db.collection("companies").doc(passageSnapshot.companyId).get();

    if (!companyDoc.exists) {
      throw createHttpError(404, "Compañía no encontrada");
    }

    const companyData = companyDoc.data();

    const passageWithCompanyData = { ...passage, companyData };

    res.json(passageWithCompanyData);
  } catch (error) {
    next(error);
  }
};

export const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const passagesRef = db.collection("passages");
    const passagesSnapshot = await passagesRef.get();
    const passagesData = passagesSnapshot.docs.map((doc) => doc.data());

    const destinationsSet = new Set<string>();
    const originsSet = new Set<string>();

    passagesData.forEach((passage) => {
      const destination = passage.destination;
      const origin = passage.origin;

      if (destination) {
        destinationsSet.add(destination);
      }

      if (origin) {
        originsSet.add(origin);
      }
    });

    const combinedSet = new Set<string>([...destinationsSet, ...originsSet]);
    const locations = Array.from(combinedSet);

    if (locations.length === 0) {
      throw createHttpError(404, "No se encontraron resultados...");
    }
    res.json({ locations: locations });
  } catch (error) {
    next(error);
  }
};
