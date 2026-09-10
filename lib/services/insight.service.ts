import { prisma } from '@/lib/db/prisma';
import { RiskPrediction, InterventionRecord } from '@/types/insight';
import { generateLearnerRiskFactors } from '@/lib/intelligence/insights';

export class InsightService {
  static async listPredictions(riskLevel?: string): Promise<RiskPrediction[]> {
    const predictions = await prisma.predictions.findMany({
      where: riskLevel ? { risk_level: riskLevel } : undefined,
      include: {
        learners: { select: { full_name: true } },
      },
      orderBy: { probability: 'desc' },
    });

    return predictions.map((p: any) => ({
      id: p.id,
      learnerId: p.learner_id,
      predictionType: p.prediction_type as any,
      probability: p.probability,
      riskLevel: p.risk_level as any,
      positiveFactors: (p.positive_factors as any) || [],
      riskFactors: (p.risk_factors as any) || [],
      modelVersion: p.model_version || 'Explainable-v2.1',
      recommendedInterventions: (p.recommended_interventions as any) || [],
      createdAt: p.created_at?.toISOString(),
      learnerName: p.learners?.full_name,
    }));
  }

  static async listInterventions(learnerId?: string, status?: string): Promise<InterventionRecord[]> {
    const interventions = await prisma.interventions.findMany({
      where: {
        ...(learnerId && { learner_id: learnerId }),
        ...(status && { status }),
      },
      include: {
        learners: { select: { full_name: true } },
      },
      orderBy: { created_at: 'desc' },
    });

    return interventions.map((i: any) => ({
      id: i.id,
      learnerId: i.learner_id,
      recommendedBy: i.recommended_by,
      category: i.category as any,
      title: i.title,
      description: i.description,
      status: i.status as any,
      targetCompletionDate: i.target_completion_date,
      completedDate: i.completed_date,
      outcomeNotes: i.outcome_notes,
      learnerName: i.learners?.full_name,
    }));
  }
}
