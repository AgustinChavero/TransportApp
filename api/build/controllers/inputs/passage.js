"use strict";
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
exports.enablePassage = exports.deletePassage = exports.updatePassage = exports.newPassage = void 0;
const connection_1 = require("../../connection/connection");
const http_errors_1 = __importDefault(require("http-errors"));
const newPassage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataString = req.body.data; // Obtener la cadena JSON de la solicitud
        const data = JSON.parse(dataString); // Solo usar cuando se necesite probar con Insomnia
        // const data: PassageToRegister = req.body;
        const dataFormated = Object.assign(Object.assign({}, data), { status: true, deleted: false, createdAt: new Date(Date.now()).toISOString() });
        const companyId = data.companyId;
        // Verificar si el companyId existe en la colección "companies"
        const companySnapshot = yield connection_1.db.collection("companies").doc(companyId).get();
        if (!companySnapshot.exists) {
            throw (0, http_errors_1.default)(404, "La compañia no existe");
        }
        const numberSeats = dataFormated.numberSeat;
        const stock = numberSeats.length + 1;
        // Upload the image to Firebase Storage
        const file = req.file;
        const bucket = connection_1.storage;
        const filename = "passages/" + Date.now() + "-" + file.originalname;
        const fileUpload = bucket.file(filename);
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });
        blobStream.on("error", (error) => {
            console.error("Error al subir la imagen:", error);
            res.status(500).json({ message: "Error al subir la imagen" });
        });
        blobStream.on("finish", () => __awaiter(void 0, void 0, void 0, function* () {
            // Make the uploaded image publicly accessible
            yield fileUpload.makePublic();
            // Get the public URL of the uploaded image
            const img = `https://storage.googleapis.com/${bucket.name}/${filename}`;
            const passageRef = yield connection_1.db.collection("passages").add(Object.assign(Object.assign({}, dataFormated), { img,
                stock }));
            res.status(200).json({
                message: "Pasaje creado correctamente",
                id: passageRef.id,
                img,
            });
        }));
        blobStream.end(file.buffer);
    }
    catch (error) {
        next(error);
    }
});
exports.newPassage = newPassage;
const updatePassage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const updatedAt = new Date().toISOString();
    try {
        const docRef = yield connection_1.db.collection("passages").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "El pasaje no existe");
        }
        yield connection_1.db
            .collection("passages")
            .doc(id)
            .update(Object.assign(Object.assign({}, data), { updatedAt }));
        res.status(200).json({ message: "Pasaje actualizado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePassage = updatePassage;
const deletePassage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const docRef = yield connection_1.db.collection("passages").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "El pasaje no se encontró");
        }
        yield connection_1.db.collection("passages").doc(id).update({ deleted: true });
        res.status(200).json({ message: "Pasaje deshabilitado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePassage = deletePassage;
const enablePassage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const docRef = yield connection_1.db.collection("passages").doc(id).get();
        if (!docRef.exists) {
            throw (0, http_errors_1.default)(404, "El pasaje no se encontró");
        }
        yield connection_1.db.collection("passages").doc(id).update({ deleted: false });
        res.status(200).json({ message: "Pasaje habilitado correctamente" });
    }
    catch (error) {
        next(error);
    }
});
exports.enablePassage = enablePassage;
