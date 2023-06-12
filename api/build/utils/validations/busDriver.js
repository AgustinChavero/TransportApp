"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newBusDriverValidate = void 0;
const validators_1 = require("./validators");
const newBusDriverValidate = (req, res, next) => {
    try {
        const data = req.body;
        const allowProperties = ["name", "cc", "license"];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw Error("Datos no permitidos");
        if (!(0, validators_1.isNameValid)(data.name) || !(0, validators_1.isCcValid)(data.cc) || !(0, validators_1.isLicenseValid)(data.license)) {
            throw Error("Datos incompletos o no válidos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.newBusDriverValidate = newBusDriverValidate;
