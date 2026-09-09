import { prisma } from '../lib/db/prisma';

async function main() {
  const userCount = await prisma.users.count();
  const learnerCount = await prisma.learners.count();
  const providerCount = await prisma.training_providers.count();
  const outcomeCount = await prisma.employment_outcomes.count();
  const followupCount = await prisma.followups.count();

  console.log('=== PRISMA NEON CONNECTION TEST ===');
  console.log(`Users: ${userCount}`);
  console.log(`Learners: ${learnerCount}`);
  console.log(`Providers: ${providerCount}`);
  console.log(`Employment Outcomes: ${outcomeCount}`);
  console.log(`Followups: ${followupCount}`);
  console.log('Connection & query verification successful!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
