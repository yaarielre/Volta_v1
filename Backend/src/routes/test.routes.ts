import { Router } from "express";
import { prisma } from "../config/prisma.js";

const router = Router();

router.get("/health", async (_req, res) => {
  try {
    await prisma.user.findFirst();
    res.json({ status: "ok", db: "connected" });
  } catch {
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

export default router;
