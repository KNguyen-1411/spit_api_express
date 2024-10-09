import { Router } from 'express';
import Activities from '../controllers/ActivitiesControllers';
import { checkLogin, checkPermission } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         location:
 *           type: string
 *       required:
 *         - name
 *         - date
 *         - location
 */

/**
 * @swagger
 * tags:
 *   - name: Activities
 *     description: API for managing activities
 */

/**
 * @swagger
 * /api/v1/activities:
 *   get:
 *     tags: [Activities]
 *     summary: Get a list of activities
 *     responses:
 *       200:
 *         description: A list of activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Internal server error
 */
router.get('/', Activities.index);

/**
 * @swagger
 * /api/v1/activities:
 *   post:
 *     tags: [Activities]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã truy cập (Bearer token)
 *     summary: Create a new activity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       201:
 *         description: Activity created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', checkLogin, checkPermission, Activities.create);

/**
 * @swagger
 * /api/v1/activities/{id}:
 *   get:
 *     tags: [Activities]
 *     summary: Get an activity by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the activity to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Activity details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 */
router.get('/:id', Activities.show);

/**
 * @swagger
 * /api/v1/activities/{id}:
 *   put:
 *     tags: [Activities]
 *     summary: Update an activity
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã truy cập (Bearer token)
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the activity to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Activity not found
 */
router.put('/:id', checkLogin, checkPermission, Activities.update);

/**
 * @swagger
 * /api/v1/activities/{id}:
 *   delete:
 *     tags: [Activities]
 *     summary: Delete an activity
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã truy cập (Bearer token)
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the activity to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Activity deleted successfully
 *       404:
 *         description: Activity not found
 */
router.delete('/:id', checkLogin, checkPermission, Activities.delete);

export default router;
