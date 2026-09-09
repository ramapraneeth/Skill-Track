import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.seed import seed_db

client = TestClient(app)

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    """Ensure database has fresh seed data before tests run."""
    seed_db()

# ---------------------------------------------------------------------------
# 1. Root & System Health
# ---------------------------------------------------------------------------
def test_root():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["platform"] == "SkillTrack"
    assert data["status"] == "online"
    assert "tagline" in data

# ---------------------------------------------------------------------------
# 2. Authentication
# ---------------------------------------------------------------------------
def test_auth_login_learner():
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "rahul.sharma@skilltrack.in", "password": "demo1234", "role": "learner"},
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "rahul.sharma@skilltrack.in"
    assert data["user"]["role"] == "learner"

def test_auth_login_invalid_password():
    response = client.post(
        "/api/v1/auth/login",
        json={"email": "rahul.sharma@skilltrack.in", "password": "wrong_password"},
    )
    assert response.status_code == 400

def test_auth_me():
    login_resp = client.post(
        "/api/v1/auth/login",
        json={"email": "director@apexskills.org", "password": "demo1234", "role": "provider"},
    )
    token = login_resp.json()["access_token"]
    
    resp = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["email"] == "director@apexskills.org"
    assert data["role"] == "provider"

# ---------------------------------------------------------------------------
# 3. Learners Management
# ---------------------------------------------------------------------------
def test_list_learners():
    response = client.get("/api/v1/learners")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 20

def test_list_learners_filters():
    response = client.get("/api/v1/learners?risk_level=High")
    assert response.status_code == 200
    data = response.json()
    assert all(l["riskLevel"] == "High" for l in data)

def test_get_learner_detail():
    response = client.get("/api/v1/learners/learner-1")
    assert response.status_code == 200
    data = response.json()
    assert data["fullName"] == "Rahul Sharma"
    assert data["currentProgrammeId"] == "prog-1"
    assert len(data["skills"]) >= 2
    assert "predictions" in data
    assert "interventions" in data

def test_get_learner_timeline():
    response = client.get("/api/v1/learners/learner-1/timeline")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert any(step["milestone"] == "enrollment" for step in data)
    assert any(step["milestone"] == "90_day" for step in data)

def test_create_and_update_learner():
    new_learner = {
        "providerId": "provider-1",
        "currentProgrammeId": "prog-1",
        "learnerCode": "ST-TEST-9999",
        "fullName": "Test Learner Prototype",
        "gender": "Female",
        "age": 22,
        "state": "Maharashtra",
        "district": "Pune",
        "educationLevel": "Graduate",
        "socioEconomicCategory": "General",
        "currentStatus": "enrolled",
    }
    create_resp = client.post("/api/v1/learners", json=new_learner)
    assert create_resp.status_code == 200
    created = create_resp.json()
    learner_id = created["id"]
    assert created["fullName"] == "Test Learner Prototype"

    patch_resp = client.patch(
        f"/api/v1/learners/{learner_id}",
        json={"currentStatus": "certified", "skillMatchPct": 85},
    )
    assert patch_resp.status_code == 200
    updated = patch_resp.json()
    assert updated["currentStatus"] == "certified"
    assert updated["skillMatchPct"] == 85

# ---------------------------------------------------------------------------
# 4. Outcomes (Formal Employment, Self-Employment, Apprenticeships)
# ---------------------------------------------------------------------------
def test_outcomes_summary():
    response = client.get("/api/v1/outcomes/summary")
    assert response.status_code == 200
    data = response.json()
    assert "totalRecorded" in data
    assert "totalFormalEmployment" in data
    assert "overallVerificationRate" in data
    assert "salaryDistribution" in data
    assert "sectorBreakdown" in data

def test_list_all_outcomes():
    response = client.get("/api/v1/outcomes")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

def test_employment_outcome_lifecycle():
    # 1. Record employment
    payload = {
        "learnerId": "learner-1",
        "jobId": "job-1",
        "employerName": "Delhivery Logistics",
        "designation": "Junior Data Operations Analyst",
        "sector": "IT-ITeS",
        "district": "Gurugram",
        "state": "Haryana",
        "monthlySalary": 22000.0,
        "startDate": "2024-07-01",
        "status": "active",
        "verified": False,
    }
    create_resp = client.post("/api/v1/outcomes/employment", json=payload)
    assert create_resp.status_code == 200
    outcome = create_resp.json()
    outcome_id = outcome["id"]
    assert outcome["monthlySalary"] == 22000.0
    assert outcome["verified"] is False

    # 2. Verify outcome
    verify_resp = client.patch(f"/api/v1/outcomes/employment/{outcome_id}/verify?verified=true")
    assert verify_resp.status_code == 200
    assert verify_resp.json()["verified"] is True

