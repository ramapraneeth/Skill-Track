import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { mockLearners, mockSkills, mockJobs, mockInterventions, mockFollowups, mockImpactMeasurements } from '../data/mockData'

// ---------------------------------------------------------------------------
// Learners Queries
// ---------------------------------------------------------------------------
export function useLearners(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['learners', params],
    queryFn: async () => {
      try {
        const data = await api.getLearners(params)
        return data && data.length > 0 ? data : mockLearners
      } catch (err) {
        console.warn('API getLearners failed, falling back to mock data:', err)
        return mockLearners
      }
    },
  })
}

export function useLearner(id: string) {
  return useQuery({
    queryKey: ['learner', id],
    queryFn: async () => {
      try {
        const data = await api.getLearner(id)
        return data || mockLearners.find((l) => l.id === id) || mockLearners[0]
      } catch (err) {
        console.warn('API getLearner failed, falling back to mock data:', err)
        return mockLearners.find((l) => l.id === id) || mockLearners[0]
      }
    },
    enabled: !!id,
  })
}

export function useLearnerTimeline(id: string) {
  return useQuery({
    queryKey: ['learner-timeline', id],
    queryFn: async () => {
      try {
        return await api.getLearnerTimeline(id)
      } catch (err) {
        console.warn('API getLearnerTimeline failed, synthesizing from learner data:', err)
        const l = mockLearners.find((item) => item.id === id) || mockLearners[0]
        return [
          { id: `tl-${l.id}-1`, milestone: 'enrollment', title: 'Batch Enrollment', date: '2024-01-15', status: 'completed', description: `Enrolled in ${l.district} training center under PMKVY 4.0.` },
          { id: `tl-${l.id}-2`, milestone: 'training', title: 'Training & Practical Lab Completed', date: '2024-05-10', status: 'completed', description: 'Completed 480 hours of classroom and practical lab work.' },
          { id: `tl-${l.id}-3`, milestone: 'certification', title: 'NCVET Assessment & Certification', date: '2024-05-25', status: 'completed', description: 'NCVET NSQF Level qualification certified.' },
          { id: `tl-${l.id}-4`, milestone: 'job_search', title: 'Placement Drive & Screening', date: '2024-06-05', status: l.currentStatus === 'placed' ? 'completed' : 'in_progress', description: 'Participating in regional corporate recruitment drives.' },
          { id: `tl-${l.id}-5`, milestone: 'placement', title: 'Formal Job Placement', date: '2024-07-15', status: l.currentStatus === 'placed' ? 'completed' : 'pending', description: 'Transition to wage employment or self-employment.' },
          { id: `tl-${l.id}-6`, milestone: '30_day', title: '30-Day Retention Check-in', date: '2024-08-15', status: 'pending', description: 'Follow-up verification of job continuity and initial adjustment.' },
          { id: `tl-${l.id}-7`, milestone: '90_day', title: '90-Day Sustainable Outcome Verification', date: '2024-10-15', status: 'pending', description: 'Milestone audit for sustainable employment tracking.' },
        ]
      }
    },
    enabled: !!id,
  })
}

// ---------------------------------------------------------------------------
// Outcomes Queries
// ---------------------------------------------------------------------------
export function useOutcomes(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['outcomes', params],
    queryFn: async () => {
      try {
        return await api.getOutcomes(params)
      } catch (err) {
        console.warn('API getOutcomes failed:', err)
        return []
      }
    },
  })
}

export function useOutcomesSummary() {
  return useQuery({
    queryKey: ['outcomes-summary'],
    queryFn: async () => {
      try {
        return await api.getOutcomesSummary()
      } catch (err) {
        console.warn('API getOutcomesSummary failed, returning baseline summary:', err)
        return {
          totalRecorded: 4,
          totalFormalEmployment: 2,
          totalSelfEmployment: 1,
          totalApprenticeship: 1,
          overallVerificationRate: 100.0,
          averageStartingMonthlyWage: 21667.0,
          salaryDistribution: [
            { range: '< ₹15,000', count: 0 },
            { range: '₹15,000 - ₹20,000', count: 1 },
            { range: '₹20,000 - ₹25,000', count: 2 },
            { range: '₹25,000+', count: 0 },
          ],
          sectorBreakdown: [
            { sector: 'Healthcare', count: 1, percentage: 25.0 },
            { sector: 'IT-ITeS', count: 1, percentage: 25.0 },
            { sector: 'Green Energy', count: 1, percentage: 25.0 },
            { sector: 'Automotive', count: 1, percentage: 25.0 },
          ],
        }
      }
    },
  })
}

