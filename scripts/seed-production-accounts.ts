import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function seedAccounts() {
  console.log('Seeding 3 official production accounts into Neon PostgreSQL...');

  const govPassword = 'SkillTrack@Admin2025';
  const providerPassword = 'SkillTrack@Provider2025';
  const learnerPassword = 'SkillTrack@Learner2025';

  const [govHash, providerHash, learnerHash] = await Promise.all([
    bcrypt.hash(govPassword, 10),
    bcrypt.hash(providerPassword, 10),
    bcrypt.hash(learnerPassword, 10),
  ]);

  // Clean any partially created records first
  await prisma.learners.deleteMany({});
  await prisma.training_providers.deleteMany({});
  await prisma.users.deleteMany({});

  // 1. Government Admin User
  const govUser = await prisma.users.create({
    data: {
      id: crypto.randomUUID(),
      email: 'admin@skilltrack.gov.in',
      hashed_password: govHash,
      role: 'government',
      full_name: 'Administrator (SkillTrack PMU)',
      phone: '+91 11 2345 6789',
      is_active: true,
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  });
  console.log('✓ Created Government Admin Account: admin@skilltrack.gov.in');

  // 2. Training Provider User & Provider Entity
  const providerUser = await prisma.users.create({
    data: {
      id: crypto.randomUUID(),
      email: 'provider@skilltrack.org.in',
      hashed_password: providerHash,
      role: 'provider',
      full_name: 'National Skill Training Institute',
      phone: '+91 80 2345 6789',
      is_active: true,
      avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
  });

  const providerEntity = await prisma.training_providers.create({
    data: {
      id: 'prov-nsti-001',
      user_id: providerUser.id,
      name: 'National Skill Training Institute',
      code: 'NSTI-DEL-01',
      state: 'Delhi',
      district: 'New Delhi',
      accreditation_tier: 'Tier 1 Master Hub',
      contact_email: 'provider@skilltrack.org.in',
      phone: '+91 80 2345 6789',
      active_learners_count: 1,
      overall_placement_rate: 82.5,
      overall_retention_rate: 79.0,
    },
  });
  console.log('✓ Created Training Provider Account: provider@skilltrack.org.in (NSTI-DEL-01)');

  // 3. Learner Candidate User & Learner Entity
  const learnerUser = await prisma.users.create({
    data: {
      id: crypto.randomUUID(),
      email: 'candidate@skilltrack.in',
      hashed_password: learnerHash,
      role: 'learner',
      full_name: 'Aditya Sharma',
      phone: '+91 98765 43210',
      is_active: true,
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  });

  const learnerEntity = await prisma.learners.create({
    data: {
      id: 'lrn-aditya-001',
      user_id: learnerUser.id,
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
  console.log('✓ Created Learner Candidate Account: candidate@skilltrack.in (ST-2025-001)');

  console.log('\n===========================================');
  console.log('OFFICIAL SKILLTRACK CREDENTIALS:');
  console.log('===========================================');
  console.log('1. Government Admin:');
  console.log('   Email:    admin@skilltrack.gov.in');
  console.log('   Password: ' + govPassword);
  console.log('   Role:     government');
  console.log('-------------------------------------------');
  console.log('2. Training Provider:');
  console.log('   Email:    provider@skilltrack.org.in');
  console.log('   Password: ' + providerPassword);
  console.log('   Role:     provider (or trainer in portal UI)');
  console.log('-------------------------------------------');
  console.log('3. Learner Candidate:');
  console.log('   Email:    candidate@skilltrack.in');
  console.log('   Password: ' + learnerPassword);
  console.log('   Role:     learner (or student in portal UI)');
  console.log('===========================================');
}

if (require.main === module) {
  seedAccounts()
    .catch((e) => {
      console.error('Error seeding production accounts:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
