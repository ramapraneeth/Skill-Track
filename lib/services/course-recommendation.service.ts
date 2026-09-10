import { prisma } from '@/lib/db/prisma';
import { CourseRecommendationResponse, RecommendedCourseItem } from '@/lib/validations/ai-ml.schema';
import { SkillGapService } from './skill-gap.service';

export class CourseRecommendationService {
  /**
   * Deterministically calculates course recommendations based on prioritized candidate skill gaps.
   * Every score is transparently derived: Score = sum(skillPriority * weight) / normalizationFactor.
   */
  static async getRecommendationsForLearner(params: {
    learnerId?: string;
    limit?: number;
    sector?: string;
    maxDurationHours?: number;
  }): Promise<CourseRecommendationResponse> {
    const limit = params.limit || 5;

    // 1. Calculate candidate's actual skill gaps from the live database
    const gapAnalysis = await SkillGapService.calculateLearnerSkillGap({ learnerId: params.learnerId });

    // Map missing skills for quick lookup (normalized lowercase)
    const missingSkillMap = new Map<string, { priorityScore: number; skillName: string }>();
    gapAnalysis.missingSkills.forEach((m) => {
      missingSkillMap.set(m.skillName.toLowerCase(), {
        priorityScore: m.priorityScore,
        skillName: m.skillName,
      });
      missingSkillMap.set(m.skillId.toLowerCase(), {
        priorityScore: m.priorityScore,
        skillName: m.skillName,
      });
    });

    // 2. Query available courses from Neon PostgreSQL
    const whereCourse: any = { is_active: true };
    if (params.sector) whereCourse.sector = params.sector;
    if (params.maxDurationHours) whereCourse.duration_hours = { lte: params.maxDurationHours };

    const courses = await prisma.courses.findMany({
      where: whereCourse,
      include: {
        course_skills: {
          include: { skills: true },
        },
        training_providers: {
          select: { name: true, accreditation_tier: true },
        },
      },
    });

    if (courses.length === 0) {
      return {
        learnerId: gapAnalysis.learnerId,
        learnerName: gapAnalysis.learnerName,
        targetRole: gapAnalysis.targetRole,
        totalRecommendations: 0,
        courses: [],
        provenance: {
          dataSource: 'CALCULATED',
          algorithm: 'SkillDeficitRemediation-v1',
          calculatedAt: new Date().toISOString(),
          isSufficientData: false,
          sampleSize: 0,
        },
      };
    }

    // 3. Score each course deterministically
    const scoredCourses: RecommendedCourseItem[] = [];

    for (const c of courses) {
      const remediatedSkills: string[] = [];
      let totalEarnedScore = 0;

      for (const cs of c.course_skills) {
        const skillName = cs.skills?.name || '';
        const match = missingSkillMap.get(skillName.toLowerCase()) || missingSkillMap.get(cs.skill_id.toLowerCase());

        if (match) {
          remediatedSkills.push(match.skillName);
          const weight = cs.weight || 1.0;
          totalEarnedScore += match.priorityScore * weight;
        }
      }

      // If course does not remediate any missing skills, score is 0
      // Normalize score to 0 - 100 range (max theoretical priority score is ~100)
      const relevanceScore = Math.min(100, Math.round(totalEarnedScore));

      if (remediatedSkills.length > 0 || gapAnalysis.missingSkillsCount === 0) {
        let explanationReason = '';
        if (remediatedSkills.length > 0) {
          explanationReason = `Directly remediates ${remediatedSkills.length} identified gap(s): ${remediatedSkills.join(', ')} required for ${gapAnalysis.targetRole}.`;
        } else {
          explanationReason = `Foundation course in ${c.sector} to build cross-functional competency.`;
        }

        scoredCourses.push({
          courseId: c.id,
          courseCode: c.code,
          title: c.title,
          sector: c.sector,
          nsqfLevel: c.nsqf_level,
          durationHours: c.duration_hours,
          relevanceScore: remediatedSkills.length > 0 ? relevanceScore : 40,
          targetSkillsRemediated: remediatedSkills,
          explanationReason,
          providerName: c.training_providers?.name,
        });
      }
    }

    // Sort by relevance score descending
    scoredCourses.sort((a, b) => b.relevanceScore - a.relevanceScore);

    const topRecommendations = scoredCourses.slice(0, limit);

    return {
      learnerId: gapAnalysis.learnerId,
      learnerName: gapAnalysis.learnerName,
      targetRole: gapAnalysis.targetRole,
      totalRecommendations: topRecommendations.length,
      courses: topRecommendations,
      provenance: {
        dataSource: 'CALCULATED',
        algorithm: 'SkillDeficitRemediation-v1',
        calculatedAt: new Date().toISOString(),
        isSufficientData: courses.length > 0,
        sampleSize: courses.length,
      },
    };
  }
}
