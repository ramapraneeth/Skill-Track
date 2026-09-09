const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('skilltrack_token') || 'mock-jwt-token-active'

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(errorBody.detail || `API error ${res.status}: ${res.statusText}`)
  }

  return res.json()
}

export const api = {
  // Auth
  login: (email: string, role: string) =>
    fetchApi<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: 'demo1234', role }),
    }),
  getMe: () => fetchApi<any>('/auth/me'),

  // Learners
  getLearners: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return fetchApi<any[]>(`/learners${query}`)
  },
  getLearner: (id: string) => fetchApi<any>(`/learners/${id}`),
  getLearnerTimeline: (id: string) => fetchApi<any[]>(`/learners/${id}/timeline`),
  createLearner: (data: any) =>
    fetchApi<any>('/learners', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateLearner: (id: string, data: any) =>
    fetchApi<any>(`/learners/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Outcomes
  getOutcomes: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return fetchApi<any[]>(`/outcomes${query}`)
  },
  getOutcomesSummary: () => fetchApi<any>('/outcomes/summary'),
  getEmploymentOutcomes: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return fetchApi<any[]>(`/outcomes/employment${query}`)
  },
  createEmploymentOutcome: (data: any) =>
    fetchApi<any>('/outcomes/employment', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  verifyEmploymentOutcome: (id: string, verified: boolean = true) =>
    fetchApi<any>(`/outcomes/employment/${id}/verify?verified=${verified}`, {
      method: 'PATCH',
    }),
  getSelfEmploymentOutcomes: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return fetchApi<any[]>(`/outcomes/self-employment${query}`)
  },
  createSelfEmploymentOutcome: (data: any) =>
    fetchApi<any>('/outcomes/self-employment', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getApprenticeshipOutcomes: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return fetchApi<any[]>(`/outcomes/apprenticeship${query}`)
  },
  createApprenticeshipOutcome: (data: any) =>
    fetchApi<any>('/outcomes/apprenticeship', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Skills
  getSkills: () => fetchApi<any[]>('/skills'),
  getSkillGap: (learnerId: string, jobId?: string) =>
    fetchApi<any>(`/skills/learners/${learnerId}/skill-gap${jobId ? `?job_id=${jobId}` : ''}`),

  // Jobs
  getJobs: () => fetchApi<any[]>('/jobs'),
  getJob: (id: string) => fetchApi<any>(`/jobs/${id}`),
  getJobDemand: () => fetchApi<any>('/jobs/demand'),

  // Predictions
  getPlacementPrediction: (learnerId: string) =>
    fetchApi<any>(`/predictions/${learnerId}/placement`),
  getAttritionPrediction: (learnerId: string) =>
    fetchApi<any>(`/predictions/${learnerId}/attrition`),

  // Interventions
  getInterventions: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return fetchApi<any[]>(`/interventions${query}`)
  },
  createIntervention: (data: any) =>
    fetchApi<any>('/interventions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  updateIntervention: (id: string, data: any) =>
    fetchApi<any>(`/interventions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  // Followups
  getFollowups: (learnerId?: string) =>
    fetchApi<any[]>(`/followups${learnerId ? `?learner_id=${learnerId}` : ''}`),
  createFollowup: (data: any) =>
    fetchApi<any>('/followups', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Analytics & Impact
  getGovernmentAnalytics: () => fetchApi<any>('/analytics/government'),
  getProviderAnalytics: () => fetchApi<any>('/analytics/providers'),
  getSkillsAnalytics: () => fetchApi<any>('/analytics/skills'),
  getImpact: () => fetchApi<any[]>('/impact'),
  getImpactById: (id: string) => fetchApi<any>(`/impact/${id}`),
  getReports: () => fetchApi<any[]>('/reports'),
}
