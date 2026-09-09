import pytest
from app.services.skill_gap_engine import SkillGapEngine, skill_gap_engine

# ===========================================================================
# 1. Realistic Scenario: Full-Stack Web Developer Application
# ===========================================================================
def test_full_stack_developer_scenario():
    """
    Scenario: Candidate has React, TypeScript, and Node.js, but lacks Docker containerization.
    Docker is preferred with high market demand (4.6/5.0).
    """
    learner_skills = [
        {"skill_id": "sk-react", "skill_name": "React", "assessed_score": 85.0, "verified": True},
        {"skill_id": "sk-ts", "skill_name": "TypeScript", "assessed_score": 80.0, "verified": True},
        {"skill_id": "sk-node", "skill_name": "Node.js", "assessed_score": 75.0, "verified": True},
        {"skill_id": "sk-git", "skill_name": "Git", "assessed_score": 90.0, "verified": True},
    ]

    job_requirements = [
        {"skill_id": "sk-react", "skill_name": "React", "importance": "mandatory", "min_score": 70.0},
        {"skill_id": "sk-ts", "skill_name": "TypeScript", "importance": "mandatory", "min_score": 70.0},
        {"skill_id": "sk-node", "skill_name": "Node.js", "importance": "preferred", "min_score": 70.0},
        {"skill_id": "sk-docker", "skill_name": "Docker", "importance": "preferred", "min_score": 70.0},
    ]

    market_demand = {
        "sk-react": 4.8,
        "sk-ts": 4.6,
        "sk-node": 4.0,
        "sk-docker": 4.5,
    }

    result = skill_gap_engine.calculate_gap(learner_skills, job_requirements, market_demand)

    # 1. Match percentage should be high (~75% - 85%) because all mandatory skills are satisfied
    assert 75 <= result["skill_match_percentage"] <= 85
    assert result["match_percentage"] == result["skill_match_percentage"]

    # 2. Satisfied competencies
    matched_ids = [s["skillId"] for s in result["matched_skills"]]
    assert "sk-react" in matched_ids
    assert "sk-ts" in matched_ids
    assert "sk-node" in matched_ids

    # 3. Missing skills must contain Docker
    assert len(result["missing_skills"]) == 1
    docker_missing = result["missing_skills"][0]
    assert docker_missing["skillId"] == "sk-docker"
    assert docker_missing["importance"] == "preferred"
    assert docker_missing["learnerScore"] == 0.0
    assert docker_missing["deficitScore"] == 70.0

    # 4. Priority should be High (preferred + market_demand >= 4.0)
    assert docker_missing["priority"] == "High"

    # 5. Prescriptive training recommendation
    assert "recommendedTraining" in docker_missing
    training = docker_missing["recommendedTraining"]
    assert "Docker" in training["title"]
    assert training["duration_days"] == 14
    assert len(result["recommended_training"]) == 1
    assert result["total_training_days"] == 14


# ===========================================================================
# 2. Realistic Scenario: Healthcare Operations (Critical Mandatory Deficit)
# ===========================================================================
def test_healthcare_critical_mandatory_deficit():
    """
    Scenario: Candidate for Hospital GDA has clinical care and vital signs skills,
    but lacks mandatory Hospital Information System (EHR) entry, which has critical market demand (4.9).
    """
    learner_skills = [
        {"skill_name": "Patient Vital Signs Monitoring", "assessed_score": 80.0, "verified": True},
        {"skill_name": "Basic First Aid", "assessed_score": 85.0, "verified": True},
        {"skill_name": "Workplace Communication", "assessed_score": 75.0, "verified": True},
    ]

    job_requirements = [
        {"skill_name": "Patient Vital Signs Monitoring", "importance": "mandatory", "min_score": 75.0},
        {"skill_name": "Basic First Aid", "importance": "mandatory", "min_score": 75.0},
        {"skill_name": "Hospital Information System (EHR)", "importance": "mandatory", "min_score": 70.0},
        {"skill_name": "Medical Emergency Protocols", "importance": "preferred", "min_score": 70.0},
    ]

    market_demand = {
        "hospital information system (ehr)": 4.9,
        "medical emergency protocols": 3.8,
        "patient vital signs monitoring": 4.2,
        "basic first aid": 3.5,
    }

    result = skill_gap_engine.calculate_gap(learner_skills, job_requirements, market_demand)

    # Missing mandatory skill should trigger gating penalty
    assert result["calculation_metadata"]["missing_mandatory_count"] == 1
    assert result["calculation_metadata"]["mandatory_requirements"] == 3

    # EHR should be categorized as Critical priority (mandatory + demand >= 4.0)
    ehr_missing = next(
        s for s in result["missing_skills"] if "hospital information system" in s["skillName"].lower()
    )
    assert ehr_missing["priority"] == "Critical"
    assert ehr_missing["importance"] == "mandatory"
    assert result["priority"] == "Critical"
    assert result["gap_severity"] == "high"


