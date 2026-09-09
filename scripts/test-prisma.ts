import { prisma } from '../lib/db/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const userCount = await prisma.users.count();
  const learnerCount = await prisma.learners.count();
  const providerCount = await prisma.training_providers.count();
  const programmeCount = await prisma.programmes.count();
  const skillCount = await prisma.skills.count();
  const jobCount = await prisma.jobs.count();
  const outcomeCount = await prisma.employment_outcomes.count();
  const followupCount = await prisma.followups.count();
  const predictionCount = await prisma.predictions.count();
  const interventionCount = await prisma.interventions.count();
  const impactCount = await prisma.impact_measurements.count();

  console.log('=== NEON POSTGRESQL DATABASE RECORD AUDIT ===');
  console.log(`Users: ${userCount}`);
  console.log(`Training Providers: ${providerCount}`);
  console.log(`Programmes (Schemes): ${programmeCount}`);
  console.log(`Learners (Longitudinal Profiles): ${learnerCount}`);
  console.log(`Skills Inventory: ${skillCount}`);
  console.log(`Jobs & Requisitions: ${jobCount}`);
  console.log(`Employment Outcomes: ${outcomeCount}`);
  console.log(`Milestone Followups (Evidence): ${followupCount}`);
  console.log(`Predictions (Risk Forecasts): ${predictionCount}`);
  console.log(`Prescriptive Interventions: ${interventionCount}`);
  console.log(`Impact Measurements: ${impactCount}`);

  console.log('\n=== USER AUTHENTICATION VERIFICATION ===');
  const users = await prisma.users.findMany();
  for (const u of users) {
    const isMatch = await bcrypt.compare('demo1234', u.hashed_password);
    console.log(`User: ${u.email} | Role: ${u.role} | Password 'demo1234' Valid: ${isMatch}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
