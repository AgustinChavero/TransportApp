"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLocalValidate = exports.newLocalValidate = void 0;
const validators_1 = require("./validators");
const newLocalValidate = (req, res, next) => {
    try {
        const data = req.body;
        const allowProperties = ["name", "address", "email", "password", "img"];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw Error("Datos no permitidos");
        if (!(0, validators_1.isNameValid)(data.name) ||
            !(0, validators_1.isAddressValid)(data.address) ||
            !(0, validators_1.isEmailValid)(data.email) ||
            !(0, validators_1.isPasswordValid)(data.password) ||
            !(0, validators_1.isImgValid)(data.img)) {
            throw new Error("Datos no validos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.newLocalValidate = newLocalValidate;
// FALTA TESTEAR DESPUES DE REINICIAR LA BD Y CREAR TODOS LOS MODELOS CON EL CAMPO DE BORRADO LÓGICO
const updateLocalValidate = (req, res, next) => {
    try {
        const data = req.body;
        const allowProperties = ["payments"];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw Error("Datos no permitidos");
        if ((data === null || data === void 0 ? void 0 : data.payments) && (0, validators_1.arePaymentsValid)(data.payments)) {
            throw new Error("Datos no validos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateLocalValidate = updateLocalValidate;
