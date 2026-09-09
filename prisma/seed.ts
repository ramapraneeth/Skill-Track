import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding demonstration accounts and outcome intelligence records into Neon PostgreSQL...');

  // Configurable credentials via environment variables
  const adminEmail = process.env.DEMO_ADMIN_EMAIL || 'admin.msde@gov.in';
  const adminPassword = process.env.DEMO_ADMIN_PASSWORD || 'demo1234';

  const providerEmail = process.env.DEMO_PROVIDER_EMAIL || 'director@apexskills.org';
  const providerPassword = process.env.DEMO_PROVIDER_PASSWORD || 'demo1234';

  const learnerEmail = process.env.DEMO_LEARNER_EMAIL || 'rahul.sharma@skilltrack.in';
  const learnerPassword = process.env.DEMO_LEARNER_PASSWORD || 'demo1234';

  const [adminHash, providerHash, learnerHash] = await Promise.all([
    bcrypt.hash(adminPassword, 10),
    bcrypt.hash(providerPassword, 10),
    bcrypt.hash(learnerPassword, 10),
  ]);

  // 1. Seed Government / Administrator User Account
  const userGov = await prisma.users.upsert({
    where: { email: adminEmail },
    update: {
      hashed_password: adminHash,
      role: 'government',
      full_name: 'Rajesh Verma (Joint Secretary)',
      is_active: true,
    },
    create: {
      id: crypto.randomUUID(),
      email: adminEmail,
      hashed_password: adminHash,
      role: 'government',
      full_name: 'Rajesh Verma (Joint Secretary)',
      phone: '+91 98111 22334',
      is_active: true,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  });

  // Also support alias mission.director@msde.gov.in
  await prisma.users.upsert({
    where: { email: 'mission.director@msde.gov.in' },
    update: {
      hashed_password: adminHash,
      role: 'government',
      full_name: 'Dr. Rajiv Kumar (Mission Director)',
      is_active: true,
    },
    create: {
      id: crypto.randomUUID(),
      email: 'mission.director@msde.gov.in',
      hashed_password: adminHash,
      role: 'government',
      full_name: 'Dr. Rajiv Kumar (Mission Director)',
      phone: '+91 98111 22335',
      is_active: true,
    },
  });

  // 2. Seed Training Provider User Account
  const userProvider = await prisma.users.upsert({
    where: { email: providerEmail },
    update: {
      hashed_password: providerHash,
      role: 'provider',
      full_name: 'Dr. Sunita Rao (Director)',
      is_active: true,
    },
    create: {
      id: crypto.randomUUID(),
      email: providerEmail,
      hashed_password: providerHash,
      role: 'provider',
      full_name: 'Dr. Sunita Rao (Director)',
      phone: '+91 91234 56789',
      is_active: true,
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
  });

  // 3. Seed Learner User Account
  const userLearner = await prisma.users.upsert({
    where: { email: learnerEmail },
    update: {
      hashed_password: learnerHash,
      role: 'learner',
      full_name: 'Rahul Sharma',
      is_active: true,
    },
    create: {
      id: crypto.randomUUID(),
      email: learnerEmail,
      hashed_password: learnerHash,
      role: 'learner',
      full_name: 'Rahul Sharma',
      phone: '+91 98765 43210',
      is_active: true,
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  });

  console.log('Demonstration user accounts successfully provisioned:');
  console.log(`- Government Administrator: ${adminEmail} (or mission.director@msde.gov.in)`);
  console.log(`- Training Provider: ${providerEmail}`);
  console.log(`- Learner Candidate: ${learnerEmail}`);

  // 4. Verify Training Provider entity link
  await prisma.training_providers.updateMany({
    where: { id: 'provider-1' },
    data: { user_id: userProvider.id },
  });

  // 5. Verify Learner candidate entity link
  await prisma.learners.updateMany({
    where: { id: 'learner-1' },
    data: { user_id: userLearner.id },
  });

  console.log('Seed verification complete.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
