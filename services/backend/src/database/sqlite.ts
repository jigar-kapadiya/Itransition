import { PrismaClient } from "../../generated/prisma";

export const prisma = new PrismaClient();

export async function connectDatabase() {
    await prisma.$connect().then(() => {
        console.log("Database connected")
    })
}