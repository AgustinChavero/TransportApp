import { Router } from "express";
import {
  enablePassage,
  newPassage,
  updatePassage,
  deletePassage,
} from "../../controllers/inputs/passage";
import multer from "multer";
import { newPassageValidate } from "../../utils/validations/passage";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
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
router.post("/", upload.single("img"), newPassageValidate, newPassage);
router.put("/:id", updatePassage);
router.patch("/:id", enablePassage);
router.delete("/:id", deletePassage);

export default router;