def test_self_employment_outcome():
    payload = {
        "learnerId": "learner-3",
        "enterpriseName": "Ananya Solar Enterprises",
        "sector": "Green Energy",
        "district": "Bhubaneswar",
        "state": "Odisha",
        "monthlyRevenue": 24500.0,
        "startDate": "2024-06-15",
        "microfinanceSupport": True,
    }
    resp = client.post("/api/v1/outcomes/self-employment", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["enterpriseName"] == "Ananya Solar Enterprises"
    assert data["microfinanceSupport"] is True

def test_apprenticeship_outcome():
    payload = {
        "learnerId": "learner-4",
        "establishmentName": "Tata Motors Plant",
        "sector": "Automotive",
        "stipendAmount": 14500.0,
        "startDate": "2024-06-01",
        "durationMonths": 12,
        "contractNumber": "NAPS-2024-88741",
    }
    resp = client.post("/api/v1/outcomes/apprenticeship", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["establishmentName"] == "Tata Motors Plant"
    assert data["contractNumber"] == "NAPS-2024-88741"

# ---------------------------------------------------------------------------
# 5. Skills & Skill Gap Analysis
# ---------------------------------------------------------------------------
def test_get_skills():
    response = client.get("/api/v1/skills")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 8

def test_skill_gap_analysis():
    response = client.get("/api/v1/skills/learners/learner-1/skill-gap?job_id=job-1")
    assert response.status_code == 200
    data = response.json()
    assert data["learnerId"] == "learner-1"
    assert "match_percentage" in data
    assert "matched_skills" in data
    assert "missing_skills" in data
    assert "gap_severity" in data

# ---------------------------------------------------------------------------
# 6. Jobs & Market Demand
# ---------------------------------------------------------------------------
def test_get_jobs():
    response = client.get("/api/v1/jobs")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 3

def test_get_job_demand():
    response = client.get("/api/v1/jobs/demand")
    assert response.status_code == 200
    data = response.json()
    assert "topSectors" in data
    assert len(data["topSectors"]) > 0

def test_get_job_by_id():
    response = client.get("/api/v1/jobs/job-1")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Junior Data Operations Analyst"
    assert len(data["requiredSkills"]) >= 3

# ---------------------------------------------------------------------------
# 7. Predictions (Explainable Placement & Attrition)
# ---------------------------------------------------------------------------
def test_placement_prediction():
    response = client.get("/api/v1/predictions/learner-1/placement")
    assert response.status_code == 200
    data = response.json()
    assert data["predictionType"] == "placement"
    assert 0.0 <= data["probability"] <= 1.0
    assert len(data["positiveFactors"]) > 0
    assert len(data["riskFactors"]) > 0
    assert len(data["recommendedInterventions"]) > 0

def test_attrition_prediction():
    response = client.get("/api/v1/predictions/learner-2/attrition")
    assert response.status_code == 200
    data = response.json()
    assert data["predictionType"] == "attrition"
    assert 0.0 <= data["probability"] <= 1.0
    assert "riskLevel" in data

# ---------------------------------------------------------------------------
# 8. Interventions
# ---------------------------------------------------------------------------
def test_interventions_flow():
    # 1. List
    list_resp = client.get("/api/v1/interventions")
    assert list_resp.status_code == 200
    assert isinstance(list_resp.json(), list)

    # 2. Create
    new_int = {
        "learnerId": "learner-1",
        "recommendedBy": "Test Coordinator",
        "category": "upskilling",
        "title": "SQL Query Optimization Workshop",
        "description": "Intensive 3-day lab covering window functions and query indexing.",
        "status": "assigned",
        "targetCompletionDate": "2024-08-10",
    }
    create_resp = client.post("/api/v1/interventions", json=new_int)
    assert create_resp.status_code == 200
    int_id = create_resp.json()["id"]

    # 3. Patch
    patch_resp = client.patch(
        f"/api/v1/interventions/{int_id}",
        json={"status": "completed", "outcomeNotes": "Completed with 95% lab score."},
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["status"] == "completed"

# ---------------------------------------------------------------------------
# 9. Followups & Retention Tracking
# ---------------------------------------------------------------------------
def test_followup_flow_and_learner_progression():
    # Record 90-day retention check-in for learner-2
    payload = {
        "learnerId": "learner-2",
        "milestone": "90_day",
        "followupDate": "2024-06-15",
        "employmentStatus": "retained",
        "currentSalary": 19500.0,
        "retentionStatus": "retained",
        "jobSatisfactionScore": 5,
        "skillRelevanceScore": 5,
        "notes": "Learner promoted to Senior Patient Care Coordinator.",
        "surveyorRole": "provider",
    }
    create_resp = client.post("/api/v1/followups", json=payload)
    assert create_resp.status_code == 200
    fl_data = create_resp.json()
    assert fl_data["milestone"] == "90_day"
    assert fl_data["currentSalary"] == 19500.0

    # Verify learner record updated
    learner_resp = client.get("/api/v1/learners/learner-2")
    assert learner_resp.status_code == 200
    l_data = learner_resp.json()
    assert l_data["retentionMilestoneReached"] == "90_day"
    assert l_data["currentSalary"] == 19500.0

# ---------------------------------------------------------------------------
# 10. Analytics & Macro Oversight
# ---------------------------------------------------------------------------
def test_analytics_government():
    response = client.get("/api/v1/analytics/government")
    assert response.status_code == 200
    data = response.json()
    assert "nationalKpis" in data
    assert "outcomeFunnel" in data
    assert "failureModeBreakdown" in data
    assert "geographicHeatmap" in data
    assert "highGrowthSkills" in data

def test_analytics_providers():
    response = client.get("/api/v1/analytics/providers")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 5

def test_analytics_skills():
    response = client.get("/api/v1/analytics/skills")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

# ---------------------------------------------------------------------------
# 11. Impact Measurement
# ---------------------------------------------------------------------------
def test_impact_endpoints():
    # 1. List
    list_resp = client.get("/api/v1/impact")
    assert list_resp.status_code == 200
    data = list_resp.json()
    assert isinstance(data, list)
    assert len(data) >= 3

    # 2. Get single
    first_id = data[0]["id"]
    get_resp = client.get(f"/api/v1/impact/{first_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["id"] == first_id

    # 3. Create impact
    new_impact = {
        "entityType": "programme",
        "entityTitle": "DDU-GKY Logistics Apprenticeship Pilot",
        "period": "2024 H1",
        "baselinePlacementRate": 55.0,
        "postPlacementRate": 72.0,
        "baselineRetentionRate": 60.0,
        "postRetentionRate": 76.0,
        "baselineAvgWage": 16000.0,
        "postAvgWage": 18500.0,
        "sampleSize": 250,
        "evaluationMethod": "before_after_cohort",
        "notes": "Empirical evaluation of stipend and mentorship intervention.",
    }
    post_resp = client.post("/api/v1/impact", json=new_impact)
    assert post_resp.status_code == 200
    assert post_resp.json()["entityTitle"] == "DDU-GKY Logistics Apprenticeship Pilot"

# ---------------------------------------------------------------------------
# 12. Skill Gap Engine Endpoints
# ---------------------------------------------------------------------------
def test_skill_gap_calculate_endpoint():
    payload = {
        "learner_skills": [
            {"skill_name": "React", "assessed_score": 85.0, "verified": True},
            {"skill_name": "TypeScript", "assessed_score": 80.0, "verified": True},
        ],
        "job_requirements": [
            {"skill_name": "React", "importance": "mandatory", "min_score": 70.0},
            {"skill_name": "TypeScript", "importance": "mandatory", "min_score": 70.0},
            {"skill_name": "GraphQL", "importance": "preferred", "min_score": 70.0},
        ],
        "market_demand": {
            "react": 4.8,
            "typescript": 4.6,
            "graphql": 4.2,
        },
    }
    response = client.post("/api/v1/skills/gap/calculate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "skill_match_percentage" in data
    assert "missing_skills" in data
    assert "priority" in data
    assert "recommended_training" in data
    assert len(data["missing_skills"]) == 1
    assert data["missing_skills"][0]["skillName"] == "GraphQL"
    assert data["missing_skills"][0]["priority"] == "High"

def test_learner_skill_gap_database_endpoint():
    response = client.get("/api/v1/skills/learners/learner-1/skill-gap?job_id=job-1")
    assert response.status_code == 200
    data = response.json()
    assert data["learnerId"] == "learner-1"
    assert "skill_match_percentage" in data
    assert "missing_skills" in data
    assert "matched_skills" in data
    assert "priority" in data
    assert "recommended_training" in data

