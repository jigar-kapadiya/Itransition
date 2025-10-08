import { PrismaClient } from "@prisma/client";
import data from "../drugData.json";

const prisma = new PrismaClient();

async function main() {
  for (const item of data) {
    await prisma.drug.create({ data: { ...item, launchDate: new Date(item.launchDate) } });
  }
}
main().finally(() => prisma.$disconnect());
