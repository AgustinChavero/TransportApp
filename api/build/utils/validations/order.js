"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOrderValidate = void 0;
const validators_1 = require("./validators");
const newOrderValidate = (req, res, next) => {
    // Validar que todas las propiedades tengan un valor válido
    try {
        const data = req.body;
        if (!data.userId ||
            !data.deliveryId ||
            !data.productId ||
            !data.localId ||
            !data.price ||
            !data.destination) {
            throw new Error("Faltan datos");
        }
        if (!(0, validators_1.isUserIdValid)(data.userId) ||
            !(0, validators_1.isDistributorIdValid)(data.deliveryId) ||
            !(0, validators_1.isProductIdValid)(data.productId) ||
            !(0, validators_1.isLocalIdValid)(data.localId) ||
            !(0, validators_1.isPriceValid)(data.price) ||
            !(0, validators_1.isDestinationValid)(data.destination)) {
            throw new Error("Datos no validos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.newOrderValidate = newOrderValidate;
