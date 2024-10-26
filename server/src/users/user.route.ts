import { Router } from "express";
import UserControllers from "./user.controllers";
import { checkLogin, checkPermission } from "../auth/auth";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - title
 *         - content
 *         - author
 */

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: API for managing users
 */

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: user123
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       404:
 *         description: Tài khoản hoặc mật khẩu không đúng
 *       500:
 *         description: Lỗi máy chủ
 */
router.post("/login", UserControllers.index);

/**
 * @swagger
 * /api/v1/user/refreshToken:
 *   post:
 *     summary: Làm mới mã truy cập
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: none
 *     responses:
 *       200:
 *         description: Làm mới thành công
 *       401:
 *         description: Mã làm mới sai hoặc không hợp lệ
 *       404:
 *         description: Mã làm mới không hợp lệ
 *       500:
 *         description: Lỗi máy chủ
 */
router.post("/refreshToken", UserControllers.refreshToken);

/**
 * @swagger
 * /api/v1/user/:
 *   get:
 *     summary: Lấy thông tin người dùng
 *     tags: [Users]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Mã truy cập (Bearer token)
 *     responses:
 *       200:
 *         description: Thông tin người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userName:
 *                   type: string
 *                   example: user123
 *       401:
 *         description: Không có mã truy cập hoặc mã truy cập không hợp lệ
 *       404:
 *         description: Người dùng không tồn tại
 */
router.get("/", checkLogin, checkPermission, UserControllers.show);
export default router;
