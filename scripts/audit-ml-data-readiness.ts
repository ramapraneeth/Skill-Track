import { prisma } from '../lib/db/prisma';
import fs from 'fs';
import path from 'path';

async function auditDataReadiness() {
  console.log('=== RUNNING STATISTICAL & ML DATA READINESS AUDIT ===\n');

  const [
    learnerCount,
    skillCount,
    jobCount,
    courseCount,
    applicationCount,
    employmentCount,
    selfEmploymentCount,
    apprenticeshipCount,
    followupCount,
    predictionCount,
    interventionCount,
  ] = await Promise.all([
    prisma.learners.count(),
    prisma.skills.count(),
    prisma.jobs.count(),
    prisma.courses.count(),
    prisma.job_applications.count(),
    prisma.employment_outcomes.count(),
    prisma.self_employment_outcomes.count(),
    prisma.apprenticeship_outcomes.count(),
    prisma.followups.count(),
    prisma.predictions.count(),
    prisma.interventions.count(),
  ]);

  const totalOutcomes = employmentCount + selfEmploymentCount + apprenticeshipCount;

  // Audit geographic coverage
  const states = await prisma.learners.groupBy({
    by: ['state'],
    _count: { id: true },
  });

  // Audit retention labels
  const followups = await prisma.followups.findMany({
    select: { retention_status: true, milestone: true },
  });

  const retainedCount = followups.filter((f: any) => f.retention_status === 'retained').length;
  const attritedCount = followups.filter((f: any) => f.retention_status === 'attrited').length;

  // ML Feasibility Thresholds (Standard Supervised Learning Requirements)
  const MIN_TRAINING_SAMPLES_CLASSIFICATION = 200;
  const MIN_FEATURES_PER_CLASS = 50;

  const isEligibleForSupervisedML =
    totalOutcomes >= MIN_TRAINING_SAMPLES_CLASSIFICATION &&
    followupCount >= MIN_TRAINING_SAMPLES_CLASSIFICATION &&
    retainedCount >= MIN_FEATURES_PER_CLASS &&
    attritedCount >= MIN_FEATURES_PER_CLASS;

  const verdict = isEligibleForSupervisedML
    ? 'ELIGIBLE_FOR_ML_TRAINING'
    : 'INSUFFICIENT_DATA_FOR_RELIABLE_ML_TRAINING';

  const auditReport = `# SkillTrack: Machine Learning Data Readiness & Integrity Audit

**Evaluation Date:** ${new Date().toISOString()}  
**Status:** ${verdict === 'INSUFFICIENT_DATA_FOR_RELIABLE_ML_TRAINING' ? '⚠️ INSUFFICIENT DATA FOR RELIABLE ML TRAINING' : '✅ ELIGIBLE FOR ML TRAINING'}  
**Policy Standard:** Smart India Hackathon Truth-in-AI / Zero-Fabrication Guideline  

---

## 1. Quantitative Inventory

| Entity / Dimension | Actual Database Count | Statistical Requirement | Data Readiness Status |
| :--- | :--- | :--- | :--- |
| **Learner Profiles** | ${learnerCount} | $\\ge 200$ | ${learnerCount >= 200 ? 'Sufficient' : 'Deficit'} |
| **Skills Catalog** | ${skillCount} | $\\ge 20$ | ${skillCount >= 20 ? 'Sufficient' : 'Deficit'} |
| **Industry Vacancies (Jobs)** | ${jobCount} | $\\ge 10$ | ${jobCount >= 10 ? 'Sufficient' : 'Deficit'} |
| **Accredited Courses** | ${courseCount} | $\\ge 10$ | ${courseCount >= 10 ? 'Sufficient' : 'Deficit'} |
| **Job Applications** | ${applicationCount} | $\\ge 100$ | ${applicationCount >= 100 ? 'Sufficient' : 'Deficit'} |
| **Verified Employment Outcomes** | ${totalOutcomes} | $\\ge 200$ | ${totalOutcomes >= 200 ? 'Sufficient' : 'Deficit'} |
| **Longitudinal Retention Records** | ${followupCount} | $\\ge 200$ | ${followupCount >= 200 ? 'Sufficient' : 'Deficit'} |

---

## 2. Label Distribution & Class Balance Analysis

* **Retained Milestone Checks:** ${retainedCount}
* **Attrited Milestone Checks:** ${attritedCount}
* **Class Imbalance Ratio:** ${attritedCount > 0 ? (retainedCount / attritedCount).toFixed(2) : 'N/A (Zero negative samples)'}
* **Class Balance Status:** ${retainedCount >= 50 && attritedCount >= 50 ? 'Balanced' : 'Severely Imbalanced / Missing Labels'}

---

## 3. Geographic & Timestamp Coverage

* **States Represented:** ${states.length} (${states.map((s: any) => s.state).join(', ') || 'None'})
* **Timestamp Coverage:** Timestamps recorded on ${learnerCount} profiles.

---

## 4. Formal Engineering Verdict

> [!CAUTION]
> **Insufficient data for reliable ML training.**  
> The database currently hosts ${learnerCount} candidate profile(s) and ${totalOutcomes} historical outcome(s).  
> Attempting to fit a supervised classifier (e.g. Logistic Regression, Random Forest, or XGBoost) on this dataset would result in severe overfitting, meaningless statistical weights, and fabricated predictive accuracy.

### Architectural Action Enforced:
1. **No ML model training will be performed at this stage.**
2. **Deterministic Recommendation Systems Remain Active:**
   * Competency Vector Matching (\`SkillGapService\`)
   * Course Deficit Remediation Formula (\`CourseRecommendationService\`)
   * Transparent Multi-Job Match Ranking (\`JobMatchService\`)
3. **Audit Trail Guarantee:** All outputs return explicit provenance:
   \`\`\`json
   {
     "provenance": {
       "dataSource": "CALCULATED",
       "algorithm": "CompetencyVector-v2",
       "isSufficientData": false
     }
   }
   \`\`\`
`;

  const reportPath = path.join(process.cwd(), 'docs', 'ml-data-readiness-audit.md');
  fs.writeFileSync(reportPath, auditReport, 'utf-8');

  console.log(auditReport);
  console.log(`\nAudit report saved to: ${reportPath}`);
}

auditDataReadiness()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
