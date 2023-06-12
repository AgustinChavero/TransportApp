import { Request, Response } from 'express';
import { db } from '../../connection/connection';
import firebase from "firebase-admin";


export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    let productRef: firebase.firestore.Query<firebase.firestore.DocumentData> = db.collection("products");

    if (Object.keys(req.query).length > 2) {
      const filters = Object.keys(req.query).filter(key => key !== 'page' && key !== 'pageSize');
      filters.forEach(key => {
        productRef = productRef.where(key, '==', req.query[key]);
      });
    }
    //agregar  varioble para saber si un producto esta en disponible o listo para agregarse un boolenano
    const totalProductSnapshot = await productRef.get();
    const totalFilteredProducts = totalProductSnapshot.size;
    const totalPages = Math.ceil(totalFilteredProducts / pageSize);

    const productsSnapshot = await productRef.limit(endIndex).get();
    const productsData = productsSnapshot.docs.slice(startIndex, endIndex).map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ products: productsData, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al obtener los productos');
  }
};

export const getAllProductsByType = async (req: Request, res: Response): Promise<void> => {
  try {
    const productType: string = req.params.productType;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const productRef = db.collection('products').where('type', '==', productType);
    const totalProductSnapshot = await productRef.get();
    const totalFilteredProducts = totalProductSnapshot.size;
    const totalPages = Math.ceil(totalFilteredProducts / pageSize);

    const productsSnapshot = await productRef.limit(endIndex).get();
    const productsData = productsSnapshot.docs.slice(startIndex, endIndex).map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ products: productsData, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al obtener los productos por tipo');
  }
};


export const getAllProductsByStore = async (req: Request, res: Response): Promise<void> => {
  try {
    const store: string = req.params.store;
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 2;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const productRef = db.collection('products').where('localId', '==', store);
    const totalProductSnapshot = await productRef.get();
    const totalFilteredProducts = totalProductSnapshot.size;
    const totalPages = Math.ceil(totalFilteredProducts / pageSize);

    const productsSnapshot = await productRef.limit(endIndex).get();
    const productsData = productsSnapshot.docs.slice(startIndex, endIndex).map(doc => ({ id: doc.id, ...doc.data() }));

    res.status(200).json({ products: productsData, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json('Error al obtener los productos por tipo');
  }
};

export const getProductId = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    const doc = await db.collection("products").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      const product = { id: doc.id, ...doc.data() };
      res.status(200).json(product);
    }
  } catch (error) {
    console.error("Error al obtener el producto", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};