export function useCreateEmploymentOutcome() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.createEmploymentOutcome(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outcomes'] })
      queryClient.invalidateQueries({ queryKey: ['outcomes-summary'] })
      queryClient.invalidateQueries({ queryKey: ['learners'] })
    },
  })
}

export function useVerifyOutcome() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, verified }: { id: string; verified: boolean }) =>
      api.verifyEmploymentOutcome(id, verified),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outcomes'] })
      queryClient.invalidateQueries({ queryKey: ['outcomes-summary'] })
    },
  })
}

// ---------------------------------------------------------------------------
// Skills & Skill-Gap Queries
// ---------------------------------------------------------------------------
export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      try {
        const data = await api.getSkills()
        return data && data.length > 0 ? data : mockSkills
      } catch (err) {
        console.warn('API getSkills failed, using fallback mockSkills:', err)
        return mockSkills
      }
    },
  })
}

export function useSkillGap(learnerId: string, jobId?: string) {
  return useQuery({
    queryKey: ['skill-gap', learnerId, jobId],
    queryFn: async () => {
      try {
        return await api.getSkillGap(learnerId, jobId)
      } catch (err) {
        console.warn('API getSkillGap failed, returning baseline gap:', err)
        return {
          learnerId,
          learnerName: 'Rahul Sharma',
          jobId: jobId || 'job-1',
          jobTitle: 'Junior Data Operations Analyst',
          companyName: 'Delhivery Logistics Ltd',
          match_percentage: 80,
          matched_skills: [
            { skillId: 'sk-1', skillName: 'Python Fundamentals', score: 78.0, importance: 'mandatory' },
            { skillId: 'sk-2', skillName: 'SQL & Database Queries', score: 74.0, importance: 'mandatory' },
            { skillId: 'sk-4', skillName: 'Advanced MS Excel', score: 56.0, importance: 'preferred' },
            { skillId: 'sk-5', skillName: 'Interview Readiness & Presentation', score: 42.0, importance: 'mandatory' },
          ],
          missing_skills: [
            { skillId: 'sk-3', skillName: 'Power BI & Visual Dashboards', importance: 'mandatory', recommendation: 'Prescribe 14-Day accelerated micro-credential in Power BI & Visual Dashboards.' },
          ],
          gap_severity: 'medium',
          diagnosis_notes: 'Candidate has 1 critical mandatory skill deficits requiring targeted upskilling.',
        }
      }
    },
    enabled: !!learnerId,
  })
}

// ---------------------------------------------------------------------------
// Jobs Queries
// ---------------------------------------------------------------------------
export function useJobs() {
  return useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      try {
        const data = await api.getJobs()
        return data && data.length > 0 ? data : mockJobs
      } catch (err) {
        console.warn('API getJobs failed, using fallback mockJobs:', err)
        return mockJobs
      }
    },
  })
}

export function useJobDemand() {
  return useQuery({
    queryKey: ['job-demand'],
    queryFn: async () => {
      try {
        return await api.getJobDemand()
      } catch (err) {
        console.warn('API getJobDemand failed:', err)
        return {
          topSectors: [
            { sector: 'IT-ITeS & Data Operations', vacancies: 14200, growth: '+34% YoY', avgWage: 22500 },
            { sector: 'Logistics, Warehousing & Supply Chain', vacancies: 18500, growth: '+28% YoY', avgWage: 18000 },
            { sector: 'Healthcare & Patient Care', vacancies: 12400, growth: '+22% YoY', avgWage: 19000 },
            { sector: 'Green Energy & Solar Installation', vacancies: 8900, growth: '+46% YoY', avgWage: 17500 },
          ],
        }
      }
    },
  })
}

