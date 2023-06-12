import { Request, Response } from 'express';
import { db } from '../../connection/connection';
import { Products, ProductsToUpdate } from '../../schema/products';

export const newProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: Products = req.body;
    const dataFormated: ProductsToUpdate = {
      ...data,
      deleted: false,
      createdAt: new Date(Date.now()).toISOString(),
    }

    const [localDoc] = await Promise.all([
      db.collection("locals").doc(dataFormated.localId).get(),
    ]);

    if (!localDoc.exists) {
      throw new Error("El local no existe");
    }

    const docRef = await db.collection("products").add(dataFormated);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear un nuevo producto');
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const updatedProductData: ProductsToUpdate = req.body;
    const updatedAt: string = new Date(Date.now()).toISOString();
    const docRef = await db.collection('products').doc(id).get();
    if (!docRef) {
      throw new Error("No se encontró el producto");
    }
    await db.collection('products').doc(id).update({ ...updatedProductData, updatedAt: updatedAt });
    res.status(200).json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el producto');
  }
};

export const enableProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("product").doc(id).get();
    if (!docRef.exists) {
      throw new Error("No se encontró el producto");
    }
    await db.collection("product").doc(id).update({ deleted: false });
    res.status(201).json({ menssage: "Producto habilitado correctamente" });
  } catch (error) {
    console.error("Error al habilitar el Producto", error);
    res.status(400).json({ messege: error.message });
  }
};

export const deletedProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("product").doc(id).get();
    if (!docRef.exists) {
      throw new Error("No se encontró el producto");
    }
    await db.collection("product").doc(id).update({ deleted: true });
    res.status(201).json({ menssage: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al borrar el Producto", error);
    res.status(400).json({ messege: error.message });
  }
};
