"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../../controllers/inputs/user");
const user_2 = require("../../utils/validations/user");
const rating_1 = require("../../utils/validations/rating");
const router = (0, express_1.Router)();
/**
 * @swagger
 *
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserToRegister'
 *     responses:
 *       '201':
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del usuario creado
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
router.post("/", user_2.newUserValidated, user_1.newUser);
/**
 * @swagger
 *
 * /delivery-ratings/{userId}/{deliveryId}:
 *   post:
 *     summary: Crear una nueva calificación de entrega
 *     description: Crea una nueva calificación para un repartidor de entrega
 *     tags:
 *       - Calificaciones
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *       - in: path
 *         name: deliveryId
 *         required: true
 *         description: ID de la entrega
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryRatingInput'
 *     responses:
 *       '200':
 *         description: Calificación creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la calificación creada
 *       '400':
 *         description: Error al crear la calificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 */
router.post("/rating/delivery/:userId/:deliveryId", rating_1.newRatingValidator, user_1.newDeliveryRating);
/**
 * @swagger
 *
 * /chauffeur-ratings/{userId}/{chauffeurId}:
 *   post:
 *     summary: Crear una nueva calificación de distribuidor
 *     description: Crea una nueva calificación para un distribuidor de entrega
 *     tags:
 *       - Calificaciones
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *       - in: path
 *         name: chauffeurId
 *         required: true
 *         description: ID del distribuidor
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChauffeurRatingInput'
 *     responses:
 *       '200':
 *         description: Calificación creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la calificación creada
 *       '400':
 *         description: Error al crear la calificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 */
router.post("/rating/chauffeur/:userId/:chauffeurId", rating_1.newRatingValidator, user_1.newChauffeurRating);
/**
 * @swagger
 *
 * /company-ratings/{ticketId}/{companyId}:
 *   post:
 *     summary: Crear una nueva calificación de compañía
 *     description: Crea una nueva calificación para una compañía
 *     tags:
 *       - Calificaciones
 *     parameters:
 *       - in: path
 *         name: ticketId
 *         required: true
 *         description: ID del ticket
 *         schema:
 *           type: string
 *       - in: path
 *         name: companyId
 *         required: true
 *         description: ID de la compañía
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CompanyRatingInput'
 *     responses:
 *       '200':
 *         description: Calificación creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la calificación creada
 *       '400':
 *         description: Error al crear la calificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 */
router.post("/rating/company/:ticketId/:companyId", user_1.newCompanyRating);
router.post("/forgot-password", user_1.forgotPassword);
router.post("/reset-password", user_1.resetPassword);
/**
 * @swagger
 *
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     description: Actualiza un usuario existente con los datos proporcionados en el body de la petición. No permite actualizar los valores de `history.orders` y `history.travels`.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a actualizar
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserToUpdate'
 *     responses:
 *       '200':
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *       '400':
 *         description: Error al actualizar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 */
router.put("/:id", user_2.updateUserValidated, user_1.updateUser);
/**
 * @swagger
 *
 * /users/enable/{id}:
 *   patch:
 *     summary: Habilitar un usuario
 *     description: Activa un usuario que ha sido previamente desactivado
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El ID del usuario a habilitar
 *     responses:
 *       '200':
 *         description: Usuario habilitado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación de la operación
 *       '400':
 *         description: Error al habilitar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 */
router.patch("/enable/:id", user_1.enableUser);
/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     description: Elimina un usuario de la base de datos.
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario a eliminar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *       '400':
 *         description: Error al eliminar el usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Descripción del error
 */
router.delete("/delete/:id", user_1.deletedUser);
exports.default = router;
