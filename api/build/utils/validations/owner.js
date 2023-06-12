"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOwnerValidated = exports.newOwnerValidated = void 0;
const validators_1 = require("./validators");
const newOwnerValidated = (req, res, next) => {
    try {
        const data = req.body;
        const allowProperties = ["firstName", "lastName", "email", "phone", "address", "cc", "ce"];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw Error("Datos no permitidos");
        if (!(0, validators_1.isFirstNameValid)(data.firstName) ||
            // !isLastNameValid(data.lastName) ||
            !(0, validators_1.isEmailValid)(data.email) ||
            !(0, validators_1.isPhoneValid)(data.phone) ||
            !(0, validators_1.isAddressValid)(data.address) ||
            !(0, validators_1.isCcValid)(data.cc) ||
            (data.ce && !(0, validators_1.isCeValid)(data.ce))) {
            throw new Error("Datos incompletos o no válidos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.newOwnerValidated = newOwnerValidated;
const updateOwnerValidated = (req, res, next) => {
    try {
        const data = req.body;
        const allowProperties = ["email", "phone", "address"];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw Error("Datos faltantes");
        if (((data === null || data === void 0 ? void 0 : data.email) && !(0, validators_1.isEmailValid)(data.email)) ||
            ((data === null || data === void 0 ? void 0 : data.phone) && !(0, validators_1.isPhoneValid)(data.phone)) ||
            ((data === null || data === void 0 ? void 0 : data.address) && !(0, validators_1.isAddressValid)(data.address))) {
            throw new Error("Datos incompletos o no válidos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateOwnerValidated = updateOwnerValidated;
