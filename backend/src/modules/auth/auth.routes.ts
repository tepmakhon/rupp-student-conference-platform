import { Router } from "express";

import {
  registerController,
  loginController,
} from "./auth.controller.js";

const router = Router();

router.post(
  "/register",
  registerController
);

router.post(
  "/login",
  loginController
);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login Successful
 */

export default router;