import uuid
from app.database.session import SessionLocal, engine, Base
from app.models.models import (
    User,
    TrainingProvider,
    Programme,
    Learner,
    Skill,
    LearnerSkill,
    Job,
    EmploymentOutcome,
    SelfEmploymentOutcome,
    ApprenticeshipOutcome,
    Followup,
    Prediction,
    Intervention,
    ImpactMeasurement,
)
from app.core.security import get_password_hash

def seed_db():
    print("Creating all database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Clear existing data
    db.query(User).delete()
    db.query(TrainingProvider).delete()
    db.query(Programme).delete()
    db.query(Learner).delete()
    db.query(Skill).delete()
    db.query(LearnerSkill).delete()
    db.query(Job).delete()
    db.query(EmploymentOutcome).delete()
    db.query(SelfEmploymentOutcome).delete()
    db.query(ApprenticeshipOutcome).delete()
    db.query(Followup).delete()
    db.query(Prediction).delete()
    db.query(Intervention).delete()
    db.query(ImpactMeasurement).delete()
    db.commit()

    print("Seeding Users...")
    hashed_pwd = get_password_hash("demo1234")

    user_learner = User(
        id="user-learner-1",
        email="rahul.sharma@skilltrack.in",
        hashed_password=hashed_pwd,
        role="learner",
        full_name="Rahul Sharma",
        phone="+91 98765 43210",
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    )
    user_provider = User(
        id="user-provider-1",
        email="director@apexskills.org",
        hashed_password=hashed_pwd,
        role="provider",
        full_name="Dr. Sunita Rao (Director)",
        phone="+91 91234 56789",
        avatar_url="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    )
    user_gov = User(
        id="user-gov-1",
        email="admin.msde@gov.in",
        hashed_password=hashed_pwd,
        role="government",
        full_name="Rajesh Verma (Joint Secretary)",
        phone="+91 98111 22334",
        avatar_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    )
    db.add_all([user_learner, user_provider, user_gov])
    db.commit()

    print("Seeding Training Providers...")
    providers = [
        TrainingProvider(
            id="provider-1",
            user_id="user-provider-1",
            name="Apex Skilling Academy",
            code="TP-DEL-042",
            state="Delhi",
            district="New Delhi",
            accreditation_tier="SMART Grade A",
            contact_email="contact@apexskills.org",
            phone="+91 11 2345 6789",
            active_learners_count=420,
            overall_placement_rate=74.2,
            overall_retention_rate=78.5,
        ),
        TrainingProvider(
            id="provider-2",
            name="TechVeda Foundation",
            code="TP-BLR-108",
            state="Karnataka",
            district="Bengaluru Urban",
            accreditation_tier="SMART Grade A+",
            contact_email="skills@techveda.org",
            phone="+91 80 4123 9876",
            active_learners_count=650,
            overall_placement_rate=82.0,
            overall_retention_rate=84.1,
        ),
        TrainingProvider(
            id="provider-3",
            name="Pragati Rural Skills Mission",
            code="TP-UP-312",
            state="Uttar Pradesh",
            district="Lucknow",
            accreditation_tier="SMART Grade B+",
            contact_email="admin@pragatisolutions.in",
            phone="+91 522 298 7654",
            active_learners_count=380,
            overall_placement_rate=63.8,
            overall_retention_rate=67.2,
        ),
        TrainingProvider(
            id="provider-4",
            name="Surya Healthcare Skilling Institute",
            code="TP-MAH-091",
            state="Maharashtra",
            district="Pune",
            accreditation_tier="SMART Grade A",
            contact_email="info@suryaskills.ac.in",
            phone="+91 20 2567 8901",
            active_learners_count=510,
            overall_placement_rate=79.4,
            overall_retention_rate=81.0,
        ),
        TrainingProvider(
            id="provider-5",
            name="Greenfield Logistics Skill Hub",
            code="TP-HAR-224",
            state="Haryana",
            district="Gurugram",
            accreditation_tier="SMART Grade A",
            contact_email="operations@greenfieldskills.com",
            phone="+91 124 456 7890",
            active_learners_count=340,
            overall_placement_rate=71.5,
            overall_retention_rate=75.3,
        ),
    ]
    db.add_all(providers)
    db.commit()

    print("Seeding Programmes...")
    programmes = [
        Programme(
            id="prog-1",
            provider_id="provider-1",
            code="PRG-IT-2024",
            title="Junior Data Operations & Python Associate",
            sector="IT-ITeS",
            scheme_name="PMKVY 4.0",
            nsqf_level=5,
            duration_weeks=16,
            total_enrolled=120,
            completed_count=112,
            certified_count=104,
            placed_count=78,
            avg_starting_wage=19500,
            status="active",
        ),
        Programme(
            id="prog-2",
            provider_id="provider-2",
            code="PRG-CLOUD-2024",
            title="Cloud Infrastructure & Linux Admin",
            sector="IT-ITeS",
            scheme_name="DDU-GKY",
            nsqf_level=6,
            duration_weeks=20,
            total_enrolled=90,
            completed_count=86,
            certified_count=84,
            placed_count=72,
            avg_starting_wage=23000,
            status="active",
        ),
        Programme(
            id="prog-3",
            provider_id="provider-3",
            code="PRG-SOLAR-2024",
            title="Solar PV Installation Technician (Suryamitra)",
            sector="Green Energy",
            scheme_name="PM-Vishwakarma",
            nsqf_level=4,
            duration_weeks=12,
            total_enrolled=150,
            completed_count=142,
            certified_count=135,
            placed_count=96,
            avg_starting_wage=16000,
            status="active",
        ),
        Programme(
            id="prog-4",
            provider_id="provider-4",
            code="PRG-HEALTH-2024",
            title="General Duty Assistant & Patient Care",
            sector="Healthcare",
            scheme_name="PMKVY 4.0",
            nsqf_level=4,
            duration_weeks=14,
            total_enrolled=160,
            completed_count=154,
            certified_count=150,
            placed_count=126,
            avg_starting_wage=17500,
            status="active",
        ),
        Programme(
            id="prog-5",
            provider_id="provider-5",
            code="PRG-LOG-2024",
            title="Warehouse Inventory & Logistics Executive",
            sector="Logistics",
            scheme_name="NULM",
            nsqf_level=4,
            duration_weeks=10,
            total_enrolled=130,
            completed_count=122,
            certified_count=118,
            placed_count=89,
            avg_starting_wage=16500,
            status="active",
        ),
    ]
    db.add_all(programmes)
    db.commit()

    print("Seeding Skills...")
    skills = [
        Skill(id="sk-1", name="Python Fundamentals", sector="IT-ITeS", category="technical", demand_weight=4.8, description="Scripting and logic"),
        Skill(id="sk-2", name="SQL & Database Queries", sector="IT-ITeS", category="technical", demand_weight=4.9, description="Relational queries, JOINs, aggregations"),
        Skill(id="sk-3", name="Power BI & Visual Dashboards", sector="IT-ITeS", category="digital_tool", demand_weight=4.7, description="DAX and KPI reports"),
        Skill(id="sk-4", name="Advanced MS Excel", sector="IT-ITeS", category="digital_tool", demand_weight=4.5, description="Pivot tables, VLOOKUP"),
        Skill(id="sk-5", name="Interview Readiness & Presentation", sector="Cross-Sector", category="soft_skill", demand_weight=4.6, description="Mock interviews and communication"),
        Skill(id="sk-6", name="Warehouse ERP Systems", sector="Logistics", category="digital_tool", demand_weight=4.4, description="SAP WM, barcode scanning"),
        Skill(id="sk-7", name="Inventory Reconciliation", sector="Logistics", category="domain_knowledge", demand_weight=4.2, description="Cycle counting and audits"),
        Skill(id="sk-8", name="Patient Triage & Vital Signs", sector="Healthcare", category="technical", demand_weight=4.8, description="BP, vitals, triage"),
        Skill(id="sk-9", name="Infection Control Protocol", sector="Healthcare", category="domain_knowledge", demand_weight=4.9, description="Sterilization and biomedical waste"),
        Skill(id="sk-10", name="Solar PV Grid Synchronization", sector="Green Energy", category="technical", demand_weight=4.6, description="Inverter earthing and grid hookup"),
        Skill(id="sk-11", name="Electrical Safety Standards", sector="Green Energy", category="domain_knowledge", demand_weight=4.8, description="Lockout-tagout and precautions"),
    ]
    db.add_all(skills)
    db.commit()

    print("Seeding Jobs...")
    jobs = [
        Job(
            id="job-1",
            title="Junior Data Operations Analyst",
            company_name="Delhivery Logistics Ltd",
            sector="IT-ITeS / Logistics",
            state="Delhi",
            district="Gurugram / New Delhi",
            min_salary=20000,
            max_salary=24000,
            experience_months=0,
            vacancies=12,
            is_active=True,
            required_skills=[
                {"skill_id": "sk-1", "skill_name": "Python Fundamentals", "importance": "mandatory", "min_proficiency": "intermediate"},
                {"skill_id": "sk-2", "skill_name": "SQL & Database Queries", "importance": "mandatory", "min_proficiency": "intermediate"},
                {"skill_id": "sk-3", "skill_name": "Power BI & Visual Dashboards", "importance": "mandatory", "min_proficiency": "intermediate"},
                {"skill_id": "sk-4", "skill_name": "Advanced MS Excel", "importance": "preferred", "min_proficiency": "intermediate"},
                {"skill_id": "sk-5", "skill_name": "Interview Readiness & Presentation", "importance": "mandatory", "min_proficiency": "intermediate"},
            ],
        ),
        Job(
            id="job-2",
            title="Warehouse Operations Associate",
            company_name="Amazon Fulfilment Center",
            sector="Logistics",
            state="Haryana",
            district="Gurugram",
            min_salary=18500,
            max_salary=21000,
            experience_months=0,
            vacancies=25,
            is_active=True,
            required_skills=[
                {"skill_id": "sk-6", "skill_name": "Warehouse ERP Systems", "importance": "mandatory", "min_proficiency": "intermediate"},
                {"skill_id": "sk-7", "skill_name": "Inventory Reconciliation", "importance": "mandatory", "min_proficiency": "intermediate"},
            ],
        ),
        Job(
            id="job-3",
            title="Patient Care Specialist",
            company_name="Apollo Hospitals Enterprise",
            sector="Healthcare",
            state="Maharashtra",
            district="Pune",
            min_salary=18000,
            max_salary=22000,
            experience_months=0,
            vacancies=18,
            is_active=True,
            required_skills=[
                {"skill_id": "sk-8", "skill_name": "Patient Triage & Vital Signs", "importance": "mandatory", "min_proficiency": "intermediate"},
                {"skill_id": "sk-9", "skill_name": "Infection Control Protocol", "importance": "mandatory", "min_proficiency": "intermediate"},
            ],
        ),
    ]
    db.add_all(jobs)
    db.commit()

    print("Seeding Primary Demo Learner (Rahul Sharma)...")
    rahul = Learner(
        id="learner-1",
        user_id="user-learner-1",
        provider_id="provider-1",
        current_programme_id="prog-1",
        learner_code="ST-2024-8841",
        full_name="Rahul Sharma",
        gender="Male",
        age=23,
        state="Delhi",
        district="North West Delhi",
        education_level="12th Standard + ITI",
        socio_economic_category="OBC",
        current_status="certified",
        profile_completion_pct=92,
        avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        current_salary=0,
        risk_level="Medium",
        skill_match_pct=62,
    )
    db.add(rahul)
    db.commit()

    # Add skills for Rahul
    rahul_skills = [
        LearnerSkill(learner_id="learner-1", skill_id="sk-1", skill_name="Python Fundamentals", category="technical", proficiency_level="intermediate", assessed_score=78.0, verified=True, acquired_from="PMKVY 4.0 Programme"),
        LearnerSkill(learner_id="learner-1", skill_id="sk-2", skill_name="SQL & Database Queries", category="technical", proficiency_level="intermediate", assessed_score=74.0, verified=True, acquired_from="PMKVY 4.0 Programme"),
        LearnerSkill(learner_id="learner-1", skill_id="sk-4", skill_name="Advanced MS Excel", category="digital_tool", proficiency_level="beginner", assessed_score=56.0, verified=False, acquired_from="Prior Learning"),
        LearnerSkill(learner_id="learner-1", skill_id="sk-5", skill_name="Interview Readiness & Presentation", category="soft_skill", proficiency_level="beginner", assessed_score=42.0, verified=True, acquired_from="Apex Academy Mock Sessions"),
    ]
    db.add_all(rahul_skills)

    # Add Prediction for Rahul
    rahul_pred = Prediction(
        id="pred-1",
        learner_id="learner-1",
        prediction_type="placement",
        probability=0.58,
        risk_level="Medium",
        positive_factors=[
            "High training attendance (88%) and practical assessment score (86/100)",
            "Verified NSQF Level 5 competency in core Python and SQL fundamentals",
            "Resides in high hiring density region (Delhi NCR)",
        ],
        risk_factors=[
            "Critical skill deficit: Missing Power BI (Required for 72% of local data analyst openings)",
            "Low interview readiness score (42/100 in initial screening)",
            "Unplaced 45 days post certification threshold",
        ],
        model_version="XGBoost-Explainable-v2.1",
        recommended_interventions=[
            "Prescribe 14-Day Power BI Accelerated Micro-Credential",
            "Schedule 2 personalized 1-on-1 mock interview drills with corporate mentor",
            "Fast-track resume match for Delhivery Logistics opening (Gurugram)",
        ],
    )
    db.add(rahul_pred)

    # Add Interventions for Rahul
    rahul_ints = [
        Intervention(
            id="int-1",
            learner_id="learner-1",
            recommended_by="Dr. Sunita Rao (Apex Academy Placement Head)",
            category="upskilling",
            title="Power BI & Visual Analytics Fast-Track Bootcamp",
            description="Hands-on project building 3 live dashboards with DAX queries to bridge market requirement.",
            status="in_progress",
            target_completion_date="2024-07-20",
            outcome_notes="Learner completed Module 1 & 2. Demonstrating rapid improvement.",
        ),
        Intervention(
            id="int-2",
            learner_id="learner-1",
            recommended_by="AI Prediction Recommendation Engine",
            category="mock_interview",
            title="Corporate Behavioral & Technical Mock Interview Drill",
            description="Simulation with industry practitioner focusing on case-study presentation and salary negotiation.",
            status="assigned",
            target_completion_date="2024-07-25",
        ),
    ]
    db.add_all(rahul_ints)
    db.commit()

    print("Seeding Learner 2 (Priya Patel - Placed & Retained)...")
    priya = Learner(
        id="learner-2",
        provider_id="provider-4",
        current_programme_id="prog-4",
        learner_code="ST-2024-4119",
        full_name="Priya Patel",
        gender="Female",
        age=22,
        state="Maharashtra",
        district="Pune",
        education_level="12th Standard",
        socio_economic_category="General",
        current_status="placed",
        profile_completion_pct=100,
        avatar_url="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
        current_salary=18500,
        retention_milestone_reached="60_day",
        risk_level="Low",
        skill_match_pct=94,
    )
    db.add(priya)
    db.commit()

    priya_outcome = EmploymentOutcome(
        learner_id="learner-2",
        job_id="job-3",
        employer_name="Apollo Hospitals Pune",
        designation="Patient Care Specialist",
        sector="Healthcare",
        district="Pune",
        state="Maharashtra",
        monthly_salary=18500,
        start_date="2024-03-15",
        status="active",
        verified=True,
    )
    db.add(priya_outcome)

    priya_followups = [
        Followup(
            learner_id="learner-2",
            milestone="30_day",
            followup_date="2024-04-15",
            employment_status="retained",
            current_salary=18500,
            retention_status="retained",
            job_satisfaction_score=5,
            skill_relevance_score=5,
            notes="Learner adapted smoothly to pediatric ward. Commute is 20 minutes from residence.",
            surveyor_role="provider",
        ),
        Followup(
            learner_id="learner-2",
            milestone="60_day",
            followup_date="2024-05-15",
            employment_status="retained",
            current_salary=18500,
            retention_status="retained",
            job_satisfaction_score=4,
            skill_relevance_score=5,
            notes="Employer expressed satisfaction with infection control adherence.",
            surveyor_role="call_center",
        ),
    ]
    db.add_all(priya_followups)
    db.commit()

    # Seed 28 additional realistic learners for rich database queries
    additional_learners = [
        ("learner-3", "Ananya Das", "Female", 25, "Odisha", "Bhubaneswar", "prog-3", "provider-3", "self_employed", 21000, "Low", 90),
        ("learner-4", "Mohammad Arshad", "Male", 21, "Uttar Pradesh", "Lucknow", "prog-5", "provider-5", "apprenticeship", 13500, "Low", 85),
        ("learner-5", "Sunita Devi", "Female", 26, "Bihar", "Patna", "prog-1", "provider-1", "placed", 14000, "High", 70),
        ("learner-6", "Amit Verma", "Male", 24, "Delhi", "South Delhi", "prog-1", "provider-1", "placed", 21000, "Low", 88),
        ("learner-7", "Kavita Singh", "Female", 22, "Uttar Pradesh", "Varanasi", "prog-3", "provider-3", "self_employed", 18000, "Low", 92),
        ("learner-8", "Rohan Deshmukh", "Male", 23, "Maharashtra", "Nagpur", "prog-4", "provider-4", "placed", 19000, "Low", 84),
        ("learner-9", "Fatima Sheikh", "Female", 21, "Karnataka", "Bengaluru Urban", "prog-2", "provider-2", "placed", 26000, "Low", 96),
        ("learner-10", "Vikram Chouhan", "Male", 25, "Rajasthan", "Jaipur", "prog-5", "provider-5", "placed", 17500, "Medium", 72),
        ("learner-11", "Meera Nair", "Female", 24, "Kerala", "Ernakulam", "prog-4", "provider-4", "placed", 22000, "Low", 90),
        ("learner-12", "Deepak Yadav", "Male", 22, "Haryana", "Faridabad", "prog-5", "provider-5", "seeking_job", 0, "High", 54),
        ("learner-13", "Pooja Biswas", "Female", 23, "West Bengal", "Kolkata", "prog-1", "provider-1", "certified", 0, "Medium", 65),
        ("learner-14", "Karthik Raja", "Male", 24, "Tamil Nadu", "Chennai", "prog-2", "provider-2", "placed", 25000, "Low", 92),
        ("learner-15", "Sneha Kulkarni", "Female", 22, "Maharashtra", "Pune", "prog-1", "provider-1", "placed", 20000, "Low", 86),
        ("learner-16", "Harpreet Singh", "Male", 23, "Punjab", "Ludhiana", "prog-5", "provider-5", "apprenticeship", 14000, "Low", 80),
        ("learner-17", "Ankita Ghosh", "Female", 25, "West Bengal", "Howrah", "prog-4", "provider-4", "placed", 18000, "Low", 88),
        ("learner-18", "Suresh Kumar", "Male", 26, "Bihar", "Muzaffarpur", "prog-3", "provider-3", "seeking_job", 0, "High", 48),
        ("learner-19", "Divya Reddy", "Female", 23, "Telangana", "Hyderabad", "prog-2", "provider-2", "placed", 27000, "Low", 95),
        ("learner-20", "Manish Tiwari", "Male", 22, "Madhya Pradesh", "Bhopal", "prog-1", "provider-1", "seeking_job", 0, "Medium", 60),
        ("learner-21", "Ritu Kumari", "Female", 24, "Jharkhand", "Ranchi", "prog-4", "provider-4", "placed", 17000, "Low", 82),
        ("learner-22", "Gaurav Joshi", "Male", 23, "Uttarakhand", "Dehradun", "prog-2", "provider-2", "placed", 22500, "Low", 89),
        ("learner-23", "Swati Sen", "Female", 22, "Assam", "Guwahati", "prog-5", "provider-5", "placed", 16500, "Medium", 74),
        ("learner-24", "Nikhil Rane", "Male", 25, "Goa", "North Goa", "prog-1", "provider-1", "placed", 21500, "Low", 85),
        ("learner-25", "Ayesha Siddiqui", "Female", 23, "Uttar Pradesh", "Kanpur", "prog-4", "provider-4", "seeking_job", 0, "High", 52),
        ("learner-26", "Rajendra Prasad", "Male", 24, "Andhra Pradesh", "Visakhapatnam", "prog-3", "provider-3", "self_employed", 19500, "Low", 91),
        ("learner-27", "Bhavna Bhatt", "Female", 22, "Gujarat", "Vadodara", "prog-5", "provider-5", "placed", 18000, "Low", 83),
        ("learner-28", "Sanjay Murmu", "Male", 26, "Odisha", "Mayurbhanj", "prog-3", "provider-3", "placed", 16500, "Low", 79),
        ("learner-29", "Tanvi Shah", "Female", 23, "Maharashtra", "Mumbai", "prog-1", "provider-1", "placed", 24000, "Low", 94),
        ("learner-30", "Alok Gupta", "Male", 22, "Delhi", "East Delhi", "prog-2", "provider-2", "seeking_job", 0, "Medium", 64),
    ]

    for lid, name, gender, age, state, dist, prog, prov, status, salary, risk, match in additional_learners:
        l = Learner(
            id=lid,
            provider_id=prov,
            current_programme_id=prog,
            learner_code=f"ST-2024-{lid.split('-')[1]}",
            full_name=name,
            gender=gender,
            age=age,
            state=state,
            district=dist,
            education_level="12th Standard / Graduate",
            socio_economic_category="General" if age % 2 == 0 else "OBC",
            current_status=status,
            profile_completion_pct=88,
            avatar_url=f"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
            current_salary=salary,
            retention_milestone_reached="90_day" if status == "placed" else None,
            risk_level=risk,
            skill_match_pct=match,
        )
        db.add(l)

    print("Seeding Impact Measurements...")
    impacts = [
        ImpactMeasurement(
            id="imp-1",
            entity_type="programme",
            entity_title="PMKVY 4.0 - Data & IT Associate (Cohort Before/After Intervention)",
            period="FY 2023-24 vs FY 2024-25",
            baseline_placement_rate=52.4,
            post_placement_rate=68.9,
            baseline_retention_rate=61.2,
            post_retention_rate=77.8,
            baseline_avg_wage=15200,
            post_avg_wage=19500,
            sample_size=480,
            evaluation_method="before_after_cohort",
            notes="Incorporation of explainable skill gap diagnostic and Power BI micro-credentials produced a +16.5% placement lift.",
        ),
        ImpactMeasurement(
            id="imp-2",
            entity_type="provider",
            entity_title="Apex Skilling Academy (Intervention Engine Pilot)",
            period="Q1 2024 vs Q2 2024",
            baseline_placement_rate=58.0,
            post_placement_rate=74.2,
            baseline_retention_rate=64.5,
            post_retention_rate=78.5,
            baseline_avg_wage=16100,
            post_avg_wage=19200,
            sample_size=320,
            evaluation_method="before_after_cohort",
            notes="Provider implemented mandatory mock interviews for learners flagged with Low Interview Readiness.",
        ),
        ImpactMeasurement(
            id="imp-3",
            entity_type="district",
            entity_title="District Outcome Uplift - Lucknow, Uttar Pradesh",
            period="2023 H2 vs 2024 H1",
            baseline_placement_rate=46.0,
            post_placement_rate=63.8,
            baseline_retention_rate=54.0,
            post_retention_rate=67.2,
            baseline_avg_wage=13800,
            post_avg_wage=16800,
            sample_size=650,
            evaluation_method="before_after_cohort",
            notes="Longitudinal follow-ups at 30/60/90 days triggered early retention interventions with local logistics employers.",
        ),
    ]
    db.add_all(impacts)
    db.commit()

    db.close()
    print("Database seeding completed successfully!")

if __name__ == "__main__":
    seed_db()
