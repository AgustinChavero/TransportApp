"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTravelValidated = exports.newTravelValidated = void 0;
const validators_1 = require("./validators");
const newTravelValidated = (req, res, next) => {
    try {
        const data = req.body;
        const validations = [
            { field: "userId", validator: validators_1.isUserIdValid },
            { field: "chauffeurId", validator: validators_1.isChauffeurIdValid },
            { field: "price", validator: validators_1.isPriceValid },
            { field: "destination", validator: validators_1.isDestinationValid },
            { field: "origin", validator: validators_1.isOriginValid },
        ];
        for (const validation of validations) {
            validation.validator(req, res);
        }
    }
    catch (error) {
        next(error); // Pasar el error al siguiente middleware
    }
};
exports.newTravelValidated = newTravelValidated;
const updateTravelValidated = (req, res, next) => {
    const data = req.body;
    const validations = [
        { field: "status", validator: validators_1.isTravelStatusValid },
        { field: "travel", validator: validators_1.isTravelTravelValid },
    ];
    const errors = validations
        .map((validation) => {
        const { field, validator } = validation;
        const value = data[field];
        if (!value)
            return { field, message: "Campo obligatorio" };
        const error = validator(value);
        return error ? { field, message: error } : null;
    })
        .filter((error) => error !== null);
    if (errors.length > 0) {
        res.status(400).json({ message: "Por favor revisa los datos", errors });
    }
    else {
        next();
    }
};
exports.updateTravelValidated = updateTravelValidated;
