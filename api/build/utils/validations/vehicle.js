"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVehicleValidate = exports.newVehicleValidateByChauffeur = exports.newVehicleValidateByDealer = void 0;
const validators_1 = require("./validators");
const newVehicleValidateByDealer = (req, res, next) => {
    // Validar que todas las propiedades tengan un valor válido
    try {
        const data = req.body;
        const allowProperties = [
            "patent",
            "brand",
            "model",
            "year",
            "img",
            "ownerId",
            "deliveryId",
            "documents",
            "typeVehicle",
        ];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw Error("Datos no permitidos");
        if (!(0, validators_1.isPatentValid)(data.patent) ||
            !(0, validators_1.isBrandValid)(data.brand) ||
            !(0, validators_1.isModelValid)(data.model) ||
            !(0, validators_1.isYearValid)(data.year) ||
            !(0, validators_1.isOwnerIdValid)(data.ownerId) ||
            !(0, validators_1.isDealerIdValid)(data.deliveryId) ||
            !(0, validators_1.isArrayImgValid)(data.img) ||
            !(0, validators_1.isArrayImgValid)(data.documents) ||
            !(0, validators_1.isTypeVehicleValidByDealer)(data.typeVehicle)) {
            throw new Error("Datos incompletos o no válidos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.newVehicleValidateByDealer = newVehicleValidateByDealer;
const newVehicleValidateByChauffeur = (req, res, next) => {
    // Validar que todas las propiedades tengan un valor válido
    try {
        const data = req.body;
        const allowProperties = [
            "patent",
            "brand",
            "model",
            "year",
            "ownerId",
            "chauffeurId",
            "documents",
            "typeVehicle",
        ];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw Error("Datos no permitidos");
        if (!(0, validators_1.isPatentValid)(data.patent) ||
            !(0, validators_1.isBrandValid)(data.brand) ||
            !(0, validators_1.isModelValid)(data.model) ||
            !(0, validators_1.isYearValid)(data.year) ||
            !(0, validators_1.isOwnerIdValid)(data.ownerId) ||
            !(0, validators_1.isChauffeurIdValid)(data.chauffeurId) ||
            !(0, validators_1.isArrayImgValid)(data.documents) ||
            !(0, validators_1.isTypeVehicleValidByChauffeur)(data.typeVehicle)) {
            throw new Error("Datos incompletos o no válidos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.newVehicleValidateByChauffeur = newVehicleValidateByChauffeur;
const updateVehicleValidate = (req, res, next) => {
    try {
        const data = req.body;
        const allowProperties = [
            "patent",
            "brand",
            "model",
            "year",
            "ownerId",
            "chauffeurId",
            "documents",
        ];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw new Error("Datos no permitidos");
        if (((data === null || data === void 0 ? void 0 : data.patent) && !(0, validators_1.isPatentValid)(data.patent)) ||
            ((data === null || data === void 0 ? void 0 : data.brand) && !(0, validators_1.isBrandValid)(data.brand)) ||
            ((data === null || data === void 0 ? void 0 : data.model) && !(0, validators_1.isModelValid)(data.model)) ||
            ((data === null || data === void 0 ? void 0 : data.year) && !(0, validators_1.isYearValid)(data.year)) ||
            ((data === null || data === void 0 ? void 0 : data.ownerId) && !(0, validators_1.isOwnerIdValid)(data.ownerId)) ||
            ((data === null || data === void 0 ? void 0 : data.chauffeurId) && !(0, validators_1.isChauffeurIdValid)(data.chauffeurId)) ||
            ((data === null || data === void 0 ? void 0 : data.documents) && !(0, validators_1.isArrayImgValid)(data.documents))) {
            throw new Error("Datos incompletos o no válidos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateVehicleValidate = updateVehicleValidate;
