"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRatingValidator = void 0;
const validators_1 = require("./validators");
const http_errors_1 = __importDefault(require("http-errors"));
const newRatingValidator = (req, res, next) => {
    try {
        const data = req.body;
        const { error } = (0, validators_1.validateNewRatingAndComment)(data);
        if (error) {
            throw (0, http_errors_1.default)(400, error.message);
        }
    }
    catch (error) {
        next(error);
    }
};
exports.newRatingValidator = newRatingValidator;
