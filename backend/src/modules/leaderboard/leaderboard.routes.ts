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
 *     tags: [Leaderboard]
 *     responses:
 *       200:
 *         description: Success
 */

export default router;
