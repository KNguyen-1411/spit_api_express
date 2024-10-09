import { Router } from 'express';
import MembersControllers from '../controllers/MembersControllers';
import { checkLogin, checkPermission } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         lastName:
 *           type: string
 *         firstName:
 *           type: string
 *         gender:
 *           type: boolean
 *         birthday:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         class:
 *           type: string
 *         avatar:
 *           type: string
 *         generation:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - lastName
 *         - firstName
 *         - gender
 *         - birthday
 *         - email
 *         - phone
 *         - class
 */

/**
 * @swagger
 * tags:
 *   - name: Members
 *     description: API for managing members
 */

/**
 * @swagger
 * /api/v1/members:
 *   get:
 *     tags: [Members]
 *     summary: Get all members
 *     description: Retrieve a list of all members.
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 *
 */
router.get('/', MembersControllers.index);

/**
 * @swagger
 * /api/v1/members:
 *   post:
 *     tags: [Members]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã truy cập (Bearer token)
 *     summary: Create a new member
 *     security:
 *       - bearerAuth: []
 *     description: Add a new member to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/Member'
 *     responses:
 *       201:
 *         description: Member created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', checkLogin, checkPermission, MembersControllers.create);

/**
 * @swagger
 * /api/v1/members/{id}:
 *   get:
 *     tags: [Members]
 *     summary: Get a member by ID
 *     description: Retrieve details of a specific member.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the member to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       404:
 *         description: Member not found
 */
router.get('/:id', MembersControllers.show);

/**
 * @swagger
 * /api/v1/members/{id}:
 *   put:
 *     tags: [Members]
 *     summary: Update a member
 *     description: Update the details of a specific member.
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
 *         description: The ID of the member to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Member'
 *     responses:
 *       200:
 *         description: Member updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Member not found
 */
router.put('/:id', checkLogin, checkPermission, MembersControllers.update);

/**
 * @swagger
 * /api/v1/members/{id}:
 *   delete:
 *     tags: [Members]
 *     summary: Delete a member
 *     description: Remove a member from the system.
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
 *         description: The ID of the member to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Member deleted successfully
 *       404:
 *         description: Member not found
 */
router.delete('/:id', checkLogin, checkPermission, MembersControllers.delete);

export default router;
