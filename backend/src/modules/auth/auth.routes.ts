import {

  Router,

}

from "express";

import {

  login,

  register,

}

from "./auth.controller.js";

const router = Router();

router.post(

  "/register",

  register

);

router.post(

  "/login",

  login

);

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication APIs
 */

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