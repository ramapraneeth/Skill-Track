import { prisma } from '../lib/db/prisma';

async function benchmark() {
  console.log('--- Benchmarking Neon PostgreSQL query latency ---');

  const t0 = Date.now();
  await prisma.$connect();
  console.log(`Prisma $connect: ${Date.now() - t0}ms`);

  const t1 = Date.now();
  await prisma.learners.count();
  console.log(`learners.count: ${Date.now() - t1}ms`);

  const t2 = Date.now();
  await prisma.employment_outcomes.findMany({ take: 20 });
  console.log(`employment_outcomes.findMany: ${Date.now() - t2}ms`);

  const t3 = Date.now();
  await prisma.followups.findMany({ take: 20 });
  console.log(`followups.findMany: ${Date.now() - t3}ms`);

  const t4 = Date.now();
  await prisma.learners.findMany({
    include: { employment_outcomes: true, followups: true, programmes: true },
  });
  console.log(`Complex analytics query (all learners with relations): ${Date.now() - t4}ms`);

  console.log(`Total query time: ${Date.now() - t0}ms`);
}

benchmark()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
