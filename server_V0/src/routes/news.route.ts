import { Router } from 'express';
import NewsControllers from '../controllers/NewsControllers';
import { checkLogin, checkPermission } from '../middlewares/auth';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         author:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - title
 *         - content
 *         - author
 */

/**
 * @swagger
 * tags:
 *   - name: News
 *     description: API for managing news articles
 */

/**
 * @swagger
 * /api/v1/news:
 *   get:
 *     tags: [News]
 *     summary: Get a list of news
 *     description: Retrieve a list of all news articles.
 *     responses:
 *       200:
 *         description: A list of news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 *       500:
 *         description: Internal server error
 */
router.get('/', NewsControllers.index);

/**
 * @swagger
 * /api/v1/news:
 *   post:
 *     tags: [News]
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        required: true
 *        schema:
 *          type: string
 *        description: Mã truy cập (Bearer token)
 *     summary: Create a new news article
 *     description: Add a new news article to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       201:
 *         description: News article created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', checkLogin, checkPermission, NewsControllers.create);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   get:
 *     tags: [News]
 *     summary: Get a news article by ID
 *     description: Retrieve details of a specific news article.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the news article to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News article details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: News article not found
 */
router.get('/:id', NewsControllers.show);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   put:
 *     tags: [News]
 *     summary: Update a news article
 *     description: Update the details of a specific news article.
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
 *         description: The ID of the news article to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: News article updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: News article not found
 */
router.put('/:id', checkLogin, checkPermission, NewsControllers.update);

/**
 * @swagger
 * /api/v1/news/{id}:
 *   delete:
 *     tags: [News]
 *     summary: Delete a news article
 *     description: Remove a news article from the system.
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
 *         description: The ID of the news article to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: News article deleted successfully
 *       404:
 *         description: News article not found
 */
router.delete('/:id', checkLogin, checkPermission, NewsControllers.delete);

export default router;