# ===========================================================================
# 3. Realistic Scenario: CNC Precision Machinist (Proficiency Deficit)
# ===========================================================================
def test_machinist_partial_proficiency_deficit():
    """
    Scenario: Candidate operates CNC Milling machine, but assessed at 50/100 (needs 75).
    Candidate has Blueprint Reading at 85/100 (needs 70).
    Verifies that partial proficiency credit is awarded, and a targeted 7-day sprint is prescribed.
    """
    learner_skills = [
        {"skill_id": "sk-cnc", "skill_name": "CNC Milling", "assessed_score": 50.0, "verified": True},
        {"skill_id": "sk-blueprint", "skill_name": "Blueprint Reading", "assessed_score": 85.0, "verified": True},
    ]

    job_requirements = [
        {"skill_id": "sk-cnc", "skill_name": "CNC Milling", "importance": "mandatory", "min_score": 75.0},
        {"skill_id": "sk-blueprint", "skill_name": "Blueprint Reading", "importance": "mandatory", "min_score": 70.0},
    ]

    market_demand = {"sk-cnc": 4.5, "sk-blueprint": 4.0}

    result = skill_gap_engine.calculate_gap(learner_skills, job_requirements, market_demand)

    # Partial credit awarded for CNC milling (50/75 = 0.67 coverage)
    cnc_matched = next(s for s in result["matched_skills"] if s["skillId"] == "sk-cnc")
    assert cnc_matched["coverage"] == 0.67

    # Because 50 < 75, CNC Milling is also flagged in missing_skills as a proficiency deficit
    cnc_deficit = next(s for s in result["missing_skills"] if s["skillId"] == "sk-cnc")
    assert cnc_deficit["isProficiencyDeficit"] is True
    assert cnc_deficit["deficitScore"] == 25.0
    assert cnc_deficit["learnerScore"] == 50.0

    # Deficit < 50 triggers a targeted 7-day upskilling sprint
    assert cnc_deficit["recommendedTraining"]["duration_days"] == 7
    assert "7-Day" in cnc_deficit["recommendedTraining"]["title"]


# ===========================================================================
# 4. Realistic Scenario: Complete Competency Match
# ===========================================================================
def test_perfect_competency_match():
    """
    Scenario: Senior Solar Technician candidate meets or exceeds all job criteria.
    """
    learner_skills = [
        {"skill_name": "Solar PV Installation", "assessed_score": 90.0, "verified": True},
        {"skill_name": "Electrical Wiring", "assessed_score": 85.0, "verified": True},
        {"skill_name": "Safety Compliance", "assessed_score": 95.0, "verified": True},
    ]

    job_requirements = [
        {"skill_name": "Solar PV Installation", "importance": "mandatory", "min_score": 75.0},
        {"skill_name": "Electrical Wiring", "importance": "mandatory", "min_score": 75.0},
        {"skill_name": "Safety Compliance", "importance": "preferred", "min_score": 70.0},
    ]

    result = skill_gap_engine.calculate_gap(learner_skills, job_requirements)

    assert result["skill_match_percentage"] == 100
    assert len(result["missing_skills"]) == 0
    assert len(result["matched_skills"]) == 3
    assert result["gap_severity"] == "low"
    assert result["priority"] == "Low"
    assert result["total_training_days"] == 0


