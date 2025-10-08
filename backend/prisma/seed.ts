import { PrismaClient } from "../src/generated/prisma";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  // Read JSON data
  const rawData = fs.readFileSync(path.join(__dirname, "../drugData.json"), "utf-8");
  const data = JSON.parse(rawData);

  // Skip if already seeded
  const existing = await prisma.drug.count();
  if (existing > 0) {
    console.log(`⏩ Database already seeded with ${existing} records.`);
    return;
  }

  // Batch insert for performance
  await prisma.drug.createMany({
    data: data.map((item: any) => ({
      code: item.code,
      genericName: item.genericName,
      brandName: item.brandName,
      company: item.company,
      launchDate: new Date(item.launchDate),
    })),
  });

  console.log(`✅ Successfully seeded ${data.length} drugs.`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
