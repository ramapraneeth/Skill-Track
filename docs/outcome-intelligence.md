# SkillTrack: Outcome Intelligence Specification

## 1. Definition of Outcome Intelligence
Outcome Intelligence in SkillTrack is the analytical capability to measure, diagnose, forecast, and improve real-world economic outcomes resulting from skilling interventions.

Unlike training activity systems, Outcome Intelligence treats **verified employment, retention, and wage uplift** as the primary source of truth.

---

## 2. Core Pillars of Outcome Intelligence

### A. Longitudinal Milestone Verification (`lib/services/evidence.service.ts`)
Tracks placed candidates across standard post-training intervals:
- **30-Day Check:** Initial workplace transition, commute feasibility, initial salary receipt.
- **60-Day Check:** Job role satisfaction, workplace environment assessment.
- **90-Day Check:** Primary policy benchmark. Verified continuous retention via payslip or EPFO provident fund confirmation.
- **180-Day & 365-Day Check:** Wage progression, promotion, and career stability.

### B. Deterministic Transparent Skill Gap Engine (`lib/intelligence/scoring.ts`)
Matches candidate competency vectors against job vacancy requirements:
- Weights competencies by employer criticality: Mandatory ($3\times$), Preferred ($2\times$), Optional ($1\times$).
- Calculates weighted match percentage:
  $$\text{Match } \% = \frac{\sum w_i \cdot \text{Score}_i}{\sum w_i \cdot \text{MaxScore}_i} \times 100$$
- Classifies candidate into competency tiers:
  - $\ge 80\%$: *High Competency*
  - $65\% - 79\%$: *Moderate Competency*
  - $45\% - 64\%$: *Significant Gap*
  - $< 45\%$: *Critical Deficit*
- Produces prioritized missing skill gap lists with prescriptive bridge modules.

### C. Explainable Risk Attribution (`lib/intelligence/insights.ts`)
Instead of black-box predictions, SkillTrack outputs ranked attribution factors:
- Positive factors: High technical proficiency, formal tertiary certification, prior internship.
- Risk factors: Core competency deficits, severe relocation distance, historical batch attrition.

### D. Multi-Parameter SQL Aggregations (`lib/services/analytics.service.ts`)
Calculates macro KPIs directly from database records without fabrication:
- Total Enrolled
- Training Completed
- NSQF Certified
- Verified Placed
- 90-Day Retained
- Average Wage
- Skill Match Rate
- Filters dynamically recalculate across states, districts, schemes, and sectors.
