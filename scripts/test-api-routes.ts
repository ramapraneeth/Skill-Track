import { NextRequest } from 'next/server';
import { GET as getSkillGaps } from '../app/api/learners/[id]/skill-gaps/route';
import { GET as getCourseRecommendations } from '../app/api/learners/[id]/recommendations/courses/route';
import { GET as getJobMatches } from '../app/api/learners/[id]/recommendations/jobs/route';
import { GET as getSkillDemand } from '../app/api/analytics/skill-demand/route';
import { prisma } from '../lib/db/prisma';

async function testRoutes() {
  console.log('=== RUNNING END-TO-END API ROUTE INTEGRATION TESTS ===\n');

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, title: string, detail?: string) {
    total++;
    if (condition) {
      console.log(`[PASS] ${title}`);
      passed++;
    } else {
      console.error(`[FAIL] ${title}${detail ? ` - ${detail}` : ''}`);
      process.exitCode = 1;
    }
  }

  // Get test learner from Neon DB
  const testLearner = await prisma.learners.findFirst();
  if (!testLearner) {
    console.error('No learner found in database. Aborting API tests.');
    process.exit(1);
  }

  const learnerId = testLearner.id;

  // 1. Test GET /api/learners/[id]/skill-gaps
  {
    const req = new NextRequest(`http://localhost:3000/api/learners/${learnerId}/skill-gaps`);
    const res = await getSkillGaps(req, { params: Promise.resolve({ id: learnerId }) });
    const json = await res.json();

    assert(res.status === 200, 'Route: GET /api/learners/[id]/skill-gaps returns 200 OK');
    assert(json.success === true, 'Route: /skill-gaps returns success envelope');
    assert(json.data.learnerId === learnerId, 'Route: /skill-gaps returns learnerId');
    assert(json.data.provenance.dataSource === 'CALCULATED', 'Route: /skill-gaps tags CALCULATED provenance');
  }

  // 2. Test GET /api/learners/[id]/skill-gaps?explain=true
  {
    const req = new NextRequest(`http://localhost:3000/api/learners/${learnerId}/skill-gaps?explain=true`);
    const res = await getSkillGaps(req, { params: Promise.resolve({ id: learnerId }) });
    const json = await res.json();

    assert(res.status === 200, 'Route: GET /api/learners/[id]/skill-gaps?explain=true returns 200 OK');
    assert(json.data.explanation !== undefined, 'Route: /skill-gaps?explain=true attaches explainability result');
    assert(
      json.data.explanation.provenance.dataSource === 'EXPLAINED',
      'Route: /skill-gaps?explain=true tags EXPLAINED provenance'
    );
  }

  // 3. Test GET /api/learners/[id]/recommendations/courses
  {
    const req = new NextRequest(`http://localhost:3000/api/learners/${learnerId}/recommendations/courses?limit=3`);
    const res = await getCourseRecommendations(req, { params: Promise.resolve({ id: learnerId }) });
    const json = await res.json();

    assert(res.status === 200, 'Route: GET /api/learners/[id]/recommendations/courses returns 200 OK');
    assert(json.success === true, 'Route: /recommendations/courses returns success envelope');
    assert(Array.isArray(json.data.courses), 'Route: /recommendations/courses returns courses array');
    assert(json.data.provenance.dataSource === 'CALCULATED', 'Route: /recommendations/courses tags CALCULATED provenance');
  }

  // 4. Test GET /api/learners/[id]/recommendations/jobs
  {
    const req = new NextRequest(`http://localhost:3000/api/learners/${learnerId}/recommendations/jobs?limit=5`);
    const res = await getJobMatches(req, { params: Promise.resolve({ id: learnerId }) });
    const json = await res.json();

    assert(res.status === 200, 'Route: GET /api/learners/[id]/recommendations/jobs returns 200 OK');
    assert(json.success === true, 'Route: /recommendations/jobs returns success envelope');
    assert(Array.isArray(json.data.matches), 'Route: /recommendations/jobs returns matches array');
    assert(json.data.provenance.dataSource === 'CALCULATED', 'Route: /recommendations/jobs tags CALCULATED provenance');
  }

  // 5. Test GET /api/analytics/skill-demand
  {
    const req = new NextRequest('http://localhost:3000/api/analytics/skill-demand?limit=10');
    const res = await getSkillDemand(req);
    const json = await res.json();

    assert(res.status === 200, 'Route: GET /api/analytics/skill-demand returns 200 OK');
    assert(json.success === true, 'Route: /analytics/skill-demand returns success envelope');
    assert(json.data.totalActiveJobsAnalyzed >= 1, 'Route: /analytics/skill-demand analyzes active jobs from DB');
    assert(json.data.provenance.dataSource === 'OBSERVED', 'Route: /analytics/skill-demand tags OBSERVED provenance');
  }

  console.log(`\n=== API ROUTE TEST SUMMARY: ${passed}/${total} PASSED ===`);
}

testRoutes().catch((err) => {
  console.error('API integration test failed:', err);
  process.exit(1);
});
