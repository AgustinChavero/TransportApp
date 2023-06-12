import { Request, Response, NextFunction } from "express";
import { db } from "../../connection/connection";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import firebase from "firebase-admin";
import { UserToRegister, User, UserToUpdate } from "../../schema/user";
import { DeliveryRating } from "../../schema/deliveryRating";
import { Delivery } from "../../schema/delivery";
import { successRegister } from "../../utils/middelware/sendMail";
import { CompanyRating } from "../../schema/companyRating";
import createHttpError from "http-errors";

/**
 * Controlador para crear un usuario en Firestore.
 */
export const newUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: UserToRegister = req.body;
    const existingUser = await db.collection("users").where("email", "==", data.email).get();
    if (!existingUser.empty) {
      throw createHttpError(400, "El correo electrónico ya está registrado");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user: User = {
      ...data,
      address: {
        postalCode: "",
        location: "",
        state: "",
        street: "",
        number: "",
        department: "",
      },
      phone: {
        areaCode: "",
        number: "",
        displayPhone: "",
      },
      nationality: "",
      birthday: "",
      gender: "",
      payments: [
        {
          cardNumber: "",
          expirationDate: "",
          securityCode: "",
        },
      ],
      history: {
        orders: [],
        travels: [],
        tickets: [],
      },
      img: "",
      ce: "",
      cc: "",
      deleted: false,
      name: `${data.firstName} ${data.lastName}`,
      createdAt: new Date(Date.now()).toISOString(),
      password: hashedPassword,
    };
    const docRef = await db.collection("users").add(user);

    // Obtiene los datos del documento recién creado
    const userSnapshot = await docRef.get();
    const userData = userSnapshot.data();

    // await successRegister(user.email, user.name, docRef.id);

    res.status(200).json({ id: docRef.id, user: userData });
  } catch (error) {
    next(error);
  }
};

/**
 * Controlador para actulizar un usuario en Firestore.
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id; // Obtener ID del usuario a actualizar
    const data: UserToUpdate = req.body; // Obtener datos actualizados del usuario
    const updatedAt: string = new Date(Date.now()).toISOString(); // Obtener fecha actual

    // Verificar si el usuario existe en Firestore
    const docRef = await db.collection("users").doc(id).get();
    if (!docRef.exists) {
      throw createHttpError(400, "No se encontró el usuario");
    }

    // Agregar la propiedad "displayPhone" si se proporciona "areaCode" y "number"
    if (data.phone && data.phone.areaCode && data.phone.number) {
      data.phone.displayPhone = `${data.phone.areaCode} ${data.phone.number}`;
    }

    // Actualizar el usuario en Firestore
    await db
      .collection("users")
      .doc(id)
      .update({ ...data, updatedAt: updatedAt });

    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    next(error);
  }
};
/**
 * Controlador para hacer un borrado logico de un usuario en Firestore.
 */
export const enableUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("users").doc(id).get();
    if (!docRef.exists) {
      throw createHttpError(404, "El usuario no se encontró");
    }
    await db.collection("users").doc(id).update({ deleted: false });

    res.status(200).json({ message: "Usuario habilitado correctamente" });
  } catch (error) {
    next(error);
  }
};

export const deletedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id: string = req.params.id;
    const docRef = await db.collection("users").doc(id).get();
    if (!docRef.exists) {
      throw createHttpError(404, "No se encontró el usuario");
    }
    await db.collection("users").doc(id).update({ deleted: true });
    res.status(200).json({ menssage: "Usuario eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};

export const newDeliveryRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId, deliveryId } = req.params;
  const data = req.body;

  try {
    const [userDoc, deliveryDoc] = await Promise.all([
      db.collection("users").doc(userId).get(),
      db.collection("deliverys").doc(deliveryId).get(),
    ]);

    if (!userDoc.exists) {
      throw createHttpError(404, "Usuario no encontrado");
    }

    if (!deliveryDoc.exists) {
      throw createHttpError(404, "Repartidor no encontrado");
    }

    const deliveryData = deliveryDoc.data() as Delivery;
    const deliveryRatingsRef = db
      .collection("deliveryRatings")
      .where("deliveryId", "==", deliveryId);
    const deliveryRatingsSnapshot = await deliveryRatingsRef.get();

    const totalRating = deliveryRatingsSnapshot.docs.reduce(
      (acc, curr) => acc + curr.data().rating,
      0
    );
    const averageRating = totalRating / deliveryRatingsSnapshot.size;

    const ratingData: DeliveryRating = {
      userId,
      deliveryId,
      ...data,
      createdAt: new Date().toISOString(),
    };

    const ratingRef = await db.collection("deliveryRatings").add(ratingData);

    if (data.comment) {
      const commentData = {
        comment: data.comment,
        userId,
        createdAt: new Date().toISOString(),
      };

      await db.collection("deliveryComments").add(commentData);

      const commentsSnapshot = await db
        .collection("deliveryComments")
        .where("deliveryId", "==", deliveryId)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();

      const comments = commentsSnapshot.docs.map((doc) => doc.data());

      await deliveryDoc.ref.update({
        rating: averageRating,
        comments,
      });
    } else {
      await deliveryDoc.ref.update({
        rating: averageRating,
      });
    }

    res.status(200).json({ id: ratingRef.id });
  } catch (error) {
    next(error);
  }
};

