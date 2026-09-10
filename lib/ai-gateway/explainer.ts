/**
 * Explainability Co-pilot Service
 * Generates transparent, human-auditable explanations for deterministic skill gaps, course suggestions,
 * and job matching scores.
 *
 * Truth-in-AI Guarantee:
 * - When GEMINI_API_KEY is not configured, generates 100% deterministic, mathematically sound explanations.
 * - When GEMINI_API_KEY is configured, passes verified metrics to Gemini 1.5 Flash via AIGateway with strict
 *   grounding instructions prohibiting hallucination or unverified claims.
 */

import { AIGateway } from './gateway';
import { ProvenanceMetadata } from '@/lib/validations/ai-ml.schema';

export interface ExplanationResult {
  summary: string;
  keyFindings: string[];
  actionableInterventions: string[];
  engineUsed: 'DETERMINISTIC_RULES' | 'GEMINI_1.5_FLASH';
  provenance: ProvenanceMetadata;
}

export class ExplainabilityService {
  /**
   * Generates an explainability summary for a candidate's skill gap assessment.
   */
  static async explainSkillGap(params: {
    learnerName: string;
    targetRole: string;
    matchScore: number;
    matchTier: string;
    missingSkills: Array<{ skillName: string; priorityScore: number; importance: string }>;
    acquiredSkillsCount: number;
  }): Promise<ExplanationResult> {
    const fallbackGenerator = (): ExplanationResult => {
      const topDeficits = params.missingSkills.slice(0, 3).map((s) => s.skillName);
      const deficitSummary =
        topDeficits.length > 0
          ? `Priority skill deficits identified: ${topDeficits.join(', ')}.`
          : 'Candidate currently meets baseline profile requirements.';

      return {
        summary: `Candidate profile for '${params.targetRole}' evaluated at ${params.matchScore}% competency match (${params.matchTier}). ${deficitSummary}`,
        keyFindings: [
          `Competency match score: ${params.matchScore}% (${params.matchTier}).`,
          `Verified skills on record: ${params.acquiredSkillsCount}.`,
          `Required skills requiring remediation: ${params.missingSkills.length}.`,
        ],
        actionableInterventions: [
          topDeficits.length > 0
            ? `Enroll candidate in NSQF-aligned bridge training focusing on ${topDeficits[0]}.`
            : 'Proceed with industry job application submissions.',
          'Schedule periodic competency reassessment upon course module completion.',
        ],
        engineUsed: 'DETERMINISTIC_RULES',
        provenance: {
          dataSource: 'EXPLAINED',
          algorithm: 'DeterministicSkillGapExplain-v1',
          calculatedAt: new Date().toISOString(),
          isSufficientData: true,
        },
      };
    };

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return fallbackGenerator();
    }

    // Wrap LLM call in AI Gateway with 2500ms timeout and circuit breaker
    const { data } = await AIGateway.executeWithFallback<ExplanationResult>(
      'explainSkillGap_Gemini',
      async () => {
        const sanitized = AIGateway.sanitizePayload(params);
        const prompt = `You are an AI explainability co-pilot for a verified skills certification system.
Explain the following verified skill assessment strictly using the metrics provided below.
DO NOT fabricate numbers or percentages not in the data.

Candidate: ${sanitized.learnerName}
Target Role: ${sanitized.targetRole}
Competency Score: ${sanitized.matchScore}%
Match Tier: ${sanitized.matchTier}
Acquired Skills Count: ${sanitized.acquiredSkillsCount}
Top Missing Skills: ${sanitized.missingSkills.map((s) => `${s.skillName} (Priority ${s.priorityScore})`).join(', ')}

Return ONLY valid JSON with this exact structure:
{
  "summary": "1-2 sentence overview explaining the gap",
  "keyFindings": ["3 concise factual points citing the input numbers"],
  "actionableInterventions": ["2 specific next steps for training or placement"]
}`;

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.0,
                responseMimeType: 'application/json',
              },
            }),
          }
        );

        if (!res.ok) {
          throw new Error(`Gemini API responded with status ${res.status}`);
        }

        const json = await res.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = JSON.parse(text);

        return {
          summary: parsed.summary,
          keyFindings: parsed.keyFindings || [],
          actionableInterventions: parsed.actionableInterventions || [],
          engineUsed: 'GEMINI_1.5_FLASH',
          provenance: {
            dataSource: 'EXPLAINED',
            algorithm: 'Gemini-1.5-Flash-Bounded',
            calculatedAt: new Date().toISOString(),
            isSufficientData: true,
          },
        };
      },
      fallbackGenerator,
      2500
    );

    return data;
  }

  /**
   * Explains why a specific course was recommended for deficit closure.
   */
  static explainCourseRecommendation(params: {
    courseTitle: string;
    addressedSkills: string[];
    deficitCoveragePct: number;
    providerName?: string;
  }): ExplanationResult {
    return {
      summary: `'${params.courseTitle}' was prioritized because it directly remediates ${params.deficitCoveragePct}% of identified skill deficits.`,
      keyFindings: [
        `Directly covers missing competencies: ${params.addressedSkills.join(', ')}.`,
        `Estimated deficit reduction: ${params.deficitCoveragePct}%.`,
        params.providerName ? `Offered by verified provider: ${params.providerName}.` : 'Offered by accredited training partner.',
      ],
      actionableInterventions: [
        `Enroll candidate to bridge ${params.addressedSkills[0] || 'core competencies'}.`,
        'Track milestone completion in the longitudinal monitoring ledger.',
      ],
      engineUsed: 'DETERMINISTIC_RULES',
      provenance: {
        dataSource: 'EXPLAINED',
        algorithm: 'DeficitClosureRationale-v1',
        calculatedAt: new Date().toISOString(),
        isSufficientData: true,
      },
    };
  }
}
