import { prisma } from "./prisma.js";

export async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Base de datos conectada");
  } catch (error) {
    console.error("❌ Error conectando a la base de datos:", error);
    process.exit(1);
  }
}