export const newChauffeurRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, chauffeurId } = req.params;
    const data = req.body;

    const dataFormatted: DeliveryRating = {
      userId,
      chauffeurId,
      ...data,
      createdAt: new Date().toISOString(),
    };

    const [userDoc, chauffeurDoc] = await Promise.all([
      db.collection("users").doc(userId).get(),
      db.collection("chauffeur").doc(chauffeurId).get(),
    ]);

    if (!userDoc.exists) {
      throw createHttpError(404, "El usuario no fue encontrado");
    }
    if (!chauffeurDoc.exists) {
      throw createHttpError(404, "El distribuidor no existe");
    }

    const docRef = await db.collection("chauffeurRating").add(dataFormatted);

    const chauffeurRef = db.collection("chauffeur").doc(chauffeurId);
    const chauffeurRatingsRef = db
      .collection("chauffeurRating")
      .where("chauffeurId", "==", chauffeurId);

    const [chauffeurData, chauffeurRatingsData] = await Promise.all([
      chauffeurRef.get(),
      chauffeurRatingsRef.get(),
    ]);

    const totalRating = chauffeurRatingsData.docs.reduce(
      (acc, curr) => acc + curr.data().rating,
      0
    );
    const averageRating = totalRating / chauffeurRatingsData.size;

    if (data.comment) {
      const commentData = {
        comment: data.comment,
        userId,
      };

      await chauffeurRef.update({
        rating: averageRating,
        comments: firebase.firestore.FieldValue.arrayUnion(commentData),
      });
    } else {
      await chauffeurRef.update({
        rating: averageRating,
      });
    }

    res.status(200).json({ id: docRef.id });
  } catch (error) {
    next(error);
  }
};

export const newCompanyRating = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { ticketId, companyId } = req.params;
    const data = req.body;

    const [ticketDoc, companiesDoc] = await Promise.all([
      db.collection("tickets").doc(ticketId).get(),
      db.collection("companies").doc(companyId).get(),
    ]);

    if (!ticketDoc.exists) throw createHttpError(404, "El ticket no existe");
    if (ticketDoc.data().reviewSent === true)
      throw createHttpError(400, "No se puede enviar mas de una review por ticket");
    if (!companiesDoc.exists) throw createHttpError(404, "La compañia no existe");

    const dataFormatted: CompanyRating = {
      userId: ticketDoc.data().userId,
      companyId,
      ...data,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("companiesRating").add(dataFormatted);

    const companiesRef = db.collection("companies").doc(companyId);
    const companiesRatingsRef = db
      .collection("companiesRating")
      .where("companyId", "==", companyId);

    const [companiesData, companiesRatingsData] = await Promise.all([
      companiesRef.get(),
      companiesRatingsRef.get(),
    ]);

    const totalRating = companiesRatingsData.docs.reduce(
      (acc, curr) => acc + curr.data().rating,
      0
    );
    const averageRating = totalRating / companiesRatingsData.size;

    if (data.comment) {
      const evaluationData = {
        comment: data.comment,
        userId: ticketDoc.data().userId,
        rating: data.rating,
      };

      await companiesRef.update({
        rating: averageRating,
        evaluation: firebase.firestore.FieldValue.arrayUnion(evaluationData),
      });
    } else {
      const evaluationData = {
        userId: ticketDoc.data().userId,
        rating: data.rating,
      };
      await companiesRef.update({
        rating: averageRating,
        evaluation: firebase.firestore.FieldValue.arrayUnion(evaluationData),
      });
    }
    await db.collection("tickets").doc(ticketId).update({ reviewSent: true });

    res.status(200).json({ id: docRef.id });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    // Verificar si el correo electrónico está registrado en la base de datos
    const user = await db.collection("users").where("email", "==", email).limit(1).get();

    if (user.empty) {
      // El correo electrónico no está registrado
      throw createHttpError(404, "El correo electrónico no está registrado");
    }

    // Generar un token de restablecimiento de contraseña válido por 1 hora
    const token = jwt.sign({ email }, "secreto", { expiresIn: "1h" });

    // Construir el enlace de restablecimiento de contraseña
    const resetLink = ``; //link de form de recuperacion

    return res
      .status(200)
      .json({ message: "Se ha enviado un enlace para restablecer la contraseña" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { token, newPassword } = req.body;

  try {
    // Verificar y decodificar el token de restablecimiento de contraseña
    const decodedToken: any = jwt.verify(token, "secreto");

    // Verificar si el correo electrónico del token está registrado en la base de datos
    const user = await db
      .collection("users")
      .where("email", "==", decodedToken.email)
      .limit(1)
      .get();

    if (user.empty) {
      // El correo electrónico no está registrado
      throw createHttpError(404, "El correion electronico no esta registrado");
    }

    // Actualizar la contraseña del usuario en la base de datos
    const userId = user.docs[0].id;
    await db.collection("users").doc(userId).update({ password: newPassword });

    // Respuesta exitosa
    return res.status(200).json({ message: "Contraseña restablecida exitosamente" });
  } catch (error) {
    next(error);
  }
};
