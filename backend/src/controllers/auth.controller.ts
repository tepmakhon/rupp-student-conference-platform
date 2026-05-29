import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
} from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};