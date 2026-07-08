import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  revokeRefreshToken,
} from "../services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const { email, password, name } = req.body;
    const tokens = await registerUser({ email, password, name });
    res.status(201).json(tokens);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const tokens = await loginUser({ email, password });
    res.status(200).json(tokens);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    const result = await refreshAccessToken(refreshToken);
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    await revokeRefreshToken(refreshToken);
    res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}
