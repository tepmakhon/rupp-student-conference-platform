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

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication APIs
 */

router.post(
  "/register",
  validate(registerSchema),
  registerController
);
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: student@rupp.edu.kh
 *               password:
 *                 type: string
 *                 example: 123456
 *               roleName:
 *                 type: string
 *                 enum: [STUDENT, ORGANIZATION]
 *                 example: STUDENT
 *               organizationName:
 *                 type: string
 *                 example: GDG RUPP
 *               description:
 *                 type: string
 *                 example: Student technology organization
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation error or user already exists
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
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@rupp.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */

export default router;