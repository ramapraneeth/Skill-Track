import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding official accounts into Neon PostgreSQL...');

  const govEmail = process.env.ADMIN_EMAIL || 'admin@skilltrack.gov.in';
  const govPassword = process.env.ADMIN_PASSWORD || 'SkillTrack@Admin2025';

  const providerEmail = process.env.PROVIDER_EMAIL || 'provider@skilltrack.org.in';
  const providerPassword = process.env.PROVIDER_PASSWORD || 'SkillTrack@Provider2025';

  const learnerEmail = process.env.LEARNER_EMAIL || 'candidate@skilltrack.in';
  const learnerPassword = process.env.LEARNER_PASSWORD || 'SkillTrack@Learner2025';

  const [govHash, providerHash, learnerHash] = await Promise.all([
    bcrypt.hash(govPassword, 10),
    bcrypt.hash(providerPassword, 10),
    bcrypt.hash(learnerPassword, 10),
  ]);

  // 1. Government Administrator
  await prisma.users.upsert({
    where: { email: govEmail },
    update: {
      hashed_password: govHash,
      role: 'government',
      full_name: 'Administrator (SkillTrack PMU)',
      is_active: true,
    },
    create: {
      id: crypto.randomUUID(),
      email: govEmail,
      hashed_password: govHash,
      role: 'government',
      full_name: 'Administrator (SkillTrack PMU)',
      phone: '+91 11 2345 6789',
      is_active: true,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  });

  // 2. Training Provider
  const userProvider = await prisma.users.upsert({
    where: { email: providerEmail },
    update: {
      hashed_password: providerHash,
      role: 'provider',
      full_name: 'National Skill Training Institute',
      is_active: true,
    },
    create: {
      id: crypto.randomUUID(),
      email: providerEmail,
      hashed_password: providerHash,
      role: 'provider',
      full_name: 'National Skill Training Institute',
      phone: '+91 80 2345 6789',
      is_active: true,
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
  });

  const providerEntity = await prisma.training_providers.upsert({
    where: { code: 'NSTI-DEL-01' },
    update: {
      user_id: userProvider.id,
      name: 'National Skill Training Institute',
      contact_email: providerEmail,
    },
    create: {
      id: 'prov-nsti-001',
      user_id: userProvider.id,
      name: 'National Skill Training Institute',
      code: 'NSTI-DEL-01',
      state: 'Delhi',
      district: 'New Delhi',
      accreditation_tier: 'Tier 1 Master Hub',
      contact_email: providerEmail,
      phone: '+91 80 2345 6789',
      active_learners_count: 1,
      overall_placement_rate: 82.5,
      overall_retention_rate: 79.0,
    },
  });

  // 3. Learner Candidate
  const userLearner = await prisma.users.upsert({
    where: { email: learnerEmail },
    update: {
      hashed_password: learnerHash,
      role: 'learner',
      full_name: 'Aditya Sharma',
      is_active: true,
    },
    create: {
      id: crypto.randomUUID(),
      email: learnerEmail,
      hashed_password: learnerHash,
      role: 'learner',
      full_name: 'Aditya Sharma',
      phone: '+91 98765 43210',
      is_active: true,
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  });

  await prisma.learners.upsert({
    where: { learner_code: 'ST-2025-001' },
    update: {
      user_id: userLearner.id,
      provider_id: providerEntity.id,
      full_name: 'Aditya Sharma',
    },
    create: {
      id: 'lrn-aditya-001',
      user_id: userLearner.id,
      provider_id: providerEntity.id,
      learner_code: 'ST-2025-001',
      full_name: 'Aditya Sharma',
      gender: 'Male',
      age: 22,
      state: 'Delhi',
      district: 'New Delhi',
      education_level: 'B.Tech Computer Science',
      socio_economic_category: 'General',
      current_status: 'ENROLLED',
      profile_completion_pct: 85,
      risk_level: 'Low',
      skill_match_pct: 82,
    },
  });

  console.log('Official accounts provisioned:');
  console.log(`- Government: ${govEmail}`);
  console.log(`- Provider:   ${providerEmail}`);
  console.log(`- Learner:    ${learnerEmail}`);
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
