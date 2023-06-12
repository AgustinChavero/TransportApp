"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTicketValidate = void 0;
const validators_1 = require("./validators");
const newTicketValidate = (req, res, next) => {
    try {
        const data = req.body;
        const validations = [
            { field: "userId", validator: validators_1.isUserIdValid },
            { field: "passageId", validator: validators_1.isPassageIdValid },
            { field: "price", validator: validators_1.isPriceValid },
            { field: "quantity", validator: validators_1.isQuantityValid },
            { field: "passengersData", validator: validators_1.isPassengersDataValid },
        ];
        for (const validation of validations) {
            validation.validator(req, res);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.newTicketValidate = newTicketValidate;
