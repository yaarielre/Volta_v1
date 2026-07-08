import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

const SALT_ROUNDS = 10;

interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

interface LoginInput {
  email: string;
  password: string;
}

export async function registerUser({ email, password, name }: RegisterInput) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("El email ya está registrado");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  return issueTokens(user.id, user.role);
}

export async function loginUser({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    throw new Error("Credenciales inválidas");
  }

  return issueTokens(user.id, user.role);
}

export async function refreshAccessToken(refreshToken: string) {
  const payload = verifyRefreshToken(refreshToken);

  const storedToken = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
  });

  if (
    !storedToken ||
    storedToken.revoked ||
    storedToken.expiresAt < new Date()
  ) {
    throw new Error("Refresh token inválido o expirado");
  }

  const accessToken = generateAccessToken({
    userId: payload.userId,
    role: payload.role,
  });

  return { accessToken };
}

export async function revokeRefreshToken(refreshToken: string) {
  await prisma.refreshToken.updateMany({
    where: { token: refreshToken },
    data: { revoked: true },
  });
}

async function issueTokens(userId: string, role: string) {
  const accessToken = generateAccessToken({ userId, role });
  const refreshToken = generateRefreshToken({ userId, role });

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.refreshToken.create({
    data: { token: refreshToken, userId, expiresAt },
  });

  return { accessToken, refreshToken };
}
