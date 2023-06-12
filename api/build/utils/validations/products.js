"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidated = exports.newProductValidated = void 0;
const validators_1 = require("./validators");
const newProductValidated = (req, res, next) => {
    try {
        const data = req.body;
        if (!data.name ||
            !data.price ||
            !data.description ||
            !data.stock ||
            !data.type ||
            !data.localId ||
            !data.img)
            throw Error("Datos incompletos");
        if (!(0, validators_1.isNameValid)(data.name) ||
            !(0, validators_1.isPriceValid)(data.price) ||
            !(0, validators_1.isDescriptionValid)(data.description) ||
            !(0, validators_1.isStockValid)(data.stock) ||
            !(0, validators_1.isProductTypeValid)(data.type) ||
            !(0, validators_1.isLocalIdValid)(data.localId) ||
            !(0, validators_1.isImgValid)(data.img)) {
            throw new Error("Datos no validos");
        }
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};
exports.newProductValidated = newProductValidated;
const updateProductValidated = (req, res, next) => {
    try {
        const data = req.body;
        const allowProperties = ["name", "price", "description", "img", "type", "stock", "deleted"];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw Error("Datos no permitidos");
        if (((data === null || data === void 0 ? void 0 : data.name) && !(0, validators_1.isNameValid)(data.name)) ||
            ((data === null || data === void 0 ? void 0 : data.price) && !(0, validators_1.isPriceValid)(data.price)) ||
            ((data === null || data === void 0 ? void 0 : data.description) && !(0, validators_1.isDescriptionValid)(data.description)) ||
            ((data === null || data === void 0 ? void 0 : data.stock) && !(0, validators_1.isStockValid)(data.stock)) ||
            ((data === null || data === void 0 ? void 0 : data.type) && !(0, validators_1.isProductTypeValid)(data.type)) ||
            ((data === null || data === void 0 ? void 0 : data.localId) && !(0, validators_1.isLocalIdValid)(data.localId)) ||
            ((data === null || data === void 0 ? void 0 : data.img) && !(0, validators_1.isImgValid)(data.img))) {
            throw new Error("Datos incompletos o no válidos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateProductValidated = updateProductValidated;
