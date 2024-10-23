import express from 'express'
import { create, fetch, update, deletePatient } from '../controller/patientController.js'

const route = express.Router();
/**
 * @swagger
 * /api/patient/fetch:
 *   get:
 *     summary: Fetch all patients
 *     description: Retrieves all patients from the database.
 *     responses:
 *       200:
 *         description: A list of patients.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   status:
 *                     type: string
 *       400:
 *         description: No patients found.
 *       500:
 *         description: Internal server error.
 */

route.get('/fetch', fetch)
/**
 * @swagger
 * /api/patients/create:
 *   post:
 *     summary: Create a new patient
 *     description: Adds a new patient to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient created successfully.
 *       400:
 *         description: Patient already exists.
 *       500:
 *         description: Internal server error.
 */
route.post('/create', create)
/**
 * @swagger
 * /api/patient/update:
 *   put:
 *     summary: Updates a patient
 *     description: Updates a patient to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: patient created successfully.
 *       400:
 *         description: patient already exists.
 *       500:
 *         description: Internal server error.
 */

route.put("/update/:id", update)
/**
 * @swagger
 * /api/patient/delete:
 *   delete:
 *     summary: Deletes a patient
 *     description: Deletes patient from the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: patient created successfully.
 *       400:
 *         description: patient already exists.
 *       500:
 *         description: Internal server error.
 */
route.delete("/delete/:id", deletePatient)

export default route