# ===========================================================================
# 5. Realistic Scenario: Cross-Industry Severe Mismatch
# ===========================================================================
def test_cross_industry_severe_deficit():
    """
    Scenario: Candidate with culinary experience applying for Cloud DevOps Engineer.
    """
    learner_skills = [
        {"skill_name": "Food Safety", "assessed_score": 85.0},
        {"skill_name": "Inventory Management", "assessed_score": 75.0},
    ]

    job_requirements = [
        {"skill_name": "Kubernetes", "importance": "mandatory", "min_score": 75.0},
        {"skill_name": "Terraform", "importance": "mandatory", "min_score": 70.0},
        {"skill_name": "CI/CD Pipelines", "importance": "mandatory", "min_score": 70.0},
    ]

    result = skill_gap_engine.calculate_gap(learner_skills, job_requirements)

    assert result["skill_match_percentage"] == 0
    assert len(result["missing_skills"]) == 3
    assert result["gap_severity"] == "high"
    assert result["priority"] == "Critical"
    assert result["total_training_days"] == 3 * 14  # 42 days total foundational training


# ===========================================================================
# 6. Edge Cases & Normalization Tests
# ===========================================================================
def test_edge_cases_and_resilience():
    # Empty job requirements should return 100% match
    res_empty_job = skill_gap_engine.calculate_gap([{"skill_name": "Python"}], [])
    assert res_empty_job["skill_match_percentage"] == 100
    assert len(res_empty_job["missing_skills"]) == 0

    # Empty learner skills should return 0% match
    res_empty_learner = skill_gap_engine.calculate_gap([], [{"skill_name": "Python", "importance": "mandatory"}])
    assert res_empty_learner["skill_match_percentage"] == 0
    assert len(res_empty_learner["missing_skills"]) == 1

    # Skill matching handles capitalization, dashes, and underscores
    learner_dash = [{"skill_name": "react_native", "assessed_score": 80.0}]
    job_dash = [{"skill_name": "React-Native", "importance": "mandatory", "min_score": 70.0}]
    res_dash = skill_gap_engine.calculate_gap(learner_dash, job_dash)
    assert res_dash["skill_match_percentage"] == 100
    assert len(res_dash["matched_skills"]) == 1

    # Unverified skill receives 0.90 verification factor
    unverified_learner = [{"skill_name": "Python", "assessed_score": 70.0, "verified": False}]
    job_req = [{"skill_name": "Python", "importance": "mandatory", "min_score": 70.0}]
    res_unverified = skill_gap_engine.calculate_gap(unverified_learner, job_req)
    assert res_unverified["matched_skills"][0]["coverage"] == 0.90
    assert res_unverified["skill_match_percentage"] == 90


# ===========================================================================
# 7. Priority Sorting Order Verification
# ===========================================================================
def test_missing_skills_priority_sorting():
    """
    Verifies that missing skills are strictly sorted in descending priority order:
    Critical -> High -> Medium -> Low.
    """
    job_reqs = [
        {"skill_name": "Optional Skill", "importance": "optional", "min_score": 70.0},
        {"skill_name": "Critical Skill", "importance": "mandatory", "min_score": 70.0},
        {"skill_name": "Medium Skill", "importance": "preferred", "min_score": 70.0},
    ]
    market_demand = {
        "critical skill": 4.8,
        "medium skill": 3.2,
        "optional skill": 2.0,
    }

    result = skill_gap_engine.calculate_gap([], job_reqs, market_demand)

    priorities = [s["priority"] for s in result["missing_skills"]]
    assert priorities == ["Critical", "Medium", "Low"]
