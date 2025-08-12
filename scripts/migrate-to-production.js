const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('../src/generated/prisma');

async function migrateToProduction() {
  const prisma = new PrismaClient();
  const usersFile = path.join(process.cwd(), 'temp-users.json');

  try {
    console.log('🚀 Starting production migration...');

    // Check if temp users file exists
    if (!fs.existsSync(usersFile)) {
      console.log('✅ No temporary users to migrate');
      return;
    }

    // Read temporary users
    const tempUsers = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    console.log(`📊 Found ${tempUsers.length} users to migrate`);

    // Migrate each user
    for (const user of tempUsers) {
      try {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {},
          create: {
            email: user.email,
            password: user.password,
          },
        });
        console.log(`✅ Migrated user: ${user.email}`);
      } catch (error) {
        console.log(`⚠️  User ${user.email} already exists or error occurred`);
      }
    }

    // Backup and remove temp file
    const backupFile = `temp-users-backup-${Date.now()}.json`;
    fs.renameSync(usersFile, backupFile);
    console.log(`📦 Temporary users backed up to: ${backupFile}`);

    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateToProduction();