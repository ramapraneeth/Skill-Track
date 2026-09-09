# SkillTrack Machine Learning & Intelligence Layer

This module provides explainable decision support, predictive intelligence, and deterministic competency analytics for SkillTrack.

## Architecture Principles
1. **Explainability Over Black-Boxes:** All predictions return ranked positive drivers and negative risk factors (SHAP-style attributions) to ensure public trust and policy auditability.
2. **Deterministic Competency Alignment:** Skill gap diagnosis is derived from explicit mathematical equations combining importance weights, proficiency thresholds, and real-time market demand multipliers.
3. **Prescriptive Actionability:** Risk scores directly trigger targeted, time-bound interventions (e.g. 7-day upskilling sprint or 14-day micro-credential) instead of passive statistics.

## Directory Structure
- `models/`: Model metadata, weights, and baseline serialization.
- `preprocessing/`: Candidate demographic normalization, experience binning, and competency scoring.
- `features/`: Competency vectors, wage indicators, and geographical risk factors.
- `prediction/`: Explainable placement and 90-day attrition probability engines.
- `skill_gap/`: Market-weighted deterministic competency gap engine.
- `intervention/`: Prescriptive intervention recommendation heuristics.
- `evaluation/`: Model performance benchmarks and fairness audits.
