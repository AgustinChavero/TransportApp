"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/outputs/user");
const router = (0, express_1.Router)();
// Ruta para obtener un usuario por su I
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve todos los usuarios que no han sido eliminados y puede mandarse cualquier valor por query para filtrar
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Número de página para paginar los resultados
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: pageSize
 *         in: query
 *         description: Tamaño de la página para paginar los resultados
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *       - name: {field}
 *         in: query
 *         description: Filtro para buscar usuarios. Sustituir {field} por el nombre del campo a filtrar
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Lista de usuarios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                   description: Lista de usuarios encontrados
 *                 totalPages:
 *                   type: integer
 *                   description: Total de páginas
 *                   minimum: 1
 *                   example: 3
 *       '500':
 *         description: Error al obtener los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 */
router.get("/", user_1.allUsers);
/**
 * @swagger
 *
 * /decoding-user:
 *   get:
 *     summary: Decodificar usuario
 *     description: Decodifica el token de autorización y obtiene los datos del usuario correspondiente
 *     tags:
 *       - Usuarios
 *     responses:
 *       '200':
 *         description: Datos del usuario obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Error al decodificar el token o encontrar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 */
router.get("/decoding", user_1.decodingUser);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Devuelve un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a buscar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '/schemas/user'
 *             example:
 *               id: string
 *               password: string
 *               img: string
 *               deleted: false
 *               payments:
 *                 securityCode: string
 *                 cardNumber: string
 *                 expirationDate: string
 *               name: string
 *               adress: string
 *               history:
 *                 travels: [string]
 *                 orders: [string]
 *               email: string
 *               DNI: string
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 *       '500':
 *         description: Error al buscar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 */
router.get("/:id", user_1.searchUser);
exports.default = router;
