"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChauffeurValidated = exports.newChauffeurValidated = void 0;
const validators_1 = require("./validators");
const newChauffeurValidated = (req, res, next) => {
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
            "gender",
        ];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw Error("Datos no permitidos");
        console.log((0, validators_1.isCcValid)(data.cc));
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
            !(0, validators_1.isLicenseValid)(data.license) ||
            !(0, validators_1.isGenderVality)(data.gender)) {
            throw Error("Datos incompletos o no válidos");
        }
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.newChauffeurValidated = newChauffeurValidated;
const updateChauffeurValidated = (req, res, next) => {
    try {
        const data = req.body;
        const allowProperties = [
            "typeChauffeur",
            "license",
            "occupation",
            "address",
            "phone",
            "vehicle",
            "payments",
        ];
        if (Object.keys(data).some((key) => !allowProperties.includes(key)))
            throw Error("Datos no permitidos");
        if (((data === null || data === void 0 ? void 0 : data.typeChauffeur) && !(0, validators_1.isTypeChauffeurValid)(data.typeChauffeur)) ||
            ((data === null || data === void 0 ? void 0 : data.license) && !(0, validators_1.isLicenseValid)(data.license)) ||
            ((data === null || data === void 0 ? void 0 : data.occupation) && !(0, validators_1.isOcupationValid)(data.occupation)) ||
            ((data === null || data === void 0 ? void 0 : data.address) && !(0, validators_1.isAddressValid)(data.address)) ||
            ((data === null || data === void 0 ? void 0 : data.phone) && !(0, validators_1.isPhoneValid)(data.phone)) ||
            ((data === null || data === void 0 ? void 0 : data.vehicle) && !(0, validators_1.isVehicleToChauffeurValid)(data.vehicle)) ||
            ((data === null || data === void 0 ? void 0 : data.payments) && !(0, validators_1.arePaymentsValid)(data.payments)))
            throw Error("Datos no válidos");
        next();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateChauffeurValidated = updateChauffeurValidated;
