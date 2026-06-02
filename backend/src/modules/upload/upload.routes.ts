import { Router } from "express";
import multer from "multer";
import path from "path";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { uploadFile } from "./upload.controller.js";

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize:
      5 * 1024 * 1024,
  },

  fileFilter(
    req,
    file,
    cb
  ) {

    const allowed = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];

    if (
      !allowed.includes(
        file.mimetype
      )
    ) {
      return cb(
        new Error(
          "Only JPG, PNG, PDF allowed"
        )
      );
    }

    cb(null, true);
  },
});

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  uploadFile
);

/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File Upload APIs
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload File
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded
 */

export default router;