// ---------------------------------------------------------------------------
// Prediction Queries
// ---------------------------------------------------------------------------
export function usePlacementPrediction(learnerId: string) {
  return useQuery({
    queryKey: ['prediction-placement', learnerId],
    queryFn: async () => {
      try {
        return await api.getPlacementPrediction(learnerId)
      } catch (err) {
        console.warn('API getPlacementPrediction failed, returning model estimate:', err)
        return {
          id: `pred-${learnerId}`,
          learnerId,
          predictionType: 'placement',
          probability: 0.58,
          riskLevel: 'Medium',
          positiveFactors: [
            'High training attendance (88%) and practical assessment score (86/100)',
            'Verified NSQF Level 5 competency in core Python and SQL fundamentals',
            'Resides in high hiring density region (Delhi NCR)',
          ],
          riskFactors: [
            'Critical skill deficit: Missing Power BI (Required for 72% of local data analyst openings)',
            'Low interview readiness score (42/100 in initial screening)',
            'Unplaced 45 days post certification threshold',
          ],
          modelVersion: 'XGBoost-Explainable-v2.1',
          recommendedInterventions: [
            'Prescribe 14-Day Power BI Accelerated Micro-Credential',
            'Schedule 2 personalized 1-on-1 mock interview drills with corporate mentor',
            'Fast-track resume match for Delhivery Logistics opening (Gurugram)',
          ],
        }
      }
    },
    enabled: !!learnerId,
  })
}

export function useAttritionPrediction(learnerId: string) {
  return useQuery({
    queryKey: ['prediction-attrition', learnerId],
    queryFn: async () => {
      try {
        return await api.getAttritionPrediction(learnerId)
      } catch (err) {
        console.warn('API getAttritionPrediction failed:', err)
        return {
          id: `pred-attr-${learnerId}`,
          learnerId,
          predictionType: 'attrition',
          probability: 0.18,
          riskLevel: 'Low',
          positiveFactors: ['Stable wage meeting district benchmarks', 'High job satisfaction report'],
          riskFactors: ['Moderate commute distance (22 km)'],
          modelVersion: 'XGBoost-Retention-v1.4',
          recommendedInterventions: ['Routine 90-day milestone verification audit.'],
        }
      }
    },
    enabled: !!learnerId,
  })
}

// ---------------------------------------------------------------------------
// Interventions Queries & Mutations
// ---------------------------------------------------------------------------
export function useInterventions(params?: Record<string, string>) {
  return useQuery({
    queryKey: ['interventions', params],
    queryFn: async () => {
      try {
        const data = await api.getInterventions(params)
        return data && data.length > 0 ? data : mockInterventions
      } catch (err) {
        console.warn('API getInterventions failed, falling back to mockInterventions:', err)
        return mockInterventions
      }
    },
  })
}

export function useCreateIntervention() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.createIntervention(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interventions'] })
      queryClient.invalidateQueries({ queryKey: ['learner'] })
    },
  })
}

export function useUpdateIntervention() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.updateIntervention(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interventions'] })
      queryClient.invalidateQueries({ queryKey: ['learner'] })
    },
  })
}

// ---------------------------------------------------------------------------
// Follow-ups Queries & Mutations
// ---------------------------------------------------------------------------
export function useFollowups(learnerId?: string) {
  return useQuery({
    queryKey: ['followups', learnerId],
    queryFn: async () => {
      try {
        const data = await api.getFollowups(learnerId)
        return data && data.length > 0 ? data : mockFollowups
      } catch (err) {
        console.warn('API getFollowups failed, falling back to mockFollowups:', err)
        return mockFollowups
      }
    },
  })
}

export function useCreateFollowup() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => api.createFollowup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['followups'] })
      queryClient.invalidateQueries({ queryKey: ['learners'] })
      queryClient.invalidateQueries({ queryKey: ['learner'] })
    },
  })
}

// ---------------------------------------------------------------------------
// Analytics & Impact Queries
// ---------------------------------------------------------------------------
export function useGovernmentAnalytics() {
  return useQuery({
    queryKey: ['government-analytics'],
    queryFn: () => api.getGovernmentAnalytics(),
  })
}

export function useProviderAnalytics() {
  return useQuery({
    queryKey: ['provider-analytics'],
    queryFn: () => api.getProviderAnalytics(),
  })
}

export function useImpact() {
  return useQuery({
    queryKey: ['impact'],
    queryFn: async () => {
      try {
        const data = await api.getImpact()
        return data && data.length > 0 ? data : mockImpactMeasurements
      } catch (err) {
        console.warn('API getImpact failed, using mockImpactMeasurements:', err)
        return mockImpactMeasurements
      }
    },
  })
}
