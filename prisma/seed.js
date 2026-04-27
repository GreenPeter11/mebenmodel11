// prisma/seed.js — Creates the admin account. Runs as plain Node.js (no ts-node needed).
// Called by: prisma db seed → node prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;

    if (!email || !password) {
        console.log("⚠️  SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD not set — skipping admin seed.");
        return;
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
