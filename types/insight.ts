export interface ExplainableFactor {
  factor: string;
  weight: number;
  direction: 'positive' | 'negative';
  description: string;
}

export interface RiskPrediction {
  id: string;
  learnerId: string;
  predictionType: 'placement' | 'attrition';
  probability: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  positiveFactors: ExplainableFactor[];
  riskFactors: ExplainableFactor[];
  modelVersion: string;
  recommendedInterventions: string[];
  createdAt?: string;
  learnerName?: string;
}

export interface InterventionRecord {
  id: string;
  learnerId: string;
  recommendedBy: string;
  category: 'upskilling' | 'mock_interview' | 'relocation_support' | 'job_matching' | 'counseling';
  title: string;
  description: string;
  status: 'recommended' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  targetCompletionDate: string;
  completedDate?: string | null;
  outcomeNotes?: string | null;
  learnerName?: string;
}
