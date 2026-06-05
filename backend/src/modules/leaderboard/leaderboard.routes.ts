import { Router } from "express";

import {
  getLeaderboard,
} from "./leaderboard.controller.js";

const router = Router();

router.get("/", getLeaderboard);

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: Activity Score Ranking
 */

/**
 * @swagger
 * /api/leaderboard:
 *   get:
 *     summary: Get Student Leaderboard
 *     description: Returns students ranked by activity score.
 *     tags: [Leaderboard]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *         description: Number of records per page
 *     responses:
 *       200:
 *         description: Leaderboard retrieved successfully
 */

export default router;
