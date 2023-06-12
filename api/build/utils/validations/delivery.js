"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeliveryValidate = exports.newDeliveryValidate = void 0;
const validators_1 = require("./validators");
const newDeliveryValidate = (req, res, next) => {
    // Validar que todas las propiedades tengan un valor válido
    try {
        const data = req.body;
        const allowProperties = [
            "firstName",
            "lastName",
            "address",
            "email",
            "password",
            "phone",
            "nationality",
            "birthday",
            "cc",
            "img",
            "license",
        ];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw new Error("Datos no permitidos");
        if (!(0, validators_1.isFirstNameValid)(data.firstName) ||
            // !isLastNameValid(data.lastName) ||
            !(0, validators_1.isAddressValid)(data.address) ||
            !(0, validators_1.isEmailValid)(data.email) ||
            !(0, validators_1.isPasswordValid)(data.password) ||
            !(0, validators_1.isPhoneValid)(data.phone) ||
            !(0, validators_1.isNationalityValid)(data.nationality) ||
            !(0, validators_1.isBirthdayValid)(data.birthday) ||
            !(0, validators_1.isCcValid)(data.cc) ||
            !(0, validators_1.isImgValid)(data.img) ||
            !(0, validators_1.isLicenseValid)(data.license))
            throw new Error("Faltan datos");
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.newDeliveryValidate = newDeliveryValidate;
const updateDeliveryValidate = (req, res, next) => {
    try {
        const data = req.body;
        const allowProperties = [
            "phone",
            "address",
            "vehicleType",
            "img",
            "license",
            "payments",
        ];
        if (Object.keys(data).some((key) => !allowProperties.includes(key))) {
            throw new Error("Datos no permitidos");
        }
        if (((data === null || data === void 0 ? void 0 : data.address) && (0, validators_1.isAddressValid)(data.address)) ||
            ((data === null || data === void 0 ? void 0 : data.img) && !(0, validators_1.isImgValid)(data.img)) ||
            ((data === null || data === void 0 ? void 0 : data.vehicleType) && !(0, validators_1.isVehicleTypeValid)(data.vehicleType)) ||
            ((data === null || data === void 0 ? void 0 : data.license) && !(0, validators_1.isLicenseValid)(data.license)) ||
            ((data === null || data === void 0 ? void 0 : data.payments) && !(0, validators_1.arePaymentsValid)(data.payments))) {
            throw Error("Datos no válidos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateDeliveryValidate = updateDeliveryValidate;
