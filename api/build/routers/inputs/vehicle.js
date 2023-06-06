"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vehicle_1 = require("../../controllers/inputs/vehicle");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB size limit
    },
});
// Ruta para crear vehiculos
router.post("/chauffeur", upload.single("img"), vehicle_1.newVehicleByChauffeur);
router.post("/delivery", vehicle_1.newVehicleByDelivery);
router.put("/:id", vehicle_1.updateVehicle);
router.patch("/enable/:id", vehicle_1.enableVehicle);
router.delete("/delete/:id", vehicle_1.deleteVehicle);
exports.default = router;
