import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function resetAndSeedClean() {
  console.log('=== 1. CLEARING ALL DEMO AND MOCK DATA FROM NEON POSTGRESQL ===');

  // Delete in foreign key dependency order
  await prisma.apprenticeship_outcomes.deleteMany({});
  await prisma.self_employment_outcomes.deleteMany({});
  await prisma.employment_outcomes.deleteMany({});
  await prisma.followups.deleteMany({});
  await prisma.interventions.deleteMany({});
  await prisma.predictions.deleteMany({});
  await prisma.learner_skills.deleteMany({});
  await prisma.learners.deleteMany({});
  await prisma.programmes.deleteMany({});
  await prisma.training_providers.deleteMany({});
  await prisma.jobs.deleteMany({});
  await prisma.skills.deleteMany({});
  await prisma.impact_measurements.deleteMany({});
  await prisma.users.deleteMany({});

  console.log('All existing tables successfully cleared.');

  console.log('\n=== 2. CREATING FRESH TEST ACCOUNTS WITH NO TRANSACTIONAL DATA ===');
  const commonPassword = 'password123';
  const hashedPassword = await bcrypt.hash(commonPassword, 10);

  const govUserId = crypto.randomUUID();
  const providerUserId = crypto.randomUUID();
  const learnerUserId = crypto.randomUUID();

  const providerEntityId = 'tp-test-01';
  const learnerEntityId = 'learner-test-01';

  // 1. Government Account
  const govUser = await prisma.users.create({
    data: {
      id: govUserId,
      email: 'government@skilltrack.gov.in',
      hashed_password: hashedPassword,
      role: 'government',
      full_name: 'National Mission Director',
      phone: '+91 98000 00001',
      is_active: true,
      created_at: new Date(),
    },
  });

  // 2. Training Provider Account
  const providerUser = await prisma.users.create({
    data: {
      id: providerUserId,
      email: 'provider@skilltrack.gov.in',
      hashed_password: hashedPassword,
      role: 'provider',
      full_name: 'Training Institute Director',
      phone: '+91 98000 00002',
      is_active: true,
      created_at: new Date(),
    },
  });

  // Provider profile entity (empty, no batch outcomes)
  await prisma.training_providers.create({
    data: {
      id: providerEntityId,
      user_id: providerUserId,
      name: 'National Skills Training Institute',
      code: 'NSTI-DEL-01',
      state: 'Delhi',
      district: 'Central Delhi',
      accreditation_tier: 'SMART Grade A',
      contact_email: 'provider@skilltrack.gov.in',
      phone: '+91 98000 00002',
      active_learners_count: 0,
      overall_placement_rate: 0,
      overall_retention_rate: 0,
      created_at: new Date(),
    },
  });

  // 3. Learner Candidate Account
  const learnerUser = await prisma.users.create({
    data: {
      id: learnerUserId,
      email: 'learner@skilltrack.gov.in',
      hashed_password: hashedPassword,
      role: 'learner',
      full_name: 'Test Candidate',
      phone: '+91 98000 00003',
      is_active: true,
      created_at: new Date(),
    },
  });

  // Learner profile entity (clean, no skills, no outcomes yet)
  await prisma.learners.create({
    data: {
      id: learnerEntityId,
      user_id: learnerUserId,
      provider_id: providerEntityId,
      learner_code: 'ST-2026-0001',
      full_name: 'Test Candidate',
      gender: 'General',
      age: 21,
      state: 'Delhi',
      district: 'Central Delhi',
      education_level: 'Higher Secondary',
      current_status: 'enrolled',
      profile_completion_pct: 25,
      current_salary: 0,
      retention_milestone_reached: 'enrolled',
      risk_level: 'Low',
      skill_match_pct: 0,
      created_at: new Date(),
    },
  });

  // Seed baseline industry vacancy definition so skill gap engine can compute once skills are added
  await prisma.jobs.create({
    data: {
      id: 'job-baseline-1',
      title: 'Junior Technical Associate',
      company_name: 'Industry Partner Network',
      sector: 'IT-ITeS',
      state: 'Delhi',
      district: 'Central Delhi',
      min_salary: 18000,
      max_salary: 25000,
      vacancies: 10,
      is_active: true,
      required_skills: [
        { skillId: 'sk-1', skillName: 'Basic Computer Operations', importance: 'mandatory', minProficiency: 'intermediate', weight: 4 },
        { skillId: 'sk-2', skillName: 'Problem Solving & Communication', importance: 'mandatory', minProficiency: 'intermediate', weight: 3 },
      ],
      created_at: new Date(),
    },
  });

  console.log('\n=== SUMMARY OF FRESH TEST ACCOUNTS CREATED ===');
  console.log('1. Government Portal:');
  console.log('   Email: government@skilltrack.gov.in');
  console.log(`   Password: ${commonPassword}`);
  console.log('2. Provider Portal:');
  console.log('   Email: provider@skilltrack.gov.in');
  console.log(`   Password: ${commonPassword}`);
  console.log('3. Learner Portal:');
  console.log('   Email: learner@skilltrack.gov.in');
  console.log(`   Password: ${commonPassword}`);
  console.log('\nDatabase is now completely clean of demo/mock records.');
}

resetAndSeedClean()
  .catch((err) => {
    console.error('Reset error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
