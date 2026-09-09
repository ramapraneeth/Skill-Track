from typing import Dict, List, Any, Optional, Union

class SkillGapEngine:
    """
    SkillGapEngine: Transparent, Deterministic Competency & Market-Aligned Gap Diagnostic Engine.

    Mathematical Formulation:
    -------------------------
    1. Requirement Importance Weight (I_i):
       - mandatory / critical: 3.0
       - preferred: 2.0
       - optional: 1.0

    2. Market Demand Multiplier (M_i):
       - Demand Weight D_i in [1.0, 5.0] (baseline default: 3.0)
       - M_i = 1.0 + (D_i - 3.0) / 10.0  -> Range: [0.80, 1.20]

    3. Effective Requirement Weight (W_i):
       - W_i = I_i * M_i

    4. Candidate Competency Coverage (C_i):
       - If learner possesses skill:
           score = assessed_score (0.0 to 100.0)
           verified_factor = 1.0 if verified else 0.90
           C_i = min(1.0, score / max(1.0, required_min_score)) * verified_factor
       - If learner lacks skill:
           C_i = 0.0

    5. Base Weighted Match Percentage:
       - RawMatch = sum(W_i * C_i) / sum(W_i) * 100

    6. Mandatory Deficit Gating:
       - If mandatory skills are completely missing (coverage == 0):
           penalty = 1.0 - 0.20 * (missing_mandatory_count / total_mandatory_count)
           FinalMatch = max(0, min(100, round(RawMatch * penalty)))

    7. Deficit Priority Classification:
       - Critical: Mandatory skill with (market_demand >= 4.0 or deficit >= 50.0)
       - High: Mandatory skill OR (Preferred skill with market_demand >= 4.0)
       - Medium: Preferred skill OR (Optional skill with market_demand >= 4.0)
       - Low: Optional skill with average or low market demand

    8. Prescriptive Training Recommendations:
       - Deterministic micro-credential / bridging course assignments based on deficit magnitude,
         category, and market priority.
    """

    DEFAULT_MARKET_DEMAND_WEIGHT = 3.0

    PROFICIENCY_SCORE_MAP: Dict[str, float] = {
        "beginner": 50.0,
        "basic": 50.0,
        "intermediate": 70.0,
        "medium": 70.0,
        "advanced": 85.0,
        "expert": 95.0,
    }

    IMPORTANCE_WEIGHTS: Dict[str, float] = {
        "mandatory": 3.0,
        "critical": 3.0,
        "preferred": 2.0,
        "optional": 1.0,
    }

    @classmethod
    def _parse_score(cls, val: Any, default: float = 70.0) -> float:
        """Robustly parses score from float, int, or textual proficiency level string."""
        if val is None:
            return default
        if isinstance(val, (int, float)):
            return float(val)
        if isinstance(val, str):
            val_clean = val.strip().lower()
            if val_clean in cls.PROFICIENCY_SCORE_MAP:
                return cls.PROFICIENCY_SCORE_MAP[val_clean]
            try:
                return float(val_clean)
            except ValueError:
                return default
        return default

    @staticmethod
    def _normalize_key(key: str) -> str:
        """Normalizes a skill name or identifier for robust cross-matching."""
        return key.strip().lower().replace("-", " ").replace("_", " ")

    @classmethod
    def _extract_market_demand_map(
        cls, market_demand: Optional[Union[Dict[str, Any], List[Dict[str, Any]]]]
    ) -> Dict[str, float]:
        """
        Converts flexible market demand inputs into a normalized lookup map of {identifier: demand_weight}.
        """
        demand_map: Dict[str, float] = {}
        if not market_demand:
            return demand_map

        if isinstance(market_demand, dict):
            for k, v in market_demand.items():
                norm_k = cls._normalize_key(str(k))
                if isinstance(v, (int, float)):
                    demand_map[norm_k] = float(v)
                elif isinstance(v, dict) and "demand_weight" in v:
                    demand_map[norm_k] = float(v["demand_weight"])
                elif isinstance(v, dict) and "demandWeight" in v:
                    demand_map[norm_k] = float(v["demandWeight"])
        elif isinstance(market_demand, list):
            for item in market_demand:
                if not isinstance(item, dict):
                    continue
                weight = float(
                    item.get("demand_weight")
                    or item.get("demandWeight")
                    or item.get("weight")
                    or cls.DEFAULT_MARKET_DEMAND_WEIGHT
                )
                if "skill_id" in item:
                    demand_map[cls._normalize_key(str(item["skill_id"]))] = weight
                if "skillId" in item:
                    demand_map[cls._normalize_key(str(item["skillId"]))] = weight
                if "skill_name" in item:
                    demand_map[cls._normalize_key(str(item["skill_name"]))] = weight
                if "name" in item:
                    demand_map[cls._normalize_key(str(item["name"]))] = weight

        return demand_map

    @classmethod
    def _get_demand_weight(
        cls, skill_id: str, skill_name: str, demand_map: Dict[str, float]
    ) -> float:
        """Looks up demand weight by skill ID or normalized skill name."""
        norm_id = cls._normalize_key(skill_id)
        norm_name = cls._normalize_key(skill_name)
        if norm_id in demand_map:
            return demand_map[norm_id]
        if norm_name in demand_map:
            return demand_map[norm_name]
        return cls.DEFAULT_MARKET_DEMAND_WEIGHT

    @classmethod
    def _determine_priority(
        cls, importance: str, market_demand: float, deficit_score: float
    ) -> str:
        """Deterministically evaluates priority level based on importance, demand, and deficit."""
        imp = importance.lower()
        is_mandatory = imp in ("mandatory", "critical")
        is_preferred = imp == "preferred"

        if is_mandatory:
            if market_demand >= 4.0 or deficit_score >= 50.0:
                return "Critical"
            return "High"
        elif is_preferred:
            if market_demand >= 4.0:
                return "High"
            return "Medium"
        else:  # optional
            if market_demand >= 4.0:
                return "Medium"
            return "Low"

    @classmethod
    def _generate_training_recommendation(
        cls, skill_name: str, category: str, priority: str, deficit_score: float, required_score: float
    ) -> Dict[str, Any]:
        """Generates a structured, deterministic training recommendation."""
        cat = category.lower()
        if deficit_score >= 50.0:
            duration_days = 14
            if priority in ("Critical", "High"):
                if "soft" in cat or "comm" in cat:
                    title = f"10-Day Workplace Simulation: Professional {skill_name} & Practical Assessment"
                    mode = "Interactive Cohort Workshop"
                else:
                    title = f"14-Day Accelerated Micro-Credential: Core {skill_name} Mastery & Applied Lab"
                    mode = "Hands-on Project & Lab"
            else:
                title = f"10-Day Bridging Course: {skill_name} Fundamentals & Practice"
                mode = "Guided Self-Paced"
        else:
            duration_days = 7
            title = f"7-Day Targeted Upskilling: Advanced {skill_name} Problem-Solving & Case Studies"
            mode = "Intensive Sprint & Mentorship"

        description = (
            f"Prescribe {duration_days}-day intervention in {skill_name} to bridge "
            f"{deficit_score:.0f}-point competency deficit (Target: {required_score:.0f}/100)."
        )

        return {
            "title": title,
            "duration_days": duration_days,
            "delivery_mode": mode,
            "target_competency": skill_name,
            "description": description,
            "priority": priority,
        }

    @classmethod
    def calculate_gap(
        cls,
        learner_skills: List[Dict[str, Any]],
        job_requirements: List[Dict[str, Any]],
        market_demand: Optional[Union[Dict[str, Any], List[Dict[str, Any]]]] = None,
    ) -> Dict[str, Any]:
        """
        Computes the competency gap between a learner's assessed skills and target job requirements,
        weighted by market demand and requirement criticality.

        Parameters:
            learner_skills: List of skills possessed by the learner.
            job_requirements: List of competencies required by the target job.
            market_demand: Optional map or list of market demand weights (scale 1.0 - 5.0).

        Returns:
            Dict containing:
                - skill_match_percentage: Integer (0 - 100)
                - match_percentage: Backwards-compatible alias (0 - 100)
                - missing_skills: Detailed list of deficits with priority and recommended training
                - matched_skills: Satisfied or partially satisfied competencies
                - priority: Overall gap priority ('Critical' | 'High' | 'Medium' | 'Low')
                - recommended_training: Consolidated learning path roadmap
                - gap_severity: 'low' | 'medium' | 'high'
                - diagnosis_notes: Transparent calculation breakdown
        """
        demand_map = cls._extract_market_demand_map(market_demand)

        # Build normalized lookup for learner's skills
        learner_map_by_id: Dict[str, Dict[str, Any]] = {}
        learner_map_by_name: Dict[str, Dict[str, Any]] = {}

        for s in learner_skills:
            s_id = str(s.get("skill_id") or s.get("skillId") or s.get("id") or "")
            s_name = str(s.get("skill_name") or s.get("skillName") or s.get("name") or "")
            if s_id:
                learner_map_by_id[cls._normalize_key(s_id)] = s
            if s_name:
                learner_map_by_name[cls._normalize_key(s_name)] = s

        matched_skills: List[Dict[str, Any]] = []
        missing_skills: List[Dict[str, Any]] = []

        total_effective_weight = 0.0
        total_covered_weight = 0.0
        mandatory_count = 0
        missing_mandatory_count = 0

        for req in job_requirements:
            req_id = str(req.get("skill_id") or req.get("skillId") or req.get("id") or "")
            req_name = str(req.get("skill_name") or req.get("skillName") or req.get("name") or "Competency")
            importance = str(req.get("importance", "mandatory")).lower()
            if importance not in cls.IMPORTANCE_WEIGHTS:
                importance = "preferred"

            min_score = cls._parse_score(
                req.get("min_score")
                or req.get("minScore")
                or req.get("min_proficiency")
                or req.get("minProficiency"),
                default=70.0,
            )
            category = str(req.get("category") or "technical")

            # 1. Base Importance Weight
            base_weight = cls.IMPORTANCE_WEIGHTS.get(importance, 2.0)
            if importance in ("mandatory", "critical"):
                mandatory_count += 1

            # 2. Market Demand Factor
            demand_weight = cls._get_demand_weight(req_id, req_name, demand_map)
            demand_multiplier = 1.0 + (demand_weight - cls.DEFAULT_MARKET_DEMAND_WEIGHT) / 10.0
            effective_weight = base_weight * demand_multiplier
            total_effective_weight += effective_weight

            # 3. Locate matching candidate skill
            norm_id = cls._normalize_key(req_id)
            norm_name = cls._normalize_key(req_name)
            candidate_skill = learner_map_by_id.get(norm_id) or learner_map_by_name.get(norm_name)

            if candidate_skill:
                # Skill is possessed
                score = cls._parse_score(
                    candidate_skill.get("assessed_score")
                    or candidate_skill.get("assessedScore")
                    or candidate_skill.get("score")
                    or candidate_skill.get("proficiency_level")
                    or candidate_skill.get("proficiencyLevel"),
                    default=70.0,
                )
                verified = bool(candidate_skill.get("verified", True))
                verification_factor = 1.0 if verified else 0.90
                coverage_ratio = min(1.0, score / max(1.0, min_score)) * verification_factor
                total_covered_weight += effective_weight * coverage_ratio

                matched_skills.append({
                    "skillId": req_id or norm_name,
                    "skillName": req_name,
                    "score": round(score, 1),
                    "minScore": round(min_score, 1),
                    "importance": importance,
                    "coverage": round(coverage_ratio, 2),
                    "category": category,
                    "verified": verified,
                    "demandWeight": demand_weight,
                })

                # Check if proficiency is below required threshold
                if score < min_score:
                    deficit_score = round(min_score - score, 1)
                    priority = cls._determine_priority(importance, demand_weight, deficit_score)
                    training = cls._generate_training_recommendation(
                        req_name, category, priority, deficit_score, min_score
                    )
                    missing_skills.append({
                        "skillId": req_id or norm_name,
                        "skillName": req_name,
                        "importance": importance,
                        "learnerScore": round(score, 1),
                        "requiredScore": round(min_score, 1),
                        "deficitScore": deficit_score,
                        "marketDemandWeight": demand_weight,
                        "priority": priority,
                        "isProficiencyDeficit": True,
                        "recommendedTraining": training,
                        "recommendation": training["description"],
                    })
            else:
                # Skill is completely missing
                if importance in ("mandatory", "critical"):
                    missing_mandatory_count += 1

                deficit_score = round(min_score, 1)
                priority = cls._determine_priority(importance, demand_weight, deficit_score)
                training = cls._generate_training_recommendation(
                    req_name, category, priority, deficit_score, min_score
                )

                missing_skills.append({
                    "skillId": req_id or norm_name,
                    "skillName": req_name,
                    "importance": importance,
                    "learnerScore": 0.0,
                    "requiredScore": round(min_score, 1),
                    "deficitScore": deficit_score,
                    "marketDemandWeight": demand_weight,
                    "priority": priority,
                    "isProficiencyDeficit": False,
                    "recommendedTraining": training,
                    "recommendation": training["description"],
                })

        # 4. Overall Match Percentage Calculation
        if total_effective_weight > 0:
            raw_match_pct = (total_covered_weight / total_effective_weight) * 100.0
        else:
            raw_match_pct = 100.0

        # Apply mandatory deficit gating penalty
        if mandatory_count > 0 and missing_mandatory_count > 0:
            penalty = 1.0 - 0.20 * (missing_mandatory_count / mandatory_count)
            final_match_pct = max(0, min(100, round(raw_match_pct * penalty)))
        else:
            final_match_pct = max(0, min(100, round(raw_match_pct)))

        # 5. Sort Missing Skills by Priority Order: Critical -> High -> Medium -> Low
        priority_rank = {"Critical": 4, "High": 3, "Medium": 2, "Low": 1}
        missing_skills.sort(
            key=lambda x: (
                priority_rank.get(x["priority"], 0),
                x.get("marketDemandWeight", 3.0),
                x.get("deficitScore", 0.0),
            ),
            reverse=True,
        )

        # 6. Determine Overall Priority
        priorities_present = [s["priority"] for s in missing_skills]
        if "Critical" in priorities_present or final_match_pct < 50:
            overall_priority = "Critical"
        elif "High" in priorities_present or final_match_pct < 70:
            overall_priority = "High"
        elif "Medium" in priorities_present or final_match_pct < 85:
            overall_priority = "Medium"
        else:
            overall_priority = "Low"

        # 7. Overall Gap Severity
        if overall_priority in ("Critical", "High") or final_match_pct < 60:
            gap_severity = "high"
        elif overall_priority == "Medium" or final_match_pct < 80:
            gap_severity = "medium"
        else:
            gap_severity = "low"

        # 8. Consolidated Recommended Training Curriculum / Roadmap
        recommended_training_roadmap = [
            s["recommendedTraining"] for s in missing_skills if "recommendedTraining" in s
        ]
        total_training_days = sum(t.get("duration_days", 7) for t in recommended_training_roadmap)

        # 9. Transparent Diagnostic Notes
        if final_match_pct >= 85 and missing_mandatory_count == 0:
            diagnosis_notes = (
                f"Candidate exhibits strong competency alignment ({final_match_pct}% match). "
                f"All mandatory employer competencies satisfied. "
                f"Minimal upskilling required ({len(missing_skills)} minor optional gaps)."
            )
        elif final_match_pct >= 60:
            diagnosis_notes = (
                f"Moderate competency match ({final_match_pct}%). "
                f"Identified {len(missing_skills)} deficit areas with {missing_mandatory_count} unfulfilled mandatory requirements. "
                f"Targeted {total_training_days}-day prescriptive upskilling recommended to achieve placement readiness."
            )
        else:
            diagnosis_notes = (
                f"Significant competency deficit ({final_match_pct}% match). "
                f"Missing {missing_mandatory_count} critical mandatory prerequisites and high-demand competencies. "
                f"Structured {total_training_days}-day foundational micro-credential program required before employer referral."
            )

        return {
            "skill_match_percentage": final_match_pct,
            "match_percentage": final_match_pct,  # Backwards compatibility
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "priority": overall_priority,
            "recommended_training": recommended_training_roadmap,
            "total_training_days": total_training_days,
            "gap_severity": gap_severity,
            "diagnosis_notes": diagnosis_notes,
            "calculation_metadata": {
                "total_requirements": len(job_requirements),
                "mandatory_requirements": mandatory_count,
                "missing_mandatory_count": missing_mandatory_count,
                "total_effective_weight": round(total_effective_weight, 2),
                "total_covered_weight": round(total_covered_weight, 2),
                "raw_match_pct": round(raw_match_pct, 2),
                "market_demand_applied": bool(demand_map),
            },
        }

skill_gap_engine = SkillGapEngine()
