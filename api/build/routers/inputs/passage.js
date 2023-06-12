"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passage_1 = require("../../controllers/inputs/passage");
const multer_1 = __importDefault(require("multer"));
const passage_2 = require("../../utils/validations/passage");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB size limit
    },
});
//Ruta para crear pasajes
/**
 * @swagger
 * /passage:
 *   post:
 *     summary: Crear un nuevo pasaje
 *     description: Crea un nuevo pasaje con la información proporcionada
 *     tags:
 *       - Pasajes
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/NewPassageRequest'
 *     responses:
 *       '200':
 *         description: Pasaje creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del pasaje creado
 *       '400':
 *         description: Error al crear el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 */
router.post("/", upload.single("img"), passage_2.newPassageValidate, passage_1.newPassage);
router.put("/:id", passage_1.updatePassage);
router.patch("/:id", passage_1.enablePassage);
router.delete("/:id", passage_1.deletePassage);
exports.default = router;
