import { SkillDemandService } from '../lib/services/skill-demand.service';
import { CourseRecommendationService } from '../lib/services/course-recommendation.service';
import { JobMatchService } from '../lib/services/job-match.service';
import { SkillGapService } from '../lib/services/skill-gap.service';
import { ExplainabilityService } from '../lib/ai-gateway/explainer';
import { AIGateway } from '../lib/ai-gateway/gateway';
import { DataSanitizer } from '../lib/ai-gateway/sanitizer';

async function runTests() {
  console.log('=== RUNNING TESTS FOR AI GATEWAY & ANALYTICS SERVICES ===\n');

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

  // 1. DataSanitizer Test
  const rawPayload = {
    name: 'Rahul Kumar',
    email: 'rahul.kumar@test.gov.in',
    phone: '9876543210',
    aadhaar: '1234 5678 9012',
    notes: 'Candidate mobile is 9876543210 and aadhaar is 1234 5678 9012',
  };
  const sanitized = DataSanitizer.anonymizePayload(rawPayload);
  assert(
    sanitized.email === '[REDACTED_PII]',
    'Sanitizer: Redacts email fields'
  );
  assert(
    sanitized.phone === '[REDACTED_PII]',
    'Sanitizer: Redacts phone fields'
  );
  assert(
    sanitized.aadhaar === '[REDACTED_PII]',
    'Sanitizer: Redacts aadhaar fields'
  );
  assert(
    !sanitized.notes.includes('9876543210') && sanitized.notes.includes('[REDACTED_PHONE]'),
    'Sanitizer: Inlines phone redaction in free-form text'
  );
  assert(
    !sanitized.notes.includes('1234 5678 9012') && sanitized.notes.includes('[REDACTED_AADHAAR]'),
    'Sanitizer: Inlines aadhaar redaction in free-form text'
  );

  // 2. AIGateway Circuit Breaker and Fallback Test
  const gatewayResult = await AIGateway.executeWithFallback<string>(
    'test_failing_operation',
    async () => {
      throw new Error('Simulated upstream model timeout');
    },
    () => 'Deterministic Fallback Result',
    100
  );
  assert(
    gatewayResult.usedFallback === true,
    'AIGateway: Gracefully catches upstream failure and invokes fallback'
  );
  assert(
    gatewayResult.data === 'Deterministic Fallback Result',
    'AIGateway: Returns deterministic fallback payload'
  );

  // 3. Explainability Service Test
  const explanation = await ExplainabilityService.explainSkillGap({
    learnerName: 'Test Learner',
    targetRole: 'Data Entry Operator',
    matchScore: 35,
    matchTier: 'Critical Deficit',
    missingSkills: [
      { skillName: 'Computer Fundamentals', priorityScore: 90, importance: 'Critical' },
      { skillName: 'Typing Speed 30 WPM', priorityScore: 75, importance: 'High' },
    ],
    acquiredSkillsCount: 0,
  });
  assert(
    explanation.engineUsed === 'DETERMINISTIC_RULES',
    'Explainability: Uses auditable deterministic engine when external API key is unset'
  );
  assert(
    explanation.summary.includes('35%') && explanation.summary.includes('Critical Deficit'),
    'Explainability: Faithfully cites actual computed metrics in summary'
  );
  assert(
    explanation.actionableInterventions.length >= 2,
    'Explainability: Produces actionable remediation recommendations'
  );
  assert(
    explanation.provenance.dataSource === 'EXPLAINED',
    'Explainability: Correctly tags provenance as EXPLAINED'
  );

  // 4. Course Recommendation Rationale Test
  const courseRationale = ExplainabilityService.explainCourseRecommendation({
    courseTitle: 'IT-ITeS Bridge Course',
    addressedSkills: ['Computer Fundamentals', 'Typing Speed 30 WPM'],
    deficitCoveragePct: 85,
    providerName: 'NSTI Delhi',
  });
  assert(
    courseRationale.summary.includes('remediates 85%'),
    'Course Rationale: Explains deficit coverage transparently'
  );

  // 5. Skill Demand Analytics Service Test
  const demandResult = await SkillDemandService.getSkillDemandAnalytics({});
  assert(
    demandResult.provenance.dataSource === 'OBSERVED',
    'Skill Demand: Provenance is correctly tagged as OBSERVED from Neon PostgreSQL'
  );
  assert(
    demandResult.totalActiveJobsAnalyzed >= 1,
    'Skill Demand: Evaluates active jobs from Neon PostgreSQL database'
  );
  assert(
    demandResult.skills.length >= 1,
    'Skill Demand: Aggregates required skill frequencies from active job postings'
  );
  assert(
    demandResult.skills[0].demandSharePct >= 0 && demandResult.skills[0].demandSharePct <= 100,
    'Skill Demand: Demand share is bounded within [0, 100]%'
  );

  console.log(`\n=== TEST SUMMARY: ${passed}/${total} PASSED ===`);
  if (passed === total) {
    console.log('All AI Gateway, Explainability, and Demand Analytics tests passed successfully!');
  }
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
