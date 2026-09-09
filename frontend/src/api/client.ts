const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('skilltrack_token')

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
  login: (credentials: { email: string; password?: string; role?: string }) =>
    fetchApi<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password || 'demo1234',
        role: credentials.role,
      }),
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

  // Providers & Programmes
  getProviders: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return fetchApi<any[]>(`/providers${query}`)
  },
  getProvider: (id: string) => fetchApi<any>(`/providers/${id}`),
  getProgrammes: (params?: Record<string, string>) => {
    const query = params ? '?' + new URLSearchParams(params).toString() : ''
    return fetchApi<any[]>(`/programmes${query}`)
  },
  getProgramme: (id: string) => fetchApi<any>(`/programmes/${id}`),

  // Analytics & Impact
  getGovernmentAnalytics: (params?: Record<string, string | undefined>) => {
    const cleanParams: Record<string, string> = {}
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value && !value.includes('All')) {
          cleanParams[key] = value
        }
      }
    }
    const query = Object.keys(cleanParams).length ? '?' + new URLSearchParams(cleanParams).toString() : ''
    return fetchApi<any>(`/analytics/government${query}`)
  },
  getProviderAnalytics: () => fetchApi<any>('/analytics/providers'),
  getSkillsAnalytics: () => fetchApi<any>('/analytics/skills'),
  getImpact: () => fetchApi<any[]>('/impact'),
  getImpactById: (id: string) => fetchApi<any>(`/impact/${id}`),
  getReports: () => fetchApi<any[]>('/reports'),
}
