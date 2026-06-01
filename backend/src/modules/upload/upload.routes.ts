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

const upload = multer({ storage });

router.post(
  "/",
  authMiddleware,
  upload.single("file"),
  uploadFile
);

export default router;