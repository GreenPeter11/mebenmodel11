// prisma/seed.ts — Creates the first admin account in the database.
// Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/seed.ts
// Or via: npx prisma db seed

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;

    if (!email || !password) {
        throw new Error(
            "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set in .env"
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.admin.upsert({
        where: { email },
        update: { hashedPassword },
        create: { email, hashedPassword },
    });

    console.log(`✅ Admin seeded: ${admin.email} (id=${admin.id})`);
}

main()
    .catch((error) => {
        console.error("Seed failed:", error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
