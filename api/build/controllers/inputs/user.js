"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.newCompanyRating = exports.newChauffeurRating = exports.newDeliveryRating = exports.deletedUser = exports.enableUser = exports.updateUser = exports.newUser = void 0;
const connection_1 = require("../../connection/connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * Controlador para crear un usuario en Firestore.
 */
const newUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const existingUser = yield connection_1.db.collection("users").where("email", "==", data.email).get();
        if (!existingUser.empty) {
            throw (0, http_errors_1.default)(400, "El correo electrónico ya está registrado");
        }
        const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
        const user = Object.assign(Object.assign({}, data), { address: {
                postalCode: "",
                location: "",
                state: "",
                street: "",
                number: "",
                department: "",
            }, phone: {
                areaCode: "",
                number: "",
                displayPhone: "",
            }, nationality: "", birthday: "", gender: "", payments: [
                {
                    cardNumber: "",
                    expirationDate: "",
                    securityCode: "",
                },
            ], history: {
                orders: [],
                travels: [],
                tickets: [],
            }, img: "", ce: "", cc: "", deleted: false, name: `${data.firstName} ${data.lastName}`, createdAt: new Date(Date.now()).toISOString(), password: hashedPassword });
        const docRef = yield connection_1.db.collection("users").add(user);
        // Obtiene los datos del documento recién creado
        const userSnapshot = yield docRef.get();
        const userData = userSnapshot.data();
        // await successRegister(user.email, user.name, docRef.id);
        res.status(200).json({ id: docRef.id, user: userData });
    }
    catch (error) {
        next(error);
    }
});
exports.newUser = newUser;
/**
 * Controlador para actulizar un usuario en Firestore.
 */
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // Obtener ID del usuario a actualizar
        const data = req.body; // Obtener datos actualizados del usuario
        const updatedAt = new Date(Date.now()).toISOString(); // Obtener fecha actual
        // Verificar si el usuario existe en Firestore
        const docRef = yield connection_1.db.collection("users").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(400, "No se encontró el usuario");
        }
        // Agregar la propiedad "displayPhone" si se proporciona "areaCode" y "number"
        if (data.phone && data.phone.areaCode && data.phone.number) {
            data.phone.displayPhone = `${data.phone.areaCode} ${data.phone.number}`;
        }
        // Actualizar el usuario en Firestore
        yield connection_1.db
            .collection("users")
            .doc(id)
            .update(Object.assign(Object.assign({}, data), { updatedAt: updatedAt }));
        res.status(200).json({ message: "Usuario actualizado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
/**
 * Controlador para hacer un borrado logico de un usuario en Firestore.
 */
const enableUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("users").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "El usuario no se encontró");
        }
        yield connection_1.db.collection("users").doc(id).update({ deleted: false });
        res.status(200).json({ message: "Usuario habilitado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.enableUser = enableUser;
const deletedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const docRef = yield connection_1.db.collection("users").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "No se encontró el usuario");
        }
        yield connection_1.db.collection("users").doc(id).update({ deleted: true });
        res.status(200).json({ menssage: "Usuario eliminado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.deletedUser = deletedUser;
const newDeliveryRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, deliveryId } = req.params;
    const data = req.body;
    try {
        const [userDoc, deliveryDoc] = yield Promise.all([
            connection_1.db.collection("users").doc(userId).get(),
            connection_1.db.collection("deliverys").doc(deliveryId).get(),
        ]);
        if (!userDoc.exists) {
            throw (0, http_errors_1.default)(404, "Usuario no encontrado");
        }
        if (!deliveryDoc.exists) {
            throw (0, http_errors_1.default)(404, "Repartidor no encontrado");
        }
        const deliveryData = deliveryDoc.data();
        const deliveryRatingsRef = connection_1.db
            .collection("deliveryRatings")
            .where("deliveryId", "==", deliveryId);
        const deliveryRatingsSnapshot = yield deliveryRatingsRef.get();
        const totalRating = deliveryRatingsSnapshot.docs.reduce((acc, curr) => acc + curr.data().rating, 0);
        const averageRating = totalRating / deliveryRatingsSnapshot.size;
        const ratingData = Object.assign(Object.assign({ userId,
            deliveryId }, data), { createdAt: new Date().toISOString() });
        const ratingRef = yield connection_1.db.collection("deliveryRatings").add(ratingData);
        if (data.comment) {
            const commentData = {
                comment: data.comment,
                userId,
                createdAt: new Date().toISOString(),
            };
            yield connection_1.db.collection("deliveryComments").add(commentData);
            const commentsSnapshot = yield connection_1.db
                .collection("deliveryComments")
                .where("deliveryId", "==", deliveryId)
                .orderBy("createdAt", "desc")
                .limit(10)
                .get();
            const comments = commentsSnapshot.docs.map((doc) => doc.data());
            yield deliveryDoc.ref.update({
                rating: averageRating,
                comments,
            });
        }
        else {
            yield deliveryDoc.ref.update({
                rating: averageRating,
            });
        }
        res.status(200).json({ id: ratingRef.id });
    }
    catch (error) {
        next(error);
    }
});
exports.newDeliveryRating = newDeliveryRating;
const newChauffeurRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, chauffeurId } = req.params;
        const data = req.body;
        const dataFormatted = Object.assign(Object.assign({ userId,
            chauffeurId }, data), { createdAt: new Date().toISOString() });
        const [userDoc, chauffeurDoc] = yield Promise.all([
            connection_1.db.collection("users").doc(userId).get(),
            connection_1.db.collection("chauffeur").doc(chauffeurId).get(),
        ]);
        if (!userDoc.exists) {
            throw (0, http_errors_1.default)(404, "El usuario no fue encontrado");
        }
        if (!chauffeurDoc.exists) {
            throw (0, http_errors_1.default)(404, "El distribuidor no existe");
        }
        const docRef = yield connection_1.db.collection("chauffeurRating").add(dataFormatted);
        const chauffeurRef = connection_1.db.collection("chauffeur").doc(chauffeurId);
        const chauffeurRatingsRef = connection_1.db
            .collection("chauffeurRating")
            .where("chauffeurId", "==", chauffeurId);
        const [chauffeurData, chauffeurRatingsData] = yield Promise.all([
            chauffeurRef.get(),
            chauffeurRatingsRef.get(),
        ]);
        const totalRating = chauffeurRatingsData.docs.reduce((acc, curr) => acc + curr.data().rating, 0);
        const averageRating = totalRating / chauffeurRatingsData.size;
        if (data.comment) {
            const commentData = {
                comment: data.comment,
                userId,
            };
            yield chauffeurRef.update({
                rating: averageRating,
                comments: firebase_admin_1.default.firestore.FieldValue.arrayUnion(commentData),
            });
        }
        else {
            yield chauffeurRef.update({
                rating: averageRating,
            });
        }
        res.status(200).json({ id: docRef.id });
    }
    catch (error) {
        next(error);
    }
});
exports.newChauffeurRating = newChauffeurRating;
const newCompanyRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ticketId, companyId } = req.params;
        const data = req.body;
        const [ticketDoc, companiesDoc] = yield Promise.all([
            connection_1.db.collection("tickets").doc(ticketId).get(),
            connection_1.db.collection("companies").doc(companyId).get(),
        ]);
        if (!ticketDoc.exists)
            throw (0, http_errors_1.default)(404, "El ticket no existe");
        if (ticketDoc.data().reviewSent === true)
            throw (0, http_errors_1.default)(400, "No se puede enviar mas de una review por ticket");
        if (!companiesDoc.exists)
            throw (0, http_errors_1.default)(404, "La compañia no existe");
        const dataFormatted = Object.assign(Object.assign({ userId: ticketDoc.data().userId, companyId }, data), { createdAt: new Date().toISOString() });
        const docRef = yield connection_1.db.collection("companiesRating").add(dataFormatted);
        const companiesRef = connection_1.db.collection("companies").doc(companyId);
        const companiesRatingsRef = connection_1.db
            .collection("companiesRating")
            .where("companyId", "==", companyId);
        const [companiesData, companiesRatingsData] = yield Promise.all([
            companiesRef.get(),
            companiesRatingsRef.get(),
        ]);
        const totalRating = companiesRatingsData.docs.reduce((acc, curr) => acc + curr.data().rating, 0);
        const averageRating = totalRating / companiesRatingsData.size;
        if (data.comment) {
            const evaluationData = {
                comment: data.comment,
                userId: ticketDoc.data().userId,
                rating: data.rating,
            };
            yield companiesRef.update({
                rating: averageRating,
                evaluation: firebase_admin_1.default.firestore.FieldValue.arrayUnion(evaluationData),
            });
        }
        else {
            const evaluationData = {
                userId: ticketDoc.data().userId,
                rating: data.rating,
            };
            yield companiesRef.update({
                rating: averageRating,
                evaluation: firebase_admin_1.default.firestore.FieldValue.arrayUnion(evaluationData),
            });
        }
        yield connection_1.db.collection("tickets").doc(ticketId).update({ reviewSent: true });
        res.status(200).json({ id: docRef.id });
    }
    catch (error) {
        next(error);
    }
});
exports.newCompanyRating = newCompanyRating;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        // Verificar si el correo electrónico está registrado en la base de datos
        const user = yield connection_1.db.collection("users").where("email", "==", email).limit(1).get();
        if (user.empty) {
            // El correo electrónico no está registrado
            throw (0, http_errors_1.default)(404, "El correo electrónico no está registrado");
        }
        // Generar un token de restablecimiento de contraseña válido por 1 hora
        const token = jwt.sign({ email }, "secreto", { expiresIn: "1h" });
        // Construir el enlace de restablecimiento de contraseña
        const resetLink = ``; //link de form de recuperacion
        return res
            .status(200)
            .json({ message: "Se ha enviado un enlace para restablecer la contraseña" });
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token, newPassword } = req.body;
    try {
        // Verificar y decodificar el token de restablecimiento de contraseña
        const decodedToken = jwt.verify(token, "secreto");
        // Verificar si el correo electrónico del token está registrado en la base de datos
        const user = yield connection_1.db
            .collection("users")
            .where("email", "==", decodedToken.email)
            .limit(1)
            .get();
        if (user.empty) {
            // El correo electrónico no está registrado
            throw (0, http_errors_1.default)(404, "El correion electronico no esta registrado");
        }
        // Actualizar la contraseña del usuario en la base de datos
        const userId = user.docs[0].id;
        yield connection_1.db.collection("users").doc(userId).update({ password: newPassword });
        // Respuesta exitosa
        return res.status(200).json({ message: "Contraseña restablecida exitosamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.resetPassword = resetPassword;
