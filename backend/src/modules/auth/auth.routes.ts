import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware.js";

import {
  registerController,
  loginController,
} from "./auth.controller.js";

import {
  registerSchema,
  loginSchema,
} from "./auth.validation.js";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  registerController
);
/** * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register User
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
 *               roleName:
 *                 type: string
 *                 enum: [STUDENT, ORGANIZATION]
 *               organizationName:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration Successful
 */


router.post(
  "/login",
  validate(loginSchema),
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