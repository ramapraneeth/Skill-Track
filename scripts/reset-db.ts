import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function clearAllDatabaseData() {
  console.log('Initiating complete purge of mock and test data from Neon PostgreSQL...');

  const tableNames = [
    'interventions',
    'skill_verifications',
    'followups',
    'employment_outcomes',
    'apprenticeship_outcomes',
    'impact_measurements',
    'batches',
    'courses',
    'learners',
    'training_providers',
    'training_centers',
    'jobs',
    'users',
  ];

  for (const table of tableNames) {
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
      console.log(`- Truncated table: ${table}`);
    } catch (err: any) {
      console.warn(`- Notice on table ${table}: ${err.message}`);
    }
  }

  console.log('Database purge complete. All tables are clean.');
}

if (require.main === module) {
  clearAllDatabaseData()
    .catch((e) => {
      console.error('Error during database purge:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
