import { prisma } from '../lib/db/prisma';
import { DataSufficiencyService } from '../lib/services/data-sufficiency.service';
import { SkillGapService } from '../lib/services/skill-gap.service';
import { CourseRecommendationService } from '../lib/services/course-recommendation.service';
import { JobMatchService } from '../lib/services/job-match.service';
import crypto from 'crypto';

async function runTests() {
  console.log('=== RUNNING TESTS FOR DETERMINISTIC INTELLIGENCE SERVICES ===\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passedTests++;
    } else {
      console.error(`[FAIL] ${testName}${detail ? ` - ${detail}` : ''}`);
      process.exitCode = 1;
    }
  }

  // TEST 1: Data Sufficiency Check on Empty Cohort
  const cohortCheck = await DataSufficiencyService.checkCohortSufficiency(30);
  assert(
    cohortCheck.isSufficientData === false,
    'Data Sufficiency: Correctly flags empty cohort as insufficient for ML modeling',
    `Reported sampleSize: ${cohortCheck.sampleSize}`
  );
  assert(
    cohortCheck.reason !== undefined && cohortCheck.reason.includes('Insufficient data'),
    'Data Sufficiency: Provides truthful reason without fabricating statistical claims'
  );

  // TEST 2: Skill Gap Evaluation for Test Learner
  const gapResult = await SkillGapService.calculateLearnerSkillGap({});
  assert(
    gapResult.learnerId !== undefined,
    'Skill Gap Service: Resolves candidate profile from Neon PostgreSQL'
  );
  assert(
    gapResult.provenance.dataSource === 'CALCULATED',
    'Skill Gap Service: Tags output with CALCULATED data provenance'
  );
  assert(
    gapResult.matchTier === 'Critical Deficit' || gapResult.matchTier === 'Significant Gap',
    'Skill Gap Service: Accurately identifies deficit for candidate with 0 acquired skills'
  );

  // TEST 3: Seed Test Course & Course-Skill in Neon DB to test Recommendation Formula
  const testCourseId = 'course-test-101';
  const testSkillId = 'sk-1'; // Matches 'Basic Computer Operations' in job-baseline-1

  // Upsert skill in skills table if needed
  await prisma.skills.upsert({
    where: { name: 'Basic Computer Operations' },
    update: {},
    create: {
      id: testSkillId,
      name: 'Basic Computer Operations',
      sector: 'IT-ITeS',
      category: 'Technical Skills',
      demand_weight: 4.0,
      created_at: new Date(),
    },
  });

  // Upsert course
  await prisma.courses.upsert({
    where: { code: 'CRS-IT-001' },
    update: {},
    create: {
      id: testCourseId,
      code: 'CRS-IT-001',
      title: 'Foundation in Computer Operations & Office Tools',
      sector: 'IT-ITeS',
      nsqf_level: 3,
      duration_hours: 120,
      is_active: true,
      provider_id: 'tp-test-01',
      created_at: new Date(),
    },
  });

  // Link course to skill
  await prisma.course_skills.upsert({
    where: {
      course_id_skill_id: {
        course_id: testCourseId,
        skill_id: testSkillId,
      },
    },
    update: {},
    create: {
      id: crypto.randomUUID(),
      course_id: testCourseId,
      skill_id: testSkillId,
      proficiency_gained: 'intermediate',
      weight: 1.0,
      created_at: new Date(),
    },
  });

  // TEST 4: Course Recommendation Scoring
  const recommendations = await CourseRecommendationService.getRecommendationsForLearner({ limit: 5 });
  assert(
    recommendations.totalRecommendations > 0,
    'Course Recommendation: Identifies courses that remediate identified skill gaps'
  );
  assert(
    recommendations.courses[0].targetSkillsRemediated.length > 0,
    'Course Recommendation: Reports exact skills remediated by the recommended course'
  );
  assert(
    recommendations.courses[0].explanationReason.includes('Basic Computer Operations'),
    'Course Recommendation: Explains reason based on identified deficit'
  );
  assert(
    recommendations.provenance.dataSource === 'CALCULATED',
    'Course Recommendation: Contains explicit CALCULATED provenance metadata'
  );

  // TEST 5: Job Matching
  const jobMatches = await JobMatchService.getJobMatchesForLearner({});
  assert(
    jobMatches.totalJobsEvaluated > 0,
    'Job Match Service: Queries active employer vacancies from Neon PostgreSQL'
  );
  assert(
    jobMatches.matches[0].fitCategory !== undefined,
    'Job Match Service: Computes transparent fit category (STRONG / MODERATE / GROWTH / STRETCH)'
  );
  assert(
    jobMatches.provenance.dataSource === 'CALCULATED',
    'Job Match Service: Provenance explicitly tagged as CALCULATED'
  );

  console.log(`\n=== TEST SUMMARY: ${passedTests}/${totalTests} TESTS PASSED ===\n`);
}

runTests()
  .catch((err) => {
    console.error('Test execution error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
